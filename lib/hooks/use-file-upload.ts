import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
  codeState,
  filesState,
  fileUploadProgressState,
  shareTimePopUpState,
  shareTimeState,
} from '@/lib/client/recoil'
import { useEffect, useRef } from 'react'

export default function useFileUpload() {
  const files = useRecoilValue(filesState)
  const workerRef = useRef<Worker | null>(null)
  const [shareTimePopUp, setShareTimePopUp] = useRecoilState(shareTimePopUpState)
  const setFileUploadProgress = useSetRecoilState(fileUploadProgressState)
  const shareTime = useRecoilValue(shareTimeState)
  const setCode = useSetRecoilState(codeState)
  const setFiles = useSetRecoilState(filesState)

  useEffect(() => {
    async function handleMessage(event: MessageEvent<WorkerToClient>) {
      console.log(event.data)
      if (event.data.progress?.length) {
        if (shareTimePopUp) setShareTimePopUp(false)
        setFileUploadProgress(event.data.progress)
      } else if (event.data.status === 'Upload Complete' && event.data.id) {
        const requestCode = await fetch(`/api/share/${event.data.id}/code`, {
          method: 'PUT',
          body: JSON.stringify({ shareTime: shareTime }),
        })
        const response = await requestCode.json()
        if (requestCode.ok) {
          setCode(response.code)
          setFileUploadProgress([])
          setFiles([])
        }
      }
    }

    workerRef.current = new Worker(new URL('../worker/file-upload-worker.ts', import.meta.url), {
      type: 'module',
    })
    workerRef.current.addEventListener('message', handleMessage)
  }, [setCode, setFileUploadProgress, setFiles, setShareTimePopUp, shareTime, shareTimePopUp])

  function upload() {
    workerRef.current?.postMessage({ files: files } as ClientToFileUploadWorker)
  }

  return { upload }
}
