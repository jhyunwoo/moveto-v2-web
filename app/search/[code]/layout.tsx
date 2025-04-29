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
      <div className={'fixed left-4 right-4 top-4 bg-neutral-950 text-white'}>
        <SearchBar />
      </div>
    </>
  )
}
