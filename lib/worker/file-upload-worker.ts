import getTotalFileSize from '@/lib/get-total-file-size'
import fetchJson from '@/lib/client/fetch-json'
import {Meta, Uppy, UppyFile} from '@uppy/core'
import AwsS3, {AwsBody, AwsS3UploadParameters} from '@uppy/aws-s3'

async function createShare(fileNameList: string[], storageSize: number) {
  const bodyData: { files: string[]; storageSize: number } = { files: fileNameList, storageSize: storageSize }
  return await fetchJson<{ shareId: string }>('/api/share', { method: 'POST', body: JSON.stringify(bodyData) })
}

function completeUpload(intervalId: NodeJS.Timeout, shareId: string) {
  // Delete setInterval
  clearInterval(intervalId)

  const progressState = []
  const fileStates = uppy.getFiles()
  for (const file of fileStates) {
    progressState.push({ name: file.name, progress: 100, type: file.type, size: file.size })
  }
  self.postMessage({ progress: progressState } as WorkerToClient)

  // Clear uppy after upload all files
  uppy.clear()

  // Send upload complete message
  self.postMessage({ status: 'Upload Complete', id: shareId } as WorkerToClient)
}

async function upload(file:UppyFile<Meta, AwsBody>, options:Object):Promise<AwsS3UploadParameters>{
    return {
        method: 'POST',
        url: '/api/s3',
        fields: {
        key: `${file.meta.path}/${file.name}`,
        'Content-Type': file.type,
        },
        headers: {
        'Content-Type': 'application/json',
        },
    }
}

const uppy = new Uppy<Meta, AwsBody>()
  .use(AwsS3, { endpoint: '/api'})
  .on('upload-success', file => console.log(file?.name, 'successfully uploaded'))
  .on('upload-error', async (file, error) => {
    console.error('error with file:', file?.id)
    console.error('error message:', error)
    if (file) uppy.retryUpload(file.id)
  })
  .on('upload-retry', fileID => {
    console.log('upload retried:', fileID)
  })

async function uploadFile(files: File[]) {
  // upload files data
  const fileNameList = files.map(file => file.name)

  // Create share on DB
  const share = await createShare(fileNameList, getTotalFileSize(files))

  // Start upload files
  uppy.setState({ meta: { path: share.shareId } })

  const intervalId = setInterval(() => {
    const progressState = []
    const fileStates = uppy.getFiles()
    for (const file of fileStates) {
      const bytesUploaded = file.progress.bytesUploaded ? file.progress.bytesUploaded : 0
      const bytesTotal = file.progress.bytesTotal ? file.progress.bytesTotal : 0
      progressState.push({
        name: file.name,
        progress: Math.ceil((bytesUploaded / bytesTotal) * 10000) / 100,
        type: file.type,
        size: file.size,
      })
    }
    self.postMessage({ progress: progressState } as WorkerToClient)
  }, 500)

  // add files on uppy
  for (const file of files) {
    uppy.addFile(file)
  }
  uppy.on('complete', () => completeUpload(intervalId, share.shareId))
  // upload files
  uppy.upload()
}

const handleMessage = async (event: MessageEvent<ClientToFileUploadWorker>) => {
  if (event.data.files) {
    await uploadFile(event.data.files)
  }
}

typeof self === 'object' && self.addEventListener('message', handleMessage)
