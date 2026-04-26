import Link from 'next/link'
import { getSession } from '@/auth'

export default async function ProfileButton() {
  const session = await getSession()

  return session?.user?.id ? (
    <Link
      className="rounded-lg border-2 border-accent bg-accent px-4 py-1.5 font-display text-xs sm:text-sm font-700 text-white transition-colors hover:bg-accent-hover hover:border-accent-hover"
      href="/profile"
    >
      프로필
    </Link>
  ) : (
    <Link
      className="rounded-lg border-2 border-accent bg-accent px-4 py-1.5 font-display text-xs sm:text-sm font-700 text-white transition-colors hover:bg-accent-hover hover:border-accent-hover"
      href="/auth/sign-in"
    >
      로그인
    </Link>
  )
}
