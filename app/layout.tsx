import type { Metadata } from 'next'
import './globals.css'
import { ReactNode } from 'react'
import RecoilProvider from '@/components/recoil-provider'
import AuthProvider from '@/components/auth-provider'

export const metadata: Metadata = {
  title: '모베토',
  description: '모베토 Moveto | 로그인 없이 쉽고 빠른 파일 전송',
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ko" className={'bg-neutral-950'}>
      <body>
        <RecoilProvider>
          <AuthProvider>{children}</AuthProvider>
        </RecoilProvider>
      </body>
    </html>
  )
}
