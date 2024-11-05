import { create } from 'zustand'

interface FilesState {
  files: File[]
}

interface FilesActions {
  setFiles: (files: File[]) => void
  addFiles: (files: File[]) => void
  deleteFile: (index: number) => void
}

export const useFiles = create<FilesState & FilesActions>(set => ({
  files: [],
  setFiles: (files: File[]) => set(() => ({ files: files })),
  addFiles: (files: File[]) => set(state => ({ files: [...state.files, ...files] })),
  deleteFile: (index: number) =>
    set(state => {
      let copiedFiles = [...state.files]
      copiedFiles.splice(index, 1)
      return { files: copiedFiles }
    }),
}))
