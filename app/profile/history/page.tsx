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
  const requestedPage = Number.parseInt(currentSearchParams.page ?? '1', 10) || 1
  const { shareList, pageLimit, currentPage } = await getUserShareHistory(session!.user.id, requestedPage)

  return (
    <div className="text-text-primary w-full">
      <ConfirmShareDelete />
      <Link
        href="/profile"
        className="font-600 text-text-secondary hover:text-text-primary mb-6 inline-flex items-center gap-1.5 text-sm transition-colors"
      >
        <ChevronLeftIcon className="size-4" />
        프로필로 돌아가기
      </Link>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-800 text-3xl tracking-[-0.04em] sm:text-4xl">파일 공유 기록</h1>
          <p className="text-text-secondary mt-2 text-sm leading-6">생성한 공유와 만료 시간을 확인하세요.</p>
        </div>
        <Link href="/" className="btn-primary w-fit px-4">
          <FolderPlusIcon className="size-[18px]" />새 파일 공유
        </Link>
      </div>

      {shareList.length === 0 ? (
        <div className="panel flex min-h-80 flex-col items-center justify-center px-5 py-12 text-center">
          <h2 className="font-700 text-lg">아직 공유한 파일이 없습니다</h2>
          <p className="text-text-secondary mt-2 text-sm">파일을 선택하면 이곳에서 공유 기록을 확인할 수 있습니다.</p>
          <Link href="/" className="btn-primary mt-6 px-5">
            파일 선택하기
          </Link>
        </div>
      ) : (
        <>
          <div className="panel fade-in overflow-hidden">
            {shareList.map(share => {
              const expired = isExpired(share.expireAt)
              return (
                <article
                  key={share.id}
                  className="border-border-subtle grid gap-4 border-b p-4 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:p-5"
                >
                  <div className="min-w-0">
                    <div className="flex items-start gap-2">
                      <h2 className="font-700 min-w-0 grow truncate text-sm sm:text-base">
                        {share.file?.[0] ?? '파일'}
                        {share.file && share.file.length > 1 ? ` 외 ${share.file.length - 1}개` : null}
                      </h2>
                      <DeleteShareTrashIconButton shareId={share.id} />
                    </div>
                    <div className="text-text-muted mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                      <span>{dateToKor(new Date(share.createdAt))} 생성</span>
                      <span>{dateToKor(new Date(share.expireAt!))} 만료</span>
                    </div>
                  </div>

                  {share.code && !expired ? (
                    <Link
                      href={`/search/${share.code.replaceAll(' ', '_')}`}
                      className="btn-secondary justify-between px-3 sm:min-w-44"
                    >
                      <span className="truncate">{share.code}</span>
                      <ArrowRightIcon className="size-4 shrink-0" />
                    </Link>
                  ) : (
                    <span className="border-border-subtle bg-surface-subtle font-600 text-text-muted inline-flex h-10 items-center justify-center rounded-lg border px-4 text-sm">
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
              <span className="bg-text-primary font-700 text-surface flex size-10 items-center justify-center rounded-lg font-mono text-sm">
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
