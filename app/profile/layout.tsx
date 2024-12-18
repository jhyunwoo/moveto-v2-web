import { ReactNode } from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '프로필 | 모베토 Moveto',
}

export default async function ProfileLayout({ children }: { children: ReactNode }) {
  const session = await auth()
  if (!session?.user?.id) {
    redirect('/auth/sign-in')
  }
  return (
    <div className={'mx-auto flex min-h-screen w-full max-w-4xl flex-col p-4'}>
      <Link href={'/'} className={'flex items-center gap-2 pb-4 text-3xl font-bold text-white'}>
        <Image src={'/vector-logo.svg'} alt={'Moveto Logo'} width={40} height={40} />
        <div>Moveto</div>
      </Link>
      {children}
    </div>
  )
}
