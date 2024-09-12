import axios from 'axios'
import getTotalFileSize from '@/lib/get-total-file-size'

const handleMessage = async (event: MessageEvent<ClientToFileUploadWorker>) => {
  const maxConcurrentUploads = 6
  const files = event.data.files
  const fileNameList = files.map(file => file.name)

  const createShareRequest = await fetch('/api/share', {
    method: 'POST',
    body: JSON.stringify({ files: fileNameList, storageSize: getTotalFileSize(event.data.files) }),
  })

  const createdShare = (await createShareRequest.json()) as { shareId: string; error?: string }
  if (!createShareRequest.ok) {
    self.postMessage({ error: createdShare.error })
    return
  }

  const uploadFiles = new UploadFiles(files, createdShare.shareId, maxConcurrentUploads)
  await uploadFiles.upload()
}

class UploadFiles {
  uploadQueue: File[]
  uploadedFiles: File[]
  folder: string
  maxConcurrentUploads: number

  constructor(files: File[], folder: string, maxConcurrentUploads: number = 6) {
    this.uploadQueue = files
    this.uploadedFiles = []
    this.folder = folder
    this.maxConcurrentUploads = maxConcurrentUploads
  }

  async getUploadUrl(file: File) {
    // get upload url
    const requestUrl = await fetch(`/api/r2/params?filename=${file.name}&type=${file.type}&folder=${this.folder}`)
    if (!requestUrl.ok) {
      throw Error('Failed to get upload url')
    }
    const { url } = await requestUrl.json()
    return url
  }

  async upload() {
    const queue = []
    for (let i = 0; i < this.maxConcurrentUploads; i++) {
      queue.push(this.uploadFile())
    }
    console.log(await Promise.all(queue))
  }

  async uploadFile() {
    const file = this.uploadQueue.shift()
    if (!file) {
      console.log('No more files to upload')
      return
    }

    const uploadUrl = await this.getUploadUrl(file)
    return axios
      .put(uploadUrl, file, {
        headers: {
          'Content-Type': file.type,
        },
        onUploadProgress: progressEvent => {
          console.log(progressEvent)
        },
      })
      .then(() => {
        this.uploadedFiles.push(file)
        this.uploadFile()
      })
      .catch(() => {
        this.uploadQueue.push(file)
        this.uploadFile()
      })
  }
}

typeof self === 'object' && self.addEventListener('message', handleMessage)
