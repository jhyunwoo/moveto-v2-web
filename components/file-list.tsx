import { TrashIcon } from '@heroicons/react/24/outline'
import formatBytes from '@/lib/format-bytes'

export default function FileList({
  files,
  deleteFile,
}: {
  files: File[]
  deleteFile: (index: number) => void
}) {
  return (
    <div className={'text-white py-2 flex flex-col gap-2'}>
      {files?.map((file, index) => (
        <div
          key={index}
          className={'bg-neutral-900 p-1 px-3 rounded-lg flex items-center justify-between'}
        >
          <div>
            <div>{file.name}</div>
            <div className={'text-sm text-neutral-400'}>{formatBytes(file.size, 2)}</div>
          </div>
          <button
            className={'p-1 rounded-lg bg-red-500 text-white hover:bg-red-400 transition-colors'}
            onClick={() => deleteFile(index)}
          >
            <TrashIcon className={'size-6'} />
          </button>
        </div>
      ))}
    </div>
  )
}
