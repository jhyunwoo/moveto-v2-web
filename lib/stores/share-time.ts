import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface ShareTimeState {
  shareTime: number
}

interface ShareTimeAction {
  setShareTime: (shareTime: number) => void
}

export const useShareTime = create(
  devtools<ShareTimeState & ShareTimeAction>(set => ({
    shareTime: 0,
    setShareTime: (shareTime: number) => set(() => ({ shareTime: shareTime })),
  }))
)
