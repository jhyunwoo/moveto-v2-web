import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="site-footer relative z-10 w-full px-5 sm:px-8 lg:px-10">
      <div className="mx-auto grid w-full max-w-[1504px] gap-6 py-7 sm:py-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
        <Link href="/" className="site-wordmark site-wordmark--footer" aria-label="Moveto 홈">
          Moveto
        </Link>

        <nav className="site-footer__nav" aria-label="하단 메뉴">
          <Link href="/how-to-use" className="site-footer__link">
            사용 방법
          </Link>
          <span className="site-footer__divider" aria-hidden="true" />
          <Link href="/privacy" className="site-footer__link">
            개인정보 처리방침
          </Link>
          <span className="site-footer__divider" aria-hidden="true" />
          <Link href="/terms" className="site-footer__link">
            웹사이트 이용약관
          </Link>
        </nav>

        <p className="site-footer__copyright">&copy; 2026 Moveto Team</p>
      </div>
    </footer>
  )
}
