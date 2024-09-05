import type { Metadata } from 'next'
import './globals.css'
import { ReactNode } from 'react'
import RecoilProvider from '@/components/recoil-provider'
import AuthProvider from '@/components/auth-provider'
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
        <RecoilProvider>
          <AuthProvider>{children}</AuthProvider>
        </RecoilProvider>
        <Footer />
      </body>
    </html>
  )
}
