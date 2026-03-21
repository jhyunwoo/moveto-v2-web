// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from 'vitest'

const returningMock = vi.fn()
const valuesMock = vi.fn(() => ({ returning: returningMock }))
const insertMock = vi.fn(() => ({ values: valuesMock }))
const getSessionMock = vi.fn()
const getUsedStorageMock = vi.fn()
const getUserLimitMock = vi.fn()
const getIpMock = vi.fn()

vi.mock('@/auth', () => ({
  getSession: getSessionMock,
}))

vi.mock('@/db', () => ({
  default: {
    insert: insertMock,
  },
}))

vi.mock('@/db/schema', () => ({
  share: {},
}))

vi.mock('@/lib/get-used-storage', () => ({
  default: getUsedStorageMock,
}))

vi.mock('@/lib/get-user-limit', () => ({
  default: getUserLimitMock,
}))

vi.mock('@/lib/server/get-user-ip', () => ({
  default: getIpMock,
}))

describe('POST /api/share', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('rejects uploads that exceed the user storage limit', async () => {
    getSessionMock.mockResolvedValue({ user: { id: 'user-1', plan: 'Free' } })
    getUsedStorageMock.mockResolvedValue(95)
    getUserLimitMock.mockReturnValue({ storage: 100 })

    const { POST } = await import('@/app/api/share/route')
    const response = await POST(
      new Request('http://localhost/api/share', {
        method: 'POST',
        body: JSON.stringify({ files: ['report.pdf'], storageSize: 10 }),
      }) as never
    )

    expect(response.status).toBe(400)
    expect(await response.json()).toEqual({ error: 'Not enough storage' })
    expect(insertMock).not.toHaveBeenCalled()
  })

  it('creates a share when storage is available', async () => {
    getSessionMock.mockResolvedValue({ user: { id: 'user-1', plan: 'Free' } })
    getUsedStorageMock.mockResolvedValue(10)
    getUserLimitMock.mockReturnValue({ storage: 100 })
    getIpMock.mockResolvedValue('127.0.0.1')
    returningMock.mockResolvedValue([{ shareId: 'share-1' }])

    const { POST } = await import('@/app/api/share/route')
    const response = await POST(
      new Request('http://localhost/api/share', {
        method: 'POST',
        body: JSON.stringify({ files: ['report.pdf'], storageSize: 25 }),
      }) as never
    )

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ shareId: 'share-1' })
    expect(valuesMock).toHaveBeenCalledWith({
      userId: 'user-1',
      ip: '127.0.0.1',
      file: ['report.pdf'],
      storageSize: 25,
    })
  })
})
