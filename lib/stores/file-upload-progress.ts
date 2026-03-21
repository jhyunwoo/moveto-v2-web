import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface ProgressType {
  name: string | undefined
  progress: number | undefined
  type: string | undefined
  size: number | undefined
  bytesUploaded: number
  bytesTotal: number
}

interface FileUploadProgressState {
  fileUploadProgress: ProgressType[]
  isGeneratingCode: boolean
  isPaused: boolean
  uploadError: string
}

interface FileUploadProgressAction {
  setFileUploadProgress: (fileUploadProgress: ProgressType[]) => void
  setIsGeneratingCode: (isGeneratingCode: boolean) => void
  setIsPaused: (isPaused: boolean) => void
  setUploadError: (uploadError: string) => void
}

export const useFileUploadProgress = create(
  devtools<FileUploadProgressState & FileUploadProgressAction>((set) => ({
    fileUploadProgress: [],
    isGeneratingCode: false,
    isPaused: false,
    uploadError: '',
    setFileUploadProgress: (fileUploadProgress: ProgressType[]) => set(() => ({ fileUploadProgress })),
    setIsGeneratingCode: (isGeneratingCode: boolean) => set(() => ({ isGeneratingCode })),
    setIsPaused: (isPaused: boolean) => set(() => ({ isPaused })),
    setUploadError: (uploadError: string) => set(() => ({ uploadError })),
  }))
)
