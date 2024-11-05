'use client'

import { createFilesStore, FilesStore } from '@/lib/stores/files-store'
import { createContext, ReactNode, useContext, useRef } from 'react'
import { useStore } from 'zustand'

export type FilesStoreApi = ReturnType<typeof createFilesStore>

export const FilesStoreContext = createContext<FilesStoreApi | undefined>(undefined)

export interface FilesStoreProviderProps {
  children: ReactNode
}

export const FilesStoreProvider = ({ children }: FilesStoreProviderProps) => {
  const storeRef = useRef<FilesStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createFilesStore()
  }
  return <FilesStoreContext.Provider value={storeRef.current}>{children}</FilesStoreContext.Provider>
}

/** 업로드 하는 파일 리스트 State*/
export const useFilesStore = <T,>(selector: (store: FilesStore) => T): T => {
  const filesStoreContext = useContext(FilesStoreContext)
  if (!filesStoreContext) {
    throw new Error('useFilesStore must be used within FilesStoreProvider')
  }
  return useStore(filesStoreContext, selector)
}
