'use client'

import { ReactNode } from 'react'
import { authClient } from '@/lib/auth-client'

export default function SignInButton({
  className,
  provider,
  children,
}: {
  className?: string
  provider: 'github' | 'google'
  children: ReactNode
}) {
  return (
    <button
      type={'button'}
      className={`${className ?? ''} w-full`}
      onClick={async () => {
        await authClient.signIn.social({
          provider,
          callbackURL: '/',
        })
      }}
    >
      {children}
    </button>
  )
}
