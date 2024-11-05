import { createStore } from 'zustand'

export type ShareTimeState = {
  shareTime: number
}

export type ShareTimeAction = {
  setShareTime: (shareTime: number) => void
}

export type ShareTimeStore = ShareTimeState & ShareTimeAction

export const defaultInitState: ShareTimeState = {
  shareTime: 0,
}

export const createShareTimeStore = (initState: ShareTimeState = defaultInitState) => {
  return createStore<ShareTimeStore>()(set => ({
    ...initState,
    setShareTime: (shareTime: number) => set(() => ({ shareTime: shareTime })),
  }))
}
