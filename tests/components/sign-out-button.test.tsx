import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignOutButton from '@/app/components/sign-out-button'

const { signOut } = vi.hoisted(() => ({
  signOut: vi.fn(),
}))

vi.mock('@/lib/auth-client', () => ({
  authClient: {
    signOut,
  },
}))

describe('SignOutButton', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('signs the user out and requests a redirect callback', async () => {
    const user = userEvent.setup()

    render(<SignOutButton className={'rounded-xl'} />)

    await user.click(screen.getByRole('button', { name: '로그아웃' }))

    expect(signOut).toHaveBeenCalledWith({
      fetchOptions: {
        onSuccess: expect.any(Function),
      },
    })
  })
})
