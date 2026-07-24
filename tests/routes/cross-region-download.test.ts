// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from 'vitest'
import decodeKoCode from '@/lib/decode-uri-share-code'

const findFirstMock = vi.fn()
const insertMock = vi.fn(() => ({ values: vi.fn().mockResolvedValue(undefined) }))
const getSessionMock = vi.fn()
const getIpMock = vi.fn()
const getS3ClientMock = vi.fn()

vi.mock('@/auth', () => ({
  getSession: getSessionMock,
}))

vi.mock('@/db', () => ({
  default: {
    query: {
      share: {
        findFirst: findFirstMock,
      },
    },
    insert: insertMock,
  },
}))

vi.mock('@/db/schema', () => ({
  share: {
    code: 'code',
    expireAt: 'expireAt',
    active: 'active',
  },
  logs: {},
}))

vi.mock('@/lib/server/get-user-ip', () => ({
  default: getIpMock,
}))

vi.mock('@/lib/server/get-s3-client', () => ({
  default: getS3ClientMock,
}))

vi.mock('@aws-sdk/client-s3', () => ({
  GetObjectCommand: vi.fn(),
}))

vi.mock('@aws-sdk/s3-request-presigner', () => ({
  getSignedUrl: vi.fn().mockResolvedValue('https://r2.moveto.kr/sample-share-id/report.pdf?token=presigned123'),
}))

describe('Cross-Region & Anonymous/Logged-in File Sharing & Exception Handling', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    getS3ClientMock.mockReturnValue({})
  })

  it('[Scenario 1] US Anonymous upload -> Korea Anonymous download succeeds with Korean access code', async () => {
    const futureDate = new Date(Date.now() + 1000 * 60 * 30) // 30 minutes in future
    const activeShare = {
      id: 'share-us-anon-123',
      code: '신속한 사자',
      file: ['document.pdf'],
      storageSize: 1048576,
      expireAt: futureDate,
      createdAt: new Date(),
      userId: null, // Anonymous upload
      ip: '172.56.21.1', // US IP
      active: true,
    }

    findFirstMock.mockResolvedValue(activeShare)
    getIpMock.mockResolvedValue('211.200.1.1') // Korea IP
    getSessionMock.mockResolvedValue(null) // Anonymous recipient

    // 1. API Route check GET /api/share/code/[code]
    const { GET: getCodeApi } = await import('@/app/api/share/code/[code]/route')
    const apiResponse = await getCodeApi(new Request('http://localhost/api/share/code/신속한%20사자'), {
      params: Promise.resolve({ code: '신속한%20사자' }),
    })

    expect(apiResponse.status).toBe(200)
    const apiData = await apiResponse.json()
    expect(apiData.id).toBe('share-us-anon-123')
    expect(apiData.code).toBe('신속한 사자')

    // 2. Search Page rendering check
    const { default: SearchPage } = await import('@/app/search/[code]/page')
    const pageComponent = await SearchPage({ params: Promise.resolve({ code: '신속한_사자' }) })

    expect(pageComponent).toBeDefined()
    expect(findFirstMock).toHaveBeenCalled()
  })

  it('[Scenario 2] US Logged-in user upload -> Korea Anonymous download succeeds with Korean access code', async () => {
    const futureDate = new Date(Date.now() + 1000 * 60 * 60) // 1 hour in future
    const activeLoggedInShare = {
      id: 'share-us-user-456',
      code: '용감한 독수리',
      file: ['project_v2.zip'],
      storageSize: 5242880,
      expireAt: futureDate,
      createdAt: new Date(),
      userId: 'user-us-id-999', // Logged in user uploaded
      ip: '198.51.100.42', // US IP
      active: true,
    }

    findFirstMock.mockResolvedValue(activeLoggedInShare)
    getIpMock.mockResolvedValue('220.70.1.2') // Korea IP
    getSessionMock.mockResolvedValue(null) // Recipient is NOT logged in (anonymous)

    const { GET: getCodeApi } = await import('@/app/api/share/code/[code]/route')
    const apiResponse = await getCodeApi(new Request('http://localhost/api/share/code/용감한%20독수리'), {
      params: Promise.resolve({ code: '용감한%20독수리' }),
    })

    expect(apiResponse.status).toBe(200)
    const apiData = await apiResponse.json()
    expect(apiData.id).toBe('share-us-user-456')
    expect(apiData.userId).toBe('user-us-id-999')
  })

  it('[Scenario 3] Expired Korean code (expireAt < now) returns 404 Not Found', async () => {
    // When code is expired, findFirstMock returns undefined/null because of gte(share.expireAt, now) condition
    findFirstMock.mockResolvedValue(null)
    getIpMock.mockResolvedValue('211.200.1.1')

    const { GET: getCodeApi } = await import('@/app/api/share/code/[code]/route')
    const apiResponse = await getCodeApi(new Request('http://localhost/api/share/code/만료된%20코드'), {
      params: Promise.resolve({ code: '만료된%20코드' }),
    })

    expect(apiResponse.status).toBe(404)
    const apiData = await apiResponse.json()
    expect(apiData.error).toBe('Share not found')
  })

  it('[Scenario 4] Non-existent Korean code returns 404 Not Found', async () => {
    findFirstMock.mockResolvedValue(null)

    const { GET: getCodeApi } = await import('@/app/api/share/code/[code]/route')
    const apiResponse = await getCodeApi(new Request('http://localhost/api/share/code/없는%20코드'), {
      params: Promise.resolve({ code: '없는%20코드' }),
    })

    expect(apiResponse.status).toBe(404)
    const apiData = await apiResponse.json()
    expect(apiData.error).toBe('Share not found')
  })

  it('[Scenario 5] Access code normalization handles space, underscore, and encoded URI variants', () => {
    const encoded = encodeURIComponent('푸른_바다')
    const code1 = decodeKoCode('푸른_바다')
    const code2 = decodeKoCode('푸른%20바다')
    const code3 = decodeKoCode(encoded)

    expect(code1).toBe('푸른 바다')
    expect(code2).toBe('푸른 바다')
    expect(code3).toBe('푸른 바다')
  })
})
