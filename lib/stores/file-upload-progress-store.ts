import { createStore } from 'zustand'

type ProgressType = {
  name: string | undefined
  progress: number | undefined
  type: string | undefined
  size: number | undefined
}

export type FileUploadProgressState = {
  fileUploadProgress: ProgressType[]
}

export type FileUploadProgressActions = {
  setFileUploadProgress: (fileUploadProgress: ProgressType[]) => void
}

export type FileUploadProgressStore = FileUploadProgressState & FileUploadProgressActions

export const defaultInitState: FileUploadProgressState = {
  fileUploadProgress: [],
}

export const createFileUploadProgressStore = (initState: FileUploadProgressState = defaultInitState) => {
  return createStore<FileUploadProgressStore>()(set => ({
    ...initState,
    setFileUploadProgress: (fileUploadProgress: ProgressType[]) =>
      set(() => ({ fileUploadProgress: fileUploadProgress })),
  }))
}
