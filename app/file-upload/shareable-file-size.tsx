'use client'

import { useSession } from 'next-auth/react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { disableUploadState, totalFileSizeState } from '@/lib/client/recoil'
import { motion } from 'framer-motion'
import getUserLimit from '@/lib/get-user-limit'
import { useEffect } from 'react'
import useUsedStorage from '@/lib/hooks/use-used-storage'
import ShareableFileSizeBar from '@/components/shareable-file-size-bar'
import SharableFileSizeInfo from '@/components/sharable-file-size-info'
import useUserPlan from '@/lib/hooks/use-user-plan'

export default function ShareableFileSize() {
  const totalSize = useRecoilValue(totalFileSizeState)
  const setDisableUpload = useSetRecoilState(disableUploadState)

  const session = useSession()
  const userPlan = useUserPlan()
  const { usedStorage, usedStorageLoading } = useUsedStorage()

  const userShareLimit = getUserLimit(session.data?.user.plan)
  const leftStorage = userShareLimit.storage - totalSize - usedStorage

  useEffect(() => {
    setDisableUpload(leftStorage < 0)
  }, [leftStorage, setDisableUpload])

  return (
    <div className={'flex w-full flex-col rounded-xl bg-neutral-900 p-2 px-4 ring-1 ring-white'}>
      {usedStorageLoading ? (
        <motion.div
          className={'w-24 animate-pulse rounded-full bg-neutral-600 p-[2px] text-center text-sm'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Loading...
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {userPlan}
        </motion.div>
      )}

      <div className={'flex w-full flex-col'}>
        <ShareableFileSizeBar totalStorage={userShareLimit.storage} usedStorage={usedStorage + totalSize} />
        <SharableFileSizeInfo totalStorage={userShareLimit.storage} usedStorage={usedStorage + totalSize} />
      </div>
    </div>
  )
}
