'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import StatsCard from '@/components/StatsCard'
import { apiClient, ProjectStats, UsageMetrics, Activity } from '@/lib/api'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<ProjectStats | null>(null)
  const [usage, setUsage] = useState<UsageMetrics | null>(null)
  const [activities, setActivities] = useState<Activity[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    if (status === 'authenticated') {
      loadDashboardData()
    }
  }, [status])

  const loadDashboardData = async () => {
    try {
      setIsLoading(true)
      const [statsData, usageData, activitiesData] = await Promise.all([
        apiClient.getProjectStats(),
        apiClient.getUsageMetrics(),
        apiClient.getActivities(5),
      ])

      setStats(statsData)
      setUsage(usageData)
      setActivities(activitiesData)
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
      // Use mock data for demo
      setStats({ progress: 78, buildTime: '14m 32s', errors: 0, warnings: 0 })
      setUsage({ cpu: 45, memory: 62, tokens: 73 })
      setActivities([
        {
          id: '1',
          type: 'refactor',
          message: 'AI refactored 12 lines code',
          timestamp: new Date().toISOString(),
        },
        {
          id: '2',
          type: 'approval',
          message: 'User approved inachs | fiodogw with 14',
          timestamp: new Date().toISOString(),
        },
        {
          id: '3',
          type: 'index',
          message: "Agent 'Serena' indexed 34 files",
          timestamp: new Date().toISOString(),
          agentId: 'serena',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

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
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-400">ติดตามความคืบหน้าและกิจกรรมของ AI Agents</p>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Progress"
            value={`${stats?.progress || 0}%`}
            label="โปรเจกต์เสร็จสมบูรณ์"
            progress={stats?.progress || 0}
          />
          <StatsCard
            title="Build Time"
            value={stats?.buildTime || '0s'}
            label="เวลาในการ build ล่าสุด"
          />
          <StatsCard
            title="Errors"
            value={stats?.errors || 0}
            label={stats?.errors === 0 ? 'ไม่มีข้อผิดพลาด' : 'ข้อผิดพลาดที่พบ'}
          />
        </div>

        {/* Usage & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Usage Chart */}
          <div className="card">
            <h3 className="text-sm text-gray-400 uppercase tracking-wide mb-6">Usage</h3>
            <div className="flex items-center gap-8">
              {/* Donut Chart */}
              <div className="w-40 h-40">
                <svg viewBox="0 0 100 100" className="transform -rotate-90">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="var(--bg-darker)"
                    strokeWidth="15"
                  />
                  {/* CPU */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="15"
                    strokeDasharray={`${(usage?.cpu || 0) * 2.51} 251`}
                    strokeDashoffset="0"
                  />
                  {/* Memory */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="var(--success)"
                    strokeWidth="15"
                    strokeDasharray={`${(usage?.memory || 0) * 2.51} 251`}
                    strokeDashoffset={`-${(usage?.cpu || 0) * 2.51}`}
                  />
                  {/* Tokens */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="var(--error)"
                    strokeWidth="15"
                    strokeDasharray={`${(usage?.tokens || 0) * 2.51} 251`}
                    strokeDashoffset={`-${((usage?.cpu || 0) + (usage?.memory || 0)) * 2.51}`}
                  />
                </svg>
              </div>

              {/* Legend */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span className="text-gray-400 text-sm">CPU ({usage?.cpu || 0}%)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                  <span className="text-gray-400 text-sm">Memory ({usage?.memory || 0}%)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-error"></div>
                  <span className="text-gray-400 text-sm">AI Tokens ({usage?.tokens || 0}%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="card">
            <h3 className="text-sm text-gray-400 uppercase tracking-wide mb-6">Activity Feed</h3>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 pb-4 border-b border-white/10 last:border-0">
                  <div className="w-10 h-10 bg-bg-darker rounded-full flex items-center justify-center text-lg">
                    {activity.type === 'refactor' && '✓'}
                    {activity.type === 'approval' && '👤'}
                    {activity.type === 'index' && '🤖'}
                    {activity.type === 'deployment' && '🚀'}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-300 text-sm">{activity.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Console Output */}
        <div className="card mb-8">
          <h3 className="text-sm text-gray-400 uppercase tracking-wide mb-4">Console</h3>
          <div className="bg-bg-darker rounded-xl p-5 font-mono text-sm text-success space-y-1">
            <div>$ Compiling source files...</div>
            <div>$ Deploying to production server...</div>
            <div className="text-success">✓ Deployment complete</div>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <button className="btn btn-primary text-lg px-10">
            🔍 Analyze Project...
          </button>
        </div>
      </div>
    </div>
  )
}
