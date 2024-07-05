'use client'

import { useRef } from 'react'
import { FolderOpenIcon } from '@heroicons/react/24/outline'
import useHandleFile from '@/lib/hooks/useHandleFile'
import FileList from '@/components/file-list'
import UserShareStatus from '@/components/user-share-status'

export default function FileUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dragRef = useRef<HTMLLabelElement>(null)

  const { handleFileInput, clickFileInput, files, deleteFile } = useHandleFile({
    fileInputRef,
    dragRef,
  })

  return (
    <>
      <div
        className={
          'w-full rounded-xl border-2 border-white border-dashed h-[30vh] hover:bg-neutral-900 transition relative'
        }
      >
        <input
          ref={fileInputRef}
          type={'file'}
          multiple={true}
          className={'hidden'}
          id="fileUpload"
          onChange={(data) => {
            data.preventDefault()
            handleFileInput(data.target.files)
          }}
        />
        <label
          htmlFor={'fileUpload'}
          ref={dragRef}
          className={'w-full p-4 flex flex-col items-center justify-center h-full'}
        >
          <button
            className={'text-white flex items-center justify-center flex-col'}
            onClick={clickFileInput}
          >
            <FolderOpenIcon className={'size-12 text-white mb-1'} />
            <div className={'text-white text-sm'}>전송할 파일을 클릭 또는 드롭 하세요.</div>
          </button>
        </label>
      </div>
      <UserShareStatus />
      <FileList files={files} deleteFile={deleteFile} />
    </>
  )
}
