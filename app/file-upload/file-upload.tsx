'use client'

import useDragAndDropFile from '@/lib/hooks/use-drag-and-drop-file'
import FileList from '@/app/file-upload/file-list'
import ShareableFileSize from '@/app/file-upload/shareable-file-size'
import OpenShareTimeModalButton from '@/app/file-upload/open-share-time-modal-button'
import {
  codeState,
  fileDataState,
  filesState,
  shareTimePopUpState,
  shareTimeState,
  uploadProgressState,
  uppyFileState,
} from '@/lib/client/recoil'
import { useEffect, useRef, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import UploadProgressModal from '@/app/file-upload/upload-progress-modal'
import AccessCodeModal from '@/app/file-upload/access-code-modal'
import ShareTimePickerModal from '@/app/file-upload/share-time-picker-modal'
import DragAndDropBox from '@/app/file-upload/drag-and-drop-box'
import getTotalFileSize from '@/lib/get-total-file-size'
import { Meta, Uppy, UppyFile } from '@uppy/core'
import AwsS3 from '@uppy/aws-s3'

export default function FileUpload() {
  const inputRef = useRef<HTMLInputElement>(null)
  const dragRef = useRef<HTMLLabelElement>(null)
  const { files, deleteFile } = useDragAndDropFile({
    inputRef,
    dragRef,
  })
  const setProgress = useSetRecoilState(uploadProgressState)
  const setShareTimePopUp = useSetRecoilState(shareTimePopUpState)
  const shareTime = useRecoilValue(shareTimeState)
  const setCode = useSetRecoilState(codeState)
  const setUppyFile = useSetRecoilState(uppyFileState)
  const setFiles = useSetRecoilState(filesState)
  const setFilesData = useSetRecoilState(fileDataState)

  function uploadFunc() {
    console.log(files)
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
