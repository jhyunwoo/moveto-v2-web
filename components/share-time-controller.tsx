'use client'

import { useRecoilState, useSetRecoilState } from 'recoil'
import { shareTimeState, uploadState } from '@/lib/recoil'
import { XCircleIcon } from '@heroicons/react/24/outline'

export default function ShareTimeController() {
  const [shareTime, setShareTime] = useRecoilState(shareTimeState)
  const setUploadState = useSetRecoilState(uploadState)
  return (
    <div
      className={
        'fixed top-0 left-0 w-full h-screen z-10 bg-neutral-900/80 flex flex-col items-center justify-center'
      }
    >
      <button onClick={() => setUploadState(false)}>
        <XCircleIcon className={'size-8 text-white'} />{' '}
      </button>
      <div>{shareTime}</div>
    </div>
  )
}
