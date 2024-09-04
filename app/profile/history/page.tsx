import db from '@/db'
import { share } from '@/db/schema'
import { and, eq } from 'drizzle-orm'
import { auth } from '@/auth'
import Link from 'next/link'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import ConfirmShareDelete from '@/components/confirm-share-delete'
import DeleteShareTrashIconButton from '@/components/delete-share-trash-icon-button'

export const dynamic = 'force-dynamic'

export default async function HistoryPage() {
  const session = await auth()

  const shareList = await db
    .select()
    .from(share)
    .where(and(eq(share.userId, session?.user.id!), eq(share.active, true)))

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

  return (
    <div className={'text-white'}>
      <ConfirmShareDelete />
      <Link href={'/profile'} className={'flex gap-2 items-center group pb-2'}>
        <ChevronLeftIcon className={'size-6'} />
        <div className={'group-hover:underline'}>프로필 페이지</div>
      </Link>
      <div className={'text-xl font-semibold py-4'}>파일 공유 기록</div>
      {shareList.length === 0 && <div className={'text-center p-4'}>아직 공유한 파일이 없습니다.</div>}
      <div className={'grid grid-cols-1 md:grid-cols-2 gap-2'}>
        {shareList.map(share => (
          <div key={share.id} className={'p-2 rounded-lg bg-neutral-900 flex flex-col gap-2'}>
            <div className={'flex justify-between items-start'}>
              <div className={'break-all'}>
                {share.file ? share.file[0] : null}
                {share.file?.length && (share.file?.length > 1 ? `외 ${share.file.length - 1}개의 파일` : null)}
              </div>
              <DeleteShareTrashIconButton code={share.code!} />
            </div>
            <div className={'ml-auto flex w-full justify-between items-end'}>
              {share.code && !isExpired(share.expireAt) ? (
                <Link
                  href={`/search/${share.code.replaceAll(' ', '_')}`}
                  className={'bg-neutral-200 text-neutral-950 p-1 px-2 rounded-lg font-semibold'}
                >
                  {share.code}
                </Link>
              ) : null}
              <div className={'ml-auto'}>
                <div className={'text-sm'}>{dateToKor(share.createdAt)} 생성</div>
                <div className={'text-sm'}>{dateToKor(share.expireAt!)} 만료</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
