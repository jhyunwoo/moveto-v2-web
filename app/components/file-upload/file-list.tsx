import { TrashIcon } from '@heroicons/react/24/outline'
import formatBytes from '@/lib/format-bytes'
import { AnimatePresence, motion } from 'motion/react'
import FileItemIcon from '@/app/components/file-item-icon'

export default function FileList({ files, deleteFile }: { files: File[]; deleteFile: (index: number) => void }) {
  return (
    <div className="flex flex-col gap-2 py-2 text-text-primary">
      <AnimatePresence mode="popLayout">
        {files?.map((file, index) => (
          <motion.div
            layout
            initial={{ opacity: 0, x: -12, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 12, scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeOut', delay: index * 0.03 }}
            key={`${file.name}-${file.size}-${file.lastModified}`}
            className="modern-card flex items-center justify-between rounded-xl p-3"
          >
            <div className="flex items-center gap-3 pr-2">
              <FileItemIcon file={file} />
              <div>
                <div className="break-all font-display font-600">{file.name}</div>
                <div className="text-sm text-text-muted">{formatBytes(file.size, 2)}</div>
              </div>
            </div>
            <button
              className="cursor-pointer rounded-lg border-2 border-danger p-1 text-danger transition-colors hover:bg-danger hover:text-white"
              onClick={() => deleteFile(index)}
              aria-label={`${file.name} 삭제`}
            >
              <TrashIcon className="size-5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
