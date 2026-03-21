'use client'

import { motion, useAnimation } from 'motion/react'
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'
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
  children,
}: {
  isExpanded?: boolean
  setIsExpanded?: Dispatch<SetStateAction<boolean>>
  className?: string
  children?: ReactNode
}) {
  const { getValues, register, handleSubmit, setFocus, resetField } = useForm<Code>()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const controls = useAnimation()
  const router = useRouter()

  const onSubmit: SubmitHandler<Code> = async (data) => {
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
          if (getValues('code')) {
            resetField('code')
          } else {
            if (setIsExpanded) setIsExpanded(false)
          }
        }
      }
    }
    window.addEventListener('keydown', detectEscape)
    return () => window.removeEventListener('keydown', detectEscape)
  }, [controls, getValues, isExpanded, resetField, setFocus, setIsExpanded])

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
      <form
        className="relative mx-auto flex w-full max-w-3xl items-center justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        {children}
        <motion.input
          {...register('code', {
            required: { value: true, message: '코드를 입력해주세요' },
            onChange: () => setError(''),
          })}
          className={`z-10 w-full rounded-xl border-3 bg-surface-elevated p-3 px-5 font-display text-xl font-700 tracking-tight outline-hidden transition-colors placeholder:font-500 placeholder:text-text-muted disabled:opacity-60 disabled:border-accent ${error ? 'border-danger' : 'border-border-primary focus:border-accent'}`}
          layoutId="search"
          disabled={loading}
          placeholder="코드 검색"
          autoComplete="off"
          animate={controls}
          type="text"
          inputMode="search"
        />
        <motion.button
          type="submit"
          disabled={loading}
          layoutId="search-button"
          className={`cursor-pointer disabled:text-accent ${error ? 'text-danger' : 'text-text-primary hover:text-accent'} transition-colors`}
        >
          {loading ? (
            <svg className="size-14 animate-spin text-accent" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            <MagnifyingGlassCircleIcon className="size-14" />
          )}
        </motion.button>
      </form>

      <motion.div
        initial={{ opacity: 0 }}
        animate={error && { opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute top-16 flex w-full justify-center font-display text-sm font-600 text-danger"
      >
        <div>{error}</div>
      </motion.div>
    </div>
  )
}
