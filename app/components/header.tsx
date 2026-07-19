import Link from 'next/link'
import ProfileButton from '@/app/components/profile-button'
import ThemeToggle from '@/app/components/theme-toggle'
import { Suspense } from 'react'

export default function Header() {
  return (
    <header className="site-header border-border-subtle fixed inset-x-0 top-0 z-50 h-16 w-full border-b">
      <div className="mx-auto flex h-full w-full max-w-[1504px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link href="/" className="site-wordmark" aria-label="Moveto 홈">
          Moveto
        </Link>

        <nav className="flex h-full items-center" aria-label="주요 메뉴">
          <Link href="/how-to-use" className="site-header__link hidden sm:inline-flex">
            사용 방법
          </Link>
          <span className="site-header__divider hidden sm:block" aria-hidden="true" />
          <ThemeToggle />
          <span className="site-header__divider" aria-hidden="true" />
          <div className="site-header__account">
            <Suspense fallback={<div className="bg-surface-subtle h-9 w-[58px] animate-pulse rounded-md" />}>
              <ProfileButton />
            </Suspense>
          </div>
        </nav>
      </div>
    </header>
  )
}
