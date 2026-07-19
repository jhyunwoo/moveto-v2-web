import Link from 'next/link'
import Image from 'next/image'
import ProfileButton from '@/app/components/profile-button'
import ThemeToggle from '@/app/components/theme-toggle'
import { Suspense } from 'react'

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 w-full border-b border-border-subtle bg-surface/80 backdrop-blur-xl">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-7">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Moveto 홈">
            <Image src="/vector-logo.svg" alt="" width={34} height={34} />
            <span className="font-display text-xl font-700 text-text-primary">Moveto</span>
          </Link>
          <Link href="/how-to-use" className="hidden text-sm font-500 text-text-secondary transition-colors hover:text-text-primary sm:block">
            사용 방법
          </Link>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <Suspense fallback={<div className="h-9 w-[68px] animate-pulse rounded-lg bg-surface-subtle" />}>
            <ProfileButton />
          </Suspense>
        </div>
      </div>
    </header>
  )
}
