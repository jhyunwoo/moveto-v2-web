import * as Sentry from '@sentry/nextjs'
import { SENTRY_DSN } from '@/lib/sentry-dsn'

Sentry.init({
  dsn: SENTRY_DSN,
  enabled: process.env.NODE_ENV === 'production',
  tracesSampleRate: 0.1,
})
