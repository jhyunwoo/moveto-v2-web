'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import SearchBar from '@/app/components/search-bar'

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
    <div className={'relative'}>
      <motion.div
        layoutId={'key'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={'absolute -top-6 right-0 rounded-lg border-[1px] border-white p-[2px] px-2 text-xs'}
      >
        Press Enter
      </motion.div>
      <motion.input
        className={
          'flex w-24 items-center justify-center rounded-full border-2 border-white bg-black p-1 px-4 focus:outline-hidden sm:w-80 md:w-96'
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
              'fixed top-0 left-0 z-10 flex h-screen w-full flex-col items-center justify-center bg-black/70 p-4 backdrop-blur-xs'
            }
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={e => setIsExpanded(e.target !== e.currentTarget)}
          >
            <SearchBar isExpanded={isExpanded} setIsExpanded={setIsExpanded}>
              <motion.div
                layoutId={'key'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={'absolute -top-7 left-4 rounded-lg border-[1px] border-white p-[2px] px-2 text-sm'}
              >
                Press Esc
              </motion.div>
            </SearchBar>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
