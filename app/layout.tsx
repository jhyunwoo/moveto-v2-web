import type { Metadata } from 'next'
import './globals.css'
import { ReactNode } from 'react'
import { GoogleAnalytics } from '@next/third-parties/google'
import Footer from '@/app/footer'
import ThemeProvider from '@/app/components/theme-provider'
import Toast from '@/app/components/toast'
import localFont from 'next/font/local'
import { Syne } from 'next/font/google'

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
  preload: true,
  adjustFontFallback: 'Arial',
})

const syne = Syne({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: {
    default: '모베토 Moveto | 로그인 없이 빠르고 안전한 파일 전송',
    template: '%s | 모베토 Moveto',
  },
  description: '번거로운 로그인 과정 없이 빠르고 안전하게 파일을 옮겨보세요. 랜덤 한글 코드만으로 누구나 쉽게 다운로드할 수 있습니다.',
  keywords: ['파일 공유', '대용량 파일 전송', '무설치 파일 전송', '모베토', 'Moveto', '한글 코드 공유'],
  openGraph: {
    title: '모베토 Moveto | 빠르고 안전한 파일 전송',
    description: '번거로운 로그인 과정 없이 빠르고 안전하게 파일을 옮겨보세요.',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Moveto',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '모베토 Moveto',
    description: '로그인 없이 랜덤 한글 코드만으로 파일을 주고받으세요.',
  },
  robots: {
    index: true,
    follow: true,
  },
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

const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('theme');
    var d = t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (d) document.documentElement.classList.add('dark');
  } catch(e) {}
})();
`

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${syne.variable} bg-gradient-page min-h-[100dvh]`}
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="relative z-10 text-text-primary">
        <ThemeProvider>
          {children}
          <Footer />
          <Toast />
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId={'G-BVNJYWQGEF'} />
    </html>
  )
}
