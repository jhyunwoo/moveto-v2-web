import FileUpload from '@/components/file-upload'
import ProfileButton from '@/components/profile-button'
import { Suspense } from 'react'
import SearchBar from '@/components/search-bar'

export default function HomePage() {
  return (
    <div className={'w-full min-h-screen flex flex-col items-center justify-center p-4'}>
      <div className={'w-full max-w-2xl flex flex-col text-white'}>
        <div className={'flex items-center justify-between space-x-2 pb-1 relative'}>
          <div className={'flex items-center space-x-2'}>
            <div className={'text-4xl font-bold'}>모베토</div>
            <Suspense
              fallback={
                <div className={'py-4 px-8 rounded-full  text-sm bg-gray-600 animate-pulse'} />
              }
            >
              <ProfileButton />
            </Suspense>
          </div>
          <SearchBar />
        </div>
        <FileUpload />
      </div>
    </div>
  )
}
