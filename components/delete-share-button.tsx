'use client'

import { TrashIcon } from '@heroicons/react/24/outline'
import ConfirmShareDelete from '@/components/confirm-share-delete'
import { DeleteShareStoreProvider, useDeleteShareStore } from '@/components/store-provider/delete-share-provider'

export default function DeleteShareButton({ shareId }: { shareId: string }) {
  const setDeleteShare = useDeleteShareStore(store => store.setDeleteShare)
  return (
    <>
      <DeleteShareStoreProvider>
        <ConfirmShareDelete redirect={'/'} />
      </DeleteShareStoreProvider>
      <button
        onClick={() => setDeleteShare(shareId)}
        className={'flex items-center gap-1 rounded-full border-2 border-red-600 bg-neutral-900 p-3 px-4 text-red-600'}
      >
        <TrashIcon className={'size-6'} />
        <div className={'text-lg font-semibold'}>삭제...</div>
      </button>
    </>
  )
}
