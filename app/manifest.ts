import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Next.js Boilerplate',
    short_name: 'Boilerplate',
    description: 'Next.js Boilerplate with NextAuth, Drizzle ORM, Tailwind CSS, Yarn and more.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
