import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ShareExpiryCountdown, { formatRemainingTime } from '@/app/components/share-expiry-countdown'

describe('ShareExpiryCountdown', () => {
  it('formats the remaining time at useful levels of detail', () => {
    expect(formatRemainingTime(3_661_000)).toBe('1시간 1분 1초')
    expect(formatRemainingTime(61_000)).toBe('1분 1초')
    expect(formatRemainingTime(1_000)).toBe('1초')
    expect(formatRemainingTime(0)).toBe('만료됨')
  })

  it('renders the server-derived remaining time without waiting for an effect', () => {
    render(<ShareExpiryCountdown expiresAt={361_000} serverNow={0} />)

    expect(screen.getByRole('timer')).toHaveTextContent(/파일 만료까지.*6분 1초/)
  })

  it('uses the urgent treatment during the final five minutes', () => {
    render(<ShareExpiryCountdown expiresAt={300_000} serverNow={0} />)

    expect(screen.getByRole('timer')).toHaveClass('share-expiry--urgent')
  })

  it('keeps the warning treatment after the share expires', () => {
    render(<ShareExpiryCountdown expiresAt={0} serverNow={0} />)

    expect(screen.getByRole('timer')).toHaveTextContent('만료됨')
    expect(screen.getByRole('timer')).toHaveClass('share-expiry--urgent')
  })
})
