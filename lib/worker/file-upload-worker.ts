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

  let uploadQueue = files.map(file => new UploadFile(file, createdShare.shareId))
  let queue = uploadQueue.slice(0, maxConcurrentUploads)
  let promiseQueue = queue.map(async uploadFile =>
    uploadFile.upload().then(result => {
      queue.push(uploadQueue.splice(0, 1)[0])
      return result
    })
  )
  const result = await Promise.all(promiseQueue)
  console.log(result)
}

class UploadFile {
  file: File
  folder: string

  constructor(file: File, folder: string) {
    this.file = file
    this.folder = folder
  }

  async upload() {
    // get upload url
    const requestUrl = await fetch(
      `/api/r2/params?filename=${this.file.name}&type=${this.file.type}&folder=${this.folder}`
    )
    if (!requestUrl.ok) {
      throw Error('Failed to get upload url')
    }
    const { url } = await requestUrl.json()
    return axios.put(url, this.file, {
      headers: {
        'Content-Type': this.file.type,
      },
      onUploadProgress: progressEvent => {
        if (progressEvent.total) {
          console.log(this.file.name, Math.round((progressEvent.loaded / progressEvent.total) * 100))
        }
      },
    })
  }
}

typeof self === 'object' && self.addEventListener('message', handleMessage)
