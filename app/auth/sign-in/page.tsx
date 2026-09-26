import SignInButton from '@/app/components/sign-in-button'
import Link from 'next/link'
import { Metadata } from 'next'
import PasskeySignInButton from '@/app/auth/sign-in/passkey-sign-in-button'
import { getSession } from '@/auth'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: '로그인 | 모베토 Moveto',
}

export default async function SignInPage() {
  const session = await getSession()
  if (session?.user.id) redirect('/profile')

  const providerClass = 'btn-secondary h-11 w-full px-4'

  return (
    <div className="text-text-primary flex w-full flex-1 items-center justify-center px-4 py-16 sm:px-6">
      <section className="panel w-full max-w-md p-6 sm:p-8" aria-labelledby="sign-in-title">
        <div className="mb-7">
          <p className="mono-label">Sign in</p>
          <h1 id="sign-in-title" className="font-800 mt-3 text-2xl tracking-[-0.03em]">
            Moveto 로그인
          </h1>
          <p className="text-text-secondary mt-2 text-sm leading-6">공유 기록과 저장 공간을 한곳에서 관리하세요.</p>
        </div>

        <div className="flex flex-col gap-2.5">
          <SignInButton className={providerClass} provider="github">
            <span className="flex size-6 items-center justify-center rounded-full bg-black p-0.5 dark:bg-white">
              <Image src="/github-mark.svg" alt="" width={20} height={20} />
            </span>
            <span>Github 로그인</span>
          </SignInButton>
          <SignInButton className={providerClass} provider="google">
            <span className="flex size-6 items-center justify-center rounded-full bg-white p-0.5 shadow-sm">
              <Image src="/google-mark.svg" alt="" width={20} height={20} />
            </span>
            <span>Google 로그인</span>
          </SignInButton>

          <div className="my-2 flex items-center gap-3" aria-hidden="true">
            <span className="bg-border-subtle h-px grow" />
            <span className="text-text-muted text-xs">또는</span>
            <span className="bg-border-subtle h-px grow" />
          </div>

          <PasskeySignInButton />
        </div>

        <p className="text-text-muted mt-5 text-center text-xs leading-5">
          패스키는 소셜 로그인 후 프로필에서 등록할 수 있습니다.
        </p>
        <Link
          href="/"
          className="font-600 text-text-secondary hover:text-text-primary mt-7 flex items-center justify-center gap-1.5 text-sm transition-colors"
        >
          <ArrowLeftIcon className="size-4" />
          홈으로 돌아가기
        </Link>
      </section>
    </div>
  )
}
