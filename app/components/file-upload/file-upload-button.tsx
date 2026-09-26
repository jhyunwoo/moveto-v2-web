'use client'

import useTotalSize from '@/lib/hooks/use-total-size'
import { useDisableUpload } from '@/lib/stores/disable-upload'

export default function FileUploadButton({ upload }: { upload: () => void }) {
  const totalSize = useTotalSize()
  const storageExceeded = useDisableUpload(store => store.disableUpload)
  const disabled = totalSize === 0 || storageExceeded

  return (
    <div>
      <button
        onClick={upload}
        disabled={disabled}
        type="button"
        className="btn-primary h-11 w-full px-6 md:w-auto"
        aria-describedby="upload-button-hint"
      >
        {storageExceeded ? '저장공간 부족' : '공유 시작'}
      </button>
      <p id="upload-button-hint" className="sr-only">
        {totalSize === 0 ? '파일을 선택하면 활성화됩니다.' : '업로드 후 한글 코드가 생성됩니다.'}
      </p>
    </div>
  )
}
