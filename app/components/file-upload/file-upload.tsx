'use client'

import useDragAndDropFile from '@/lib/hooks/use-drag-and-drop-file'
import { useGlobalUpload } from '@/app/components/file-upload/global-upload-provider'
import FileList from '@/app/components/file-upload/file-list'
import ShareableFileSize from '@/app/components/file-upload/shareable-file-size'
import { useRef } from 'react'
import DragAndDropBox from '@/app/components/file-upload/drag-and-drop-box'
import AccessCodeModal from '@/app/components/file-upload/access-code-modal'
import ShareTimePickerModal from '@/app/components/file-upload/share-time-picker-modal'

export default function FileUpload() {
  const inputRef = useRef<HTMLInputElement>(null)
  const dragRef = useRef<HTMLLabelElement>(null)
  const { files, deleteFile } = useDragAndDropFile({
    inputRef,
    dragRef,
  })
  const { upload } = useGlobalUpload()

  return (
    <>
      <AccessCodeModal />
      <section className="glass-panel p-3 sm:p-5" aria-label="파일 공유 작업 영역">
        <DragAndDropBox inputRef={inputRef} dragRef={dragRef} />
        <FileList files={files} deleteFile={deleteFile} />
        <div className="mt-3 grid items-end gap-4 border-t border-border-subtle pt-4 md:grid-cols-[minmax(180px,0.8fr)_minmax(220px,1fr)_minmax(190px,0.8fr)] md:gap-6">
          <ShareTimePickerModal upload={upload} />
          <ShareableFileSize />
        </div>
      </section>
    </>
  )
}
