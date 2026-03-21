'use client'

import { authClient } from '@/lib/auth-client'

export default function SignOutButton({ className }: { className?: string }) {
  return (
    <button
      className={className}
      onClick={() =>
        authClient.signOut({
          fetchOptions: {
            onSuccess() {
              window.location.href = '/'
            },
          },
        })
      }
    >
      로그아웃
    </button>
  )
}
