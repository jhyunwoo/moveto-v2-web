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

export default async function HistoryPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const session = await getSession()
  const currentSearchParams = await searchParams
  const requestedPage = Number(currentSearchParams.page ?? '1')
  const { shareList, pageLimit, currentPage } = await getUserShareHistory(session!.user.id, requestedPage)

  return (
    <div className={'text-white'}>
      <ConfirmShareDelete />
      <Link href={'/profile'} className={'group flex items-center gap-2 pb-2'}>
        <ChevronLeftIcon className={'size-6'} />
        <div className={'group-hover:underline'}>프로필 페이지</div>
      </Link>
      <div className={'py-4 text-xl font-semibold'}>파일 공유 기록</div>
      {shareList.length === 0 && <div className={'p-4 text-center'}>아직 공유한 파일이 없습니다.</div>}
      <div className={'flex w-full items-center justify-end gap-4 p-4'}>
        <Link
          href={`/profile/history?page=${Math.max(1, currentPage - 1)}`}
          className={currentPage <= 1 ? 'pointer-events-none opacity-40' : ''}
        >
          &larr; 이전 페이지
        </Link>
        <div className={'rounded-xl bg-neutral-50 p-1 px-3 text-lg text-neutral-950'}>{currentPage}</div>
        <Link
          href={`/profile/history?page=${Math.min(pageLimit, currentPage + 1)}`}
          className={currentPage >= pageLimit ? 'pointer-events-none opacity-40' : ''}
        >
          다음 페이지 &rarr;
        </Link>
      </div>
      <div className={'grid grid-cols-1 gap-2 md:grid-cols-2'}>
        {shareList.map(share => (
          <div key={share.id} className={'flex flex-col gap-2 rounded-lg bg-neutral-900 p-2'}>
            <div className={'flex items-start justify-between'}>
              <div className={'break-all'}>
                {share.file ? share.file[0] : null}
                {share.file?.length && (share.file.length > 1 ? `외 ${share.file.length - 1}개의 파일` : null)}
              </div>

              <DeleteShareTrashIconButton shareId={share.id} />
            </div>
            <div className={'ml-auto flex w-full items-end justify-between'}>
              {share.code && !isExpired(share.expireAt) ? (
                <Link
                  href={`/search/${share.code.replaceAll(' ', '_')}`}
                  className={'rounded-lg bg-neutral-200 p-1 px-2 font-semibold text-neutral-950'}
                >
                  {share.code}
                </Link>
              ) : null}
              <div className={'ml-auto'}>
                <div className={'text-sm'}>{dateToKor(new Date(share.createdAt))} 생성</div>
                <div className={'text-sm'}>{dateToKor(new Date(share.expireAt!))} 만료</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
