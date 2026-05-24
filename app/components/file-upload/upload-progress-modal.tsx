'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import useMetadataTitle from '@/lib/hooks/use-metadata-title'
import useTotalUploadProgress from '@/lib/hooks/use-total-upload-progress'
import { useFileUploadProgress } from '@/lib/stores/file-upload-progress'
import { PauseIcon, PlayIcon, XMarkIcon, ArrowsPointingInIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/solid'
import { useGlobalUpload } from '@/app/components/file-upload/global-upload-provider'

export default function UploadProgressModal() {
  const { pause, resume, cancel } = useGlobalUpload()
  const [isMinimized, setIsMinimized] = useState(false)
  const { fileUploadProgress, isGeneratingCode, isPaused, uploadError } = useFileUploadProgress((store) => store)
  const setUploadError = useFileUploadProgress((store) => store.setUploadError)
  const totalProgress = useTotalUploadProgress()
  useMetadataTitle(
    isGeneratingCode ? '접근 코드 생성중...' : totalProgress ? `파일 업로드: ${totalProgress}%` : '모베토 Moveto'
  )

  if (uploadError) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-surface-overlay p-4 backdrop-blur-sm"
      >
        <div className="modern-card flex w-full max-w-xl flex-col gap-4 rounded-2xl p-6">
          <div className="font-display text-xl font-700 text-danger">업로드 오류</div>
          <div className="text-text-secondary">{uploadError}</div>
          <button
            type="button"
            onClick={() => setUploadError('')}
            className="cursor-pointer rounded-xl border-2 border-accent bg-accent p-2.5 font-display font-700 text-white transition-colors hover:bg-accent-hover hover:border-accent-hover"
          >
            확인
          </button>
        </div>
      </motion.div>
    )
  }

  if (fileUploadProgress.length > 0 || isGeneratingCode) {
    if (isMinimized) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <div className="modern-card flex w-72 flex-col gap-3 p-4">
            <div className="flex items-center justify-between">
              <div className="font-display text-sm font-700">
                {isGeneratingCode ? '코드 생성중...' : isPaused ? '일시 정지됨' : `업로드 중... ${totalProgress}%`}
              </div>
              <div className="flex items-center gap-1">
                {!isGeneratingCode && (
                  <button
                    type="button"
                    onClick={isPaused ? resume : pause}
                    className="rounded-md p-1 hover:bg-border-subtle transition-colors"
                  >
                    {isPaused ? <PlayIcon className="size-4" /> : <PauseIcon className="size-4" />}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsMinimized(false)}
                  className="rounded-md p-1 hover:bg-border-subtle transition-colors"
                >
                  <ArrowsPointingOutIcon className="size-4" />
                </button>
              </div>
            </div>
            {!isGeneratingCode && (
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-border-subtle">
                <motion.div
                  className="absolute inset-y-0 left-0 origin-left rounded-full bg-accent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: (totalProgress ?? 0) / 100 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  style={{ willChange: 'transform', width: '100%' }}
                />
              </div>
            )}
          </div>
        </motion.div>
      )
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ willChange: 'opacity' }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-surface-overlay p-4 backdrop-blur-sm"
      >
        <div className="modern-card flex max-h-[85dvh] w-full max-w-xl flex-col rounded-2xl p-4 sm:max-h-[70vh] sm:p-6 relative">
          <button
            type="button"
            onClick={() => setIsMinimized(true)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 rounded-md p-2 hover:bg-border-subtle transition-colors"
            title="최소화"
          >
            <ArrowsPointingInIcon className="size-5" />
          </button>
          
          <div className="pb-4 font-display text-xl font-700 pr-10">
            {isGeneratingCode ? '접근 코드 생성중...' : isPaused ? '업로드 일시 정지' : '파일 업로드 중...'}
          </div>

          {!isGeneratingCode && (
            <div className="overflow-auto overflow-x-hidden overscroll-contain">
              {fileUploadProgress.map((data) => (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={data.name} className="flex flex-col mb-3 last:mb-0">
                  <div className="break-all font-display text-sm font-600">{data.name}</div>
                  {data.progress === 0 ? (
                    <div className="h-3 w-full animate-pulse rounded-full bg-border-subtle" />
                  ) : (
                    <div className="relative h-3 w-full overflow-hidden rounded-full bg-border-subtle">
                      <motion.div
                        className="absolute inset-y-0 left-0 origin-left rounded-full bg-accent"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: (data.progress ?? 0) / 100 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        style={{ willChange: 'transform', width: '100%' }}
                      />
                    </div>
                  )}
                  <div className="ml-auto font-display text-xs font-600">{data.progress}%</div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            {!isGeneratingCode && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={isPaused ? resume : pause}
                  className="flex cursor-pointer items-center gap-1.5 rounded-xl border-2 border-border-primary p-2 px-3 font-display text-sm font-600 transition-colors hover:bg-accent-soft"
                >
                  {isPaused ? <PlayIcon className="size-4" /> : <PauseIcon className="size-4" />}
                  <span>{isPaused ? '재개' : '일시 정지'}</span>
                </button>
                <button
                  type="button"
                  onClick={cancel}
                  className="flex cursor-pointer items-center gap-1.5 rounded-xl border-2 border-danger p-2 px-3 font-display text-sm font-600 text-danger transition-colors hover:bg-danger hover:text-white"
                >
                  <XMarkIcon className="size-4" />
                  <span>취소</span>
                </button>
              </div>
            )}
            <div className="ml-auto font-display text-lg font-700">
              {isGeneratingCode ? '접근 코드 생성중...' : `${totalProgress}%`}
            </div>
          </div>
        </div>
      </motion.div>
    )
  } else {
    return null
  }
}
