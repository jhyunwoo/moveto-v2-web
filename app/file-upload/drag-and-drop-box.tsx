import { FolderOpenIcon } from '@heroicons/react/24/outline'
import { RefObject } from 'react'
import useDragAndDropFile from '@/lib/hooks/use-drag-and-drop-file'

export default function DragAndDropBox({
  inputRef,
  dragRef,
}: {
  inputRef: RefObject<HTMLInputElement|null>
  dragRef: RefObject<HTMLLabelElement|null>
}) {
  const { handleFileInput, clickFileInput } = useDragAndDropFile({
    inputRef,
    dragRef,
  })
  return (
    <div
      className={`relative h-[30vh] w-full rounded-xl border-2 border-dashed border-white transition hover:bg-neutral-900`}
    >
      <input
        ref={inputRef}
        type={'file'}
        multiple={true}
        className={'hidden'}
        id="fileUpload"
        onChange={data => {
          data.preventDefault()
          handleFileInput(data.target.files)
        }}
      />
      <label
        htmlFor={'fileUpload'}
        ref={dragRef}
        className={'flex h-full w-full cursor-pointer flex-col items-center justify-center p-4'}
      >
        <button className={'flex flex-col items-center justify-center text-white'} onClick={clickFileInput}>
          <FolderOpenIcon className={'mb-1 size-12 text-white'} />
          <div className={'text-sm text-white'}>전송할 파일을 드롭하거나 선택해주세요.</div>
        </button>
      </label>
    </div>
  )
}
