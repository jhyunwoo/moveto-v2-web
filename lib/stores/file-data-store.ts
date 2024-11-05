import { createStore } from 'zustand'

export type FileDataState = {
  fileData: string[]
}

export type FileDataActions = {
  setFileData: (files: string[]) => void
  addFileData: (files: string[]) => void
  deleteFileData: (index: number) => void
}

export type FileDataStore = FileDataState & FileDataActions

export const defaultInitState: FileDataState = {
  fileData: [],
}

export const createFileDataStore = (initState: FileDataState = defaultInitState) => {
  return createStore<FileDataStore>()(set => ({
    ...initState,
    setFileData: (data: string[]) => set(() => ({ fileData: data })),
    addFileData: (data: string[]) => set(state => ({ fileData: [...state.fileData, ...data] })),
    deleteFileData: (index: number) =>
      set(state => {
        let copiedFiles = [...state.fileData]
        copiedFiles.splice(index, 1)
        return { fileData: copiedFiles }
      }),
  }))
}
