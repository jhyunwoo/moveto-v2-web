import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface ShareTimePopUpState {
  shareTimePopUp: boolean
}

interface ShareTimePopUpAction {
  setShareTimePopUp: (shareTimePopUp: boolean) => void
}

export const useShareTimePopUp = create(
  devtools<ShareTimePopUpState & ShareTimePopUpAction>(set => ({
    shareTimePopUp: false,
    setShareTimePopUp: (shareTimePopUp: boolean) => set({ shareTimePopUp: shareTimePopUp }),
  }))
)
