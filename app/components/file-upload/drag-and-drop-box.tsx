import { CloudArrowUpIcon, PlusIcon } from '@heroicons/react/24/outline'
import { RefObject, useState } from 'react'
import useDragAndDropFile from '@/lib/hooks/use-drag-and-drop-file'
import { motion } from 'motion/react'

export default function DragAndDropBox({
  inputRef,
  dragRef,
}: {
  inputRef: RefObject<HTMLInputElement | null>
  dragRef: RefObject<HTMLLabelElement | null>
}) {
  const { handleFileInput } = useDragAndDropFile({ inputRef, dragRef })
  const [isDragOver, setIsDragOver] = useState(false)

  return (
    <motion.div
      className={`relative h-64 w-full rounded-lg border border-dashed transition-colors sm:h-[300px] ${
        isDragOver
          ? 'border-accent bg-accent-soft'
          : 'border-border-primary bg-surface/48 hover:border-accent hover:bg-accent-soft/40'
      }`}
      animate={isDragOver ? { scale: 0.995 } : { scale: 1 }}
      transition={{ duration: 0.14, ease: 'easeOut' }}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        className="sr-only"
        id="fileUpload"
        onChange={(event) => {
          event.preventDefault()
          handleFileInput(event.target.files)
        }}
      />
      <label
        htmlFor="fileUpload"
        ref={dragRef}
        className="flex h-full w-full cursor-pointer flex-col items-center justify-center px-4 py-8 text-center"
        onDragEnter={() => setIsDragOver(true)}
        onDragOver={() => setIsDragOver(true)}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={() => setIsDragOver(false)}
      >
        <motion.span
          className="mb-4 flex size-12 items-center justify-center rounded-lg border border-border-subtle bg-surface-elevated text-text-primary shadow-sm"
          animate={isDragOver ? { y: -3 } : { y: 0 }}
          transition={{ duration: 0.16 }}
        >
          <CloudArrowUpIcon className="size-6" />
        </motion.span>
        <span className="font-display text-lg font-700 text-text-primary">
          {isDragOver ? '여기에 파일을 놓으세요' : '전송할 파일을 드롭하거나 선택해주세요.'}
        </span>
        <span className="mt-1.5 text-sm text-text-secondary">여러 파일을 한 번에 선택할 수 있습니다.</span>
        <span className="btn-secondary pointer-events-none mt-5 px-4">
          <PlusIcon className="size-4" />
          파일 선택
        </span>
      </label>
    </motion.div>
  )
}
