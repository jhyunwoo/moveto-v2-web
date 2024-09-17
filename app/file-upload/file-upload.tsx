'use client'

import useDragAndDropFile from '@/lib/hooks/use-drag-and-drop-file'
import ShareableFileSize from '@/app/file-upload/shareable-file-size'
import { useRef, useState } from 'react'
import UploadProgressModal from '@/app/file-upload/upload-progress-modal'
import AccessCodeModal from '@/app/file-upload/access-code-modal'
import { useUppyState } from '@uppy/react'
import ShareTimePickerModal from '@/app/file-upload/share-time-picker-modal'
import DragAndDropBox from '@/app/file-upload/drag-and-drop-box'
import OpenShareTimeModalButton from '@/app/file-upload/open-share-time-modal-button'
import FileList from '@/app/file-upload/file-list'
import { Uppy } from '@uppy/core'
import AwsS3 from '@uppy/aws-s3'

export default function FileUpload() {
  const inputRef = useRef<HTMLInputElement>(null)
  const dragRef = useRef<HTMLLabelElement>(null)
  const [uppy] = useState(() => new Uppy().use(AwsS3, { endpoint: '/api' }))

  const { deleteFile } = useDragAndDropFile({
    inputRef,
    dragRef,
    uppy,
  })
  const fileList = useUppyState(uppy, state => state.files)

  return (
    <>
      <UploadProgressModal />
      <AccessCodeModal />
      <ShareTimePickerModal uppy={uppy} />
      <DragAndDropBox inputRef={inputRef} dragRef={dragRef} uppy={uppy} />
      <ShareableFileSize />
      <OpenShareTimeModalButton uppy={uppy} />
      <FileList files={fileList} deleteFile={deleteFile} />
    </>
  )
}
