import SignInButton from '@/app/components/sign-in-button'
import Link from 'next/link'
import { Metadata } from 'next'
import PasskeySignInButton from '@/app/auth/sign-in/passkey-sign-in-button'
import { getSession } from '@/auth'
import { redirect } from 'next/navigation'
import Image from 'next/image'

export const metadata: Metadata = {
  title: '로그인 | 모베토 Moveto',
}

export default async function SignInPage() {
  const session = await getSession()
  if (session?.user.id) redirect('/profile')

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center p-4 text-text-primary">
      <div className="brutalist-card flex w-full max-w-md flex-col items-center gap-3 rounded-2xl p-8">
        <div className="w-full pb-3 font-display text-3xl font-800 tracking-tight">Moveto 로그인</div>
        <SignInButton
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-border-primary p-3 font-display text-lg font-700 transition-colors hover:bg-accent-soft"
          provider="github"
        >
          <div className="flex size-6 items-center justify-center rounded-full bg-black p-0.5 dark:bg-transparent">
            <Image src="/github-mark.svg" alt="Github Logo" width={20} height={20} />
          </div>
          <p>Github 로그인</p>
        </SignInButton>
        <PasskeySignInButton />
        <p className="pt-1 text-sm text-text-secondary">
          Passkey로 로그인 하기 위해선 Github로 로그인 한 후 Passkey 등록이 필요합니다.
        </p>
        <Link
          href="/"
          className="mt-4 font-display text-sm font-600 text-text-muted transition-colors hover:text-accent"
        >
          홈 페이지
        </Link>
      </div>
    </div>
  )
}
