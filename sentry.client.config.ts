import * as Sentry from '@sentry/nextjs'

/**
 * Sentry client-side initialization.
 *
 * The DSN is pulled from `NEXT_PUBLIC_SENTRY_DSN` to ensure it's exposed to the browser.
 * Set `NEXT_PUBLIC_SENTRY_DSN` in your `.env.local` to enable error tracking.
 */
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
})