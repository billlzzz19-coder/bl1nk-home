'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import ToolCard from '@/components/ToolCard'
import { apiClient, Tool } from '@/lib/api'

export default function MarketplacePage() {
  const { status } = useSession()
  const router = useRouter()
  const [tools, setTools] = useState<Tool[]>([])
  const [installedTools, setInstalledTools] = useState<Tool[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [downloadStatus, setDownloadStatus] = useState('Fetching latest AI tools...')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    if (status === 'authenticated') {
      loadTools()
      simulateDownload()
    }
  }, [status])

  const loadTools = async () => {
    try {
      setIsLoading(true)
      const [allTools, installed] = await Promise.all([
        apiClient.getTools(),
        apiClient.getInstalledTools(),
      ])

      setTools(allTools)
      setInstalledTools(installed)
    } catch (error) {
      console.error('Failed to load tools:', error)
      // Mock data for demo
      setTools([
        {
          id: '1',
          name: 'AI Auto-Optimizer',
          description: 'Automatically optimizes your code for better performance',
          icon: '🧠',
          category: 'Development',
          version: '1.2.0',
          author: 'BLinkOS Team',
          downloads: 15420,
          rating: 4.8,
          installed: false,
        },
        {
          id: '2',
          name: 'UI Builder Pro',
          description: 'Generate beautiful UI components instantly',
          icon: '📱',
          category: 'Design',
          version: '2.1.5',
          author: 'BLinkOS Team',
          downloads: 23891,
          rating: 4.9,
          installed: false,
        },
        {
          id: '3',
          name: 'Backend Flow Agent',
          description: 'Manages backend logic and API integrations',
          icon: '⚙️',
          category: 'Backend',
          version: '1.0.3',
          author: 'Community',
          downloads: 8765,
          rating: 4.6,
          installed: false,
        },
        {
          id: '4',
          name: 'Data Sync Pro',
          description: 'Synchronize data across multiple platforms',
          icon: '💾',
          category: 'Integration',
          version: '1.0.0',
          author: 'BLinkOS Team',
          downloads: 5432,
          rating: 4.5,
          installed: false,
        },
        {
          id: '5',
          name: 'Design Assistant',
          description: 'AI-powered design suggestions and mockups',
          icon: '🎨',
          category: 'Design',
          version: '1.3.2',
          author: 'Community',
          downloads: 12098,
          rating: 4.7,
          installed: false,
        },
        {
          id: '6',
          name: 'Analytics Engine',
          description: 'Deep insights into your application metrics',
          icon: '📊',
          category: 'Analytics',
          version: '2.0.1',
          author: 'BLinkOS Team',
          downloads: 19234,
          rating: 4.9,
          installed: false,
        },
      ])

      setInstalledTools([
        {
          id: 'installed-1',
          name: 'Webflow Integration',
          description: 'Webflow integration tool',
          icon: '🌐',
          category: 'Integration',
          version: '1.2',
          author: 'BLinkOS',
          downloads: 0,
          rating: 5,
          installed: true,
        },
        {
          id: 'installed-2',
          name: 'Data Sync',
          description: 'Data synchronization',
          icon: '🔄',
          category: 'Data',
          version: '1.0',
          author: 'BLinkOS',
          downloads: 0,
          rating: 5,
          installed: true,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const simulateDownload = () => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setDownloadStatus('Download complete!')
      } else {
        setDownloadStatus(`Downloading Package... ${Math.round(progress)}%`)
      }
      setDownloadProgress(progress)
    }, 500)
  }

  const handleInstall = async (toolId: string) => {
    try {
      await apiClient.installTool(toolId)
      await loadTools()
    } catch (error) {
      console.error('Failed to install tool:', error)
      alert('Failed to install tool. Please try again.')
    }
  }

  const handleUninstall = async (toolId: string) => {
    try {
      await apiClient.uninstallTool(toolId)
      await loadTools()
    } catch (error) {
      console.error('Failed to uninstall tool:', error)
      alert('Failed to uninstall tool. Please try again.')
    }
  }

  const filteredTools = tools.filter((tool) =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-12">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Marketplace</h1>
          <p className="text-gray-400 mb-8">ค้นหาและติดตั้ง AI Tools ที่คุณต้องการ</p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools, agents, extensions..."
              className="w-full rounded-full pr-12"
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tools Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {filteredTools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  onInstall={handleInstall}
                  onUninstall={handleUninstall}
                />
              ))}
            </div>

            {/* Download Progress */}
            <div className="w-full h-1 bg-bg-darker rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                style={{ width: `${downloadProgress}%` }}
              />
            </div>
            <p className="text-sm text-gray-400">{downloadStatus}</p>
          </div>

          {/* Installed Tools Sidebar */}
          <div className="card sticky top-28 h-fit">
            <h3 className="font-semibold text-lg mb-6">My Installed Tools</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left pb-3 text-sm text-gray-400 font-medium">Name</th>
                    <th className="text-left pb-3 text-sm text-gray-400 font-medium">Version</th>
                    <th className="text-left pb-3 text-sm text-gray-400 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {installedTools.map((tool) => (
                    <tr key={tool.id} className="border-b border-white/10 last:border-0">
                      <td className="py-4 text-sm">{tool.name}</td>
                      <td className="py-4 text-sm text-gray-400">{tool.version}</td>
                      <td className="py-4">
                        <span className="px-3 py-1 bg-success/20 text-success rounded-full text-xs font-semibold">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
