'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-destructive/20 mb-4">
            <AlertTriangle className="w-10 h-10 text-destructive" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Something went wrong!</h1>
          <p className="text-gray-400 text-lg">
            เกิดข้อผิดพลาดบางอย่าง
          </p>
        </div>

        <div className="glass-card max-w-md mx-auto p-8">
          {error.message && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
              <p className="text-sm text-destructive font-mono break-all">
                {error.message}
              </p>
            </div>
          )}

          <p className="text-gray-300 mb-6">
            กรุณาลองรีเฟรชหน้านี้ หรือกลับไปหน้าแรก
          </p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={reset}
              className="btn btn-primary inline-flex items-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              <span>ลองอีกครั้ง</span>
            </button>
            <Link href="/" className="btn btn-secondary inline-flex items-center gap-2">
              <Home className="w-5 h-5" />
              <span>กลับหน้าแรก</span>
            </Link>
          </div>
        </div>

        {error.digest && (
          <div className="mt-6 text-xs text-gray-500">
            Error ID: {error.digest}
          </div>
        )}
      </div>
    </div>
  )
}
