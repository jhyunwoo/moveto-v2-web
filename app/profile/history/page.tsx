'use client'

import Link from 'next/link'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import ConfirmShareDelete from '@/components/confirm-share-delete'
import DeleteShareTrashIconButton from '@/components/delete-share-trash-icon-button'
import useUserShareHistory from '@/lib/hooks/use-user-share-history'
import { motion } from 'framer-motion'
import { useState } from 'react'

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
  const [page, setPage] = useState(1)
  const { shares, pageLimit, sharesLoading } = useUserShareHistory(page)

  function handleNextPage() {
    if (pageLimit && page < pageLimit) {
      setPage(prev => prev + 1)
    }
  }
  function handlePrevPage() {
    if (page > 1) {
      setPage(prev => prev - 1)
    }
  }

  return (
    <div className={'text-white'}>
      <ConfirmShareDelete />
      <Link href={'/profile'} className={'group flex items-center gap-2 pb-2'}>
        <ChevronLeftIcon className={'size-6'} />
        <div className={'group-hover:underline'}>프로필 페이지</div>
      </Link>
      <div className={'py-4 text-xl font-semibold'}>파일 공유 기록</div>
      {shares?.length === 0 && <div className={'p-4 text-center'}>아직 공유한 파일이 없습니다.</div>}
      <div className={'flex w-full items-center justify-end gap-4 p-4'}>
        <button type={'button'} onClick={handlePrevPage}>
          &larr; 이전 페이지
        </button>
        <div className={'rounded-xl bg-neutral-50 p-1 px-3 text-lg text-neutral-950'}>{page}</div>
        <button type={'button'} onClick={handleNextPage}>
          다음 페이지 &rarr;
        </button>
      </div>
      {sharesLoading ? (
        <div className={'grid grid-cols-1 gap-2 md:grid-cols-2'}>
          <div className={'h-[88px] w-full animate-pulse rounded-xl bg-neutral-800'} />
          <div className={'h-[88px] w-full animate-pulse rounded-xl bg-neutral-800'} />
          <div className={'h-[88px] w-full animate-pulse rounded-xl bg-neutral-800'} />
          <div className={'h-[88px] w-full animate-pulse rounded-xl bg-neutral-800'} />
          <div className={'h-[88px] w-full animate-pulse rounded-xl bg-neutral-800'} />
          <div className={'h-[88px] w-full animate-pulse rounded-xl bg-neutral-800'} />
          <div className={'h-[88px] w-full animate-pulse rounded-xl bg-neutral-800'} />
          <div className={'h-[88px] w-full animate-pulse rounded-xl bg-neutral-800'} />
          <div className={'h-[88px] w-full animate-pulse rounded-xl bg-neutral-800'} />
          <div className={'h-[88px] w-full animate-pulse rounded-xl bg-neutral-800'} />
        </div>
      ) : (
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
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
