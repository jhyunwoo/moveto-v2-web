import { ReactNode, useRef, MouseEvent, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { createPortal } from 'react-dom'

export default function ModalLayout({
  children,
  isOpen,
  closeModal,
}: {
  children: ReactNode
  isOpen: boolean
  closeModal: () => void
}) {
  const backgroundRef = useRef(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

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
          style={{ willChange: 'opacity' }}
          className="fixed inset-0 z-50 flex touch-none flex-col items-center justify-center bg-surface-overlay p-4 backdrop-blur-sm"
          ref={backgroundRef}
          onClick={handleBackgroundClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="modern-card z-50 flex max-h-[90dvh] w-full max-w-xl flex-col overflow-y-auto rounded-2xl p-4 sm:p-6"
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
