import ProfileButton from '@/app/components/profile-button'
import Image from 'next/image'
import FileUpload from '@/app/components/file-upload/file-upload'
import SearchAnimation from '@/app/components/search-animation'
import ThemeToggle from '@/app/components/theme-toggle'
import HomeEntrance from '@/app/components/home-entrance'

export default function HomePage() {
  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-center p-4">
      <div className="h-[16vh] w-full md:h-[28vh]" />
      <div className="relative flex w-full max-w-3xl flex-col gap-4 text-text-primary">
        <div className="mb-2 flex w-full items-center justify-between gap-2 md:absolute md:-top-16 md:mb-0 md:gap-3">
          <HomeEntrance delay={0}>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex size-8 items-center justify-center sm:size-10">
                <Image src="/vector-logo.svg" alt="Moveto Logo" width={36} height={36} />
              </div>
              <div className="font-display text-3xl font-800 tracking-tight sm:text-5xl">Moveto</div>
              <ProfileButton />
              <ThemeToggle />
            </div>
          </HomeEntrance>
          <HomeEntrance delay={0.05}>
            <SearchAnimation />
          </HomeEntrance>
        </div>
        <HomeEntrance delay={0.1}>
          <FileUpload />
        </HomeEntrance>
      </div>
    </div>
  )
}
