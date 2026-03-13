import Link from 'next/link'
import { getSession } from '@/auth'

export default async function ProfileButton() {
  const session = await getSession()

  return session?.user?.id ? (
    <Link className={'rounded-full bg-white p-[6px] px-4 text-sm font-semibold text-black'} href={'/profile'}>
      프로필
    </Link>
  ) : (
    <Link className={'rounded-full bg-white p-[6px] px-4 text-sm font-semibold text-black'} href={'/auth/sign-in'}>
      로그인
    </Link>
  )
}
