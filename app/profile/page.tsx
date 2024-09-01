import { auth } from '@/auth'
import Link from 'next/link'
import SignOutButton from '@/components/sign-out-button'
import UserStorageStatusBar from '@/app/profile/subscription/user-storage-status-bar'

export default async function ProfilePage() {
  const session = await auth()

  return (
    <div className={'w-full grid grid-cols-1 md:grid-cols-2 gap-2'}>
      <div className={'text-white w-full p-4 rounded-xl bg-neutral-900 gap-1 flex flex-col'}>
        <div className={'text-sm font-semibold border-b-[1px] border-neutral-400 mb-2'}>프로필</div>
        <div>{session?.user.name}</div>
        <div>{session?.user.email}</div>
        <SignOutButton
          className={'w-full p-2 px-4 mt-4 rounded-xl border-[1px] border-neutral-300 text-neutral-50 text-sm'}
        />
      </div>
      <div className={'text-white p-4 rounded-xl bg-neutral-900 flex flex-col gap-1'}>
        <div className={'border-b-[1px] border-neutral-400 mb-2 text-sm'}>플랜</div>
        <div>{session?.user.plan} Plan</div>
        <Link
          href={'/profile/subscription'}
          className={'w-full mt-auto p-2 rounded-xl bg-neutral-200 text-neutral-950 text-sm font-semibold text-center'}
        >
          구독 변경
        </Link>
      </div>
      <div className={'text-white p-4 rounded-xl bg-neutral-900 flex flex-col gap-1'}>
        <div className={'border-b-[1px] border-neutral-400 mb-2 text-sm'}>파일 공유</div>
        <UserStorageStatusBar />
        <Link
          href={'/profile/history'}
          className={'w-full mt-auto p-2 rounded-xl bg-neutral-200 text-neutral-950 font-semibold text-center'}
        >
          공유 기록
        </Link>
      </div>
    </div>
  )
}
