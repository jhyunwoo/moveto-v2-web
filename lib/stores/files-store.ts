import { createStore } from 'zustand'

export type FilesState = {
  files: File[]
}

export type FilesActions = {
  setFiles: (files: File[]) => void
}

export type FilesStore = FilesState & FilesActions

export const defaultInitState: FilesState = {
  files: [],
}

export const createFilesStore = (initState: FilesState = defaultInitState) => {
  return createStore<FilesStore>()(set => ({
    ...initState,
    setFiles: (files: File[]) => set(() => ({ files: files })),
  }))
}
