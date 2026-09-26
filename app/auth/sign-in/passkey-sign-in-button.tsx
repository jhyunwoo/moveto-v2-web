'use client'

import { KeyIcon } from '@heroicons/react/24/outline'
import { authClient } from '@/lib/auth-client'

export default function PasskeySignInButton() {
  return (
    <button
      type="button"
      onClick={async () => {
        await authClient.signIn.passkey({
          fetchOptions: {
            onSuccess() {
              window.location.href = '/profile'
            },
          },
        })
      }}
      className="btn-primary h-11 w-full px-4"
    >
      <KeyIcon className="size-5" />
      <p>Passkey 로그인</p>
    </button>
  )
}
