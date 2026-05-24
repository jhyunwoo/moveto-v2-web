import Link from 'next/link'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import ConfirmShareDelete from '@/app/components/confirm-share-delete'
import DeleteShareTrashIconButton from '@/app/components/delete-share-trash-icon-button'
import getUserShareHistory from '@/lib/server/get-user-share-history'
import { getSession } from '@/auth'

function dateToKor(date: Date) {
  const options: { dateStyle: 'medium'; timeStyle: 'short'; hour12: boolean } = {
    dateStyle: 'medium',
    timeStyle: 'short',
    hour12: false,
  }

  return Intl.DateTimeFormat('ko-KR', options).format(date)
}

function isExpired(expiredAt: Date | null) {
  if (!expiredAt) return false
  return new Date() > expiredAt
}

export default async function HistoryPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const session = await getSession()
  const currentSearchParams = await searchParams
  const requestedPage = Number(currentSearchParams.page ?? '1')
  const { shareList, pageLimit, currentPage } = await getUserShareHistory(session!.user.id, requestedPage)

  return (
    <div className="text-text-primary mt-6">
      <ConfirmShareDelete />
      <Link href="/profile" className="group mb-8 inline-flex items-center gap-2 rounded-full border border-border-primary bg-surface-alt px-4 py-2 text-sm transition-all hover:bg-surface-elevated hover:border-border-primary/50 backdrop-blur-md">
        <ChevronLeftIcon className="size-4" />
        <div className="font-display font-600">프로필로 돌아가기</div>
      </Link>
      
      <div className="mb-8 font-display text-3xl font-800 tracking-tight text-text-primary drop-shadow-md">
        파일 <span className="text-gradient-neon">공유 기록</span>
      </div>
      
      {shareList.length === 0 ? (
        <div className="modern-card relative flex min-h-[400px] flex-col items-center justify-center gap-5 p-8 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-soft via-transparent to-transparent opacity-50" />
          <div className="relative flex size-20 items-center justify-center rounded-full bg-surface-alt border border-border-primary backdrop-blur-lg shadow-[0_0_30px_rgba(139,92,246,0.3)]">
            <svg className="size-10 text-accent-hover drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <div className="relative z-10">
            <div className="font-display text-xl font-800 text-text-primary">아직 공유한 파일이 없습니다</div>
            <div className="mt-2 text-sm text-text-secondary">새로운 파일을 업로드하고 안전하게 공유해 보세요.</div>
          </div>
          <Link href="/" className="btn-premium relative z-10 mt-4 rounded-full px-8 py-3 font-display text-sm font-700">
            새 파일 업로드 시작
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {shareList.map((share) => (
              <div key={share.id} className="modern-card flex flex-col gap-4 p-5 group hover:border-accent-soft/50">
                <div className="flex items-start justify-between gap-4">
                  <div className="line-clamp-2 break-all font-display text-lg font-700 leading-snug text-text-primary group-hover:text-accent-hover transition-colors">
                    {share.file ? share.file[0] : null}
                    {share.file?.length && (share.file.length > 1 ? ` 외 ${share.file.length - 1}개의 파일` : null)}
                  </div>
                  <DeleteShareTrashIconButton shareId={share.id} />
                </div>
                
                <div className="mt-auto flex items-end justify-between pt-4 border-t border-border-primary">
                  {share.code && !isExpired(share.expireAt) ? (
                    <Link
                      href={`/search/${share.code.replaceAll(' ', '_')}`}
                      className="rounded-lg bg-gradient-to-r from-accent to-cyan-500 px-4 py-2 font-display text-sm font-800 text-white transition-all hover:scale-105 shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                    >
                      {share.code}
                    </Link>
                  ) : (
                    <span className="rounded-lg bg-surface-alt border border-border-primary px-3 py-1.5 font-display text-sm font-600 text-text-muted">
                      만료됨
                    </span>
                  )}
                  <div className="text-right text-xs text-text-secondary">
                    <div>{dateToKor(new Date(share.createdAt))} 생성</div>
                    <div className="font-500 mt-1 text-text-secondary">{dateToKor(new Date(share.expireAt!))} 만료</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-10 flex w-full items-center justify-center gap-4">
            <Link
              href={`/profile/history?page=${Math.max(1, currentPage - 1)}`}
              className={`flex h-10 items-center justify-center rounded-xl px-5 font-display text-sm font-700 transition-all ${
                currentPage <= 1 ? 'pointer-events-none opacity-30 bg-surface-alt text-text-muted' : 'border border-border-primary bg-surface-alt hover:bg-surface-elevated hover:border-border-primary/50 text-text-primary backdrop-blur-sm'
              }`}
            >
              이전
            </Link>
            <div className="flex size-10 items-center justify-center rounded-xl bg-accent font-display text-sm font-800 text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]">
              {currentPage}
            </div>
            <Link
              href={`/profile/history?page=${Math.min(pageLimit, currentPage + 1)}`}
              className={`flex h-10 items-center justify-center rounded-xl px-5 font-display text-sm font-700 transition-all ${
                currentPage >= pageLimit ? 'pointer-events-none opacity-30 bg-surface-alt text-text-muted' : 'border border-border-primary bg-surface-alt hover:bg-surface-elevated hover:border-border-primary/50 text-text-primary backdrop-blur-sm'
              }`}
            >
              다음
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
