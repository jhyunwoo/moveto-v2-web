import { getSession } from '@/auth'
import Link from 'next/link'
import SignOutButton from '@/app/components/sign-out-button'
import UserStorageStatusBar from '@/app/profile/user-storage-status-bar'
import RegisterPasskeyButton from '@/app/profile/register-passkey-button'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

export default async function ProfilePage() {
  const session = await getSession()

  return (
    <div className="text-text-primary w-full">
      <div className="mb-8">
        <h1 className="font-800 text-3xl tracking-[-0.04em] sm:text-4xl">내 공간</h1>
        <p className="text-text-secondary mt-2 text-sm leading-6">계정과 파일 공유 현황을 확인하세요.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <section className="panel fade-in flex min-h-64 flex-col p-5 sm:p-6" aria-labelledby="profile-info-title">
          <h2 id="profile-info-title" className="section-label">
            프로필 정보
          </h2>

          <div className="mt-6 min-w-0">
            <div className="font-700 truncate text-2xl">{session?.user.name}</div>
            <div className="text-text-secondary mt-1 truncate text-sm">{session?.user.email}</div>
          </div>

          <div className="mt-auto flex flex-col gap-2 pt-8 sm:flex-row">
            <SignOutButton className="btn-secondary w-full cursor-pointer px-4" />
            <RegisterPasskeyButton />
          </div>
        </section>

        <section className="panel fade-in flex min-h-64 flex-col p-5 sm:p-6" aria-labelledby="storage-title">
          <h2 id="storage-title" className="section-label">
            파일 공유 현황
          </h2>

          <div className="mt-7">
            <UserStorageStatusBar />
          </div>

          <Link href="/profile/history" className="btn-primary mt-8 w-full px-4">
            공유 기록 보기
            <ArrowRightIcon className="size-4" />
          </Link>
        </section>
      </div>
    </div>
  )
}
