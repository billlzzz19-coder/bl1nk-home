import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Analytics from '@/components/Analytics'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'BLinkOS — Your AI Team, Fully Transparent',
  description: '10 specialized AI agents work for you—but you\'re always in control.',
  keywords: 'AI, agents, automation, developer tools, BLinkOS',
  authors: [{ name: 'BLinkOS Team' }],
  openGraph: {
    title: 'BLinkOS — Your AI Team, Fully Transparent',
    description: '10 specialized AI agents work for you—but you\'re always in control.',
    url: 'https://bl1nk.site',
    siteName: 'BLinkOS',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <body>
        <Providers>
          {/* Analytics */}
          <Analytics />
          {/* Background Particles */}
          <div className="bg-particles" id="particles">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 20}s`,
                  animationDuration: `${15 + Math.random() * 10}s`,
                }}
              />
            ))}
          </div>

          <Navbar />

          <main className="relative z-10">
            {children}
          </main>

          <footer className="relative z-10 border-t border-white/10 mt-20 py-16">
            <div className="container-custom">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-primary mb-4">BLinkOS</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    แพลตฟอร์ม AI Agent ที่ให้คุณควบคุมได้ทุกขั้นตอน พร้อมทีม AI 10 ตัวที่เชี่ยวชาญเฉพาะด้าน
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Product</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="/marketplace" className="text-gray-400 hover:text-primary transition">Marketplace</a></li>
                    <li><a href="/dashboard" className="text-gray-400 hover:text-primary transition">Dashboard</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-primary transition">Agents</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-primary transition">Pricing</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Company</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="text-gray-400 hover:text-primary transition">About</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-primary transition">Blog</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-primary transition">Careers</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-primary transition">Contact</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Resources</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="text-gray-400 hover:text-primary transition">Documentation</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-primary transition">API</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-primary transition">Community</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-primary transition">Support</a></li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-400">
                <p>&copy; 2024 BLinkOS (bl1nk.site). All rights reserved.</p>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  )
}
