'use client'

import { TrashIcon } from '@heroicons/react/24/outline'
import { useDeleteShare } from '@/lib/stores/delete-share'

export default function DeleteShareTrashIconButton({ shareId }: { shareId: string }) {
  const setDeleteShare = useDeleteShare((store) => store.setDeleteShare)

  return (
    <button
      type="button"
      onClick={() => setDeleteShare(shareId)}
      className="cursor-pointer rounded-lg p-1 text-danger transition-colors hover:bg-danger hover:text-white"
    >
      <TrashIcon className="size-5" />
    </button>
  )
}
