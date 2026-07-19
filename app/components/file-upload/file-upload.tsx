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
  const { files, deleteFile, handleFileInput, isDragging } = useDragAndDropFile({
    inputRef,
    dragRef,
  })
  const { upload } = useGlobalUpload()

  return (
    <>
      <AccessCodeModal />
      <section
        className="glass-panel border-border-subtle bg-surface/90 dark:bg-surface-alt/88 isolate shadow-[0_30px_90px_color-mix(in_srgb,var(--accent)_9%,transparent)]"
        aria-label="파일 공유 작업 영역"
      >
        <div className="relative p-2.5 sm:p-3">
          <DragAndDropBox
            inputRef={inputRef}
            dragRef={dragRef}
            handleFileInput={handleFileInput}
            isDragging={isDragging}
          />
        </div>
        <FileList files={files} deleteFile={deleteFile} />
        <div className="border-border-subtle bg-surface/72 dark:bg-surface-alt/64 relative mt-3 grid items-end gap-5 border-t px-4 py-4 sm:px-5 md:grid-cols-[minmax(180px,0.8fr)_minmax(220px,1fr)_minmax(190px,0.8fr)] md:gap-7 md:py-3.5">
          <ShareTimePickerModal upload={upload} />
          <ShareableFileSize />
        </div>
      </section>
    </>
  )
}
