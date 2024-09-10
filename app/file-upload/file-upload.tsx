'use client'

import useDragAndDropFile from '@/lib/hooks/use-drag-and-drop-file'
import FileList from '@/app/file-upload/file-list'
import ShareableFileSize from '@/app/file-upload/shareable-file-size'
import OpenShareTimeModalButton from '@/app/file-upload/open-share-time-modal-button'
import { useRef } from 'react'
import UploadProgressModal from '@/app/file-upload/upload-progress-modal'
import AccessCodeModal from '@/app/file-upload/access-code-modal'
import ShareTimePickerModal from '@/app/file-upload/share-time-picker-modal'
import DragAndDropBox from '@/app/file-upload/drag-and-drop-box'
import useFileUpload from '@/lib/hooks/use-file-upload'

export default function FileUpload() {
  const inputRef = useRef<HTMLInputElement>(null)
  const dragRef = useRef<HTMLLabelElement>(null)
  const { files, deleteFile } = useDragAndDropFile({
    inputRef,
    dragRef,
  })

  const { upload } = useFileUpload()

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
