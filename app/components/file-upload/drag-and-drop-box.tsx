import { FolderOpenIcon } from '@heroicons/react/24/outline'
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
  const { handleFileInput } = useDragAndDropFile({
    inputRef,
    dragRef,
  })
  const [isDragOver, setIsDragOver] = useState(false)

  return (
    <motion.div
      className={`relative h-[25vh] w-full rounded-2xl border-3 border-dashed transition-colors sm:h-[30vh] ${isDragOver ? 'border-accent bg-accent-soft' : 'border-border-primary hover:border-accent hover:bg-accent-soft'}`}
      animate={isDragOver ? { scale: 1.01 } : { scale: 1 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
    >
      <input
        ref={inputRef}
        type="file"
        multiple={true}
        className="hidden"
        id="fileUpload"
        onChange={(data) => {
          data.preventDefault()
          handleFileInput(data.target.files)
        }}
      />
      <label
        htmlFor="fileUpload"
        ref={dragRef}
        className="flex h-full w-full cursor-pointer flex-col items-center justify-center p-4"
        onDragEnter={() => setIsDragOver(true)}
        onDragOver={() => setIsDragOver(true)}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={() => setIsDragOver(false)}
      >
        <div className="flex flex-col items-center justify-center gap-2 text-text-primary">
          <motion.div animate={isDragOver ? { y: -4, scale: 1.05 } : { y: 0, scale: 1 }} transition={{ duration: 0.2 }}>
            <FolderOpenIcon className={`size-14 transition-colors ${isDragOver ? 'text-accent' : 'text-text-secondary'}`} />
          </motion.div>
          <div className="font-display text-sm font-600">
            {isDragOver ? '여기에 드롭하세요!' : '전송할 파일을 드롭하거나 선택해주세요.'}
          </div>
        </div>
      </label>
    </motion.div>
  )
}
