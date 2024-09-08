'use client'

import useHandleFile from '@/lib/hooks/useHandleFile'
import FileList from '@/app/file-upload/file-list'
import ShareableFileSize from '@/app/file-upload/shareable-file-size'
import OpenShareTimeModalButton from '@/app/file-upload/open-share-time-modal-button'
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
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useSession } from 'next-auth/react'
import UploadProgressModal from '@/app/file-upload/upload-progress-modal'
import AccessCodeModal from '@/app/file-upload/access-code-modal'
import { Meta, UppyFile } from '@uppy/core'
import useUsedStorage from '@/lib/hooks/useUsedStorage'
import ShareTimePickerModal from '@/app/file-upload/share-time-picker-modal'
import DragAndDropBox from '@/app/file-upload/drag-and-drop-box'

export default function FileUpload() {
  const inputRef = useRef<HTMLInputElement>(null)
  const dragRef = useRef<HTMLLabelElement>(null)
  const { files, deleteFile } = useHandleFile({
    inputRef,
    dragRef,
  })

  const { mutateUsedStorage } = useUsedStorage()

  const fileUploadWorker = useRef<Worker | null>(null)
  const uploadFileList = useRecoilValue(filesState)
  const shareTime = useRecoilValue(shareTimeState)
  const setProgress = useSetRecoilState(uploadProgressState)
  const setCode = useSetRecoilState(codeState)
  const setFiles = useSetRecoilState(filesState)
  const setFileData = useSetRecoilState(fileDataState)
  const setUppyFile = useSetRecoilState(uppyFileState)
  const setShareTimePopUp = useSetRecoilState(shareTimePopUpState)

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
      <UploadProgressModal />
      <AccessCodeModal />
      <ShareTimePickerModal uploadFunc={uploadFunc} />
      <DragAndDropBox inputRef={inputRef} dragRef={dragRef} />
      <ShareableFileSize />
      <OpenShareTimeModalButton />
      <FileList files={files} deleteFile={deleteFile} />
    </>
  )
}
