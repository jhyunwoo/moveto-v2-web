import { ReactNode } from 'react'
import SearchBar from '@/app/components/search-bar'
import decodeURIShareCode from '@/lib/decode-uri-share-code'

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }) {
  return {
    title: `${decodeURIShareCode((await params).code)} | 모베토 Moveto`,
  }
}

export default function SearchCodeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <div className="fixed top-4 right-4 left-4 z-20 mx-auto max-w-3xl text-text-primary">
        <SearchBar />
      </div>
    </>
  )
}
