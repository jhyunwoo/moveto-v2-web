'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useDeleteShare } from '@/lib/stores/delete-share'
import ModalLayout from '@/app/components/modal-layout'

export default function ConfirmShareDelete({ redirect }: { redirect?: string }) {
  const [deleteError, setDeleteError] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const { deleteShare, setDeleteShare } = useDeleteShare((store) => store)
  const router = useRouter()

  async function deleteFile() {
    setDeleteError('')
    setIsDeleting(true)

    try {
      const requestDelete = await fetch(`/api/share/${deleteShare}`, { method: 'DELETE' })
      const response = await requestDelete.json().catch(() => ({}))
      if (!requestDelete.ok) {
        setDeleteError(response.message ?? '파일을 삭제하지 못했습니다.')
        return
      }

      setDeleteShare('')
      if (redirect) router.replace(redirect)
      else router.refresh()
    } catch {
      setDeleteError('네트워크 연결을 확인해주세요.')
    } finally {
      setIsDeleting(false)
    }
  }

  function closeModal() {
    if (isDeleting) return
    setDeleteError('')
    setDeleteShare('')
  }

  return (
    <ModalLayout isOpen={Boolean(deleteShare)} closeModal={closeModal} ariaLabel="공유 삭제 확인">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-danger/10 text-danger">
          <ExclamationTriangleIcon className="size-6" />
        </span>
        <div>
          <h2 className="text-xl font-700">공유 파일을 삭제할까요?</h2>
          <p className="mt-2 text-sm leading-6 text-text-secondary">삭제된 파일과 공유 코드는 다시 복구할 수 없습니다.</p>
        </div>
      </div>

      {deleteError ? <p className="mt-5 rounded-lg bg-danger/10 px-3 py-2 text-sm font-600 text-danger" role="alert">{deleteError}</p> : null}

      <div className="mt-7 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button type="button" onClick={closeModal} disabled={isDeleting} className="btn-secondary px-5">취소</button>
        <button type="button" onClick={deleteFile} disabled={isDeleting} className="btn-danger px-5 disabled:cursor-wait disabled:opacity-60">
          {isDeleting ? '삭제 중...' : '삭제'}
        </button>
      </div>
    </ModalLayout>
  )
}
