import { createStore } from 'zustand'

export type CodeState = {
  code: string
}

export type CodeActions = {
  setCode: (code: string) => void
}

export type CodeStore = CodeState & CodeActions

export const defaultInitState: CodeState = {
  code: '',
}

export const createCodeStore = (initState: CodeState = defaultInitState) => {
  return createStore<CodeStore>()(set => ({
    ...initState,
    setCode: (code: string) => set(() => ({ code: code })),
  }))
}
