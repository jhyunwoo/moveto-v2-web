import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Moveto',
    short_name: 'Moveto',
    description: '초고속 파일 공유의 새로운 차원, 로그인 없이 빠르고 안전하게',
    start_url: '/',
    display: 'standalone',
    background_color: '#050505',
    theme_color: '#8b5cf6',
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
