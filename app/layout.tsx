import type { Metadata } from 'next'
import './globals.css'
import { ReactNode } from 'react'
import AuthProvider from '@/components/auth-provider'
import { GoogleAnalytics } from '@next/third-parties/google'
import Footer from '@/app/footer'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: 'Moveto',
  description: '로그인 없이 쉽고 빠른 파일 전송',
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ko" className={'bg-neutral-950'}>
      <body>
        <AuthProvider>{children}</AuthProvider>
        <Footer />
      </body>
      <GoogleAnalytics gaId={'G-BVNJYWQGEF'} />
    </html>
  )
}
