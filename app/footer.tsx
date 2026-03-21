import Link from 'next/link'

export default function Footer() {
  return (
    <div className="w-full border-t-2 border-border-primary p-4">
      <div className="mx-auto max-w-3xl">
        <div className="text-sm text-text-secondary">
          &copy; {new Date().getFullYear()}{' '}
          <Link href="https://team.moveto.kr" className="font-semibold transition-colors hover:text-text-primary">
            Moveto Team
          </Link>
        </div>
        <div className="flex gap-3 pt-2 text-xs text-text-muted">
          <Link href="/privacy" className="transition-colors hover:text-text-primary">
            개인정보 처리방침
          </Link>
          <Link href="/terms" className="transition-colors hover:text-text-primary">
            웹사이트 이용약관
          </Link>
        </div>
      </div>
    </div>
  )
}
