'use client'

import { motion, useAnimation } from 'framer-motion'
import {Dispatch, ReactNode, SetStateAction, useEffect, useState} from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline'

interface Code {
  code: string
}

export default function SearchBar({
  isExpanded,
  setIsExpanded,
  className,
    children
}: {
  isExpanded?: boolean
  setIsExpanded?: Dispatch<SetStateAction<boolean>>
  className?: string
  children?: ReactNode
}) {
  const { register, handleSubmit, setFocus, watch, resetField } = useForm<Code>()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const controls = useAnimation()
  const router = useRouter()

  const onSubmit: SubmitHandler<Code> = async data => {
    setError('')
    setLoading(true)
    const searchShare = await fetch(`/api/share/code/${data.code}`)
    if (searchShare.ok) {
      const share = await searchShare.json()
      router.push(`/search/${share.code.replaceAll(' ', '_')}`)
    } else {
      if (searchShare.status === 404) {
        setError('코드를 찾을 수 없습니다')
      } else {
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
            if (setIsExpanded) setIsExpanded(false)
          }
        }
      } else {
        if (e.key === 'Enter') {
          setFocus('code')
        }
      }
    }
    window.addEventListener('keydown', detectEscape)
    return () => window.removeEventListener('keydown', detectEscape)
  }, [controls, isExpanded, resetField, setFocus, setIsExpanded, watch])
  useEffect(() => {
    if (isExpanded) setFocus('code')
  }, [isExpanded, setFocus])
  useEffect(() => {
    if (!loading) {
      setFocus('code')
    }
  }, [loading, setFocus])

  return (
      <div className={`relative w-full ${className}`}>
        <form className={'flex w-full items-center justify-center max-w-4xl mx-auto relative'} onSubmit={handleSubmit(onSubmit)}>
          {children}
          <motion.input
              {...register('code', {
                required: {value: true, message: '코드를 입력해주세요'},
                onChange: () => setError(''),
              })}
              className={`z-10 rounded-full border-4 p-2 px-5 transition-colors disabled:animate-pulse disabled:border-sky-400 ${error ? 'border-red-500' : 'border-white'} w-full bg-neutral-900/50 text-xl font-bold outline-none transition-colors placeholder:text-xl placeholder:text-gray-300`}
              layoutId={'search'}
              disabled={loading}
              placeholder={'코드 검색'}
              autoComplete={'off'}
              animate={controls}
          />
          <motion.button
              type={'submit'}
              disabled={loading}
              layoutId={'search-button'}
              className={`disabled:animate-pulse disabled:text-sky-400 ${error ? 'text-red-500' : 'text-white'} transition-colors`}
          >
            <MagnifyingGlassCircleIcon className={'size-14'}/>
          </motion.button>
        </form>

        <motion.div
            initial={{opacity: 0}}
            animate={error && {opacity: 1}}
            exit={{opacity: 0}}
            className={'absolute top-14 flex w-full justify-center text-sm text-red-500'}
        >
          <div>{error}</div>
        </motion.div>
      </div>
  )
}
