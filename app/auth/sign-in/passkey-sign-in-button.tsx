'use client'
import { signIn } from 'next-auth/webauthn'
import { KeyIcon } from '@heroicons/react/24/outline'

export default function PasskeySignInButton() {
  return (
    <button
      type={'button'}
      onClick={() => signIn('passkey')}
      className={
        'flex w-full items-center justify-center gap-2 rounded-xl border-2 border-neutral-50 bg-neutral-900 p-3 text-lg font-semibold'
      }
    >
      <KeyIcon className={'size-6'} />
      <p>Passkey로 로그인</p>
    </button>
  )
}
