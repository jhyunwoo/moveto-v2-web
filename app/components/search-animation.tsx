'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import SearchBar from '@/app/components/search-bar'

export default function SearchAnimation() {
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    function detectEnter(e: KeyboardEvent) {
      if (e.key === 'Enter') {
        const active = document.activeElement
        if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.tagName === 'SELECT')) {
          return
        }
        setIsExpanded(true)
      }
    }
    window.addEventListener('keydown', detectEnter)
    return () => window.removeEventListener('keydown', detectEnter)
  }, [])

  return (
    <div className="relative w-full">
      <motion.div
        layoutId="key"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute -top-7 right-0 hidden rounded-md border-2 border-border-primary px-2 py-0.5 font-display text-[10px] font-600 uppercase tracking-wider sm:block"
      >
        Enter
      </motion.div>
      <motion.input
        className="flex w-full cursor-pointer items-center justify-center rounded-xl border-2 border-border-primary bg-surface-elevated p-1.5 px-3 font-display text-sm font-500 transition-colors placeholder:text-text-muted focus:border-accent focus:outline-hidden sm:max-w-72 sm:px-4 md:max-w-80"
        onFocus={() => setIsExpanded(true)}
        placeholder="코드 검색"
        layoutId="search"
        autoComplete="off"
      />
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 z-10 flex flex-col items-center justify-center bg-surface-overlay p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => setIsExpanded(e.target !== e.currentTarget)}
          >
            <SearchBar isExpanded={isExpanded} setIsExpanded={setIsExpanded}>
              <motion.div
                layoutId="key"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute -top-8 left-4 rounded-md border-2 border-border-primary bg-surface-elevated px-2 py-0.5 font-display text-xs font-600 uppercase tracking-wider"
              >
                Esc
              </motion.div>
            </SearchBar>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
