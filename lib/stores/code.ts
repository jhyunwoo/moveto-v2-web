import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface CodeState {
  code: string
}

interface CodeAction {
  setCode(code: string): void
}

export const useCode = create(
  devtools<CodeState & CodeAction>(set => ({
    code: '',
    setCode: (code: string) => set({ code: code }),
  }))
)
