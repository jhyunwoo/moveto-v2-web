import type { Metadata } from 'next'
import './globals.css'
import { ReactNode } from 'react'
import AuthProvider from '@/components/auth-provider'
import { GoogleAnalytics } from '@next/third-parties/google'
import Footer from '@/app/footer'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: '모베토 Moveto | 로그인 없이 빠르고 안전한 파일 전송',
  description: '번거로운 로그인 과정 없이 빠르고 안전하게 파일을 옮겨보세요.',
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ko" className={'bg-neutral-950'}>
      <body>
        <AuthProvider>{children}</AuthProvider>
        <Footer />
      </body>
      <GoogleAnalytics gaId={'G-XRMLPE2V9S'} />
    </html>
  )
}
