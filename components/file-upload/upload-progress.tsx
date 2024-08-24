'use client'

import { useRecoilValue } from 'recoil'
import { uploadProgressState } from '@/lib/recoil'

export default function UploadProgress() {
  const progress = useRecoilValue(uploadProgressState)
  return (
    <div
      className={
        'fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center bg-neutral-950/50 p-4 z-10'
      }
    >
      <div className={'w-full max-w-xl p-4 rounded-xl bg-neutral-900 flex flex-col'}>
        <div>파일 업로드 중...</div>
        <div className={'text-white ml-auto text-lg font-semibold'}>{progress}%</div>
      </div>
    </div>
  )
}
