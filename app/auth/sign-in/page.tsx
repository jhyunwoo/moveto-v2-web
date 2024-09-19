import SignInButton from '@/components/sign-in-button'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '로그인 | Moveto',
}

export default function SignInPage() {
  return (
    <div className={'flex h-screen w-full flex-col items-center justify-center p-4 text-white'}>
      <div className={'flex w-full max-w-xl flex-col items-center gap-2'}>
        <div className={'w-full pb-1 text-2xl font-bold'}>Moveto 로그인</div>
        <SignInButton className={'w-full rounded-xl bg-yellow-500 p-3 text-lg font-semibold'} provider={'kakao'}>
          카카오로 로그인
        </SignInButton>
        <SignInButton
          className={'w-full rounded-xl border-2 border-neutral-50 bg-neutral-900 p-3 text-lg font-semibold'}
          provider={'github'}
        >
          Github로 로그인
        </SignInButton>
        <Link href={'/'} className={'mt-4 text-sm hover:underline'}>
          홈 페이지
        </Link>
      </div>
    </div>
  )
}
