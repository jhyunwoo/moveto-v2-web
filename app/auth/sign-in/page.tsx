import SignInButton from '@/components/sign-in-button';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <div className={'w-full h-screen flex flex-col items-center justify-center text-white p-4'}>
      <div className={'w-full max-w-xl flex flex-col items-center'}>
        <div className={'text-2xl font-bold pb-1 w-full'}>모베토 로그인</div>
        <SignInButton className={'bg-white text-black p-3 rounded-lg w-full font-semibold'} provider={'github'}>
          Github로 로그인
        </SignInButton>
        <Link href={'/'} className={'hover:underline mt-4 text-sm'}>
          홈 페이지
        </Link>
      </div>
    </div>
  );
}
