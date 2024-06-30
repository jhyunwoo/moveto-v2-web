'use client'

import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline'
import { SubmitHandler, useForm } from 'react-hook-form'

interface Code {
  code: string
}

export default function SearchBar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const { register, handleSubmit, setFocus, watch, resetField } = useForm<Code>()

  const controls = useAnimation()

  const onSubmit: SubmitHandler<Code> = async (data) => {
    const searchShare = await fetch(`/api/shares/${data.code}`)
    const share = await searchShare.json()
    console.log(share)
  }

  useEffect(() => {
    function detectEscape(e: KeyboardEvent) {
      controls.stop()
      if (isExpanded) {
        if (e.key === 'Escape') {
          if (watch('code')) {
            resetField('code')
          } else {
            setIsExpanded(false)
          }
        }
      } else {
        if (e.key === 'Enter') {
          setIsExpanded(true)
          setFocus('code')
        }
      }
    }
    window.addEventListener('keydown', detectEscape)
    return () => window.removeEventListener('keydown', detectEscape)
  }, [controls, isExpanded, resetField, setFocus, watch])

  useEffect(() => {
    if (isExpanded) setFocus('code')
  }, [isExpanded, setFocus])

  return (
    <div>
      <motion.input
        className={
          'rounded-full border-2 p-1 px-4 w-24 sm:w-80 md:w-96 border-white focus:outline-none flex justify-center items-center bg-black'
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
            onClick={(e) => setIsExpanded(e.target !== e.currentTarget)}
          >
            <form
              className={'flex w-full items-center justify-center'}
              onSubmit={handleSubmit(onSubmit)}
            >
              <motion.input
                {...register('code', { required: { value: true, message: '코드를 입력해주세요' } })}
                className={
                  'p-2 z-10 px-5 rounded-full border-4 border-white w-full max-w-2xl outline-none bg-gray-950 text-xl font-bold placeholder:text-xl placeholder:text-gray-300'
                }
                layoutId={'search'}
                placeholder={'코드 검색'}
                autoComplete={'off'}
                animate={controls}
              />
              <motion.button type={'submit'}>
                <MagnifyingGlassCircleIcon className={'size-14'} />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
