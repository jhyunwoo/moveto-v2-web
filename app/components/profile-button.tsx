import Link from 'next/link'
import { getSession } from '@/auth'

export default async function ProfileButton() {
  const session = await getSession()
  const isSignedIn = Boolean(session?.user?.id)

  return (
    <Link className="btn-secondary ml-1 min-h-9 px-3.5 text-[13px]" href={isSignedIn ? '/profile' : '/auth/sign-in'}>
      {isSignedIn ? '프로필' : '로그인'}
    </Link>
  )
}
