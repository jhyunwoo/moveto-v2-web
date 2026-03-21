import { describe, expect, it } from 'vitest'
import getShareTimeOptionsForPlan from '@/lib/get-share-time-options-for-plan'

describe('getShareTimeOptionsForPlan', () => {
  it('returns the expected options for Basic users', () => {
    expect(getShareTimeOptionsForPlan('Basic')).toEqual([
      { value: 5, text: '5분' },
      { value: 10, text: '10분' },
      { value: 20, text: '20분' },
      { value: 30, text: '30분' },
      { value: 60, text: '1시간' },
      { value: 180, text: '3시간' },
      { value: 360, text: '6시간' },
      { value: 720, text: '12시간' },
    ])
  })

  it('falls back to unauthorized options', () => {
    expect(getShareTimeOptionsForPlan(null)).toEqual([
      { value: 5, text: '5분' },
      { value: 10, text: '10분' },
    ])
  })
})
