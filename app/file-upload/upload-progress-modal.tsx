'use client'

import { useRecoilValue } from 'recoil'
import { fileUploadProgressState, uploadProgressState } from '@/lib/client/recoil'
import { motion } from 'framer-motion'

export default function UploadProgressModal() {
  const progress = useRecoilValue(fileUploadProgressState)
  const totalProgress = useRecoilValue(uploadProgressState)

  if (progress.length > 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={
          'fixed left-0 top-0 z-10 flex h-screen w-screen flex-col items-center justify-center bg-neutral-950/50 p-4 backdrop-blur-sm'
        }
      >
        <div className={'flex max-h-[70vh] w-full max-w-xl flex-col rounded-xl bg-neutral-900 p-4'}>
          <div className={'pb-4 text-xl font-semibold'}>
            {progress.length === 0 ? '파일 업로드 준비중...' : '파일 업로드 중...'}
          </div>

          <div className={'overflow-auto overflow-x-hidden'}>
            {progress?.map(data => (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={data.name} className={'flex flex-col'}>
                <div className={'break-all'}>{data.name}</div>
                {data.progress === 0 ? (
                  <div className={'h-4 w-full animate-pulse rounded-full bg-neutral-500'} />
                ) : (
                  <div className={'relative h-4 w-full rounded-full bg-neutral-800'}>
                    <motion.div
                      className={`absolute left-0 top-0 h-4 rounded-full bg-sky-500`}
                      animate={{ width: `${data.progress}%` }}
                    />
                  </div>
                )}
                <div className={'ml-auto text-sm'}>{data.progress}%</div>
              </motion.div>
            ))}
          </div>
          <div className={'ml-auto pt-4 text-lg font-semibold text-white'}>
            {totalProgress !== 100 ? `${totalProgress}%` : '접근 코드 생성중...'}
          </div>
        </div>
      </motion.div>
    )
  } else {
    return <></>
  }
}
