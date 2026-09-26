import type { NextConfig } from 'next'
import { withSentryConfig } from '@sentry/nextjs/config'

const nextConfig: NextConfig = {
  allowedDevOrigins: ['127.0.0.1'],
  reactCompiler: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' }
        ],
      },
    ]
  },
}

export default withSentryConfig(nextConfig, {
  org: 'moveto',
  project: 'moveto-v2-web',
  silent: !process.env.CI,
  tunnelRoute: '/monitoring',
})
