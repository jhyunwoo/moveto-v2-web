'use client'

import { authClient } from '@/lib/auth-client'

export default function RegisterPasskeyButton() {
  return (
    <button
      type={'button'}
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
      className={'w-full rounded-xl border-[1px] border-neutral-300 p-2 px-4 text-sm text-neutral-50'}
    >
      Passkey 등록
    </button>
  )
}
