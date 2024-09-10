import { useRecoilValue } from 'recoil'
import { filesState } from '@/lib/client/recoil'
import { useEffect, useRef } from 'react'

export default function useFileUpload() {
  const files = useRecoilValue(filesState)
  const workerRef = useRef<Worker | null>(null)

  useEffect(() => {
    workerRef.current = new Worker(new URL('../worker/file-upload-worker.ts', import.meta.url), {
      type: 'module',
    })
  }, [])

  function upload() {
    workerRef.current?.postMessage({ files: files } as ClientToFileUploadWorker)
  }

  return { upload }
}
