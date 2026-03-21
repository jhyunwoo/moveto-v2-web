'use client'

import { authClient } from '@/lib/auth-client'

export default function RegisterPasskeyButton() {
  return (
    <button
      type="button"
      onClick={async () => {
        const { error } = await authClient.passkey.addPasskey({
          authenticatorAttachment: 'platform',
        })

        if (error) {
          alert(error.message)
          return
        }

        alert('Complete Register Passkey')
      }}
      className="w-full cursor-pointer rounded-xl border-2 border-border-primary p-2 px-4 font-display text-sm font-600 text-text-primary transition-colors hover:bg-accent-soft"
    >
      Passkey 등록
    </button>
  )
}
