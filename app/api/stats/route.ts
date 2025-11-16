import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 'project' | 'usage' | 'activities'

    // TODO: Replace with actual bl1nk.site API calls
    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/stats/${type}`,
    //   {
    //     headers: {
    //       'Authorization': `Bearer ${session.user.token}`,
    //     },
    //   }
    // )

    // Mock data based on type
    let data
    switch (type) {
      case 'project':
        data = {
          progress: 78,
          buildTime: '14m 32s',
          errors: 0,
          warnings: 2,
        }
        break

      case 'usage':
        data = {
          cpu: 45,
          memory: 62,
          tokens: 73,
        }
        break

      case 'activities':
        data = [
          {
            id: '1',
            type: 'refactor',
            message: 'AI refactored 12 lines code',
            timestamp: new Date().toISOString(),
          },
          {
            id: '2',
            type: 'approval',
            message: 'User approved changes',
            timestamp: new Date().toISOString(),
          },
          {
            id: '3',
            type: 'index',
            message: "Agent 'Serena' indexed 34 files",
            timestamp: new Date().toISOString(),
            agentId: 'serena',
          },
        ]
        break

      default:
        return NextResponse.json({ error: 'Invalid stats type' }, { status: 400 })
    }

    return NextResponse.json(data)
  } catch (error: any) {
    console.error('GET /api/stats error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
