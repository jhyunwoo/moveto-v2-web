'use client'

import useTotalSize from '@/lib/hooks/use-total-size'
import { useDisableUpload } from '@/lib/stores/disable-upload'
import { ArrowUpTrayIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function FileUploadButton({ upload }: { upload: () => void }) {
  const totalSize = useTotalSize()
  const storageExceeded = useDisableUpload((store) => store.disableUpload)
  const disabled = totalSize === 0 || storageExceeded

  return (
    <div>
      <span className="section-label mb-2 block">전송</span>
      <button onClick={upload} disabled={disabled} type="button" className="btn-primary h-11 w-full px-4">
        {storageExceeded ? (
          <ExclamationTriangleIcon className="size-[18px]" />
        ) : (
          <ArrowUpTrayIcon className="size-[18px]" />
        )}
        {storageExceeded ? '저장공간 부족' : '공유 시작'}
      </button>
      <p className="mt-1.5 min-h-4 text-center text-[11px] text-text-muted">
        {totalSize === 0 ? '파일을 선택하면 활성화됩니다.' : '업로드 후 한글 코드가 생성됩니다.'}
      </p>
    </div>
  )
}
