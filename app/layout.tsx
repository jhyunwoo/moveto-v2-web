import type { Metadata } from 'next'
import './globals.css'
import { ReactNode } from 'react'
import RecoilProvider from '@/components/recoil-provider'
import LoadingPage from '@/components/loading-page'

export const metadata: Metadata = {
  title: '모베토',
  description: '모베토 Moveto - 로그인 없이 쉽고 빠른 파일 전송',
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ko" className={'bg-black'}>
      <body>
        <RecoilProvider>
          <LoadingPage />
          {children}
        </RecoilProvider>
      </body>
    </html>
  )
}
