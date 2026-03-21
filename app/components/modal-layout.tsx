import { ReactNode, useRef, MouseEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'

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

  function handleBackgroundClick(e: MouseEvent<HTMLDivElement>) {
    if (e.target === backgroundRef.current) {
      closeModal()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          style={{ willChange: 'opacity' }}
          className="fixed inset-0 z-10 flex touch-none flex-col items-center justify-center bg-surface-overlay p-4 backdrop-blur-sm"
          ref={backgroundRef}
          onClick={handleBackgroundClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="brutalist-card z-20 flex w-full max-w-xl flex-col rounded-2xl p-6"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
