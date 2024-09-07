'use client'

import { useRecoilValue, useSetRecoilState } from 'recoil'
import { totalFileSizeState, shareTimePopUpState, disableUploadState } from '@/lib/client/recoil'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function OpenShareTimeModalButton() {
  const totalSize = useRecoilValue(totalFileSizeState)
  const disabled = useRecoilValue(disableUploadState)
  const setShareTimePopUp = useSetRecoilState(shareTimePopUpState)

  if (totalSize > 0) {
    return (
      <button
        type={'button'}
        disabled={disabled}
        onClick={() => setShareTimePopUp(true)}
        className={
          'group flex items-center justify-center gap-1 rounded-lg bg-white p-1 text-lg font-semibold text-black transition-colors hover:bg-neutral-300 disabled:bg-red-800 disabled:text-white'
        }
      >
        {!disabled ? (
          <div>공유...</div>
        ) : (
          <>
            <ExclamationTriangleIcon className={'size-6'} />
            <div>저장공간 부족</div>
          </>
        )}
      </button>
    )
  } else {
    return <></>
  }
}
