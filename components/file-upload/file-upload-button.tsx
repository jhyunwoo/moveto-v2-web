'use client'

import { useEffect, useRef } from 'react'
import { useRecoilValue } from 'recoil'
import { filesState, shareTimeState } from '@/lib/recoil'
import { useSession } from 'next-auth/react'
import { ClientToWorkersMessageType } from '@/lib/types'

export default function FileUploadButton() {
  const fileUploadWorker = useRef<Worker | null>(null)
  const uploadFileList = useRecoilValue(filesState)
  const shareTime = useRecoilValue(shareTimeState)
  const { data: session } = useSession()

  useEffect(() => {
    fileUploadWorker.current = new Worker(new URL('./file-upload-worker.ts', import.meta.url), { type: 'module' })

    const handleMessage = (event: MessageEvent) => {
      console.log(`${event.data} >> [Client] Received from Worker!`)
    }

    fileUploadWorker.current.addEventListener('message', handleMessage)

    return () => {
      fileUploadWorker.current?.terminate()
    }
  }, [])

  return (
    <button
      onClick={() =>
        fileUploadWorker.current?.postMessage({
          files: uploadFileList,
          shareTime: shareTime,
          session: session,
        } as ClientToWorkersMessageType)
      }
      type={'button'}
      className={
        'bg-white text-lg font-semibold p-2 rounded-full text-black mt-8 hover:bg-neutral-200 transition-colors'
      }
    >
      공유
    </button>
  )
}
