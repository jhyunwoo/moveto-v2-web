'use client'

import { motion } from 'motion/react'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'
import { useDeleteShare } from '@/lib/stores/delete-share'

export default function ConfirmShareDelete({ redirect }: { redirect?: string }) {
  const [deleteError, setDeleteError] = useState('')
  const [mounted, setMounted] = useState(false)
  const { deleteShare, setDeleteShare } = useDeleteShare((store) => store)

  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  async function deleteFile() {
    const requestDelete = await fetch(`/api/share/${deleteShare}`, {
      method: 'DELETE',
    })
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

  const modalContent = deleteShare ? (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-surface-overlay p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="brutalist-card flex w-full max-w-lg flex-col items-center gap-3 rounded-2xl p-6">
        {!deleteError ? (
          <>
            <div className="p-4 font-display text-xl font-700">파일을 삭제 하시겠습니까?</div>
            <div className="flex w-full items-center justify-around gap-2">
              <button
                type="button"
                onClick={() => setDeleteShare('')}
                className="w-full cursor-pointer rounded-xl border-2 border-accent bg-accent p-2.5 px-4 font-display font-700 text-white transition-colors hover:bg-accent-hover hover:border-accent-hover"
              >
                취소
              </button>
              <button
                type="button"
                onClick={deleteFile}
                className="w-full cursor-pointer rounded-xl border-2 border-danger p-2.5 px-4 font-display font-700 text-danger transition-colors hover:bg-danger hover:text-white"
              >
                삭제
              </button>
            </div>
          </>
        ) : (
          <div className="font-display font-700 text-danger">{deleteError}</div>
        )}
      </div>
    </motion.div>
  ) : null

  if (!mounted || !deleteShare) return null

  return createPortal(modalContent, document.body)
}
