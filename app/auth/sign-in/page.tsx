import SignInButton from '@/components/sign-in-button'
import Link from 'next/link'
import { Metadata } from 'next'
import PasskeySignInButton from '@/app/auth/sign-in/passkey-sign-in-button'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/solid'

export const metadata: Metadata = {
  title: '로그인 | Moveto',
}

export default async function SignInPage() {
  const session = await auth()
  if (session?.user.id) redirect('/profile')

  return (
    <div className={'flex h-screen w-full flex-col items-center justify-center p-4 text-white'}>
      <div className={'flex w-full max-w-xl flex-col items-center gap-2'}>
        <div className={'w-full pb-1 text-2xl font-bold'}>Moveto 로그인</div>
        <SignInButton
          className={
            'flex w-full items-center justify-center gap-2 rounded-xl bg-[#FEE500] p-3 text-lg font-semibold text-black'
          }
          provider={'kakao'}
        >
          <ChatBubbleOvalLeftIcon className={'size-6 text-black'} />
          <p>카카오 로그인</p>
        </SignInButton>
        <SignInButton
          className={
            'flex w-full items-center justify-center gap-2 rounded-xl border-2 border-neutral-50 bg-neutral-900 p-3 text-lg font-semibold'
          }
          provider={'github'}
        >
          <Image src={'/github-mark.svg'} alt={'Github Logo'} width={24} height={24} />
          <p>Github 로그인</p>
        </SignInButton>
        <PasskeySignInButton />
        <p className={'text-sm'}>
          Passkey로 로그인 하기 위해선 카카오 또는 Github로 로그인 한 후 Passkey 등록이 필요합니다.
        </p>
        <Link href={'/'} className={'mt-4 text-sm hover:underline'}>
          홈 페이지
        </Link>
      </div>
    </div>
  )
}
