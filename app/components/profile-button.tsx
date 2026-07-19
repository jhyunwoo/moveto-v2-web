import Link from 'next/link'
import { getSession } from '@/auth'

export default async function ProfileButton() {
  const session = await getSession()

  return session?.user?.id ? (
    <Link
      className="btn-primary h-9 min-h-9 shrink-0 whitespace-nowrap px-4 text-xs sm:text-sm"
      href="/profile"
    >
      프로필
    </Link>
  ) : (
    <Link
      className="btn-primary h-9 min-h-9 shrink-0 whitespace-nowrap px-4 text-xs sm:text-sm"
      href="/auth/sign-in"
    >
      로그인
    </Link>
  )
}
