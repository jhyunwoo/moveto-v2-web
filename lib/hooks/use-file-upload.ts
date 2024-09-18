import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
  codeState,
  fileDataState,
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
  const setFileData = useSetRecoilState(fileDataState)

  useEffect(() => {
    // Service Worker로부터 메시지를 받아 처리하는 함수
    async function handleMessage(event: MessageEvent<WorkerToClient>) {
      // 파일 업로드 진행 상태 처리
      if (event.data.progress?.length) {
        if (shareTimePopUp) setShareTimePopUp(false)
        setFileUploadProgress(event.data.progress)
        // 파일 업로드 완료 후 접근 코드 요청
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
          setFileData([])
        }
      }
    }
    // Service Worker 생성
    workerRef.current = new Worker(new URL('../worker/file-upload-worker.ts', import.meta.url), {
      type: 'module',
    })
    // Service Worker 로부터 메시지를 받아 처리하는 이벤트 리스너 등록
    workerRef.current.addEventListener('message', handleMessage)
  }, [setCode, setFileUploadProgress, setFiles, setShareTimePopUp, shareTime, shareTimePopUp])

  /**
   * 추가한 파일을 업로드 하는 함수
   * Service Worker 에서 Uppy 를 사용해 파일을 업로드
   * @returns void
   */
  function upload() {
    workerRef.current?.postMessage({ files: files } as ClientToFileUploadWorker)
  }

  return { upload }
}
