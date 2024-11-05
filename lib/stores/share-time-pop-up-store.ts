import { createStore } from 'zustand'

export type ShareTimePopUpState = {
  shareTimePopUp: boolean
}

export type ShareTimePopUpActions = {
  setShareTimePopUp: (shareTimePopUp: boolean) => void
}

export type ShareTimePopUpStore = ShareTimePopUpState & ShareTimePopUpActions

export const defaultInitState: ShareTimePopUpState = {
  shareTimePopUp: false,
}

export const createShareTimePopUpStore = (initState: ShareTimePopUpState = defaultInitState) => {
  return createStore<ShareTimePopUpStore>()(set => ({
    ...initState,
    setShareTimePopUp: (shareTimePopUp: boolean) => set(() => ({ shareTimePopUp: shareTimePopUp })),
  }))
}
