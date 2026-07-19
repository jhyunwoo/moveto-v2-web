import { TrashIcon } from '@heroicons/react/24/outline'
import formatBytes from '@/lib/format-bytes'
import { AnimatePresence, motion } from 'motion/react'
import FileItemIcon from '@/app/components/file-item-icon'
import useHydratedReducedMotion from '@/lib/hooks/use-hydrated-reduced-motion'

export default function FileList({ files, deleteFile }: { files: File[]; deleteFile: (index: number) => void }) {
  const shouldReduceMotion = useHydratedReducedMotion()

  if (!files.length) return null

  return (
    <div className="border-border-subtle bg-surface/78 text-text-primary dark:bg-surface-alt/72 relative mx-2.5 mt-1 overflow-hidden rounded-[14px] border sm:mx-3">
      <div className="border-border-subtle flex items-center justify-between border-b px-4 py-3 sm:px-5">
        <h2 className="font-700 text-sm tracking-[-0.01em]">선택한 파일</h2>
        <span className="bg-accent-soft font-700 text-accent rounded-md px-2 py-1 text-[11px]">{files.length}개</span>
      </div>
      <div className="max-h-56 overflow-y-auto">
        <AnimatePresence mode="popLayout" initial={false}>
          {files.map((file, index) => (
            <motion.div
              layout={!shouldReduceMotion}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
              key={`${file.name}-${file.size}-${file.lastModified}`}
              className="group/file border-border-subtle hover:bg-accent-soft/35 flex min-h-[4.5rem] items-center justify-between gap-3 border-b px-4 py-3 transition-colors last:border-b-0 sm:px-5"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="border-border-subtle bg-surface-subtle flex size-10 shrink-0 items-center justify-center rounded-lg border">
                  <FileItemIcon file={file} />
                </span>
                <div className="min-w-0">
                  <div className="font-650 truncate text-sm">{file.name}</div>
                  <div className="text-text-muted mt-1 text-xs">{formatBytes(file.size, 2)}</div>
                </div>
              </div>
              <button
                type="button"
                className="icon-button text-text-muted hover:border-danger/30 hover:bg-danger/5 hover:text-danger opacity-80 group-hover/file:opacity-100"
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
    </div>
  )
}
