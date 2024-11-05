'use client'

import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import useTotalSize from '@/lib/hooks/use-total-size'
import { useShareTimePopUpStore } from '@/components/store-provider/share-time-pop-up-provider'
import { useDisableUploadStore } from '@/components/store-provider/disable-upload-provider'

export default function OpenShareTimeModalButton() {
  const totalSize = useTotalSize()
  const disabled = useDisableUploadStore(store => store.disableUpload)
  const { setShareTimePopUp } = useShareTimePopUpStore(store => store)

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
