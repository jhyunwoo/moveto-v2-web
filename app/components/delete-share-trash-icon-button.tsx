'use client'

import { TrashIcon } from '@heroicons/react/24/outline'
import { useDeleteShare } from '@/lib/stores/delete-share'

export default function DeleteShareTrashIconButton({ shareId }: { shareId: string }) {
  const setDeleteShare = useDeleteShare((store) => store.setDeleteShare)

  return (
    <button
      type="button"
      onClick={() => setDeleteShare(shareId)}
      className="icon-button size-8 cursor-pointer text-danger hover:border-danger/30 hover:bg-danger/5 hover:text-danger"
      aria-label="공유 삭제"
      title="공유 삭제"
    >
      <TrashIcon className="size-[18px]" />
    </button>
  )
}
