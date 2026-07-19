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

  const providerClass = 'btn-secondary h-12 w-full cursor-pointer px-4 text-[15px]'

  return (
    <div className="flex min-h-[calc(100dvh-4rem)] w-full items-center justify-center px-4 py-16 text-text-primary sm:px-6">
      <section className="glass-panel w-full max-w-md p-6 sm:p-8" aria-labelledby="sign-in-title">
        <div className="mb-7">
          <h1 id="sign-in-title" className="text-3xl font-700">Moveto 로그인</h1>
          <p className="mt-2 text-sm leading-6 text-text-secondary">공유 기록과 저장 공간을 한곳에서 관리하세요.</p>
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
            <span className="h-px grow bg-border-subtle" />
            <span className="text-xs text-text-muted">또는</span>
            <span className="h-px grow bg-border-subtle" />
          </div>

          <PasskeySignInButton />
        </div>

        <p className="mt-5 text-center text-xs leading-5 text-text-muted">
          패스키는 소셜 로그인 후 프로필에서 등록할 수 있습니다.
        </p>
        <Link href="/" className="mt-7 flex items-center justify-center gap-1.5 text-sm font-600 text-text-secondary transition-colors hover:text-text-primary">
          <ArrowLeftIcon className="size-4" />
          홈으로 돌아가기
        </Link>
      </section>
    </div>
  )
}
