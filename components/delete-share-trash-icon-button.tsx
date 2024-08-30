'use client'

import { TrashIcon } from '@heroicons/react/24/outline'
import { deleteShareState } from '@/lib/recoil'
import { useSetRecoilState } from 'recoil'

export default function DeleteShareTrashIconButton({ code }: { code: string }) {
  const setDeleteShare = useSetRecoilState(deleteShareState)

  return (
    <button type={'button'} onClick={() => setDeleteShare(code)}>
      <TrashIcon className={'size-5 text-red-500'} />
    </button>
  )
}
