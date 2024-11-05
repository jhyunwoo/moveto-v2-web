import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface DeleteShareState {
  deleteShare: string
}

interface DeleteShareAction {
  setDeleteShare(deleteShare: string): void
}

export const useDeleteShare = create(
  devtools<DeleteShareState & DeleteShareAction>(set => ({
    deleteShare: '',
    setDeleteShare: (deleteShare: string) => set(() => ({ deleteShare: deleteShare })),
  }))
)
