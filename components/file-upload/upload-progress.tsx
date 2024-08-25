'use client'

import { useRecoilValue } from 'recoil'
import { uploadProgressState } from '@/lib/recoil'
import { motion } from 'framer-motion'

export default function UploadProgress() {
  const progress = useRecoilValue(uploadProgressState)
  return (
    <div
      className={
        'fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center bg-neutral-950/50 backdrop-blur-sm p-4 z-10'
      }
    >
      <div className={'w-full max-w-xl p-4 rounded-xl bg-neutral-900 flex flex-col'}>
        <div>{progress === 0 ? '파일 업로드 준비중...' : '파일 업로드 중...'}</div>
        {progress === 0 ? (
          <div className={'w-full h-4 bg-neutral-500 animate-pulse rounded-full'} />
        ) : (
          <div className={'w-full bg-neutral-800 h-4 rounded-full relative'}>
            <motion.div
              className={`absolute top-0 left-0 bg-sky-500 h-4 rounded-full`}
              animate={{ width: `${progress}%` }}
            />
          </div>
        )}
        <div className={'text-white ml-auto text-lg font-semibold'}>
          {progress !== 100 ? `${progress}%` : '접근 코드 생성중...'}
        </div>
      </div>
    </div>
  )
}
