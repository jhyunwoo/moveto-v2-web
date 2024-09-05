import SignInButton from '@/components/sign-in-button'
import Link from 'next/link'

export default function SignInPage() {
  return (
    <div className={'w-full h-screen flex flex-col items-center justify-center text-white p-4'}>
      <div className={'w-full max-w-xl flex gap-2 flex-col items-center'}>
        <div className={'text-2xl font-bold pb-1 w-full'}>Moveto 로그인</div>
        <SignInButton className={'bg-yellow-500 p-3 rounded-xl text-lg w-full font-semibold'} provider={'kakao'}>
          카카오로 로그인
        </SignInButton>
        <SignInButton
          className={'bg-neutral-900 border-2 border-neutral-50 p-3 rounded-xl text-lg w-full font-semibold'}
          provider={'github'}
        >
          Github로 로그인
        </SignInButton>
        <Link href={'/'} className={'hover:underline mt-4 text-sm'}>
          홈 페이지
        </Link>
      </div>
    </div>
  )
}
