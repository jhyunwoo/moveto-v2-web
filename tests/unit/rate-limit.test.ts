import { describe, expect, it } from 'vitest'
import { checkRateLimit } from '@/lib/server/rate-limit'

describe('rate-limit module', () => {
  it('allows requests within the limit', () => {
    const id = `test_ip_${Date.now()}`
    const result1 = checkRateLimit(id, 3, 1000)
    expect(result1.success).toBe(true)
    expect(result1.remaining).toBe(2)

    const result2 = checkRateLimit(id, 3, 1000)
    expect(result2.success).toBe(true)
    expect(result2.remaining).toBe(1)

    const result3 = checkRateLimit(id, 3, 1000)
    expect(result3.success).toBe(true)
    expect(result3.remaining).toBe(0)
  })

  it('blocks requests exceeding the limit', () => {
    const id = `test_ip_exceed_${Date.now()}`
    checkRateLimit(id, 2, 1000)
    checkRateLimit(id, 2, 1000)

    const blockedResult = checkRateLimit(id, 2, 1000)
    expect(blockedResult.success).toBe(false)
    expect(blockedResult.remaining).toBe(0)
  })
})
