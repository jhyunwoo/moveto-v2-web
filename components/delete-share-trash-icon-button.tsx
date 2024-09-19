'use client'

import { TrashIcon } from '@heroicons/react/24/outline'
import { deleteShareState } from '@/lib/client/recoil'
import { useSetRecoilState } from 'recoil'

export default function DeleteShareTrashIconButton({ shareId }: { shareId: string }) {
  const setDeleteShare = useSetRecoilState(deleteShareState)

  return (
    <button type={'button'} onClick={() => setDeleteShare(shareId)}>
      <TrashIcon className={'size-5 text-red-500'} />
    </button>
  )
}
