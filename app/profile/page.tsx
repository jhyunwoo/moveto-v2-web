import { auth } from '@/auth'
import Link from 'next/link'
import SignOutButton from '@/components/sign-out-button'
import UserStorageStatusBar from '@/app/profile/subscription/user-storage-status-bar'
import RegisterPasskeyButton from '@/app/profile/register-passkey-button'

export default async function ProfilePage() {
  const session = await auth()

  return (
    <div className={'grid w-full grid-cols-1 gap-2 md:grid-cols-2'}>
      <div className={'flex w-full flex-col gap-1 rounded-xl bg-neutral-900 p-4 text-white'}>
        <div className={'mb-2 border-b-[1px] border-neutral-400 text-sm font-semibold'}>프로필</div>
        <div>{session?.user.name}</div>
        <div>{session?.user.email}</div>
        <div className={'mt-4 flex gap-2'}>
          <SignOutButton
            className={'w-full rounded-xl border-[1px] border-neutral-300 p-2 px-4 text-sm text-neutral-50'}
          />
          <RegisterPasskeyButton />
        </div>
      </div>
      <div className={'flex flex-col gap-1 rounded-xl bg-neutral-900 p-4 text-white'}>
        <div className={'mb-2 border-b-[1px] border-neutral-400 text-sm'}>플랜</div>
        <div>{session?.user.plan} Plan</div>
        <Link
          href={'/profile/subscription'}
          className={'mt-auto w-full rounded-xl bg-neutral-200 p-2 text-center text-sm font-semibold text-neutral-950'}
        >
          구독 변경
        </Link>
      </div>
      <div className={'flex flex-col gap-1 rounded-xl bg-neutral-900 p-4 text-white'}>
        <div className={'mb-2 border-b-[1px] border-neutral-400 text-sm'}>파일 공유</div>
        <UserStorageStatusBar />
        <Link
          href={'/profile/history'}
          className={'mt-auto w-full rounded-xl bg-neutral-200 p-2 text-center font-semibold text-neutral-950'}
        >
          공유 기록
        </Link>
      </div>
    </div>
  )
}
