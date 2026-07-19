'use client'

import useTotalSize from '@/lib/hooks/use-total-size'
import { useDisableUpload } from '@/lib/stores/disable-upload'
import { ArrowRightIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { motion } from 'motion/react'
import useHydratedReducedMotion from '@/lib/hooks/use-hydrated-reduced-motion'

export default function FileUploadButton({ upload }: { upload: () => void }) {
  const totalSize = useTotalSize()
  const shouldReduceMotion = useHydratedReducedMotion()
  const storageExceeded = useDisableUpload(store => store.disableUpload)
  const disabled = totalSize === 0 || storageExceeded

  return (
    <div>
      <span className="sr-only">전송</span>
      <motion.button
        onClick={upload}
        disabled={disabled}
        type="button"
        className="btn-primary group h-12 w-full px-5 text-[15px]"
        whileHover={disabled || shouldReduceMotion ? undefined : { transform: 'translateY(-1px)' }}
        whileTap={disabled || shouldReduceMotion ? undefined : { transform: 'scale(0.97)' }}
        transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
        aria-describedby="upload-button-hint"
      >
        {storageExceeded ? (
          <ExclamationTriangleIcon className="size-[18px]" />
        ) : (
          <ArrowRightIcon className="size-[18px] transition-transform duration-200 group-hover:translate-x-0.5" />
        )}
        {storageExceeded ? '저장공간 부족' : '공유 시작'}
      </motion.button>
      <p id="upload-button-hint" className="sr-only">
        {totalSize === 0 ? '파일을 선택하면 활성화됩니다.' : '업로드 후 한글 코드가 생성됩니다.'}
      </p>
    </div>
  )
}
