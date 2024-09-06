'use client'

import { TrashIcon } from '@heroicons/react/24/outline'
import ConfirmShareDelete from '@/components/confirm-share-delete'
import { useSetRecoilState } from 'recoil'
import { deleteShareState } from '@/lib/client/recoil'

export default function DeleteShareButton({ code }: { code: string }) {
  const setDeleteShare = useSetRecoilState(deleteShareState)
  return (
    <>
      <ConfirmShareDelete redirect={'/'} />
      <button
        onClick={() => setDeleteShare(code)}
        className={'flex items-center gap-1 rounded-full border-2 border-red-600 bg-neutral-900 p-3 px-4 text-red-600'}
      >
        <TrashIcon className={'size-6'} />
        <div className={'text-lg font-semibold'}>삭제...</div>
      </button>
    </>
  )
}
