'use client'

import useUsedStorage from '@/lib/hooks/use-used-storage'
import { useSession } from 'next-auth/react'
import getUserLimit from '@/lib/get-user-limit'
import { motion } from 'framer-motion'
import formatBytes from '@/lib/format-bytes'

export default function UserStorageStatusBar() {
  const session = useSession()
  const { usedStorage } = useUsedStorage()
  const userLimit = getUserLimit(session?.data?.user?.plan)

  const leftStorage = userLimit.storage - usedStorage

  return (
    <div className={'flex w-full flex-col py-2'}>
      <div className={`h-2 w-full rounded-full ${leftStorage < 0 ? 'bg-red-500' : 'bg-neutral-700'}`}>
        <motion.div
          initial={{ width: '100%' }}
          animate={{
            width: `${(leftStorage / userLimit.storage) * 100}%`,
            opacity: leftStorage < 0 ? 0 : 1,
          }}
          transition={{ duration: 1 }}
          className={'h-2 rounded-full bg-sky-500'}
        />
      </div>
      <div className={'flex items-center justify-between py-1 text-xs'}>
        <div>{leftStorage >= 0 ? `${formatBytes(leftStorage)} 남음` : `${formatBytes(-leftStorage)} 부족`}</div>
        <div>{formatBytes(userLimit.storage)}</div>
      </div>
    </div>
  )
}
