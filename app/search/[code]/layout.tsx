import { ReactNode } from 'react'
import SearchBar from '@/components/search-bar'

export default function SearchCodeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <div className={'fixed bottom-8 sm:top-5 left-4 right-4 text-white'}>
        <SearchBar />
      </div>
    </>
  )
}
