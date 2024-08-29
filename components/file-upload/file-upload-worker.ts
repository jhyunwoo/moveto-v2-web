import { ClientToWorkersMessageType } from '@/lib/types'
import { Meta, Uppy, UppyFile } from '@uppy/core'
import AwsS3 from '@uppy/aws-s3'
import getTotalFileSize from '@/lib/get-total-file-size'

const handleMessage = async (event: MessageEvent<ClientToWorkersMessageType>) => {
  const fileNameList = event.data.files.map(file => file.name)
  // 1. 전체 파일 리스트와 파일 크기를 보내서 share 생성
  const createShareRequest = await fetch('/api/share', {
    method: 'POST',
    body: JSON.stringify({ files: fileNameList, storageSize: getTotalFileSize(event.data.files) }),
  })
  const createdShare = (await createShareRequest.json()) as { shareId: string }

  let uploadProgress: UppyFile<Meta, Record<string, never>>[] = []

  // 2. 생성한 share id를 받아오고 id를 폴더 이름으로 사용하고 각 파일을 해당 폴더에 업로드
  const uppy = new Uppy({ debug: true })
    .use(AwsS3, { endpoint: '/api/', allowedMetaFields: [], limit: 10, headers: { folder: createdShare.shareId } })
    .on('progress', progress => {
      self.postMessage({ progress })
    })
    .on('upload-progress', file => {
      uploadProgress = uploadProgress.map(data => {
        if (data.id === file?.id) {
          return file
        } else {
          return data
        }
      })
      self.postMessage({ files: uploadProgress })
    })
    .on('upload-success', file => {
      uploadProgress = uploadProgress.map(data => {
        if (data.id === file?.id) {
          file.progress.percentage = 100
          return file
        } else {
          return data
        }
      })
      self.postMessage({ files: uploadProgress })
    })
    .on('complete', () => {
      uploadProgress = uploadProgress.map(data => {
        data.progress.percentage = 100
        return data
      })
      self.postMessage({ files: uploadProgress })
    })
  for (const file of event.data.files) {
    uppy.addFile({
      name: `${createdShare.shareId}/${file.name}`,
      type: file.type,
      data: file,
    })
  }
  uploadProgress = uppy.getFiles().map(data => {
    if (data.name) {
      data.name = data.name.split('/')[1]
    }
    return data
  })
  self.postMessage({ files: uploadProgress })

  await uppy.upload()

  // let uploadCheck = false
  // while (!uploadCheck) {
  //   console.log('Check file uploaded')
  //   try {
  //     const checkAllFilesUploaded = await fetch(`/api/share/${createdShare.shareId}/file/check`)
  //     if (checkAllFilesUploaded.status === 200) {
  //       uploadCheck = true
  //     }
  //   } catch {}
  // }

  // 3. 업로드 완료 후 파일 크기 검증 및 접근 코드 생성
  const validateUploadRequest = await fetch(`/api/share/${createdShare.shareId}/code`, {
    method: 'PUT',
    body: JSON.stringify({
      shareTime: event.data.shareTime,
    }),
  })
  const validateResult = (await validateUploadRequest.json()) as { code: string }
  // 4. 접근 코드를 받은 후 main thread로 전달
  self.postMessage(validateResult)
}

typeof self === 'object' && self.addEventListener('message', handleMessage)
