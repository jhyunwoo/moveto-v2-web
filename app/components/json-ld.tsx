export default function JsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Moveto (모베토)',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    description: '로그인 없이 한글 코드로 파일을 전송하는 서비스입니다.',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    inLanguage: 'ko',
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
}
