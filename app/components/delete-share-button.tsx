'use client'

import { TrashIcon } from '@heroicons/react/24/outline'
import ConfirmShareDelete from '@/app/components/confirm-share-delete'
import { useDeleteShare } from '@/lib/stores/delete-share'

export default function DeleteShareButton({ shareId }: { shareId: string }) {
  const setDeleteShare = useDeleteShare((store) => store.setDeleteShare)

  return (
    <>
      <ConfirmShareDelete redirect="/" />
      <button type="button" onClick={() => setDeleteShare(shareId)} className="btn-danger w-full cursor-pointer px-4 sm:w-auto">
        <TrashIcon className="size-[18px]" />
        공유 삭제
      </button>
    </>
  )
}
