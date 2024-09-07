'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import SearchBar from '@/components/search-bar'

export default function SearchAnimation() {
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    function detectEscape(e: KeyboardEvent) {
      if (e.key === 'Enter') {
        if (setIsExpanded) setIsExpanded(true)
      }
    }
    window.addEventListener('keydown', detectEscape)
    return () => window.removeEventListener('keydown', detectEscape)
  }, [])

  return (
    <>
      <motion.input
        className={
          'flex w-28 items-center justify-center rounded-full border-2 border-white bg-black p-1 px-4 focus:outline-none sm:w-80 md:w-96'
        }
        onFocus={() => setIsExpanded(true)}
        placeholder={'코드 검색'}
        layoutId={'search'}
        autoComplete={'off'}
      />
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className={
              'fixed left-0 top-0 z-10 flex h-screen w-full flex-col items-center justify-center bg-black/70 p-4 backdrop-blur-sm'
            }
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={e => setIsExpanded(e.target !== e.currentTarget)}
          >
            <SearchBar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
