import { TrashIcon } from '@heroicons/react/24/outline'
import formatBytes from '@/lib/format-bytes'
import { AnimatePresence, motion } from 'motion/react'
import FileItemIcon from '@/app/components/file-item-icon'

export default function FileList({ files, deleteFile }: { files: File[]; deleteFile: (index: number) => void }) {
  if (!files.length) return null

  return (
    <div className="mt-3 overflow-hidden rounded-lg border border-border-subtle bg-surface/56 text-text-primary">
      <div className="flex items-center justify-between border-b border-border-subtle px-4 py-2.5">
        <h2 className="text-sm font-700">선택한 파일</h2>
        <span className="text-xs text-text-secondary">{files.length}개</span>
      </div>
      <AnimatePresence mode="popLayout">
        {files.map((file, index) => (
          <motion.div
            layout
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            key={`${file.name}-${file.size}-${file.lastModified}`}
            className="flex min-h-16 items-center justify-between gap-3 border-b border-border-subtle px-4 py-2.5 last:border-b-0"
          >
            <div className="flex min-w-0 items-center gap-3">
              <FileItemIcon file={file} />
              <div className="min-w-0">
                <div className="truncate text-sm font-600">{file.name}</div>
                <div className="mt-0.5 text-xs text-text-muted">{formatBytes(file.size, 2)}</div>
              </div>
            </div>
            <button
              type="button"
              className="icon-button text-danger hover:border-danger/30 hover:bg-danger/5 hover:text-danger"
              onClick={() => deleteFile(index)}
              aria-label={`${file.name} 삭제`}
              title="파일 제거"
            >
              <TrashIcon className="size-[18px]" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
