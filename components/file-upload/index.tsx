'use client'

import { FolderOpenIcon } from '@heroicons/react/24/outline'
import useHandleFile from '@/lib/hooks/useHandleFile'
import FileList from '@/components/file-upload/file-list'
import ShareableFileSize from '@/components/file-upload/shareable-file-size'
import OpenShareTimeModalButton from '@/components/file-upload/open-share-time-modal-button'
import {
  codeState,
  fileDataState,
  filesState,
  shareTimePopUpState,
  shareTimeState,
  uppyFileState,
  uploadProgressState,
} from '@/lib/client/recoil'
import { useEffect, useRef } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { useSession } from 'next-auth/react'
import UploadProgress from '@/components/file-upload/upload-progress'
import AccessCode from '@/components/file-upload/access-code'
import { Meta, UppyFile } from '@uppy/core'
import useUsedStorage from '@/lib/hooks/useUsedStorage'
import ShareTimePickerModal from '@/components/file-upload/share-time-picker-modal'

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
  const setUppyFile = useSetRecoilState(uppyFileState)
  const [shareTimePopUp, setShareTimePopUp] = useRecoilState(shareTimePopUpState)

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
      {shareTimePopUp && <ShareTimePickerModal uploadFunc={uploadFunc} />}
      <div
        className={`relative h-[30vh] w-full rounded-xl border-2 border-dashed border-white transition hover:bg-neutral-900`}
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
          className={'flex h-full w-full cursor-pointer flex-col items-center justify-center p-4'}
        >
          <button className={'flex flex-col items-center justify-center text-white'} onClick={clickFileInput}>
            <FolderOpenIcon className={'mb-1 size-12 text-white'} />
            <div className={'text-sm text-white'}>전송할 파일을 드롭하거나 선택해주세요.</div>
          </button>
        </label>
      </div>
      <ShareableFileSize />
      <OpenShareTimeModalButton />
      <FileList files={files} deleteFile={deleteFile} />
    </>
  )
}
