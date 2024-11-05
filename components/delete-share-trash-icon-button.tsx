'use client'

import { TrashIcon } from '@heroicons/react/24/outline'
import { useDeleteShareStore } from '@/components/store-provider/delete-share-provider'

export default function DeleteShareTrashIconButton({ shareId }: { shareId: string }) {
  const setDeleteShare = useDeleteShareStore(store => store.setDeleteShare)

  return (
    <button type={'button'} onClick={() => setDeleteShare(shareId)}>
      <TrashIcon className={'size-5 text-red-500'} />
    </button>
  )
}
