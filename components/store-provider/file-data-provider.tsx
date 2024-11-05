'use client'

import { createContext, ReactNode, useContext, useRef } from 'react'
import { useStore } from 'zustand'
import { createFileDataStore, FileDataStore } from '@/lib/stores/file-data-store'

export type FileDataStoreApi = ReturnType<typeof createFileDataStore>

export const FileDataStoreContext = createContext<FileDataStoreApi | undefined>(undefined)

export interface FileDataStoreProviderProps {
  children: ReactNode
}

export const FileDataStoreProvider = ({ children }: FileDataStoreProviderProps) => {
  const storeRef = useRef<FileDataStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createFileDataStore()
  }
  return <FileDataStoreContext.Provider value={storeRef.current}>{children}</FileDataStoreContext.Provider>
}

/**
 * 업로드 하는 파일 정보 리스트 State
 *
 * 파일 정보를 JSON.stringify를 사용해서 string으로 변환
 */
export const useFileDataStore = <T,>(selector: (store: FileDataStore) => T): T => {
  const filesStoreContext = useContext(FileDataStoreContext)
  if (!filesStoreContext) {
    throw new Error('useFileDataStore must be used within FileDataStoreProvider')
  }
  return useStore(filesStoreContext, selector)
}
