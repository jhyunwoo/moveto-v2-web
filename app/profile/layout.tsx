import { ReactNode } from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function ProfileLayout({ children }: { children: ReactNode }) {
  const session = await auth()
  if (!session?.user?.id) {
    redirect('/auth/sign-in')
  }
  return (
    <div className={'w-full mx-auto max-w-3xl min-h-screen flex flex-col p-4'}>
      <Link href={'/'} className={'text-white text-3xl font-bold pb-4'}>
        모베토
      </Link>
      {children}
    </div>
  )
}
