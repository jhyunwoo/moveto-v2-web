import { ReactNode } from 'react'
import { getSession } from '@/auth'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '프로필 | 모베토 Moveto',
}

export default async function ProfileLayout({ children }: { children: ReactNode }) {
  const session = await getSession()
  if (!session?.user?.id) {
    redirect('/auth/sign-in')
  }
  return <div className="mx-auto flex w-full max-w-5xl flex-col px-4 py-12 sm:px-6 sm:py-16">{children}</div>
}
