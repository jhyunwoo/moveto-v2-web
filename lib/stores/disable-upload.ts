import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface DisableUploadState {
  disableUpload: boolean
}

interface DisableUploadAction {
  setDisableUpload(disableUpload: boolean): void
}

export const useDisableUpload = create(
  devtools<DisableUploadState & DisableUploadAction>(set => ({
    disableUpload: false,
    setDisableUpload: (disableUpload: boolean) => set({ disableUpload: disableUpload }),
  }))
)
