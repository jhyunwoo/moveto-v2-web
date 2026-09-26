'use client'

import useDragAndDropFile from '@/lib/hooks/use-drag-and-drop-file'
import { useGlobalUpload } from '@/app/components/file-upload/global-upload-provider'
import FileList from '@/app/components/file-upload/file-list'
import ShareableFileSize from '@/app/components/file-upload/shareable-file-size'
import { useRef } from 'react'
import DragAndDropBox from '@/app/components/file-upload/drag-and-drop-box'
import AccessCodeModal from '@/app/components/file-upload/access-code-modal'
import ShareTimePicker from '@/app/components/file-upload/share-time-picker-modal'

export default function FileUpload() {
  const inputRef = useRef<HTMLInputElement>(null)
  const dragRef = useRef<HTMLLabelElement>(null)
  const { files, deleteFile, handleFileInput, isDragging } = useDragAndDropFile({
    inputRef,
    dragRef,
  })
  const { upload } = useGlobalUpload()

  return (
    <>
      <AccessCodeModal />
      <section className="panel overflow-hidden" aria-label="파일 공유 작업 영역">
        <div className="p-3">
          <DragAndDropBox
            inputRef={inputRef}
            dragRef={dragRef}
            handleFileInput={handleFileInput}
            isDragging={isDragging}
          />
        </div>
        <FileList files={files} deleteFile={deleteFile} />
        <div className="border-border-subtle grid items-end gap-4 border-t p-4 sm:p-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
          <ShareTimePicker upload={upload} />
          <ShareableFileSize />
        </div>
      </section>
    </>
  )
}
