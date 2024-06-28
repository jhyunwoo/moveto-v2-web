'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline'

export default function SearchBar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isExpanded) {
      searchRef.current?.focus()
    }
  }, [isExpanded])

  return (
    <div className={'transform-gpu'}>
      <motion.input
        key={isExpanded ? 'close' : 'open'}
        className={`rounded-full border-2 p-1 px-4 border-white focus:outline-none flex justify-center items-center bg-black`}
        onFocus={() => setIsExpanded(true)}
        initial={{ scale: 1 }}
        placeholder={'코드 검색'}
        animate={{ scale: isExpanded ? 1.1 : 1 }}
        layoutId={'search'}
      />
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className={
              'fixed top-0 left-0 w-full h-screen bg-black/70 backdrop-blur-sm z-10 flex items-center justify-center p-4'
            }
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => setIsExpanded(e.target !== e.currentTarget)}
          >
            <motion.form
              className={'flex w-full items-center justify-center'}
              onSubmit={(e) => e.preventDefault()}
            >
              <motion.input
                key={isExpanded ? 'close' : 'open'}
                className={
                  'p-2 z-10 px-5 rounded-full border-2 border-white w-full max-w-2xl outline-none bg-gray-950 text-xl font-bold placeholder:text-xl placeholder:text-gray-300'
                }
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                layoutId={'search'}
                placeholder={'코드 검색'}
                ref={searchRef}
                onClick={() => setIsExpanded(true)}
              />
              <motion.button
                type={'submit'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsExpanded(true)}
                className={'z-10'}
              >
                <MagnifyingGlassCircleIcon className={'size-12'} />
              </motion.button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
