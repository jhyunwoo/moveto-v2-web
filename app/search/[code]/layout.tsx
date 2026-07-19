import { ReactNode } from 'react'
import decodeURIShareCode from '@/lib/decode-uri-share-code'

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }) {
  return {
    title: `${decodeURIShareCode((await params).code)} | 모베토 Moveto`,
  }
}

export default function SearchCodeLayout({ children }: { children: ReactNode }) {
  return children
}
