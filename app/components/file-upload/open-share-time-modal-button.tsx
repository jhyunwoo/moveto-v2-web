'use client'

import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import useTotalSize from '@/lib/hooks/use-total-size'
import { useDisableUpload } from '@/lib/stores/disable-upload'
import { useShareTimePopUp } from '@/lib/stores/share-time-pop-up'

export default function OpenShareTimeModalButton() {
  const totalSize = useTotalSize()
  const disabled = useDisableUpload(store => store.disableUpload)
  const { setShareTimePopUp } = useShareTimePopUp(store => store)

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
