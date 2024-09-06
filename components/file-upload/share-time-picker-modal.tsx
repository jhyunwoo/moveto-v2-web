'use client'

import { useRecoilState, useSetRecoilState } from 'recoil'
import { shareTimeState, shareTimePopUpState } from '@/lib/client/recoil'
import { XCircleIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import FileUploadButton from '@/components/file-upload/file-upload-button'
import { motion } from 'framer-motion'

interface PlanShareTimeType {
  value: number
  text: string
}

const planShareTime = {
  Free: [
    { value: 5, text: '5분' },
    { value: 10, text: '10분' },
    { value: 20, text: '20분' },
    { value: 30, text: '30분' },
  ],
  Basic: [
    { value: 5, text: '5분' },
    { value: 10, text: '10분' },
    { value: 20, text: '20분' },
    { value: 30, text: '30분' },
    { value: 60, text: '1시간' },
    { value: 180, text: '3시간' },
    { value: 360, text: '6시간' },
    { value: 720, text: '12시간' },
  ],
  Pro: [
    { value: 5, text: '5분' },
    { value: 10, text: '10분' },
    { value: 20, text: '20분' },
    { value: 30, text: '30분' },
    { value: 60, text: '1시간' },
    { value: 180, text: '3시간' },
    { value: 360, text: '6시간' },
    { value: 720, text: '12시간' },
    { value: 1440, text: '1일' },
  ],
  Unauthorized: [
    { value: 5, text: '5분' },
    { value: 10, text: '10분' },
  ],
}

function shareTimeOption(userPlan: string | null | undefined) {
  switch (userPlan) {
    case 'Free':
      return planShareTime.Free
    case 'Basic':
      return planShareTime.Basic
    case 'Pro':
      return planShareTime.Pro
    default:
      return planShareTime.Unauthorized
  }
}

export default function ShareTimePickerModal({ uploadFunc }: { uploadFunc: () => void }) {
  const setShareTimePopUp = useSetRecoilState(shareTimePopUpState)
  const [shareTime, setShareTime] = useRecoilState(shareTimeState)
  const [planShareTime, setPlanShareTimes] = useState<PlanShareTimeType[]>([])
  const session = useSession()

  useEffect(() => {
    setPlanShareTimes(shareTimeOption(session.data?.user.plan))
  }, [session.data?.user.plan])

  useEffect(() => {
    setShareTime(planShareTime[0]?.value)
  }, [planShareTime, setShareTime])

  return (
    <motion.div
      className={
        'fixed left-0 top-0 z-10 flex h-screen w-full flex-col items-center justify-center bg-neutral-950/90 p-4 backdrop-blur-sm'
      }
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.1,
      }}
    >
      <div className={'relative flex w-full max-w-3xl flex-col rounded-xl bg-neutral-900 p-4'}>
        <button onClick={() => setShareTimePopUp(false)} className={'absolute right-2 top-2'}>
          <XCircleIcon className={'size-8 text-white'} />
        </button>
        <div className={'py-2 text-2xl font-semibold'}>공유 시간</div>
        <div className={'grid grid-cols-3 grid-rows-3 gap-2'}>
          {planShareTime.map(data => (
            <button
              onClick={() => setShareTime(data.value)}
              key={data.text}
              className={`rounded-lg p-3 ${shareTime === data.value ? 'bg-neutral-100 text-black' : 'bg-neutral-800 text-neutral-50'} flex items-center justify-center transition-colors`}
            >
              <div>{data.text}</div>
            </button>
          ))}
        </div>
        <FileUploadButton uploadFunc={uploadFunc} />
      </div>
    </motion.div>
  )
}
