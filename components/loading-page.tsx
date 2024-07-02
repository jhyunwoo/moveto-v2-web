'use client'

import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import { useRecoilValue } from 'recoil'
import { loadingState } from '@/lib/recoil'

export default function LoadingPage() {
  const loading = useRecoilValue(loadingState)
  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen z-20 bg-black/50 flex items-center justify-center transition ${loading ? '' : 'hidden'}`}
    >
      <div className={'flex flex-col items-center justify-center'}>
        <Cog6ToothIcon className={'size-14 animate-spin text-gray-200'} />
        <div className={'text-white'}>{loading}</div>
      </div>
    </div>
  )
}
