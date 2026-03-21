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
})

const syne = Syne({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
})

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
