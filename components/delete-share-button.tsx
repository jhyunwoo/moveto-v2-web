'use client'

import { TrashIcon } from '@heroicons/react/24/outline'
import ConfirmShareDelete from '@/components/confirm-share-delete'
import { useSetRecoilState } from 'recoil'
import { deleteShareState } from '@/lib/recoil'

export default function DeleteShareButton({ code }: { code: string }) {
  const setDeleteShare = useSetRecoilState(deleteShareState)
  return (
    <>
      <ConfirmShareDelete redirect={'/'} />
      <button
        onClick={() => setDeleteShare(code)}
        className={'border-2 border-red-600 bg-neutral-900 p-3 px-4 items-center rounded-full flex gap-1 text-red-600'}
      >
        <TrashIcon className={'size-6'} />
        <div className={'text-lg font-semibold'}>삭제...</div>
      </button>
    </>
  )
}
