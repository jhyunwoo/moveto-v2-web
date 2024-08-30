'use client'

import { useSession } from 'next-auth/react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { disableUploadState, totalFileSizeState } from '@/lib/recoil'
import formatBytes from '@/lib/format-bytes'
import { motion } from 'framer-motion'
import getUserLimit from '@/lib/get-user-limit'
import { useEffect, useState } from 'react'
import getBytes from '@/lib/get-bytes'
import useUsedStorage from '@/lib/hooks/useUsedStorage'

export default function UserShareStatus() {
  const session = useSession()
  const totalSize = useRecoilValue(totalFileSizeState)
  const [userLimit, setUserLimit] = useState({ time: 10, storage: getBytes(50, 'MB') })
  const [leftStorage, setLeftStorage] = useState(0)
  const { usedStorage, usedStorageLoading } = useUsedStorage()

  const setDisableUpload = useSetRecoilState(disableUploadState)

  useEffect(() => {
    setLeftStorage(userLimit.storage - totalSize - usedStorage)
  }, [totalSize, usedStorage, userLimit.storage])

  useEffect(() => {
    if (session.data?.user.plan) {
      setUserLimit(getUserLimit(session.data?.user.plan))
    }
  }, [session.data?.user.plan])

  useEffect(() => {
    if (leftStorage < 0) {
      setDisableUpload(true)
    }
  }, [leftStorage, setDisableUpload])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={'w-full p-2 bg-neutral-900 rounded-xl px-4 ring-1 ring-white flex flex-col'}
    >
      {usedStorageLoading ? (
        <motion.div
          className={'w-24 h-6 rounded-full bg-neutral-700 animate-pulse'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {session.data?.user.plan ? session.data?.user.plan + ' Plan' : '미인증 사용자'}
        </motion.div>
      )}

      <div className={'w-full flex flex-col'}>
        <div className={`w-full h-2 rounded-full ${leftStorage < 0 ? 'bg-red-500' : 'bg-neutral-700'}`}>
          <motion.div
            initial={{ width: '100%' }}
            animate={{
              width: `${(leftStorage / userLimit.storage) * 100}%`,
              opacity: leftStorage < 0 ? 0 : 1,
            }}
            transition={{ duration: 1 }}
            className={'bg-sky-500 h-2 rounded-full'}
          />
        </div>
        <div className={'flex justify-between items-center text-xs'}>
          <div>{leftStorage >= 0 ? `${formatBytes(leftStorage)} 남음` : `${formatBytes(-leftStorage)} 부족`}</div>
          <div>{formatBytes(userLimit.storage)}</div>
        </div>
      </div>
    </motion.div>
  )
}
