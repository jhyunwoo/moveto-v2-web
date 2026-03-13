import type { Metadata } from 'next'
import './globals.css'
import { ReactNode } from 'react'
import { GoogleAnalytics } from '@next/third-parties/google'
import Footer from '@/app/footer'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: '모베토 Moveto | 로그인 없이 빠르고 안전한 파일 전송',
  description: '번거로운 로그인 과정 없이 빠르고 안전하게 파일을 옮겨보세요.',
  appleWebApp: {
    startupImage: [
      {
        url: '/splashscreens/iphone-16.png',
        media:
          '(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url: '/splashscreens/iphone-16-pro-max.png',
        media:
          '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
    ],
  },
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ko" className={'bg-neutral-950'}>
      <body>
        {children}
        <Footer />
      </body>
      <GoogleAnalytics gaId={'G-BVNJYWQGEF'} />
    </html>
  )
}
