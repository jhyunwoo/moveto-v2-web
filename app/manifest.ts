import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Moveto',
    short_name: 'Moveto',
    description: '로그인 없이 파일을 올리고, 기억하기 쉬운 한글 코드로 바로 공유하세요.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/vector-logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/vector-logo.svg',
        sizes: '192x192 512x512',
        type: 'image/svg+xml',
        purpose: 'maskable',
      }
    ],
  }
}
