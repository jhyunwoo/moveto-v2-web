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
    <div className="text-text-primary">
      <ConfirmShareDelete />
      <Link href="/profile" className="group flex items-center gap-2 pb-2">
        <ChevronLeftIcon className="size-5" />
        <div className="font-display font-600 group-hover:text-accent">프로필 페이지</div>
      </Link>
      <div className="py-4 font-display text-xl font-700">파일 공유 기록</div>
      {shareList.length === 0 && (
        <div className="brutalist-card rounded-xl p-8 text-center text-text-secondary">아직 공유한 파일이 없습니다.</div>
      )}
      <div className="flex w-full items-center justify-end gap-3 p-3 sm:gap-4 sm:p-4">
        <Link
          href={`/profile/history?page=${Math.max(1, currentPage - 1)}`}
          className={`font-display text-sm font-600 transition-colors hover:text-accent sm:text-base ${currentPage <= 1 ? 'pointer-events-none opacity-40' : ''}`}
        >
          &larr; 이전
        </Link>
        <div className="rounded-lg border-2 border-accent bg-accent px-3 py-1 font-display text-sm font-700 text-white sm:text-base">
          {currentPage}
        </div>
        <Link
          href={`/profile/history?page=${Math.min(pageLimit, currentPage + 1)}`}
          className={`font-display text-sm font-600 transition-colors hover:text-accent sm:text-base ${currentPage >= pageLimit ? 'pointer-events-none opacity-40' : ''}`}
        >
          다음 &rarr;
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {shareList.map((share) => (
          <div key={share.id} className="brutalist-card flex flex-col gap-2 rounded-xl p-4">
            <div className="flex items-start justify-between">
              <div className="break-all font-display font-600">
                {share.file ? share.file[0] : null}
                {share.file?.length && (share.file.length > 1 ? `외 ${share.file.length - 1}개의 파일` : null)}
              </div>

              <DeleteShareTrashIconButton shareId={share.id} />
            </div>
            <div className="ml-auto flex w-full items-end justify-between">
              {share.code && !isExpired(share.expireAt) ? (
                <Link
                  href={`/search/${share.code.replaceAll(' ', '_')}`}
                  className="rounded-lg border-2 border-accent bg-accent px-2 py-1 font-display font-700 text-white transition-colors hover:bg-accent-hover hover:border-accent-hover"
                >
                  {share.code}
                </Link>
              ) : null}
              <div className="ml-auto text-sm text-text-secondary">
                <div>{dateToKor(new Date(share.createdAt))} 생성</div>
                <div>{dateToKor(new Date(share.expireAt!))} 만료</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
