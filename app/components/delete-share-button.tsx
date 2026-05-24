'use client'

import { TrashIcon } from '@heroicons/react/24/outline'
import ConfirmShareDelete from '@/app/components/confirm-share-delete'
import { useDeleteShare } from '@/lib/stores/delete-share'

export default function DeleteShareButton({ shareId }: { shareId: string }) {
  const setDeleteShare = useDeleteShare((store) => store.setDeleteShare)
  return (
    <>
      <ConfirmShareDelete redirect="/" />
      <button
        onClick={() => setDeleteShare(shareId)}
        className="modern-card flex cursor-pointer items-center gap-1.5 rounded-xl border-2 border-danger px-4 py-3 font-display font-600 text-danger transition-colors hover:bg-danger hover:text-white"
      >
        <TrashIcon className="size-6" />
        <div className="text-lg font-700">삭제...</div>
      </button>
    </>
  )
}
