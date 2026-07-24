import { describe, expect, it } from 'vitest'
import { generateOwnerToken, verifyOwnerToken } from '@/lib/server/owner-token'

describe('owner-token security module', () => {
  it('generates a valid HMAC token for a shareId', () => {
    const shareId = 'test-share-123'
    const token = generateOwnerToken(shareId)

    expect(typeof token).toBe('string')
    expect(token.length).toBe(64) // SHA-256 hex string length
  })

  it('verifies a valid token', () => {
    const shareId = 'test-share-123'
    const token = generateOwnerToken(shareId)

    expect(verifyOwnerToken(shareId, token)).toBe(true)
  })

  it('rejects an invalid token or forged token', () => {
    const shareId = 'test-share-123'
    const forgedToken = 'true'
    const wrongToken = generateOwnerToken('different-share-id')

    expect(verifyOwnerToken(shareId, forgedToken)).toBe(false)
    expect(verifyOwnerToken(shareId, wrongToken)).toBe(false)
    expect(verifyOwnerToken(shareId, '')).toBe(false)
    expect(verifyOwnerToken(shareId, null)).toBe(false)
    expect(verifyOwnerToken(shareId, undefined)).toBe(false)
  })
})
