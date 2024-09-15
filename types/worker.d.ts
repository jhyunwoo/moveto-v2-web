type ClientToFileUploadWorker = {
  files: File[]
}

type WorkerToClient = {
  status?: 'Upload Complete'
  error?: string
  progress?: {
    name: string
    progress: number
  }[]
  id?: string
}
