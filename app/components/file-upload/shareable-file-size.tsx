'use client'

import { useSession } from '@/lib/auth-client'
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
  const setDisableUpload = useDisableUpload((store) => store.setDisableUpload)

  const session = useSession()
  const userPlan = session.data?.user.plan ? `${session.data.user.plan} Plan` : '미인증 사용자'
  const { usedStorage, usedStorageLoading } = useUsedStorage()

  const userShareLimit = getUserLimit(session.data?.user.plan)
  const leftStorage = userShareLimit.storage - totalSize - usedStorage

  useEffect(() => {
    setDisableUpload(leftStorage < 0)
  }, [leftStorage, setDisableUpload])

  return (
    <div className="order-2 flex min-w-0 w-full flex-col md:order-none">
      {usedStorageLoading ? (
        <div className="mb-2 h-4 w-24 animate-pulse rounded bg-border-subtle" />
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-label mb-2 flex items-center justify-between gap-2">
          <span>저장 가능 용량</span>
          <span className="font-500 text-text-muted">{userPlan}</span>
        </motion.div>
      )}

      <div className="flex w-full flex-col">
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
