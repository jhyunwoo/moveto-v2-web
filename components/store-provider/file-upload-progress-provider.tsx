'use client'

import { createContext, ReactNode, useContext, useRef } from 'react'
import { useStore } from 'zustand'
import { createFileUploadProgressStore, FileUploadProgressStore } from '@/lib/stores/file-upload-progress-store'

export type FileUploadProgressStoreApi = ReturnType<typeof createFileUploadProgressStore>

export const FileUploadProgressStoreContext = createContext<FileUploadProgressStoreApi | undefined>(undefined)

export interface FileUploadProgressStoreProviderProps {
  children: ReactNode
}

export const FileUploadProgressStoreProvider = ({ children }: FileUploadProgressStoreProviderProps) => {
  const storeRef = useRef<FileUploadProgressStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createFileUploadProgressStore()
  }
  return (
    <FileUploadProgressStoreContext.Provider value={storeRef.current}>
      {children}
    </FileUploadProgressStoreContext.Provider>
  )
}

/** 업로드 하는 파일 리스트 State*/
export const useFileUploadProgressStore = <T,>(selector: (store: FileUploadProgressStore) => T): T => {
  const fileUploadProgressStoreContext = useContext(FileUploadProgressStoreContext)
  if (!fileUploadProgressStoreContext) {
    throw new Error('useFileUploadProgressStore must be used within FileUploadProgressStoreProvider')
  }
  return useStore(fileUploadProgressStoreContext, selector)
}
