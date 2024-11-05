'use client'

import { createContext, ReactNode, useContext, useRef } from 'react'
import { useStore } from 'zustand'
import { createDisableUploadStore, DisableUploadStore } from '@/lib/stores/disable-upload-store'

export type DisableUploadApi = ReturnType<typeof createDisableUploadStore>

export const DisableUploadStoreContext = createContext<DisableUploadApi | undefined>(undefined)

export interface DisableUploadStoreProviderProps {
  children: ReactNode
}

export const DisableUploadStoreProvider = ({ children }: DisableUploadStoreProviderProps) => {
  const storeRef = useRef<DisableUploadApi>()
  if (!storeRef.current) {
    storeRef.current = createDisableUploadStore()
  }
  return <DisableUploadStoreContext.Provider value={storeRef.current}>{children}</DisableUploadStoreContext.Provider>
}

export const useDisableUploadStore = <T,>(selector: (store: DisableUploadStore) => T): T => {
  const disableUploadStoreContext = useContext(DisableUploadStoreContext)
  if (!disableUploadStoreContext) {
    throw new Error('useDisableUploadStore must be used within DisableUploadStoreProvider')
  }
  return useStore(disableUploadStoreContext, selector)
}
