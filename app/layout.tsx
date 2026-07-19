import type { Metadata } from 'next'
import './globals.css'
import { ReactNode } from 'react'
import { GoogleAnalytics } from '@next/third-parties/google'
import Footer from '@/app/footer'
import ThemeProvider from '@/app/components/theme-provider'
import Header from '@/app/components/header'
import Toast from '@/app/components/toast'
import localFont from 'next/font/local'
import { GlobalUploadProvider } from '@/app/components/file-upload/global-upload-provider'
import UploadProgressModal from '@/app/components/file-upload/upload-progress-modal'
import AnimatedBackground from '@/app/components/animated-background'

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
  preload: true,
  adjustFontFallback: 'Arial',
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
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon',
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
      className={`${pretendard.variable} bg-gradient-page min-h-[100dvh]`}
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="relative text-text-primary antialiased">
        <AnimatedBackground />
        <ThemeProvider>
          <GlobalUploadProvider>
            <Header />
            <main className="relative z-10 flex min-h-[100dvh] flex-col pt-16">
              {children}
            </main>
            <UploadProgressModal />
            <Footer />
            <Toast />
          </GlobalUploadProvider>
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId={'G-BVNJYWQGEF'} />
    </html>
  )
}
