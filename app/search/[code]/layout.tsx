import { ReactNode } from 'react'
import SearchBar from '@/components/search-bar'

export default function SearchCodeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <div className={'fixed top-4 left-4 right-4 text-white bg-neutral-950'}>
        <SearchBar />
      </div>
    </>
  )
}
