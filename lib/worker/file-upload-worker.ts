import axios, { AxiosResponse } from 'axios'
import getTotalFileSize from '@/lib/get-total-file-size'
import fileToFileData from '@/lib/file-to-filedata'

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
  files: File[]
  fileData: string[]
  queue: Promise<void>[]
  uploadedFiles: AxiosResponse<any, any>[]
  folder: string
  maxConcurrentUploads: number
  progress: (number | undefined)[]

  constructor(files: File[], folder: string, maxConcurrentUploads: number = 6) {
    this.files = files
    this.fileData = files.map(file => fileToFileData(file))
    this.queue = []
    this.uploadedFiles = []
    this.folder = folder
    this.maxConcurrentUploads = maxConcurrentUploads
    this.progress = this.files.map(() => 0)
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

  getProgressData() {
    const progressData: { name: string; progress: number }[] = []
    for (let i = 0; i < this.fileData.length; i += 1) {
      const progress = Number(this.progress[i])
      progressData.push({
        name: this.fileData[i],
        progress: Math.ceil(progress * 10000) / 100,
      })
    }
    return progressData
  }

  async upload() {
    self.postMessage({ progress: this.getProgressData() } as WorkerToClient)
    const reportProgress = setInterval(() => {
      self.postMessage({ progress: this.getProgressData() } as WorkerToClient)
    }, 500)

    for (let i = 0; i < this.maxConcurrentUploads; i += 1) {
      this.queue.push(this.uploadFile())
    }
    await Promise.all(this.queue)
    console.log('모든 파일 업로드 완료')
    clearInterval(reportProgress)
    self.postMessage({ status: 'Upload Complete', id: this.folder } as WorkerToClient)
  }

  async uploadFile() {
    const file = this.files.shift()
    if (!file) return {} as Promise<void>
    const uploadUrl = await this.getUploadUrl(file)

    return axios
      .put(uploadUrl, file, {
        headers: {
          'Content-Type': file.type,
        },
        onUploadProgress: progressEvent => {
          this.progress[this.fileData.indexOf(fileToFileData(file))] = progressEvent.progress
        },
      })
      .then(async result => {
        await this.uploadFile()
        this.uploadedFiles.push(result)
      })
      .catch(async err => {
        console.error(err)
        this.files.push(file)
        await this.uploadFile()
      })
  }
}

typeof self === 'object' && self.addEventListener('message', handleMessage)
