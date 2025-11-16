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
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    // TODO: Replace with actual bl1nk.site API call
    // const queryParams = new URLSearchParams()
    // if (category) queryParams.append('category', category)
    // if (search) queryParams.append('search', search)
    //
    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/tools?${queryParams}`,
    //   {
    //     headers: {
    //       'Authorization': `Bearer ${session.user.token}`,
    //       'X-API-Key': process.env.BLINK_API_KEY || '',
    //     },
    //   }
    // )
    // const tools = await response.json()

    // Mock data
    const mockTools = [
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
    ]

    return NextResponse.json(mockTools)
  } catch (error: any) {
    console.error('GET /api/tools error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tools' },
      { status: 500 }
    )
  }
}
