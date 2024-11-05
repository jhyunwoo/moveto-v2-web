'use client'

import { createContext, ReactNode, useContext, useRef } from 'react'
import { useStore } from 'zustand'
import { createDeleteShareStore, DeleteShareStore } from '@/lib/stores/delete-share-store'

export type DeleteShareStoreApi = ReturnType<typeof createDeleteShareStore>

export const DeleteShareStoreContext = createContext<DeleteShareStoreApi | undefined>(undefined)

export interface DeleteShareStoreProviderProps {
  children: ReactNode
}

export const DeleteShareStoreProvider = ({ children }: DeleteShareStoreProviderProps) => {
  const storeRef = useRef<DeleteShareStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createDeleteShareStore()
  }
  return <DeleteShareStoreContext.Provider value={storeRef.current}>{children}</DeleteShareStoreContext.Provider>
}

export const useDeleteShareStore = <T,>(selector: (store: DeleteShareStore) => T): T => {
  const deleteShareStoreContext = useContext(DeleteShareStoreContext)
  if (!deleteShareStoreContext) {
    throw new Error('useDeleteShareStore must be used within DeleteShareStoreProvider')
  }
  return useStore(deleteShareStoreContext, selector)
}
