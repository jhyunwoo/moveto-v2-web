'use client'

import { useState } from 'react'
import useMetadataTitle from '@/lib/hooks/use-metadata-title'
import useTotalUploadProgress from '@/lib/hooks/use-total-upload-progress'
import { useFileUploadProgress } from '@/lib/stores/file-upload-progress'
import {
  PauseIcon,
  PlayIcon,
  XMarkIcon,
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
} from '@heroicons/react/24/outline'
import { useGlobalUpload } from '@/app/components/file-upload/global-upload-provider'
import PacketGrid from '@/app/components/motion/packet-grid'
import AnimatedNumber from '@/app/components/motion/animated-number'

export default function UploadProgressModal() {
  const { pause, resume, cancel } = useGlobalUpload()
  const [isMinimized, setIsMinimized] = useState(false)
  const { fileUploadProgress, isGeneratingCode, isPaused, uploadError } = useFileUploadProgress(store => store)
  const setUploadError = useFileUploadProgress(store => store.setUploadError)
  const totalProgress = useTotalUploadProgress()
  const statusText = isGeneratingCode ? '공유 코드 생성 중' : isPaused ? '업로드 일시 정지' : '파일 업로드 중'

  useMetadataTitle(
    isGeneratingCode ? '공유 코드 생성 중' : totalProgress ? `파일 업로드 ${totalProgress}%` : '모베토 Moveto'
  )

  if (uploadError) {
    return (
      <div className="bg-surface-overlay fixed inset-0 z-50 flex items-center justify-center p-4">
        <section className="panel flex w-full max-w-md flex-col gap-3 p-6" role="alertdialog" aria-label="업로드 오류">
          <h2 className="font-700 text-danger text-lg">업로드를 완료하지 못했습니다</h2>
          <p className="text-text-secondary text-sm leading-6">{uploadError}</p>
          <button type="button" onClick={() => setUploadError('')} className="btn-primary mt-2 self-end px-6">
            확인
          </button>
        </section>
      </div>
    )
  }

  if (fileUploadProgress.length === 0 && !isGeneratingCode) return null

  if (isMinimized) {
    return (
      <div className="fade-in fixed right-4 bottom-4 left-4 z-50 sm:left-auto sm:w-80">
        <section className="panel p-4 shadow-lg shadow-black/5" aria-label="업로드 진행 상황">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="font-700 truncate text-sm">{statusText}</div>
              <div className="text-text-muted mt-0.5 font-mono text-xs">
                {isGeneratingCode ? '잠시만 기다려주세요.' : `${totalProgress}%`}
              </div>
            </div>
            <div className="flex items-center">
              {!isGeneratingCode ? (
                <button
                  type="button"
                  onClick={isPaused ? resume : pause}
                  className="icon-button"
                  aria-label={isPaused ? '업로드 재개' : '업로드 일시 정지'}
                  title={isPaused ? '재개' : '일시 정지'}
                >
                  {isPaused ? <PlayIcon className="size-4" /> : <PauseIcon className="size-4" />}
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => setIsMinimized(false)}
                className="icon-button"
                aria-label="업로드 창 펼치기"
                title="펼치기"
              >
                <ArrowsPointingOutIcon className="size-4" />
              </button>
            </div>
          </div>
          <ProgressBar progress={isGeneratingCode ? 100 : totalProgress} className="mt-3" />
        </section>
      </div>
    )
  }

  return (
    <div className="bg-surface-overlay fixed inset-0 z-50 flex items-center justify-center p-4">
      <section
        className="panel fade-in relative flex max-h-[82dvh] w-full max-w-lg flex-col p-5 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-label="업로드 진행 상황"
      >
        <button
          type="button"
          onClick={() => setIsMinimized(true)}
          className="icon-button absolute top-4 right-4"
          aria-label="업로드 창 최소화"
          title="최소화"
        >
          <ArrowsPointingInIcon className="size-4" />
        </button>

        <div className="pr-12">
          <p className="mono-label">{isGeneratingCode ? 'Generating code' : 'Uploading'}</p>
          <div className="font-800 text-text-primary mt-3 flex items-baseline text-6xl tracking-[-0.05em] tabular-nums">
            <AnimatedNumber value={isGeneratingCode ? 100 : totalProgress} />
            <span className="text-text-muted ml-1 text-2xl">%</span>
          </div>
          <h2 className="font-700 mt-2 text-lg">{statusText}</h2>
          {isGeneratingCode ? (
            <p className="text-text-secondary mt-1 text-sm">업로드한 파일에 연결할 공유 코드를 만들고 있습니다.</p>
          ) : null}
        </div>

        <div className="mt-6">
          <PacketGrid progress={totalProgress} generating={isGeneratingCode} />
        </div>
        {isGeneratingCode ? null : (
          <>
            <ul className="mt-5 overflow-y-auto">
              {fileUploadProgress.map((data, index) => (
                <li key={`${data.name}-${index}`} className="border-border-subtle border-b py-2.5 last:border-b-0">
                  <div className="flex items-center justify-between gap-3 text-xs">
                    <span className="font-500 text-text-primary min-w-0 truncate">{data.name}</span>
                    <span className="text-text-muted shrink-0 font-mono">{Math.round(data.progress ?? 0)}%</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button type="button" onClick={cancel} className="btn-danger px-4">
                <XMarkIcon className="size-4" />
                취소
              </button>
              <button type="button" onClick={isPaused ? resume : pause} className="btn-secondary px-4">
                {isPaused ? <PlayIcon className="size-4" /> : <PauseIcon className="size-4" />}
                {isPaused ? '업로드 재개' : '일시 정지'}
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  )
}

function ProgressBar({ progress, className = '' }: { progress: number; className?: string }) {
  return (
    <div
      className={`bg-border-subtle h-1 w-full overflow-hidden rounded-full ${className}`}
      role="progressbar"
      aria-label="전체 업로드 진행률"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
    >
      <div
        className="bg-accent h-full w-full origin-left rounded-full transition-transform duration-300 ease-out"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  )
}
