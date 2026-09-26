import Link from 'next/link'

const links = [
  { href: '/how-to-use', label: '사용 방법' },
  { href: '/privacy', label: '개인정보 처리방침' },
  { href: '/terms', label: '이용약관' },
]

export default function Footer() {
  return (
    <footer className="border-border-subtle w-full border-t">
      <div className="text-text-muted mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-6 text-[13px] sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="하단 메뉴">
          {links.map(link => (
            <Link key={link.href} href={link.href} className="hover:text-text-primary transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
        <p>&copy; 2026 Moveto Team</p>
      </div>
    </footer>
  )
}
