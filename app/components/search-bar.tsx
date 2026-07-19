'use client'

import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { ArrowPathIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { motion } from 'motion/react'
import useHydratedReducedMotion from '@/lib/hooks/use-hydrated-reduced-motion'

interface Code {
  code: string
}

export default function SearchBar({ className }: { className?: string }) {
  const { register, handleSubmit } = useForm<Code>()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const shouldReduceMotion = useHydratedReducedMotion()
  const router = useRouter()

  const onSubmit: SubmitHandler<Code> = async data => {
    setError('')
    setLoading(true)

    try {
      const searchShare = await fetch(`/api/share/code/${encodeURIComponent(data.code.trim())}`)
      if (searchShare.ok) {
        const share = await searchShare.json()
        router.push(`/search/${share.code.replaceAll(' ', '_')}`)
        return
      }

      setError(searchShare.status === 404 ? '일치하는 공유 코드를 찾지 못했습니다.' : '잠시 후 다시 시도해주세요.')
    } catch {
      setError('네트워크 연결을 확인해주세요.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit(onSubmit)} aria-busy={loading}>
        <div className="relative min-w-0">
          <label htmlFor="share-code-search" className="sr-only">
            공유 코드
          </label>
          <input
            {...register('code', {
              required: true,
              onChange: () => setError(''),
            })}
            id="share-code-search"
            className={`field-control bg-surface/82 font-600 dark:bg-surface-alt/82 h-14 px-4 pr-[4.5rem] text-base tracking-[-0.015em] ${error ? 'border-danger' : ''}`}
            disabled={loading}
            placeholder="예: 파란 여름 바다"
            autoComplete="off"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'share-code-error' : undefined}
            type="text"
            inputMode="search"
          />
          <motion.button
            type="submit"
            disabled={loading}
            className="btn-primary absolute top-1.5 right-1.5 size-11 min-h-11 p-0"
            aria-label="공유 코드 찾기"
            title="공유 코드 찾기"
            whileHover={loading || shouldReduceMotion ? undefined : { transform: 'translateX(1px)' }}
            whileTap={loading || shouldReduceMotion ? undefined : { transform: 'scale(0.94)' }}
            transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
          >
            {loading ? <ArrowPathIcon className="size-5 animate-spin" /> : <ArrowRightIcon className="size-5" />}
          </motion.button>
        </div>
        <motion.div
          id="share-code-error"
          className="font-600 text-danger mt-2 min-h-5 text-xs leading-5"
          role="alert"
          initial={false}
          animate={shouldReduceMotion ? undefined : error ? { opacity: 1, y: 0 } : { opacity: 0, y: -3 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: [0.23, 1, 0.32, 1] }}
        >
          {error}
        </motion.div>
      </form>
    </div>
  )
}
