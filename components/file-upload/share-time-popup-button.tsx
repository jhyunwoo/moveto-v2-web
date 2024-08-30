'use client'

import { useRecoilState, useRecoilValue } from 'recoil'
import { totalFileSizeState, shareTimePopUpState, disableUploadState } from '@/lib/recoil'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import ShareTimeController from '@/components/file-upload/share-time-controller'

export default function ShareTimePopupButton({ uploadFunc }: { uploadFunc: () => void }) {
  const totalSize = useRecoilValue(totalFileSizeState)
  const disabled = useRecoilValue(disableUploadState)
  const [shareTimePopUp, setShareTimePopUp] = useRecoilState(shareTimePopUpState)

  if (totalSize > 0) {
    return (
      <>
        {shareTimePopUp && <ShareTimeController uploadFunc={uploadFunc} />}
        <button
          type={'button'}
          disabled={disabled}
          onClick={() => setShareTimePopUp(true)}
          className={
            'p-1 rounded-lg bg-white text-black group text-lg font-semibold flex items-center justify-center hover:bg-neutral-300 transition-colors disabled:bg-red-800 disabled:text-white'
          }
        >
          {!disabled ? (
            <div className={'flex items-center justify-center gap-1'}>
              <div>공유...</div>
            </div>
          ) : (
            <div className={'flex items-center justify-center gap-1'}>
              <ExclamationTriangleIcon className={'size-6'} />
              <div>저장공간 부족</div>
            </div>
          )}
        </button>
      </>
    )
  } else {
    return <></>
  }
}
