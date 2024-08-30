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
  uppyFileState,
  uploadProgressState,
} from '@/lib/recoil'
import { useEffect, useRef } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { useSession } from 'next-auth/react'
import UploadProgress from '@/components/file-upload/upload-progress'
import AccessCode from '@/components/file-upload/access-code'
import { Meta, UppyFile } from '@uppy/core'
import useUsedStorage from '@/lib/hooks/useUsedStorage'

export default function FileUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dragRef = useRef<HTMLLabelElement>(null)

  const { handleFileInput, clickFileInput, files, deleteFile } = useHandleFile({
    fileInputRef,
    dragRef,
  })

  const { mutateUsedStorage } = useUsedStorage()

  const fileUploadWorker = useRef<Worker | null>(null)
  const uploadFileList = useRecoilValue(filesState)
  const shareTime = useRecoilValue(shareTimeState)
  const [progress, setProgress] = useRecoilState(uploadProgressState)
  const [code, setCode] = useRecoilState(codeState)
  const setFiles = useSetRecoilState(filesState)
  const setFileData = useSetRecoilState(fileDataState)
  const setShareTimePopUp = useSetRecoilState(shareTimePopUpState)
  const setUppyFile = useSetRecoilState(uppyFileState)

  const { data: session } = useSession()

  useEffect(() => {
    fileUploadWorker.current = new Worker(new URL('./file-upload-worker.ts', import.meta.url), { type: 'module' })

    const handleMessage = async (
      event: MessageEvent<{
        progress?: number
        code?: string
        files?: UppyFile<Meta, Record<string, never>>[]
        file?: UppyFile<Meta, Record<string, never>>
        error?: string
      }>
    ) => {
      if (event.data.progress) {
        setProgress(event.data.progress)
      } else if (event.data.code) {
        setProgress(-1)
        setCode(event.data.code)
        setFileData([])
        setFiles([])
        setUppyFile([])
        await mutateUsedStorage()
      } else if (event.data.files) {
        setUppyFile(event.data.files)
      } else if (event.data.error) {
        alert(event.data.error)
        setProgress(-1)
        setFileData([])
        setFiles([])
        setUppyFile([])
        await mutateUsedStorage()
      }
    }

    fileUploadWorker.current.addEventListener('message', handleMessage)

    return () => {
      fileUploadWorker.current!.terminate()
    }
  }, [mutateUsedStorage, setCode, setFileData, setFiles, setProgress, setUppyFile])

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
        className={`w-full rounded-xl border-2 border-white border-dashed h-[30vh] hover:bg-neutral-900 transition relative`}
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
          className={'cursor-pointer w-full p-4 flex flex-col items-center justify-center h-full'}
        >
          <button className={'text-white flex items-center justify-center flex-col'} onClick={clickFileInput}>
            <FolderOpenIcon className={'size-12 text-white mb-1'} />
            <div className={'text-white text-sm'}>전송할 파일을 드롭하거나 선택해주세요.</div>
          </button>
        </label>
      </div>
      <UserShareStatus />
      <ShareTimePopupButton uploadFunc={uploadFunc} />
      <FileList files={files} deleteFile={deleteFile} />
    </>
  )
}
