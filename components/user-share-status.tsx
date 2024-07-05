'use client'

import { useSession } from 'next-auth/react'
import { useRecoilValue } from 'recoil'
import { totalFileSizeState } from '@/lib/recoil'
import formatBytes from '@/lib/format-bytes'

export default function UserShareStatus() {
  const session = useSession()
  const totalSize = useRecoilValue(totalFileSizeState)
  console.log(totalSize, session)
  return (
    <div className={'w-full p-2 bg-neutral-900 rounded-xl px-4 mt-4'}>
      {totalSize > 0 && (
        <div>
          <div>{session.data?.user.plan} Plan</div>
          <div>{formatBytes(totalSize)}</div>
        </div>
      )}
    </div>
  )
}
