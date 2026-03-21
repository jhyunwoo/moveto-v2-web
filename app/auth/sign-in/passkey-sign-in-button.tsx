'use client'

import { KeyIcon } from '@heroicons/react/24/outline'
import { authClient } from '@/lib/auth-client'

export default function PasskeySignInButton() {
  return (
    <button
      type="button"
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
      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-border-primary p-3 font-display text-lg font-700 transition-colors hover:bg-accent-soft"
    >
      <KeyIcon className="size-6" />
      <p>Passkey 로그인</p>
    </button>
  )
}
