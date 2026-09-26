'use client'

import { useSession } from '@/lib/auth-client'
import { useEffect } from 'react'
import FileUploadButton from '@/app/components/file-upload/file-upload-button'
import getShareTimeOptionsForPlan from '@/lib/get-share-time-options-for-plan'
import { useShareTime } from '@/lib/stores/share-time'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

export default function ShareTimePicker({ upload }: { upload: () => void }) {
  const { shareTime, setShareTime } = useShareTime(store => store)
  const session = useSession()
  const planShareTime = getShareTimeOptionsForPlan(session.data?.user.plan)

  useEffect(() => {
    if (!planShareTime.some(option => option.value === shareTime)) {
      setShareTime(planShareTime[0].value)
    }
  }, [planShareTime, setShareTime, shareTime])

  return (
    <>
      <div className="min-w-0">
        <label htmlFor="share-time" className="section-label mb-2 block">
          만료 시간
        </label>
        <div className="relative">
          <select
            id="share-time"
            className="field-control font-500 appearance-none pr-10 pl-3"
            value={shareTime || planShareTime[0].value}
            onChange={event => setShareTime(Number(event.target.value))}
          >
            {planShareTime.map(option => (
              <option key={option.value} value={option.value}>
                {option.text} 후 자동 삭제
              </option>
            ))}
          </select>
          <ChevronDownIcon className="text-text-muted pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2" />
        </div>
      </div>
      <div className="order-3 md:order-none md:col-start-3 md:row-start-1">
        <FileUploadButton upload={upload} />
      </div>
    </>
  )
}
