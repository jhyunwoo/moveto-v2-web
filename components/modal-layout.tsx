import { ReactNode, useRef, MouseEvent } from 'react'
import { motion } from 'framer-motion'

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

  if (isOpen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={
          'fixed left-0 top-0 z-10 flex h-screen w-full touch-none flex-col items-center justify-center p-4 backdrop-blur'
        }
        ref={backgroundRef}
        onClick={handleBackgroundClick}
      >
        <div className={'z-20 flex w-full max-w-xl flex-col rounded-xl bg-neutral-900 p-4'}>{children}</div>
      </motion.div>
    )
  } else {
    return <></>
  }
}
