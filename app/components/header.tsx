import Link from 'next/link'
import Image from 'next/image'
import ProfileButton from '@/app/components/profile-button'
import ThemeToggle from '@/app/components/theme-toggle'

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 w-full border-b border-border-subtle bg-surface/80 backdrop-blur-2xl">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2.5 transition-transform hover:scale-105 active:scale-95">
          <div className="relative flex size-8 items-center justify-center sm:size-9">
            <div className="absolute inset-0 rounded-full bg-accent opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-30 dark:group-hover:opacity-50" />
            <Image src="/vector-logo.svg" alt="Moveto Logo" width={32} height={32} className="relative z-10 drop-shadow-sm dark:brightness-110 dark:drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
          </div>
          <div className="font-display text-xl font-800 tracking-tight sm:text-2xl text-gradient-neon drop-shadow-sm dark:drop-shadow-md">Moveto</div>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <ProfileButton />
        </div>
      </div>
    </header>
  )
}
