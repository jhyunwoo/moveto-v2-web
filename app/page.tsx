import ProfileButton from '@/components/profile-button'
import { Suspense } from 'react'
import SearchAnimation from '@/components/search-animation'
import Image from 'next/image'
import FileUpload from '@/app/file-upload/file-upload'
import { FilesStoreProvider } from '@/components/store-provider/files-provider'
import { FileDataStoreProvider } from '@/components/store-provider/file-data-provider'

export default function HomePage() {
  return (
    <div className={'flex min-h-screen w-full flex-col items-center p-4'}>
      <div className={'h-[35vh] w-full'} />
      <div className={'relative flex w-full max-w-4xl flex-col gap-2 text-white'}>
        <div className={'absolute -top-12 flex w-full items-center justify-between gap-2'}>
          <div className={'flex items-center gap-2'}>
            <Image src={'/vector-logo.svg'} alt={'Moveto Logo'} width={40} height={40} />
            <div className={'text-3xl font-bold sm:text-4xl'}>Moveto</div>
            <Suspense fallback={<div className={'animate-pulse rounded-full bg-gray-600 px-8 py-4 text-sm'} />}>
              <ProfileButton />
            </Suspense>
          </div>
          <SearchAnimation />
        </div>
        <FilesStoreProvider>
          <FileDataStoreProvider>
            <FileUpload />
          </FileDataStoreProvider>
        </FilesStoreProvider>
      </div>
    </div>
  )
}
