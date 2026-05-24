'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useToastStore } from '@/lib/stores/toast'
import { CheckCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Toast() {
  const { toasts, removeToast } = useToastStore()

  return (
    <div className="fixed bottom-6 left-4 right-4 z-50 mx-auto flex w-auto max-w-md flex-col gap-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="modern-card flex items-center gap-2.5 rounded-xl px-4 py-3 font-display text-sm font-600"
          >
            {toast.type === 'success' ? (
              <CheckCircleIcon className="size-5 shrink-0 text-accent" />
            ) : (
              <XCircleIcon className="size-5 shrink-0 text-danger" />
            )}
            <span className="text-text-primary">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="cursor-pointer rounded-md p-0.5 text-text-muted transition-colors hover:text-text-primary"
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
