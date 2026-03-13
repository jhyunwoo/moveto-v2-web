import { describe, expect, it } from 'vitest'
import decodeURIShareCode from '@/lib/decode-uri-share-code'

describe('decodeURIShareCode', () => {
  it('decodes encoded Korean text and restores spaces', () => {
    expect(decodeURIShareCode('%EB%AA%A8%EB%B2%A0%ED%86%A0_%ED%85%8C%EC%8A%A4%ED%8A%B8')).toBe('모베토 테스트')
  })

  it('leaves plain text untouched apart from underscores', () => {
    expect(decodeURIShareCode('hello_world')).toBe('hello world')
  })
})
