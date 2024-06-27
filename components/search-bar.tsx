'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline'

export default function SearchBar() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.form
      className={'flex bg-black focus:w-full w-24 absolute right-0 transition'}
      initial={{ width: 100 }}
      animate={{
        width: isExpanded ? '100%' : 100,
      }}
      transition={{ duration: 0.3 }}
      onFocus={() => setIsExpanded(true)}
      onBlur={() => setIsExpanded(false)}
    >
      <input
        className={
          'w-full bg-slate-950 p-1 px-3 rounded-full ring-2 ring-white focus:outline-none placeholder:text-sm'
        }
        placeholder={'코드 검색'}
      />

      <motion.button
        type={'button'}
        className={`${!isExpanded && 'hidden'} aspect-1 ml-2`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => setIsExpanded(true)}
      >
        <MagnifyingGlassCircleIcon className={'size-8 text-white scale-125'} />
      </motion.button>
    </motion.form>
  )
}
