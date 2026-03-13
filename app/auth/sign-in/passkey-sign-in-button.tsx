'use client'

import { KeyIcon } from '@heroicons/react/24/outline'
import { authClient } from '@/lib/auth-client'

export default function PasskeySignInButton() {
  return (
    <button
      type={'button'}
      onClick={async () => {
        await authClient.signIn.passkey({
          autoFill: true,
          fetchOptions: {
            onSuccess() {
              window.location.href = '/profile'
            },
          },
        })
      }}
      className={
        'flex w-full items-center justify-center gap-2 rounded-xl border-2 border-neutral-50 bg-neutral-900 p-3 text-lg font-semibold'
      }
    >
      <KeyIcon className={'size-6'} />
      <p>Passkey 로그인</p>
    </button>
  )
}
