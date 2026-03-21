import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignInButton from '@/app/components/sign-in-button'

const { signInSocial } = vi.hoisted(() => ({
  signInSocial: vi.fn(),
}))

vi.mock('@/lib/auth-client', () => ({
  authClient: {
    signIn: {
      social: signInSocial,
    },
  },
}))

describe('SignInButton', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('starts a social sign-in flow with the selected provider', async () => {
    const user = userEvent.setup()

    render(
      <SignInButton provider={'github'} className={'rounded-xl'}>
        Github 로그인
      </SignInButton>
    )

    await user.click(screen.getByRole('button', { name: 'Github 로그인' }))

    expect(signInSocial).toHaveBeenCalledWith({
      provider: 'github',
      callbackURL: '/',
    })
  })
})
