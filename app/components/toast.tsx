'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useToastStore } from '@/lib/stores/toast'
import { CheckCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Toast() {
  const { toasts, removeToast } = useToastStore()

  return (
    <div
      className="fixed right-4 bottom-6 left-4 z-50 mx-auto flex w-auto max-w-md flex-col gap-2 sm:right-auto sm:left-1/2 sm:-translate-x-1/2"
      aria-live="polite"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="panel font-600 flex items-center gap-2.5 px-4 py-3 text-sm shadow-lg shadow-black/5"
          >
            {toast.type === 'success' ? (
              <CheckCircleIcon className="text-success size-5 shrink-0" />
            ) : (
              <XCircleIcon className="text-danger size-5 shrink-0" />
            )}
            <span className="text-text-primary grow">{toast.message}</span>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="text-text-muted hover:text-text-primary cursor-pointer rounded-md p-0.5 transition-colors"
              aria-label="닫기"
            >
              <XMarkIcon className="size-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
