'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
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
  const statusText = isGeneratingCode ? '공유 코드 생성 중' : isPaused ? '업로드 일시 정지' : '파일 업로드 중'

  useMetadataTitle(isGeneratingCode ? '공유 코드 생성 중' : totalProgress ? `파일 업로드 ${totalProgress}%` : '모베토 Moveto')

  if (uploadError) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface-overlay p-4 backdrop-blur-md">
        <section className="glass-panel flex w-full max-w-lg flex-col gap-4 p-6" role="alertdialog" aria-label="업로드 오류">
          <h2 className="text-xl font-700 text-danger">업로드를 완료하지 못했습니다</h2>
          <p className="text-sm leading-6 text-text-secondary">{uploadError}</p>
          <button type="button" onClick={() => setUploadError('')} className="btn-primary self-end px-6">확인</button>
        </section>
      </div>
    )
  }

  if (fileUploadProgress.length === 0 && !isGeneratingCode) return null

  if (isMinimized) {
    return (
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="fixed bottom-4 left-4 right-4 z-50 sm:left-auto sm:w-80">
        <section className="glass-panel p-4" aria-label="업로드 진행 상황">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="truncate text-sm font-700">{statusText}</div>
              <div className="mt-1 text-xs text-text-secondary">{isGeneratingCode ? '잠시만 기다려주세요.' : `${totalProgress}% 완료`}</div>
            </div>
            <div className="flex items-center">
              {!isGeneratingCode ? (
                <button type="button" onClick={isPaused ? resume : pause} className="icon-button" aria-label={isPaused ? '업로드 재개' : '업로드 일시 정지'} title={isPaused ? '재개' : '일시 정지'}>
                  {isPaused ? <PlayIcon className="size-4" /> : <PauseIcon className="size-4" />}
                </button>
              ) : null}
              <button type="button" onClick={() => setIsMinimized(false)} className="icon-button" aria-label="업로드 창 펼치기" title="펼치기">
                <ArrowsPointingOutIcon className="size-4" />
              </button>
            </div>
          </div>
          {!isGeneratingCode ? <ProgressBar progress={totalProgress ?? 0} className="mt-3" /> : null}
        </section>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center bg-surface-overlay p-4 backdrop-blur-md">
      <section className="glass-panel relative flex max-h-[82dvh] w-full max-w-xl flex-col p-5 sm:p-7" role="dialog" aria-modal="true" aria-label="업로드 진행 상황">
        <button type="button" onClick={() => setIsMinimized(true)} className="icon-button absolute right-4 top-4 sm:right-6 sm:top-6" aria-label="업로드 창 최소화" title="최소화">
          <ArrowsPointingInIcon className="size-5" />
        </button>

        <div className="pr-12">
          <h2 className="text-xl font-700">{statusText}</h2>
          <p className="mt-1 text-sm text-text-secondary">{isGeneratingCode ? '업로드한 파일에 연결할 공유 코드를 만들고 있습니다.' : `전체 ${totalProgress}% 완료`}</p>
        </div>

        {!isGeneratingCode ? (
          <div className="mt-6 overflow-y-auto">
            {fileUploadProgress.map((data) => (
              <div key={data.name} className="border-b border-border-subtle py-3 first:pt-0 last:border-b-0 last:pb-0">
                <div className="flex items-center justify-between gap-3 text-xs">
                  <span className="min-w-0 truncate font-600 text-text-primary">{data.name}</span>
                  <span className="shrink-0 text-text-secondary">{data.progress ?? 0}%</span>
                </div>
                <ProgressBar progress={data.progress ?? 0} className="mt-2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 h-1.5 w-full overflow-hidden rounded-full bg-border-subtle">
            <motion.div className="h-full w-1/3 rounded-full bg-accent" animate={{ x: ['-100%', '300%'] }} transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }} />
          </div>
        )}

        {!isGeneratingCode ? (
          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button type="button" onClick={cancel} className="btn-danger px-4">
              <XMarkIcon className="size-4" />
              취소
            </button>
            <button type="button" onClick={isPaused ? resume : pause} className="btn-secondary px-4">
              {isPaused ? <PlayIcon className="size-4" /> : <PauseIcon className="size-4" />}
              {isPaused ? '업로드 재개' : '일시 정지'}
            </button>
          </div>
        ) : null}
      </section>
    </motion.div>
  )
}

function ProgressBar({ progress, className = '' }: { progress: number; className?: string }) {
  return (
    <div className={`h-1.5 w-full overflow-hidden rounded-full bg-border-subtle ${className}`} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
      <motion.div className="h-full w-full origin-left rounded-full bg-accent" initial={{ scaleX: 0 }} animate={{ scaleX: progress / 100 }} transition={{ duration: 0.25, ease: 'easeOut' }} />
    </div>
  )
}
