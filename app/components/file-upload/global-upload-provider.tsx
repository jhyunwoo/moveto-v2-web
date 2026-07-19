'use client'

import { createContext, useContext, useEffect, useRef, ReactNode } from 'react'
import useUsedStorage from '@/lib/hooks/use-used-storage'
import { useFileUploadProgress } from '@/lib/stores/file-upload-progress'
import { useShareTime } from '@/lib/stores/share-time'
import { useCode } from '@/lib/stores/code'
import { useFiles } from '@/lib/stores/files'
import { useFileData } from '@/lib/stores/file-data'

type GlobalUploadContextType = {
  upload: () => void
  pause: () => void
  resume: () => void
  cancel: () => void
}

const GlobalUploadContext = createContext<GlobalUploadContextType | null>(null)

export function GlobalUploadProvider({ children }: { children: ReactNode }) {
  const workerRef = useRef<Worker | null>(null)
  const { setFileUploadProgress, setIsGeneratingCode, setIsPaused, setUploadError } = useFileUploadProgress(
    (store) => store
  )
  const { shareTime } = useShareTime((store) => store)
  const { setCode } = useCode((store) => store)
  const { files, setFiles } = useFiles((store) => store)
  const { setFileData } = useFileData((store) => store)
  const { mutateUsedStorage } = useUsedStorage()

  // Refs for values that change during upload
  const shareTimeRef = useRef(shareTime)
  useEffect(() => {
    shareTimeRef.current = shareTime
  }, [shareTime])

  // Worker creation (once) and message handler
  useEffect(() => {
    workerRef.current = new Worker(new URL('../../../lib/worker/file-upload-worker.ts', import.meta.url), {
      type: 'module',
    })

    async function handleMessage(event: MessageEvent<WorkerToClient>) {
      if (event.data.progress?.length) {
        setFileUploadProgress(event.data.progress)
      } else if (event.data.status === 'Upload Complete' && event.data.id) {
        setIsGeneratingCode(true)
        try {
          const requestCode = await fetch(`/api/share/${event.data.id}/code`, {
            method: 'PUT',
            body: JSON.stringify({ shareTime: shareTimeRef.current }),
          })
          const response = await requestCode.json()
          if (requestCode.ok) {
            setCode(response.code)
            setFileUploadProgress([])
            setFiles([])
            setFileData([])
            setIsGeneratingCode(false)
            await mutateUsedStorage()
          } else {
            setUploadError(response.error || '코드 생성에 실패했습니다')
            setFileUploadProgress([])
            setIsGeneratingCode(false)
          }
        } catch {
          setUploadError('서버 연결에 실패했습니다')
          setFileUploadProgress([])
          setIsGeneratingCode(false)
        }
      } else if (event.data.status === 'Cancelled' && event.data.id) {
        try {
          await fetch(`/api/share/${event.data.id}`, { method: 'DELETE' })
        } catch {
          // Ignore cleanup errors
        }
        setFileUploadProgress([])
        setFiles([])
        setFileData([])
        setIsPaused(false)
        setUploadError('')
      }
    }

    workerRef.current.addEventListener('message', handleMessage)

    return () => {
      workerRef.current?.terminate()
      workerRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function upload() {
    setUploadError('')
    workerRef.current?.postMessage({
      files: useFiles.getState().files, // Use getState to get latest files
    } as ClientToFileUploadWorker)
  }

  function pause() {
    setIsPaused(true)
    workerRef.current?.postMessage({ action: 'pause' } as ClientToFileUploadWorker)
  }

  function resume() {
    setIsPaused(false)
    workerRef.current?.postMessage({ action: 'resume' } as ClientToFileUploadWorker)
  }

  function cancel() {
    workerRef.current?.postMessage({ action: 'cancel' } as ClientToFileUploadWorker)
  }

  return (
    <GlobalUploadContext.Provider value={{ upload, pause, resume, cancel }}>
      {children}
    </GlobalUploadContext.Provider>
  )
}

export function useGlobalUpload() {
  const context = useContext(GlobalUploadContext)
  if (!context) {
    throw new Error('useGlobalUpload must be used within a GlobalUploadProvider')
  }
  return context
}
