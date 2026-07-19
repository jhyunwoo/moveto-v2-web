'use client'

import { authClient } from '@/lib/auth-client'
import { KeyIcon } from '@heroicons/react/24/outline'

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

        alert('패스키가 등록되었습니다.')
      }}
      className="btn-secondary w-full cursor-pointer px-4"
    >
      <KeyIcon className="size-4" />
      Passkey 등록
    </button>
  )
}
