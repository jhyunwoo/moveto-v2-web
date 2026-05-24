import { describe, expect, it } from 'vitest'
import getUserLimit from '@/lib/get-user-limit'

describe('getUserLimit', () => {
  it('returns the Free plan limits', () => {
    expect(getUserLimit('Free')).toEqual({
      time: 30,
      storage: 10000000000,
    })
  })

  it('returns the Pro plan limits', () => {
    expect(getUserLimit('Pro')).toEqual({
      time: 1440,
      storage: 1000000000000,
    })
  })

  it('falls back to unauthorized limits', () => {
    expect(getUserLimit(undefined)).toEqual({
      time: 10,
      storage: 1000000000,
    })
  })
})
