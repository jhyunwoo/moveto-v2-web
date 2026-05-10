import getTotalFileSize from '@/lib/get-total-file-size'
import fetchJson from '@/lib/client/fetch-json'
import { Meta, Uppy } from '@uppy/core'
import AwsS3, { AwsBody } from '@uppy/aws-s3'

const BASE_URL = typeof self === 'object' ? self.location.origin : ''

let currentShareId = ''
let lastProgressPost = 0

async function createShare(fileNameList: string[], storageSize: number) {
  const bodyData: { files: string[]; storageSize: number } = {
    files: fileNameList,
    storageSize: storageSize,
  }
  return await fetchJson<{ shareId: string }>(`${BASE_URL}/api/share`, {
    method: 'POST',
    body: JSON.stringify(bodyData),
  })
}

function postProgress() {
  const progressState = uppy.getFiles().map((file) => {
    const bytesUploaded = typeof file.progress.bytesUploaded === 'number' ? file.progress.bytesUploaded : 0
    const bytesTotal = file.progress.bytesTotal ?? file.size ?? 0
    return {
      name: file.name,
      progress: bytesTotal > 0 ? Math.ceil((bytesUploaded / bytesTotal) * 10000) / 100 : 0,
      type: file.type,
      size: file.size,
      bytesUploaded,
      bytesTotal,
    }
  })
  self.postMessage({ progress: progressState } as WorkerToClient)
}

function completeUpload() {
  // Send final 100% progress
  const progressState = uppy.getFiles().map((file) => ({
    name: file.name,
    progress: 100,
    type: file.type,
    size: file.size,
    bytesUploaded: file.size ?? 0,
    bytesTotal: file.size ?? 0,
  }))
  self.postMessage({ progress: progressState } as WorkerToClient)

  // Clear uppy after upload all files
  uppy.clear()

  // Send upload complete message
  self.postMessage({
    status: 'Upload Complete',
    id: currentShareId,
  } as WorkerToClient)
}

const uppy = new Uppy<Meta, AwsBody>()
  .use(AwsS3, {
    endpoint: `${BASE_URL}/api`,
    limit: 6,
    retryDelays: [0, 1000, 3000, 5000],
    shouldUseMultipart: (file) => (file.size ?? 0) > 10 * 1024 * 1024,
    getChunkSize: (file) => {
      const size = file.size ?? 0
      if (size > 500 * 1024 * 1024 * 1024) return 110 * 1024 * 1024 // 110MB for > 500GB
      if (size > 100 * 1024 * 1024 * 1024) return 50 * 1024 * 1024  // 50MB for > 100GB
      if (size > 10 * 1024 * 1024 * 1024) return 20 * 1024 * 1024   // 20MB for > 10GB
      return 10 * 1024 * 1024                                       // 10MB default
    },
  })
  .on('upload-progress', () => {
    const now = Date.now()
    if (now - lastProgressPost < 100) return
    lastProgressPost = now
    postProgress()
  })
  .on('upload-success', (file) => console.log(file?.name, 'successfully uploaded'))
  .on('upload-error', async (file, error) => {
    console.error('error with file:', file?.id)
    console.error('error message:', error)
    if (file) uppy.retryUpload(file.id)
  })
  .on('upload-retry', (fileID) => {
    console.log('upload retried:', fileID)
  })
  .on('complete', () => completeUpload())

async function uploadFile(files: File[]) {
  const fileNameList = files.map((file) => file.name)

  // Create share on DB
  const share = await createShare(fileNameList, getTotalFileSize(files))
  currentShareId = share.shareId

  // Set share path metadata
  uppy.setState({ meta: { path: share.shareId } })

  // Add files and start upload
  for (const file of files) {
    uppy.addFile(file)
  }
  uppy.upload()
}

function cancelUpload() {
  uppy.cancelAll()
  const shareId = currentShareId
  currentShareId = ''
  self.postMessage({
    status: 'Cancelled',
    id: shareId,
  } as WorkerToClient)
}

const handleMessage = async (event: MessageEvent<ClientToFileUploadWorker>) => {
  if (event.data.files) {
    await uploadFile(event.data.files)
  } else if (event.data.action === 'pause') {
    uppy.pauseAll()
  } else if (event.data.action === 'resume') {
    uppy.resumeAll()
  } else if (event.data.action === 'cancel') {
    cancelUpload()
  }
}

typeof self === 'object' && self.addEventListener('message', handleMessage)
