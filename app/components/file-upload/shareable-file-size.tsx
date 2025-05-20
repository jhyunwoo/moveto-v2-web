'use client'

import { useSession } from 'next-auth/react'
import { motion } from 'motion/react'
import getUserLimit from '@/lib/get-user-limit'
import { useEffect } from 'react'
import useUsedStorage from '@/lib/hooks/use-used-storage'
import ShareableFileSizeBar from '@/app/components/shareable-file-size-bar'
import SharableFileSizeInfo from '@/app/components/sharable-file-size-info'
import useTotalSize from '@/lib/hooks/use-total-size'
import { useDisableUpload } from '@/lib/stores/disable-upload'

export default function ShareableFileSize() {
  const totalSize = useTotalSize()
  const setDisableUpload = useDisableUpload(store => store.setDisableUpload)

  const session = useSession()
  const userPlan = session.data?.user.plan ? `${session.data.user.plan} Plan` : '미인증 사용자'
  const { usedStorage, usedStorageLoading } = useUsedStorage()

  const userShareLimit = getUserLimit(session.data?.user.plan)
  const leftStorage = userShareLimit.storage - totalSize - usedStorage

  useEffect(() => {
    setDisableUpload(leftStorage < 0)
  }, [leftStorage, setDisableUpload])

  return (
    <div className={'flex w-full flex-col rounded-xl border-[1px] border-white bg-neutral-900 p-2 px-4'}>
      {usedStorageLoading ? (
        <div className={'mb-1 h-5 w-24 animate-pulse rounded-full bg-neutral-600 text-center text-sm'} />
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {userPlan}
        </motion.div>
      )}

      <div className={'flex w-full flex-col'}>
        <ShareableFileSizeBar totalStorage={userShareLimit.storage} usedStorage={usedStorage + totalSize} />
        <SharableFileSizeInfo
          totalStorage={userShareLimit.storage}
          usedStorage={usedStorage + totalSize}
          isLoading={usedStorageLoading}
        />
      </div>
    </div>
  )
}
