import ProfileButton from '@/app/components/profile-button'
import Image from 'next/image'
import FileUpload from '@/app/components/file-upload/file-upload'
import dynamic from 'next/dynamic'

const SearchAnimation = dynamic(() => import('@/app/components/search-animation'))

export default function HomePage() {
  return (
    <div className={'flex min-h-screen w-full flex-col items-center p-4'}>
      <div className={'h-[35vh] w-full'} />
      <div className={'relative flex w-full max-w-4xl flex-col gap-2 text-white'}>
        <div className={'absolute -top-12 flex w-full items-center justify-between gap-2'}>
          <div className={'flex items-center gap-2'}>
            <Image src={'/vector-logo.svg'} alt={'Moveto Logo'} width={40} height={40} />
            <div className={'text-3xl font-bold sm:text-4xl'}>Moveto</div>
            <ProfileButton />
          </div>
          <SearchAnimation />
        </div>
        <FileUpload />
      </div>
    </div>
  )
}
