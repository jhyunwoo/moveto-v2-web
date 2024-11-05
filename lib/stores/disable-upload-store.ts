import { createStore } from 'zustand'

export type DisableUploadState = {
  disableUpload: boolean
}

export type DisableUploadActions = {
  setDisableUpload: (disableUpload: boolean) => void
}

export type DisableUploadStore = DisableUploadState & DisableUploadActions

export const defaultInitState: DisableUploadState = {
  disableUpload: false,
}

export const createDisableUploadStore = (initState: DisableUploadState = defaultInitState) => {
  return createStore<DisableUploadStore>()(set => ({
    ...initState,
    setDisableUpload: (disableUpload: boolean) => set(() => ({ disableUpload: disableUpload })),
  }))
}
