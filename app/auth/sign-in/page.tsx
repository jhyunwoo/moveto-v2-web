import SignInButton from '@/components/sign-in-button'

export default function SignInPage() {
  return (
    <div className={'w-full h-screen flex flex-col items-center justify-center text-white p-4'}>
      <div className={'w-full max-w-xl flex flex-col'}>
        <div className={'text-2xl font-bold pb-1'}>모베토 로그인</div>
        <SignInButton
          className={'bg-white text-black p-2 rounded-lg w-full font-semibold'}
          provider={'github'}
        >
          Github로 로그인
        </SignInButton>
      </div>
    </div>
  )
}
