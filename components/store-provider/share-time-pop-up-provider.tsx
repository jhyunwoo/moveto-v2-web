'use client'

import { createContext, ReactNode, useContext, useRef } from 'react'
import { useStore } from 'zustand'
import { createShareTimePopUpStore, ShareTimePopUpStore } from '@/lib/stores/share-time-pop-up-store'

export type ShareTimePopUpStoreApi = ReturnType<typeof createShareTimePopUpStore>

export const ShareTimePopUpStoreContext = createContext<ShareTimePopUpStoreApi | undefined>(undefined)

export interface ShareTimePopUpStoreProviderProps {
  children: ReactNode
}

export const ShareTimePopUpStoreProvider = ({ children }: ShareTimePopUpStoreProviderProps) => {
  const storeRef = useRef<ShareTimePopUpStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createShareTimePopUpStore()
  }
  return <ShareTimePopUpStoreContext.Provider value={storeRef.current}>{children}</ShareTimePopUpStoreContext.Provider>
}

/** 파일 공유 시간 설정 Pop Up State */
export const useShareTimePopUpStore = <T,>(selector: (store: ShareTimePopUpStore) => T): T => {
  const shareTimePopUpStoreContext = useContext(ShareTimePopUpStoreContext)
  if (!shareTimePopUpStoreContext) {
    throw new Error('useShareTimePopUpStore must be used within ShareTimePopUpStoreProvider')
  }
  return useStore(shareTimePopUpStoreContext, selector)
}
