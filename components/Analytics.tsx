/*
 * Client-side Analytics Loader
 *
 * This component injects a Google Analytics (or other) tracking script into the
 * application when a valid `NEXT_PUBLIC_ANALYTICS_ID` is provided in the
 * environment. It is rendered at the root of the app (e.g. in `layout.tsx`).
 */
"use client"

import { useEffect } from 'react'

export default function Analytics() {
  useEffect(() => {
    const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID
    if (!analyticsId) return

    // Load gtag script
    const script = document.createElement('script')
    script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`
    script.async = true
    document.head.appendChild(script)

    // Initialize gtag
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any).dataLayer = (window as any).dataLayer || []
    function gtag(...args: any[]) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(window as any).dataLayer.push(args)
    }
    gtag('js', new Date())
    gtag('config', analyticsId)
  }, [])

  return null
}