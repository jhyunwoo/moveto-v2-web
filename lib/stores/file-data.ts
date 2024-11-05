import { create } from 'zustand'

interface FileDataState {
  fileData: string[]
}

interface FileDataActions {
  setFileData: (files: string[]) => void
  addFileData: (files: string[]) => void
  deleteFileData: (index: number) => void
}

export const useFileData = create<FileDataState & FileDataActions>(set => ({
  fileData: [],
  setFileData: (data: string[]) => set(() => ({ fileData: data })),
  addFileData: (data: string[]) => set(state => ({ fileData: [...state.fileData, ...data] })),
  deleteFileData: (index: number) =>
    set(state => {
      let copiedFiles = [...state.fileData]
      copiedFiles.splice(index, 1)
      return { fileData: copiedFiles }
    }),
}))
