'use client'

import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline'

interface Code {
  code: string
}

export default function SearchBar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const { register, handleSubmit, setFocus, watch, resetField } = useForm<Code>()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const controls = useAnimation()
  const router = useRouter()

  const onSubmit: SubmitHandler<Code> = async (data) => {
    setError('')
    setLoading(true)
    const searchShare = await fetch(`/api/shares/${data.code}`)
    if (searchShare.ok) {
      const share = await searchShare.json()
      router.push(`/search/${share.code.replaceAll(' ', '_')}`)
    } else {
      if (searchShare.status === 404) {
        setError('코드를 찾을 수 없습니다')
      } else if (searchShare.status === 500) {
        setError('서버 오류가 발생했습니다')
      }
    }
    setLoading(false)
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
  useEffect(() => {
    console.log('refocus')
    if (!loading) {
      setFocus('code')
    }
  }, [loading, setFocus])

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
            <div className={'relative'}>
              <form
                className={'flex w-full items-center justify-center'}
                onSubmit={handleSubmit(onSubmit)}
              >
                <motion.input
                  {...register('code', {
                    required: { value: true, message: '코드를 입력해주세요' },
                    onChange: () => setError(''),
                  })}
                  className={`p-2 z-10 transition-colors px-5 rounded-full border-4 disabled:border-sky-400 disabled:animate-pulse ${error ? 'border-red-500' : 'border-white'} transition-colors w-full max-w-2xl outline-none bg-transparent text-xl font-bold placeholder:text-xl placeholder:text-gray-300`}
                  layoutId={'search'}
                  disabled={loading}
                  placeholder={'코드 검색'}
                  autoComplete={'off'}
                  animate={controls}
                />
                <motion.button
                  type={'submit'}
                  disabled={loading}
                  className={`disabled:text-sky-400 disabled:animate-pulse ${error ? 'text-red-500' : 'text-white'} transition-colors`}
                >
                  <MagnifyingGlassCircleIcon className={'size-14'} />
                </motion.button>
              </form>
              {error && (
                <div className={'text-red-500 text-sm absolute top-14 w-full flex justify-center'}>
                  <div>{error}</div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
