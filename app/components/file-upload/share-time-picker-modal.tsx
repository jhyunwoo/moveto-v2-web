'use client'

import { useSession } from '@/lib/auth-client'
import { useEffect } from 'react'
import FileUploadButton from '@/app/components/file-upload/file-upload-button'
import getShareTimeOptionsForPlan from '@/lib/get-share-time-options-for-plan'
import { useShareTime } from '@/lib/stores/share-time'
import { ClockIcon } from '@heroicons/react/24/outline'

export default function ShareTimePicker({ upload }: { upload: () => void }) {
  const { shareTime, setShareTime } = useShareTime((store) => store)
  const session = useSession()
  const planShareTime = getShareTimeOptionsForPlan(session.data?.user.plan)

  useEffect(() => {
    if (!planShareTime.some((option) => option.value === shareTime)) {
      setShareTime(planShareTime[0].value)
    }
  }, [planShareTime, setShareTime, shareTime])

  return (
    <>
      <div>
        <label htmlFor="share-time" className="section-label mb-2 block">
          만료 시간
        </label>
        <div className="relative">
          <ClockIcon className="pointer-events-none absolute left-3 top-1/2 size-[18px] -translate-y-1/2 text-text-muted" />
          <select
            id="share-time"
            className="field-control appearance-none px-10"
            value={shareTime || planShareTime[0].value}
            onChange={(event) => setShareTime(Number(event.target.value))}
          >
            {planShareTime.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text} 후 자동 삭제
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-muted">⌄</span>
        </div>
      </div>
      <div className="order-3 md:order-none md:col-start-3">
        <FileUploadButton upload={upload} />
      </div>
    </>
  )
}
