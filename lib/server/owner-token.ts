import crypto from 'crypto'

const SECRET =
  process.env.BETTER_AUTH_SECRET ??
  process.env.AUTH_SECRET ??
  'moveto-owner-token-secret-fallback-key-32chars'

/**
 * 익명 공유 소유자를 식별하기 위한 HMAC 기반 보안 토큰을 생성합니다.
 */
export function generateOwnerToken(shareId: string): string {
  return crypto.createHmac('sha256', SECRET).update(shareId).digest('hex')
}

/**
 * 전달받은 토큰이 해당 shareId의 올바른 HMAC 소유자 토큰인지 검증합니다.
 * 타이밍 공격(Timing Attack)을 방지하기 위해 timingSafeEqual을 사용합니다.
 */
export function verifyOwnerToken(shareId: string, token?: string | null): boolean {
  if (!token || typeof token !== 'string') return false
  const expectedToken = generateOwnerToken(shareId)

  const tokenBuffer = Buffer.from(token)
  const expectedBuffer = Buffer.from(expectedToken)

  if (tokenBuffer.length !== expectedBuffer.length) return false
  return crypto.timingSafeEqual(tokenBuffer, expectedBuffer)
}
