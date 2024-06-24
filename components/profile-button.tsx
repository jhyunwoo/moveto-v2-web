import Link from 'next/link'
import { auth } from '@/auth'

export default async function ProfileButton() {
  const session = await auth()

  return session?.user?.id ? (
    <Link
      className={'p-[6px] rounded-full px-4 text-sm font-semibold bg-white text-black'}
      href={'/profile'}
    >
      프로필
    </Link>
  ) : (
    <Link
      className={'p-[6px] rounded-full px-4 text-sm font-semibold bg-white text-black'}
      href={'/auth/sign-in'}
    >
      로그인
    </Link>
  )
}
