'use client'

import useDragAndDropFile from '@/lib/hooks/use-drag-and-drop-file'
import FileList from '@/app/components/file-upload/file-list'
import ShareableFileSize from '@/app/components/file-upload/shareable-file-size'
import OpenShareTimeModalButton from '@/app/components/file-upload/open-share-time-modal-button'
import { useRef } from 'react'
import DragAndDropBox from '@/app/components/file-upload/drag-and-drop-box'
import dynamic from 'next/dynamic'

const UploadProgressModal = dynamic(() => import('@/app/components/file-upload/upload-progress-modal'))
const AccessCodeModal = dynamic(() => import('@/app/components/file-upload/access-code-modal'))
const ShareTimePickerModal = dynamic(() => import('@/app/components/file-upload/share-time-picker-modal'))

export default function FileUpload() {
  const inputRef = useRef<HTMLInputElement>(null)
  const dragRef = useRef<HTMLLabelElement>(null)
  const { files, deleteFile } = useDragAndDropFile({
    inputRef,
    dragRef,
  })

  return (
    <>
      <UploadProgressModal />
      <AccessCodeModal />
      <ShareTimePickerModal />
      <DragAndDropBox inputRef={inputRef} dragRef={dragRef} />
      <ShareableFileSize />
      <OpenShareTimeModalButton />
      <FileList files={files} deleteFile={deleteFile} />
    </>
  )
}
