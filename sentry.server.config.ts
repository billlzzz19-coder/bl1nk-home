import * as Sentry from '@sentry/nextjs'

/**
 * Sentry server-side initialization.
 *
 * Use `SENTRY_DSN` for the server environment to avoid exposing secrets to the client.
 * Set `SENTRY_DSN` in your `.env.local` to enable error tracking on the server.
 */
Sentry.init({
  dsn: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
})