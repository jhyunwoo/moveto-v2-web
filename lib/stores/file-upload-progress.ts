import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface ProgressType {
  name: string | undefined
  progress: number | undefined
  type: string | undefined
  size: number | undefined
}

interface FileUploadProgressState {
  fileUploadProgress: ProgressType[]
}

interface FileUploadProgressAction {
  setFileUploadProgress: (fileUploadProgress: ProgressType[]) => void
}

export const useFileUploadProgress = create(
  devtools<FileUploadProgressState & FileUploadProgressAction>(set => ({
    fileUploadProgress: [],
    setFileUploadProgress: (fileUploadProgress: ProgressType[]) =>
      set(() => ({ fileUploadProgress: fileUploadProgress })),
  }))
)
