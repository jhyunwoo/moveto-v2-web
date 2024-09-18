import getTotalFileSize from '@/lib/get-total-file-size'
import fetchJson from '@/lib/client/fetch-json'
import { Meta, Uppy } from '@uppy/core'
import AwsS3, { AwsBody } from '@uppy/aws-s3'

async function createShare(fileNameList: string[], storageSize: number) {
  const bodyData: { files: string[]; storageSize: number } = { files: fileNameList, storageSize: storageSize }
  return await fetchJson<{ shareId: string }>('/api/share', { method: 'POST', body: JSON.stringify(bodyData) })
}

const handleMessage = async (event: MessageEvent<ClientToFileUploadWorker>) => {
  // upload files data
  const files = event.data.files
  const fileNameList = files.map(file => file.name)

  // Create share on DB
  const share = await createShare(fileNameList, getTotalFileSize(files))

  // Start upload files
  const uppy = new Uppy<Meta, AwsBody>({
    meta: { path: share.shareId },
  })
    .use(AwsS3, { endpoint: '/api' })
    .on('upload-success', file => console.log(file?.name, 'successfully uploaded'))
    .on('upload-error', (file, error, response) => {
      console.error('error with file:', file?.id)
      console.error('error message:', error)
    })
    .on('upload-retry', fileID => {
      console.log('upload retried:', fileID)
    })

  const intervalId = setInterval(() => {
    const progressState = []
    const fileStates = uppy.getFiles()
    for (const file of fileStates) {
      progressState.push({ name: file.name, progress: file.progress.percentage, type: file.type, size: file.size })
    }
    self.postMessage({ progress: progressState } as WorkerToClient)
  }, 500)

  // add files on uppy
  for (const file of files) {
    uppy.addFile(file)
  }

  // upload files
  await uppy.upload()

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
  self.postMessage({ status: 'Upload Complete', id: share.shareId } as WorkerToClient)
}

typeof self === 'object' && self.addEventListener('message', handleMessage)
