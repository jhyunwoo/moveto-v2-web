import type { Metadata } from 'next'
import './globals.css'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Boilerplate',
  description:
    'Boilerplate with Next.js, TypeScript, Drizzle ORM, TailwindCSS, Auth.js and Yarn PnP',
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
