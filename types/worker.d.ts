type ClientToFileUploadWorker = {
  files: File[]
}

type WorkerToClient = {
  status?: string
  error?: string
  progress?: {
    name: string | undefined
    progress: number | undefined
    type: string | undefined
    size: number | undefined
  }[]
  id?: string
}
