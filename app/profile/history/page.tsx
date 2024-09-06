'use client'

import Link from 'next/link'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import ConfirmShareDelete from '@/components/confirm-share-delete'
import DeleteShareTrashIconButton from '@/components/delete-share-trash-icon-button'
import useShares from '@/lib/hooks/useShares'
import { motion } from 'framer-motion'

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

export default function HistoryPage() {
  const { shares } = useShares()

  return (
    <div className={'text-white'}>
      <ConfirmShareDelete />
      <Link href={'/profile'} className={'group flex items-center gap-2 pb-2'}>
        <ChevronLeftIcon className={'size-6'} />
        <div className={'group-hover:underline'}>프로필 페이지</div>
      </Link>
      <div className={'py-4 text-xl font-semibold'}>파일 공유 기록</div>
      {shares?.length === 0 && <div className={'p-4 text-center'}>아직 공유한 파일이 없습니다.</div>}
      <div className={'grid grid-cols-1 gap-2 md:grid-cols-2'}>
        {shares?.map(share => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={share.id}
            className={'flex flex-col gap-2 rounded-lg bg-neutral-900 p-2'}
          >
            <div className={'flex items-start justify-between'}>
              <div className={'break-all'}>
                {share.file ? share.file[0] : null}
                {share.file?.length && (share.file?.length > 1 ? `외 ${share.file.length - 1}개의 파일` : null)}
              </div>
              <DeleteShareTrashIconButton code={share.code!} />
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
          </motion.div>
        ))}
      </div>
    </div>
  )
}
