import { ReactNode, useRef, MouseEvent, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { createPortal } from 'react-dom'

export default function ModalLayout({
  children,
  isOpen,
  closeModal,
  ariaLabel = '대화상자',
}: {
  children: ReactNode
  isOpen: boolean
  closeModal: () => void
  ariaLabel?: string
}) {
  const backgroundRef = useRef(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [closeModal, isOpen])

  function handleBackgroundClick(e: MouseEvent<HTMLDivElement>) {
    if (e.target === backgroundRef.current) {
      closeModal()
    }
  }

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="bg-surface-overlay fixed inset-0 z-50 flex flex-col items-center justify-center p-4"
          ref={backgroundRef}
          onClick={handleBackgroundClick}
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="panel z-50 flex max-h-[90dvh] w-full max-w-lg flex-col overflow-y-auto overscroll-contain p-5 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  if (!mounted) return null

  return createPortal(modalContent, document.body)
}
