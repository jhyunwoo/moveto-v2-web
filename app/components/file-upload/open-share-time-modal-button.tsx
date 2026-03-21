'use client'

import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import useTotalSize from '@/lib/hooks/use-total-size'
import { useDisableUpload } from '@/lib/stores/disable-upload'
import { useShareTimePopUp } from '@/lib/stores/share-time-pop-up'

export default function OpenShareTimeModalButton() {
  const totalSize = useTotalSize()
  const disabled = useDisableUpload((store) => store.disableUpload)
  const { setShareTimePopUp } = useShareTimePopUp((store) => store)

  if (totalSize > 0) {
    return (
      <button
        type="button"
        disabled={disabled}
        onClick={() => setShareTimePopUp(true)}
        className="group flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl border-2 border-accent bg-accent p-2 font-display text-lg font-700 text-white transition-colors hover:bg-accent-hover hover:border-accent-hover disabled:cursor-not-allowed disabled:border-danger disabled:bg-danger disabled:text-white"
      >
        {!disabled ? (
          <div>공유...</div>
        ) : (
          <>
            <ExclamationTriangleIcon className="size-6" />
            <div>저장공간 부족</div>
          </>
        )}
      </button>
    )
  } else {
    return null
  }
}
