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
import { ShareTimeStoreProvider } from '@/components/store-provider/share-time-provider'
import { ShareTimePopUpStoreProvider } from '@/components/store-provider/share-time-pop-up-provider'
import { FileUploadProgressStoreProvider } from '@/components/store-provider/file-upload-progress-provider'
import { CodeStoreProvider } from '@/components/store-provider/code-provider'
import { DisableUploadStoreProvider } from '@/components/store-provider/disable-upload-provider'

export default function FileUpload() {
  const inputRef = useRef<HTMLInputElement>(null)
  const dragRef = useRef<HTMLLabelElement>(null)
  const { files, deleteFile } = useDragAndDropFile({
    inputRef,
    dragRef,
  })

  return (
    <CodeStoreProvider>
      <FileUploadProgressStoreProvider>
        <ShareTimePopUpStoreProvider>
          <ShareTimeStoreProvider>
            <UploadProgressModal />
            <AccessCodeModal />
            <ShareTimePickerModal />
            <DragAndDropBox inputRef={inputRef} dragRef={dragRef} />
            <DisableUploadStoreProvider>
              <ShareableFileSize />
              <OpenShareTimeModalButton />
            </DisableUploadStoreProvider>
            <FileList files={files} deleteFile={deleteFile} />
          </ShareTimeStoreProvider>
        </ShareTimePopUpStoreProvider>
      </FileUploadProgressStoreProvider>
    </CodeStoreProvider>
  )
}
