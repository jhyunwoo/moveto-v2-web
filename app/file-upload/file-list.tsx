import { TrashIcon } from '@heroicons/react/24/outline'
import formatBytes from '@/lib/format-bytes'
import { motion } from 'framer-motion'

export default function FileList({ files, deleteFile }: { files: File[]; deleteFile: (index: number) => void }) {
  return (
    <div className={'flex flex-col gap-2 py-2 text-white'}>
      {files?.map((file, index) => (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          key={index}
          className={'flex items-start justify-between rounded-lg bg-neutral-900 p-2'}
        >
          <div className={'pr-2'}>
            <div className={'break-all'}>{file.name}</div>
            <div className={'text-sm text-neutral-400'}>{formatBytes(file.size, 2)}</div>
          </div>
          <button
            className={'rounded-lg bg-red-500 p-1 text-white transition-colors hover:bg-red-400'}
            onClick={() => deleteFile(index)}
          >
            <TrashIcon className={'size-6'} />
          </button>
        </motion.div>
      ))}
    </div>
  )
}
