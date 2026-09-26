import { ArrowUpTrayIcon } from '@heroicons/react/24/outline'
import { RefObject } from 'react'
import DotGrid from '@/app/components/motion/dot-grid'

export default function DragAndDropBox({
  inputRef,
  dragRef,
  handleFileInput,
  isDragging,
  fileCount,
}: {
  inputRef: RefObject<HTMLInputElement | null>
  dragRef: RefObject<HTMLLabelElement | null>
  handleFileInput: (fileList: FileList | null) => void
  isDragging: boolean
  fileCount: number
}) {
  return (
    <div
      className={`relative h-56 w-full overflow-hidden rounded-lg border border-dashed transition-colors duration-200 sm:h-64 ${
        isDragging ? 'border-accent bg-accent-soft' : 'border-border-primary hover:border-text-muted'
      }`}
    >
      <DotGrid pulseKey={fileCount} active={isDragging} />
      <input
        ref={inputRef}
        type="file"
        multiple
        className="peer sr-only"
        id="fileUpload"
        onChange={event => {
          event.preventDefault()
          handleFileInput(event.target.files)
        }}
        aria-describedby="file-upload-description"
      />
      <label
        htmlFor="fileUpload"
        ref={dragRef}
        className="peer-focus-visible:outline-accent relative flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg px-5 text-center peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2"
      >
        <ArrowUpTrayIcon
          className={`size-7 stroke-[1.5] transition-[color,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
            isDragging ? 'text-accent -translate-y-1' : 'text-text-muted'
          }`}
        />
        <span className="font-700 text-text-primary mt-4 text-lg tracking-[-0.02em]">여기에 파일을 놓으세요</span>
        <span id="file-upload-description" className="text-text-secondary mt-1 text-sm">
          여러 파일을 한 번에 선택할 수 있어요.
        </span>
        <span className="btn-secondary pointer-events-none mt-5 px-4">파일 선택</span>
      </label>
    </div>
  )
}
