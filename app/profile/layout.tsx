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
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col p-4 md:p-8">
      {children}
    </div>
  )
}
