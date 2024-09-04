import { ReactNode } from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default async function ProfileLayout({ children }: { children: ReactNode }) {
  const session = await auth()
  if (!session?.user?.id) {
    redirect('/auth/sign-in')
  }
  return (
    <div className={'w-full mx-auto max-w-4xl min-h-screen flex flex-col p-4'}>
      <Link href={'/'} className={'text-white text-3xl font-bold flex gap-2 items-center pb-4'}>
        <Image src={'/vector-logo.svg'} alt={'Moveto Logo'} width={40} height={40} />
        <div>Moveto</div>
      </Link>
      {children}
    </div>
  )
}
