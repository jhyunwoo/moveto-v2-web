'use client'

import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html lang="ko">
      <body style={{ margin: 0, display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: '#ffffff', color: '#171717', fontFamily: 'system-ui, sans-serif', padding: 24 }}>
        <main style={{ width: '100%', maxWidth: 440, border: '1px solid #dcdee0', borderRadius: 8, background: '#ffffff', padding: 32, boxShadow: '0 18px 50px rgba(20,55,82,0.08)' }}>
          <h1 style={{ margin: 0, fontSize: 30, lineHeight: 1.2 }}>문제가 발생했습니다</h1>
          <p style={{ margin: '12px 0 0', color: '#60646c', fontSize: 14, lineHeight: 1.6 }}>요청을 처리하지 못했습니다. 잠시 후 다시 시도해주세요.</p>
          <button type="button" onClick={reset} style={{ width: '100%', minHeight: 44, marginTop: 24, border: '1px solid #000', borderRadius: 8, background: '#000', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            다시 시도
          </button>
        </main>
      </body>
    </html>
  )
}
