import Link from 'next/link'
import { ArrowRightIcon, ChevronLeftIcon, FolderPlusIcon } from '@heroicons/react/24/outline'
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
    <div className="w-full text-text-primary">
      <ConfirmShareDelete />
      <Link href="/profile" className="mb-6 inline-flex items-center gap-1.5 text-sm font-600 text-text-secondary transition-colors hover:text-text-primary">
        <ChevronLeftIcon className="size-4" />
        프로필로 돌아가기
      </Link>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-700 sm:text-4xl">파일 공유 기록</h1>
          <p className="mt-2 text-sm leading-6 text-text-secondary">생성한 공유와 만료 시간을 확인하세요.</p>
        </div>
        <Link href="/" className="btn-primary w-fit px-4">
          <FolderPlusIcon className="size-[18px]" />
          새 파일 공유
        </Link>
      </div>

      {shareList.length === 0 ? (
        <div className="document-panel flex min-h-80 flex-col items-center justify-center px-5 py-12 text-center">
          <span className="flex size-12 items-center justify-center rounded-lg bg-accent-soft text-accent">
            <FolderPlusIcon className="size-6" />
          </span>
          <h2 className="mt-5 text-lg font-700">아직 공유한 파일이 없습니다</h2>
          <p className="mt-2 text-sm text-text-secondary">파일을 선택하면 이곳에서 공유 기록을 확인할 수 있습니다.</p>
          <Link href="/" className="btn-primary mt-6 px-5">파일 선택하기</Link>
        </div>
      ) : (
        <>
          <div className="document-panel overflow-hidden">
            {shareList.map((share) => {
              const expired = isExpired(share.expireAt)
              return (
                <article key={share.id} className="grid gap-4 border-b border-border-subtle p-4 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:p-5">
                  <div className="min-w-0">
                    <div className="flex items-start gap-2">
                      <h2 className="min-w-0 grow truncate text-sm font-700 sm:text-base">
                        {share.file?.[0] ?? '파일'}
                        {share.file && share.file.length > 1 ? ` 외 ${share.file.length - 1}개` : null}
                      </h2>
                      <DeleteShareTrashIconButton shareId={share.id} />
                    </div>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-muted">
                      <span>{dateToKor(new Date(share.createdAt))} 생성</span>
                      <span>{dateToKor(new Date(share.expireAt!))} 만료</span>
                    </div>
                  </div>

                  {share.code && !expired ? (
                    <Link href={`/search/${share.code.replaceAll(' ', '_')}`} className="btn-secondary justify-between px-3 sm:min-w-44">
                      <span className="truncate">{share.code}</span>
                      <ArrowRightIcon className="size-4 shrink-0" />
                    </Link>
                  ) : (
                    <span className="inline-flex h-10 items-center justify-center rounded-lg border border-border-subtle bg-surface-subtle px-4 text-sm font-600 text-text-muted">
                      만료됨
                    </span>
                  )}
                </article>
              )
            })}
          </div>

          {pageLimit > 1 ? (
            <nav className="mt-8 flex w-full items-center justify-center gap-2" aria-label="공유 기록 페이지">
              <Link
                href={`/profile/history?page=${Math.max(1, currentPage - 1)}`}
                aria-disabled={currentPage <= 1}
                className={`btn-secondary px-4 ${currentPage <= 1 ? 'pointer-events-none opacity-40' : ''}`}
              >
                이전
              </Link>
              <span className="flex size-10 items-center justify-center rounded-lg bg-black text-sm font-700 text-white dark:bg-white dark:text-black">
                {currentPage}
              </span>
              <Link
                href={`/profile/history?page=${Math.min(pageLimit, currentPage + 1)}`}
                aria-disabled={currentPage >= pageLimit}
                className={`btn-secondary px-4 ${currentPage >= pageLimit ? 'pointer-events-none opacity-40' : ''}`}
              >
                다음
              </Link>
            </nav>
          ) : null}
        </>
      )}
    </div>
  )
}
