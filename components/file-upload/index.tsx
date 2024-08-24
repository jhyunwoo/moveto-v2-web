'use client'

import { FolderOpenIcon } from '@heroicons/react/24/outline'
import useHandleFile from '@/lib/hooks/useHandleFile'
import FileList from '@/components/file-upload/file-list'
import UserShareStatus from '@/components/file-upload/user-share-status'
import ShareTimePopupButton from '@/components/file-upload/share-time-popup-button'
import {
  codeState,
  fileDataState,
  filesState,
  shareTimePopUpState,
  shareTimeState,
  uploadProgressState,
} from '@/lib/recoil'
import { useEffect, useRef } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { useSession } from 'next-auth/react'
import UploadProgress from '@/components/file-upload/upload-progress'
import AccessCode from '@/components/file-upload/access-code'

export default function FileUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dragRef = useRef<HTMLLabelElement>(null)

  const { handleFileInput, clickFileInput, files, deleteFile } = useHandleFile({
    fileInputRef,
    dragRef,
  })

  const fileUploadWorker = useRef<Worker | null>(null)
  const uploadFileList = useRecoilValue(filesState)
  const shareTime = useRecoilValue(shareTimeState)
  const [progress, setProgress] = useRecoilState(uploadProgressState)
  const [code, setCode] = useRecoilState(codeState)
  const setFiles = useSetRecoilState(filesState)
  const setFileData = useSetRecoilState(fileDataState)
  const setShareTimePopUp = useSetRecoilState(shareTimePopUpState)
  const { data: session } = useSession()

  useEffect(() => {
    fileUploadWorker.current = new Worker(new URL('./file-upload-worker.ts', import.meta.url), { type: 'module' })

    const handleMessage = (event: MessageEvent<{ progress: number } | { code: string }>) => {
      console.log(event.data)
      if ('progress' in event.data) {
        setProgress(event.data.progress)
      } else if ('code' in event.data) {
        setProgress(-1)
        setCode(event.data.code)
        setFileData([])
        setFiles([])
      }
    }

    fileUploadWorker.current.addEventListener('message', handleMessage)

    return () => {
      fileUploadWorker.current?.terminate()
    }
  }, [setCode, setFileData, setFiles, setProgress])

  function uploadFunc() {
    fileUploadWorker.current?.postMessage({ files: uploadFileList, session, shareTime })
    setShareTimePopUp(false)
    setProgress(0)
  }

  return (
    <>
      {progress > -1 && <UploadProgress />}
      {code && <AccessCode />}
      <div
        className={
          'w-full rounded-xl border-2 border-white border-dashed h-[30vh] hover:bg-neutral-900 transition relative'
        }
      >
        <input
          ref={fileInputRef}
          type={'file'}
          multiple={true}
          className={'hidden'}
          id="fileUpload"
          onChange={data => {
            data.preventDefault()
            handleFileInput(data.target.files)
          }}
        />
        <label
          htmlFor={'fileUpload'}
          ref={dragRef}
          className={'w-full p-4 flex flex-col items-center justify-center h-full'}
        >
          <button className={'text-white flex items-center justify-center flex-col'} onClick={clickFileInput}>
            <FolderOpenIcon className={'size-12 text-white mb-1'} />
            <div className={'text-white text-sm'}>전송할 파일을 클릭 또는 드롭 하세요.</div>
          </button>
        </label>
      </div>
      <UserShareStatus />
      <ShareTimePopupButton uploadFunc={uploadFunc} />
      <FileList files={files} deleteFile={deleteFile} />
    </>
  )
}
