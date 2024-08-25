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
          'rounded-full border-2 p-1 px-4 w-32 sm:w-80 md:w-96 border-white focus:outline-none flex justify-center items-center bg-black'
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
              'fixed top-0 left-0 w-full h-screen bg-black/70 backdrop-blur-sm z-10 flex items-center justify-center p-4 flex-col'
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
