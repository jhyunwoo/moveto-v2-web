import FileUpload from '@/components/file-upload'
import ProfileButton from '@/components/profile-button'
import { Suspense } from 'react'
import SearchAnimation from '@/components/search-animation'

export default function HomePage() {
  return (
    <div className={'w-full min-h-screen flex flex-col items-center p-4'}>
      <div className={'w-full h-[35vh]'} />
      <div className={'w-full max-w-4xl flex flex-col text-white relative gap-2'}>
        <div className={'flex items-center justify-between gap-2 absolute -top-12 w-full'}>
          <div className={'flex items-center gap-2'}>
            <div className={'text-4xl font-bold'}>모베토</div>
            <Suspense fallback={<div className={'py-4 px-8 rounded-full text-sm bg-gray-600 animate-pulse'} />}>
              <ProfileButton />
            </Suspense>
          </div>
          <SearchAnimation />
        </div>
        <FileUpload />
      </div>
    </div>
  )
}
