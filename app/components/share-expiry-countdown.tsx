'use client'

import { ClockIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

const SECOND = 1000
const MINUTE = 60 * SECOND
const URGENT_THRESHOLD = 5 * MINUTE

export function formatRemainingTime(remainingMs: number) {
  const totalSeconds = Math.max(0, Math.ceil(remainingMs / SECOND))
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  if (hours > 0) return `${hours}시간 ${minutes}분 ${seconds}초`
  if (minutes > 0) return `${minutes}분 ${seconds}초`
  if (seconds > 0) return `${seconds}초`
  return '만료됨'
}

export default function ShareExpiryCountdown({ expiresAt, serverNow }: { expiresAt: number; serverNow: number }) {
  const initialRemaining = Math.max(0, expiresAt - serverNow)
  const [remainingMs, setRemainingMs] = useState(initialRemaining)

  useEffect(() => {
    const startedAt = performance.now()
    const updateRemaining = () => {
      const elapsed = performance.now() - startedAt
      setRemainingMs(Math.max(0, initialRemaining - elapsed))
    }

    const intervalId = window.setInterval(updateRemaining, SECOND)
    return () => window.clearInterval(intervalId)
  }, [initialRemaining])

  const label = formatRemainingTime(remainingMs)
  const isUrgent = remainingMs <= URGENT_THRESHOLD

  return (
    <div
      className={`share-expiry ${isUrgent ? 'share-expiry--urgent' : ''}`}
      role="timer"
      aria-label={remainingMs > 0 ? `파일 만료까지 ${label} 남음` : '파일 공유가 만료되었습니다'}
    >
      <ClockIcon className="size-4" aria-hidden="true" />
      <span className="share-expiry__label">파일 만료까지</span>
      <time className="share-expiry__time" dateTime={new Date(expiresAt).toISOString()}>
        {label}
      </time>
    </div>
  )
}
