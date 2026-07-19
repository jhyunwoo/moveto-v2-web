import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative z-10 w-full border-t border-border-subtle bg-surface/72 px-4 py-8 backdrop-blur-lg sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <span className="font-600 text-text-primary">Moveto</span>
          <span>&copy; 2026 Moveto Team</span>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-text-secondary" aria-label="하단 메뉴">
          <Link href="/how-to-use" className="transition-colors hover:text-text-primary">
            사용 방법
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-text-primary">
            개인정보 처리방침
          </Link>
          <Link href="/terms" className="transition-colors hover:text-text-primary">
            웹사이트 이용약관
          </Link>
        </nav>
      </div>
    </footer>
  )
}
