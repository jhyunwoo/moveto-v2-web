'use client'

import useUsedStorage from '@/lib/hooks/use-used-storage'
import { useSession } from '@/lib/auth-client'
import getUserLimit from '@/lib/get-user-limit'
import { motion } from 'motion/react'
import formatBytes from '@/lib/format-bytes'

export default function UserStorageStatusBar() {
  const session = useSession()
  const { usedStorage } = useUsedStorage()
  const userLimit = getUserLimit(session?.data?.user?.plan)

  const leftStorage = userLimit.storage - usedStorage

  return (
    <div className="flex w-full flex-col py-2">
      <div
        className={`h-2.5 w-full overflow-hidden rounded-full ${leftStorage < 0 ? 'bg-danger/20' : 'bg-border-subtle'}`}
      >
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{
            scaleX: Math.max(0, leftStorage / userLimit.storage),
            opacity: leftStorage < 0 ? 0 : 1,
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ willChange: 'transform', transformOrigin: 'left' }}
          className="h-full w-full rounded-full bg-accent"
        />
      </div>
      <div className="flex items-center justify-between py-1 font-display text-xs font-500">
        <div className={leftStorage < 0 ? 'font-600 text-danger' : ''}>
          {leftStorage >= 0 ? `${formatBytes(leftStorage)} 남음` : `${formatBytes(-leftStorage)} 부족`}
        </div>
        <div className="text-text-muted">{formatBytes(userLimit.storage)}</div>
      </div>
    </div>
  )
}
