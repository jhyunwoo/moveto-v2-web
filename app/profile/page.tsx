import { getSession } from '@/auth'
import Link from 'next/link'
import SignOutButton from '@/app/components/sign-out-button'
import UserStorageStatusBar from '@/app/profile/user-storage-status-bar'
import RegisterPasskeyButton from '@/app/profile/register-passkey-button'

export default async function ProfilePage() {
  const session = await getSession()

  return (
    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 mt-8">
      <div className="modern-card flex w-full flex-col gap-1.5 p-6 text-text-primary group">
        <div className="mb-4 flex items-center gap-3 border-b border-border-primary pb-4">
          <div className="flex size-10 items-center justify-center rounded-full bg-accent-soft text-accent-hover font-display font-800">
            {session?.user.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <div className="font-display text-sm font-700 uppercase tracking-wider text-accent-hover">
              프로필 정보
            </div>
            <div className="text-xs text-text-muted">내 계정 관리</div>
          </div>
        </div>
        
        <div className="flex flex-col mt-2">
          <div className="font-display text-2xl font-800 tracking-tight text-text-primary drop-shadow-sm">{session?.user.name}</div>
          <div className="mb-4 text-sm text-text-secondary">{session?.user.email}</div>
        </div>
        
        <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row">
          <SignOutButton className="w-full cursor-pointer rounded-xl border border-border-primary bg-surface-alt p-2.5 px-4 font-display text-sm font-600 text-text-primary transition-all hover:bg-surface-elevated hover:border-border-primary/50" />
          <RegisterPasskeyButton />
        </div>
      </div>
      
      <div className="modern-card flex flex-col gap-1.5 p-6 text-text-primary group">
        <div className="mb-4 flex items-center gap-3 border-b border-border-primary pb-4">
          <div className="flex size-10 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400">
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          </div>
          <div>
            <div className="font-display text-sm font-700 uppercase tracking-wider text-cyan-400">
              파일 공유 현황
            </div>
            <div className="text-xs text-text-muted">스토리지 사용량</div>
          </div>
        </div>
        
        <div className="mt-2">
          <UserStorageStatusBar />
        </div>
        
        <Link
          href="/profile/history"
          className="btn-premium mt-auto w-full rounded-xl p-3 text-center font-display text-sm font-700 mt-6"
        >
          공유 기록 상세 보기
        </Link>
      </div>
    </div>
  )
}
