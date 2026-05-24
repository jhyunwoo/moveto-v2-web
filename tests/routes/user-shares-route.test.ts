// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from 'vitest'

const getSessionMock = vi.fn()
const getUserShareHistoryMock = vi.fn()

vi.mock('@/auth', () => ({
  getSession: getSessionMock,
}))

vi.mock('@/lib/server/get-user-share-history', () => ({
  default: getUserShareHistoryMock,
}))

vi.mock('next/server', async (importOriginal) => {
  const mod = await importOriginal<typeof import('next/server')>()
  return {
    ...mod,
    connection: vi.fn().mockResolvedValue(undefined),
  }
})

describe('GET /api/user/shares/[page]', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns unauthorized when no session is available', async () => {
    getSessionMock.mockResolvedValue(null)

    const { GET } = await import('@/app/api/user/shares/[page]/route')
    const response = await GET(new Request('http://localhost') as never, {
      params: Promise.resolve({ page: '1' }),
    })

    expect(response.status).toBe(401)
    expect(await response.json()).toEqual({ error: 'Unauthorized' })
  })

  it('returns paged history for the authenticated user', async () => {
    getSessionMock.mockResolvedValue({ user: { id: 'user-1' } })
    getUserShareHistoryMock.mockResolvedValue({
      shareList: [{ id: 'share-1', code: '테스트 코드' }],
      pageLimit: 3,
      currentPage: 2,
    })

    const { GET } = await import('@/app/api/user/shares/[page]/route')
    const response = await GET(new Request('http://localhost') as never, {
      params: Promise.resolve({ page: '2' }),
    })

    expect(getUserShareHistoryMock).toHaveBeenCalledWith('user-1', 2)
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({
      shareList: [{ id: 'share-1', code: '테스트 코드' }],
      pageLimit: 3,
      currentPage: 2,
    })
  })
})
