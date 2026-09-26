import Link from 'next/link'
import ProfileButton from '@/app/components/profile-button'
import ThemeToggle from '@/app/components/theme-toggle'
import { Suspense } from 'react'

export default function Header() {
  return (
    <header className="border-border-subtle bg-surface/90 sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="font-800 text-text-primary text-xl tracking-[-0.04em]" aria-label="Moveto 홈">
          Moveto
        </Link>

        <nav className="flex items-center gap-1" aria-label="주요 메뉴">
          <Link
            href="/how-to-use"
            className="text-text-secondary hover:text-text-primary font-500 hidden rounded-lg px-3 py-2 text-sm transition-colors sm:inline-flex"
          >
            사용 방법
          </Link>
          <ThemeToggle />
          <Suspense fallback={<div className="bg-surface-subtle ml-1 h-9 w-16 animate-pulse rounded-lg" />}>
            <ProfileButton />
          </Suspense>
        </nav>
      </div>
    </header>
  )
}
