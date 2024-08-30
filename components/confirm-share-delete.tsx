'use client'

import { motion } from 'framer-motion'
import { useRecoilState } from 'recoil'
import { deleteShareState } from '@/lib/recoil'
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
            'fixed top-0 left-0 w-full h-screen z-10 flex items-center justify-center bg-neutral-950/50 backdrop-blur p-4'
          }
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className={'p-4 rounded-xl flex flex-col gap-2 bg-neutral-900 w-full max-w-lg items-center'}>
            {!deleteError ? (
              <>
                <div className={'text-xl font-semibold p-4'}>파일을 삭제 하시겠습니까?</div>
                <div className={'flex w-full gap-2 items-center justify-around'}>
                  <button
                    type={'button'}
                    onClick={() => setDeleteShare('')}
                    className={'bg-neutral-100 text-neutral-950 w-full rounded-full p-2 px-4 font-semibold'}
                  >
                    취소
                  </button>
                  <button
                    type={'button'}
                    onClick={deleteFile}
                    className={
                      'bg-neutral-950 text-red-500 w-full border-red-500 border-2 rounded-full p-2 px-4 font-semibold'
                    }
                  >
                    삭제
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className={'text-red-500 font-semibold'}>{deleteError}</div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </>
  )
}
