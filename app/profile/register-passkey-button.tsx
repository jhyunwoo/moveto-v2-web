'use client'
import { signIn } from 'next-auth/webauthn'

export default function RegisterPasskeyButton() {
  return (
    <button
      type={'button'}
      onClick={() =>
        signIn('passkey', { action: 'register', redirect: false })
          .then(() => alert('Complete Register Passkey'))
          .catch(() => alert('Passkey already registered'))
      }
      className={'w-full rounded-xl border-[1px] border-neutral-300 p-2 px-4 text-sm text-neutral-50'}
    >
      Passkey 등록
    </button>
  )
}
