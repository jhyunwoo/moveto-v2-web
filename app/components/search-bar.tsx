'use client'

import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { ArrowPathIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

interface Code {
  code: string
}

export default function SearchBar({ className }: { className?: string }) {
  const { register, handleSubmit } = useForm<Code>()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
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
            className={`field-control font-500 h-12 px-3.5 pr-14 text-base ${error ? 'border-danger' : ''}`}
            disabled={loading}
            placeholder="예: 파란 여름 바다"
            autoComplete="off"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'share-code-error' : undefined}
            type="text"
            inputMode="search"
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-primary absolute top-1 right-1 size-10 min-h-10 p-0"
            aria-label="공유 코드 찾기"
            title="공유 코드 찾기"
          >
            {loading ? <ArrowPathIcon className="size-4 animate-spin" /> : <ArrowRightIcon className="size-4" />}
          </button>
        </div>
        <p id="share-code-error" className="font-500 text-danger mt-2 min-h-5 text-xs leading-5" role="alert">
          {error}
        </p>
      </form>
    </div>
  )
}
