import { createStore } from 'zustand'

export type FilesState = {
  files: File[]
}

export type FilesActions = {
  setFiles: (files: File[]) => void
  addFiles: (files: File[]) => void
  deleteFile: (index: number) => void
}

export type FilesStore = FilesState & FilesActions

export const defaultInitState: FilesState = {
  files: [],
}

export const createFilesStore = (initState: FilesState = defaultInitState) => {
  return createStore<FilesStore>()(set => ({
    ...initState,
    setFiles: (files: File[]) => set(() => ({ files: files })),
    addFiles: (files: File[]) => set(state => ({ files: [...state.files, ...files] })),
    deleteFile: (index: number) =>
      set(state => {
        let copiedFiles = [...state.files]
        copiedFiles.splice(index, 1)
        return { files: copiedFiles }
      }),
  }))
}
