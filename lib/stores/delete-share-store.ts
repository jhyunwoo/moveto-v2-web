import { createStore } from 'zustand'

export type DeleteShareState = {
  deleteShare: string
}

export type DeleteShareActions = {
  setDeleteShare: (deleteShare: string) => void
}

export type DeleteShareStore = DeleteShareState & DeleteShareActions

export const defaultInitState: DeleteShareState = {
  deleteShare: '',
}

export const createDeleteShareStore = (initState: DeleteShareState = defaultInitState) => {
  return createStore<DeleteShareStore>()(set => ({
    ...initState,
    setDeleteShare: (deleteShare: string) => set(() => ({ deleteShare: deleteShare })),
  }))
}
