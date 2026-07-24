type RateLimitRecord = {
  count: number
  resetTime: number
}

const store = new Map<string, RateLimitRecord>()

/**
 * 간단한 슬라이딩 윈도우 / 토큰 기반 메모리 레이트 리미터
 */
export function checkRateLimit(
  identifier: string,
  limit: number = 20,
  windowMs: number = 60000
): { success: boolean; remaining: number } {
  const now = Date.now()
  const record = store.get(identifier)

  // 만료된 레코드 정리
  if (record && now > record.resetTime) {
    store.delete(identifier)
  }

  const currentRecord = store.get(identifier)

  if (!currentRecord) {
    store.set(identifier, { count: 1, resetTime: now + windowMs })
    return { success: true, remaining: limit - 1 }
  }

  if (currentRecord.count >= limit) {
    return { success: false, remaining: 0 }
  }

  currentRecord.count += 1
  return { success: true, remaining: limit - currentRecord.count }
}
