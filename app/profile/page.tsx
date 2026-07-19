import { getSession } from '@/auth'
import Link from 'next/link'
import SignOutButton from '@/app/components/sign-out-button'
import UserStorageStatusBar from '@/app/profile/user-storage-status-bar'
import RegisterPasskeyButton from '@/app/profile/register-passkey-button'
import { ArchiveBoxIcon, ArrowRightIcon, UserCircleIcon } from '@heroicons/react/24/outline'

export default async function ProfilePage() {
  const session = await getSession()

  return (
    <div className="w-full text-text-primary">
      <div className="mb-8">
        <h1 className="text-3xl font-700 sm:text-4xl">내 공간</h1>
        <p className="mt-2 text-sm leading-6 text-text-secondary">계정과 파일 공유 현황을 확인하세요.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <section className="glass-panel flex min-h-72 flex-col p-5 sm:p-6" aria-labelledby="profile-info-title">
          <div className="flex items-center gap-3 border-b border-border-subtle pb-4">
            <span className="flex size-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
              <UserCircleIcon className="size-6" />
            </span>
            <div>
              <h2 id="profile-info-title" className="text-sm font-700">프로필 정보</h2>
              <p className="mt-0.5 text-xs text-text-muted">내 계정</p>
            </div>
          </div>

          <div className="mt-6 min-w-0">
            <div className="truncate text-2xl font-700">{session?.user.name}</div>
            <div className="mt-1 truncate text-sm text-text-secondary">{session?.user.email}</div>
          </div>

          <div className="mt-auto flex flex-col gap-2 pt-8 sm:flex-row">
            <SignOutButton className="btn-secondary w-full cursor-pointer px-4" />
            <RegisterPasskeyButton />
          </div>
        </section>

        <section className="glass-panel flex min-h-72 flex-col p-5 sm:p-6" aria-labelledby="storage-title">
          <div className="flex items-center gap-3 border-b border-border-subtle pb-4">
            <span className="flex size-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
              <ArchiveBoxIcon className="size-5" />
            </span>
            <div>
              <h2 id="storage-title" className="text-sm font-700">파일 공유 현황</h2>
              <p className="mt-0.5 text-xs text-text-muted">저장 공간 사용량</p>
            </div>
          </div>

          <div className="mt-7">
            <UserStorageStatusBar />
          </div>

          <Link href="/profile/history" className="btn-primary mt-auto w-full px-4">
            공유 기록 보기
            <ArrowRightIcon className="size-4" />
          </Link>
        </section>
      </div>
    </div>
  )
}
