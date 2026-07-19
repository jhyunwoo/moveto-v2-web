import { ArrowDownTrayIcon, PlusIcon } from '@heroicons/react/24/outline'
import { RefObject } from 'react'
import { motion } from 'motion/react'
import useHydratedReducedMotion from '@/lib/hooks/use-hydrated-reduced-motion'

export default function DragAndDropBox({
  inputRef,
  dragRef,
  handleFileInput,
  isDragging,
}: {
  inputRef: RefObject<HTMLInputElement | null>
  dragRef: RefObject<HTMLLabelElement | null>
  handleFileInput: (fileList: FileList | null) => void
  isDragging: boolean
}) {
  const shouldReduceMotion = useHydratedReducedMotion()

  return (
    <motion.div
      className={`group relative h-[16rem] w-full overflow-hidden rounded-[14px] border border-dashed transition-[border-color,background-color,box-shadow] duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)] sm:h-[17.25rem] ${
        isDragging
          ? 'border-accent bg-accent-soft shadow-[inset_0_0_0_1px_var(--accent),0_20px_65px_var(--accent-soft)]'
          : 'border-accent/60 hover:border-accent hover:bg-accent-soft/40 bg-[radial-gradient(circle_at_50%_0%,var(--accent-soft),transparent_62%),var(--surface-elevated)]'
      }`}
      animate={shouldReduceMotion ? undefined : { transform: isDragging ? 'scale(0.994)' : 'scale(1)' }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: [0.23, 1, 0.32, 1] }}
    >
      <span
        className="border-accent/10 bg-accent-soft/35 pointer-events-none absolute top-[-8rem] left-1/2 size-72 -translate-x-1/2 rounded-full border blur-3xl transition-opacity duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:opacity-100"
        aria-hidden="true"
      />
      <span
        className="via-accent/35 pointer-events-none absolute inset-x-[12%] bottom-0 h-px bg-gradient-to-r from-transparent to-transparent"
        aria-hidden="true"
      />
      <input
        ref={inputRef}
        type="file"
        multiple
        className="sr-only"
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
        className="relative flex h-full w-full cursor-pointer flex-col items-center justify-center px-5 py-9 text-center"
      >
        <motion.span
          className="border-accent/25 bg-surface/90 text-accent dark:bg-surface-alt/90 mb-5 flex size-[4.5rem] items-center justify-center rounded-lg border shadow-[0_16px_40px_var(--accent-soft)]"
          animate={
            shouldReduceMotion
              ? undefined
              : { transform: isDragging ? 'translateY(-5px) scale(1.04)' : 'translateY(0) scale(1)' }
          }
          transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          <ArrowDownTrayIcon className="size-8 stroke-[1.55]" />
        </motion.span>
        <span className="font-display font-750 text-text-primary text-xl tracking-[-0.025em] sm:text-2xl">
          여기에 파일을 놓으세요
        </span>
        <span id="file-upload-description" className="text-text-secondary mt-2 text-sm leading-6 sm:text-[15px]">
          여러 파일을 한 번에 선택할 수 있어요.
        </span>
        <span className="btn-primary pointer-events-none mt-6 min-w-32 px-5 shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
          <PlusIcon className="size-4" />
          파일 선택
        </span>
      </label>
    </motion.div>
  )
}
