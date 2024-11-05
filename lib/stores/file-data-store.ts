import { createStore } from 'zustand'

export type FileDataState = {
  fileData: string[]
}

export type FileDataActions = {
  setFileData: (files: string[]) => void
}

export type FileDataStore = FileDataState & FileDataActions

export const defaultInitState: FileDataState = {
  fileData: [],
}

export const createFileDataStore = (initState: FileDataState = defaultInitState) => {
  return createStore<FileDataStore>()(set => ({
    ...initState,
    setFileData: (data: string[]) => set(() => ({ fileData: data })),
  }))
}
