'use client'

import useDragAndDropFile from '@/lib/hooks/use-drag-and-drop-file'
import useFileUpload from '@/lib/hooks/use-file-upload'
import FileList from '@/app/components/file-upload/file-list'
import ShareableFileSize from '@/app/components/file-upload/shareable-file-size'
import OpenShareTimeModalButton from '@/app/components/file-upload/open-share-time-modal-button'
import { useRef } from 'react'
import DragAndDropBox from '@/app/components/file-upload/drag-and-drop-box'
import UploadProgressModal from '@/app/components/file-upload/upload-progress-modal'
import AccessCodeModal from '@/app/components/file-upload/access-code-modal'
import ShareTimePickerModal from '@/app/components/file-upload/share-time-picker-modal'

export default function FileUpload() {
  const inputRef = useRef<HTMLInputElement>(null)
  const dragRef = useRef<HTMLLabelElement>(null)
  const { files, deleteFile } = useDragAndDropFile({
    inputRef,
    dragRef,
  })
  const { upload, pause, resume, cancel } = useFileUpload()

  return (
    <>
      <UploadProgressModal pause={pause} resume={resume} cancel={cancel} />
      <AccessCodeModal />
      <ShareTimePickerModal upload={upload} />
      <DragAndDropBox inputRef={inputRef} dragRef={dragRef} />
      <div className="mt-2" />
      <ShareableFileSize />
      <div className="mt-2" />
      <OpenShareTimeModalButton />
      <FileList files={files} deleteFile={deleteFile} />
    </>
  )
}
