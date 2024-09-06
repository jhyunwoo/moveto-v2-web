'use client'

import { motion } from 'framer-motion'
import { useRecoilState } from 'recoil'
import { deleteShareState } from '@/lib/client/recoil'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ConfirmShareDelete({ redirect }: { redirect?: string }) {
  const [deleteError, setDeleteError] = useState('')
  const [deleteShare, setDeleteShare] = useRecoilState(deleteShareState)

  const router = useRouter()

  async function deleteFile() {
    const requestDelete = await fetch(`/api/share/code/${deleteShare}`, { method: 'DELETE' })
    const response = await requestDelete.json()
    if (requestDelete.ok) {
      setDeleteShare('')
      setDeleteError('')
      if (redirect) {
        router.replace(redirect)
      } else {
        router.refresh()
      }
    } else {
      setDeleteError(response.message)
    }
  }

  return (
    <>
      {deleteShare && (
        <motion.div
          className={
            'fixed left-0 top-0 z-10 flex h-screen w-full items-center justify-center bg-neutral-950/50 p-4 backdrop-blur'
          }
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className={'flex w-full max-w-lg flex-col items-center gap-2 rounded-xl bg-neutral-900 p-4'}>
            {!deleteError ? (
              <>
                <div className={'p-4 text-xl font-semibold'}>파일을 삭제 하시겠습니까?</div>
                <div className={'flex w-full items-center justify-around gap-2'}>
                  <button
                    type={'button'}
                    onClick={() => setDeleteShare('')}
                    className={'w-full rounded-full bg-neutral-100 p-2 px-4 font-semibold text-neutral-950'}
                  >
                    취소
                  </button>
                  <button
                    type={'button'}
                    onClick={deleteFile}
                    className={
                      'w-full rounded-full border-2 border-red-500 bg-neutral-950 p-2 px-4 font-semibold text-red-500'
                    }
                  >
                    삭제
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className={'font-semibold text-red-500'}>{deleteError}</div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </>
  )
}
