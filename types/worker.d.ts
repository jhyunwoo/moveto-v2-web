type ClientToFileUploadWorker = {
  files?: File[]
  action?: 'pause' | 'resume' | 'cancel'
}

type WorkerToClient = {
  status?: 'Upload Complete' | 'Cancelled' | 'Error'
  error?: string
  progress?: {
    name: string | undefined
    progress: number | undefined
    type: string | undefined
    size: number | undefined
    bytesUploaded: number
    bytesTotal: number
  }[]
  id?: string
}
