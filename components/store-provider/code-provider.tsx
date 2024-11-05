'use client'

import { createContext, ReactNode, useContext, useRef } from 'react'
import { useStore } from 'zustand'
import { CodeStore, createCodeStore } from '@/lib/stores/code-store'

export type CodeStoreApi = ReturnType<typeof createCodeStore>

export const CodeStoreContext = createContext<CodeStoreApi | undefined>(undefined)

export interface CodeStoreProviderProps {
  children: ReactNode
}

export const CodeStoreProvider = ({ children }: CodeStoreProviderProps) => {
  const storeRef = useRef<CodeStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createCodeStore()
  }
  return <CodeStoreContext.Provider value={storeRef.current}>{children}</CodeStoreContext.Provider>
}

/** 파일 접속 코드 상태 */
export const useCodeStore = <T,>(selector: (store: CodeStore) => T): T => {
  const codeStoreContext = useContext(CodeStoreContext)
  if (!codeStoreContext) {
    throw new Error('useCodeStore must be used within CodeStoreProvider')
  }
  return useStore(codeStoreContext, selector)
}
