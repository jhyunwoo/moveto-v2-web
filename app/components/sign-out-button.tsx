'use client'
import { signOut } from 'next-auth/react'

export default function SignOutButton({ className }: { className?: string }) {
  return (
    <button className={className} onClick={() => signOut({ callbackUrl: '/', redirect: true })}>
      로그아웃
    </button>
  )
}
