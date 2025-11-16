'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError(result.error)
      } else {
        router.push('/dashboard')
      }
    } catch (err: any) {
      setError(err.message || 'เกิดข้อผิดพลาด')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOAuthLogin = (provider: 'google' | 'github') => {
    signIn(provider, { callbackUrl: '/dashboard' })
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-24">
      <div className="glass rounded-3xl p-10 max-w-md w-full">
        <h2 className="text-3xl font-bold mb-2 text-center">ยินดีต้อนรับกลับ</h2>
        <p className="text-center text-gray-400 mb-8">เข้าสู่ BLinkOS Platform</p>

        {error && (
          <div className="bg-error/20 border border-error/50 text-error px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm mb-2 text-gray-400">อีเมล</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-400">รหัสผ่าน</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full"
            />
          </div>

          <div className="text-right">
            <a href="#" className="text-sm text-primary hover:underline">
              ลืมรหัสผ่าน?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-full text-lg disabled:opacity-50"
          >
            {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white/10"></div>
          <span className="text-sm text-gray-400">หรือ</span>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => handleOAuthLogin('google')}
            className="btn btn-ghost w-full flex items-center justify-center gap-3"
          >
            <span>🔐</span> เข้าสู่ระบบด้วย Google
          </button>

          <button
            onClick={() => handleOAuthLogin('github')}
            className="btn btn-ghost w-full flex items-center justify-center gap-3"
          >
            <span>💼</span> เข้าสู่ระบบด้วย GitHub
          </button>
        </div>

        <p className="text-center text-gray-400 mt-8 text-sm">
          ยังไม่มีบัญชี?{' '}
          <a href="#" className="text-primary hover:underline font-semibold">
            สมัครเลย
          </a>
        </p>
      </div>
    </div>
  )
}
