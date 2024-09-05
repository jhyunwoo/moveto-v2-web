import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Moveto',
    short_name: 'Moveto',
    description: '로그인 없이 빠르게 파일을 공유하고 다운받을 수 있는 모베토',
    start_url: '/',
    display: 'standalone',
    background_color: '#000',
    theme_color: '#000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '32x32',
        type: 'image/x-icon',
      },
      {
        src: '/moveto-logo-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/moveto-logo-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
