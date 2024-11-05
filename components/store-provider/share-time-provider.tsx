'use client'

import { createContext, ReactNode, useContext, useRef } from 'react'
import { useStore } from 'zustand'
import { createShareTimeStore, ShareTimeStore } from '@/lib/stores/share-time-store'

export type ShareTimeApi = ReturnType<typeof createShareTimeStore>

export const ShareTimeStoreContext = createContext<ShareTimeApi | undefined>(undefined)

export interface ShareTimeStoreProviderProps {
  children: ReactNode
}

export const ShareTimeStoreProvider = ({ children }: ShareTimeStoreProviderProps) => {
  const storeRef = useRef<ShareTimeApi>()
  if (!storeRef.current) {
    storeRef.current = createShareTimeStore()
  }
  return <ShareTimeStoreContext.Provider value={storeRef.current}>{children}</ShareTimeStoreContext.Provider>
}

/** 파일 공유 시간 설정 State */
export const useShareTimeStore = <T,>(selector: (store: ShareTimeStore) => T): T => {
  const shareTimeStoreContext = useContext(ShareTimeStoreContext)
  if (!shareTimeStoreContext) {
    throw new Error('useShareTimeStore must be used within ShareTimeStoreProvider')
  }
  return useStore(shareTimeStoreContext, selector)
}
