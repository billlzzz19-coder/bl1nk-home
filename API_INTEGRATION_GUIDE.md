# 🔌 BLinkOS Platform - API Integration Guide

คู่มือการเชื่อมต่อ Next.js Frontend กับ bl1nk.site Backend API

---

## 📍 Overview

Project นี้ถูกออกแบบให้เชื่อมต่อกับ **bl1nk.site API** ได้ง่าย โดยมี API Client (`lib/api.ts`) ที่พร้อมใช้งาน

ปัจจุบัน API routes ใช้ **mock data** สำหรับ demo คุณต้องแทนที่ mock data ด้วย API calls จริงไปยัง bl1nk.site

---

## 🎯 API Endpoints ที่ต้องการ

ตารางนี้แสดง endpoints ที่ frontend ต้องการจาก bl1nk.site backend:

| Feature | Method | Endpoint | Description |
|---------|--------|----------|-------------|
| **Authentication** | | | |
| Login | POST | `/auth/login` | ล็อกอินด้วย email/password |
| Logout | POST | `/auth/logout` | ออกจากระบบ |
| Get Current User | GET | `/auth/me` | ดึงข้อมูลผู้ใช้ปัจจุบัน |
| **Agents** | | | |
| List Agents | GET | `/agents` | ดึงรายการ AI agents ทั้งหมด |
| Get Agent | GET | `/agents/:id` | ดึงข้อมูล agent ตาม ID |
| Execute Agent | POST | `/agents/:id/execute` | รัน agent task |
| **Tools/Marketplace** | | | |
| List Tools | GET | `/tools` | ดึงรายการ tools ใน marketplace |
| Get Tool | GET | `/tools/:id` | ดึงข้อมูล tool ตาม ID |
| Install Tool | POST | `/tools/:id/install` | ติดตั้ง tool |
| Uninstall Tool | POST | `/tools/:id/uninstall` | ถอนการติดตั้ง tool |
| List Installed Tools | GET | `/tools/installed` | ดึงรายการ tools ที่ติดตั้งแล้ว |
| **Dashboard/Stats** | | | |
| Project Stats | GET | `/stats/project` | ดึงสถิติโปรเจกต์ |
| Usage Metrics | GET | `/stats/usage` | ดึง usage metrics (CPU, memory, tokens) |
| Activities | GET | `/activities` | ดึงกิจกรรมล่าสุด |

---

## 🔑 Authentication Flow

### 1. Login Process

```
┌─────────┐                 ┌──────────┐                  ┌─────────────┐
│ Browser │                 │ Next.js  │                  │ bl1nk.site  │
│ (User)  │                 │ Frontend │                  │ API         │
└────┬────┘                 └────┬─────┘                  └──────┬──────┘
     │                           │                               │
     │  1. Enter email/password  │                               │
     ├──────────────────────────>│                               │
     │                           │                               │
     │                           │  2. POST /auth/login          │
     │                           ├──────────────────────────────>│
     │                           │                               │
     │                           │  3. Return { token, user }    │
     │                           │<──────────────────────────────┤
     │                           │                               │
     │                           │  4. Save token to localStorage│
     │                           │                               │
     │  5. Redirect to dashboard │                               │
     │<──────────────────────────┤                               │
     │                           │                               │
```

### 2. API Client Configuration

File: `lib/api.ts`

```typescript
// Request Interceptor - แนบ token ทุกครั้งที่เรียก API
this.client.interceptors.request.use((config) => {
  // 1. ดึง token จาก localStorage
  const token = localStorage.getItem('auth_token')

  // 2. แนบ Authorization header
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  // 3. แนบ API Key
  const apiKey = process.env.BLINK_API_KEY
  if (apiKey) {
    config.headers['X-API-Key'] = apiKey
  }

  return config
})

// Response Interceptor - Handle 401 Unauthorized
this.client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token หมดอายุหรือไม่ valid
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

---

## 🛠️ แทนที่ Mock Data ด้วย API จริง

### Example 1: Agents API

**ไฟล์:** `app/api/agents/route.ts`

**ก่อน (Mock Data):**
```typescript
export async function GET(request: NextRequest) {
  // Mock data
  const mockAgents = [
    { id: 'asa-001', name: 'AI Systems Architect', ... },
    // ...
  ]

  return NextResponse.json(mockAgents)
}
```

**หลัง (Real API):**
```typescript
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // เรียก bl1nk.site API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/agents`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${session.user.token}`,
          'X-API-Key': process.env.BLINK_API_KEY || '',
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const agents = await response.json()
    return NextResponse.json(agents)

  } catch (error: any) {
    console.error('GET /api/agents error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch agents' },
      { status: 500 }
    )
  }
}
```

### Example 2: Login API

**ไฟล์:** `lib/api.ts`

**Method:** `login(email, password)`

```typescript
async login(email: string, password: string) {
  try {
    const response = await this.client.post('/auth/login', {
      email,
      password,
    })

    // bl1nk.site API ควร return:
    // {
    //   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    //   user: {
    //     id: "user-123",
    //     email: "user@example.com",
    //     name: "John Doe",
    //     plan: "pro"
    //   }
    // }

    const { token, user } = response.data

    // Save token to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token)
    }

    return user
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Login failed'
    )
  }
}
```

### Example 3: Install Tool API

**ไฟล์:** `lib/api.ts`

**Method:** `installTool(id)`

```typescript
async installTool(id: string) {
  try {
    const response = await this.client.post(`/tools/${id}/install`)

    // bl1nk.site API ควร return:
    // {
    //   success: true,
    //   tool: {
    //     id: "tool-123",
    //     name: "Tool Name",
    //     installed: true,
    //     installedAt: "2024-01-15T10:30:00Z"
    //   }
    // }

    return response.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to install tool'
    )
  }
}
```

---

## 📋 Expected API Response Formats

### Authentication

#### POST `/auth/login`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (Success - 200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user-123",
    "email": "user@example.com",
    "name": "John Doe",
    "avatar": "https://...",
    "plan": "pro",
    "apiKey": "blink_xxxxx"
  }
}
```

**Response (Error - 401):**
```json
{
  "error": "Invalid credentials",
  "message": "อีเมลหรือรหัสผ่านไม่ถูกต้อง"
}
```

#### GET `/auth/me`

**Request Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200):**
```json
{
  "id": "user-123",
  "email": "user@example.com",
  "name": "John Doe",
  "avatar": "https://...",
  "plan": "pro",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Agents

#### GET `/agents`

**Response (200):**
```json
[
  {
    "id": "asa-001",
    "name": "AI Systems Architect",
    "role": "Systems Design",
    "description": "ออกแบบระบบและสถาปัตยกรรม",
    "icon": "🏗️",
    "capabilities": [
      "Architecture Design",
      "System Planning",
      "Tech Stack Selection"
    ],
    "status": "active",
    "version": "1.0.0"
  }
]
```

#### POST `/agents/:id/execute`

**Request:**
```json
{
  "task": "Design a microservices architecture",
  "params": {
    "scale": "medium",
    "requirements": ["high availability", "low latency"]
  }
}
```

**Response (200):**
```json
{
  "executionId": "exec-123",
  "agentId": "asa-001",
  "status": "completed",
  "result": {
    "architecture": "...",
    "diagram": "https://...",
    "recommendations": ["..."]
  },
  "executedAt": "2024-01-15T10:30:00Z"
}
```

### Tools/Marketplace

#### GET `/tools`

**Query Params:**
- `category` (optional): Filter by category
- `search` (optional): Search query
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response (200):**
```json
{
  "tools": [
    {
      "id": "tool-123",
      "name": "AI Auto-Optimizer",
      "description": "Automatically optimizes your code",
      "icon": "🧠",
      "category": "Development",
      "version": "1.2.0",
      "author": "BLinkOS Team",
      "downloads": 15420,
      "rating": 4.8,
      "installed": false,
      "price": 0,
      "tags": ["optimization", "performance"]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45
  }
}
```

#### POST `/tools/:id/install`

**Response (200):**
```json
{
  "success": true,
  "tool": {
    "id": "tool-123",
    "name": "AI Auto-Optimizer",
    "installed": true,
    "installedAt": "2024-01-15T10:30:00Z",
    "version": "1.2.0"
  }
}
```

### Dashboard/Stats

#### GET `/stats/project`

**Response (200):**
```json
{
  "progress": 78,
  "buildTime": "14m 32s",
  "errors": 0,
  "warnings": 2,
  "lastBuildAt": "2024-01-15T10:30:00Z"
}
```

#### GET `/stats/usage`

**Response (200):**
```json
{
  "cpu": 45,
  "memory": 62,
  "tokens": 73,
  "period": "24h"
}
```

#### GET `/activities`

**Query Params:**
- `limit` (optional): Number of activities to return

**Response (200):**
```json
[
  {
    "id": "activity-123",
    "type": "refactor",
    "message": "AI refactored 12 lines code",
    "timestamp": "2024-01-15T10:30:00Z",
    "agentId": "cs-001",
    "metadata": {
      "linesChanged": 12,
      "filesAffected": ["app.tsx"]
    }
  }
]
```

---

## 🔐 Security Best Practices

### 1. Token Storage

**✅ DO:**
```typescript
// Store in localStorage (for web apps)
localStorage.setItem('auth_token', token)

// Or use httpOnly cookies (more secure)
// ต้องตั้งค่าใน NextAuth configuration
```

**❌ DON'T:**
```typescript
// Never store in plain cookies accessible by JS
document.cookie = `token=${token}`

// Never expose in URL
window.location.href = `/dashboard?token=${token}`
```

### 2. API Key Protection

**✅ DO:**
```typescript
// Use environment variables
const apiKey = process.env.BLINK_API_KEY

// Only use in server-side code
// (Next.js API routes, server components)
```

**❌ DON'T:**
```typescript
// Never hardcode in client-side code
const apiKey = 'blink_hardcoded_key_123'

// Never use NEXT_PUBLIC_ prefix for secrets
const apiKey = process.env.NEXT_PUBLIC_BLINK_API_KEY  // ❌ Exposed to browser!
```

### 3. Error Handling

**✅ DO:**
```typescript
try {
  const data = await apiClient.getAgents()
  setAgents(data)
} catch (error: any) {
  // Log for debugging (server-side only)
  console.error('API Error:', error)

  // Show user-friendly message
  setError('ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง')

  // Never expose sensitive details to users
}
```

**❌ DON'T:**
```typescript
catch (error: any) {
  // Don't show raw error to users
  alert(error.message)  // อาจมีข้อมูลละเอียดเกินไป

  // Don't ignore errors
  // (ไม่มี error handling)
}
```

---

## 🧪 Testing API Integration

### 1. Test with Mock Server

สร้าง mock server ด้วย [MSW (Mock Service Worker)](https://mswjs.io/):

```bash
npm install -D msw
```

```typescript
// mocks/handlers.ts
import { rest } from 'msw'

export const handlers = [
  rest.post('/api/auth/login', (req, res, ctx) => {
    return res(
      ctx.json({
        token: 'mock-token-123',
        user: { id: '1', email: 'test@example.com', name: 'Test User' }
      })
    )
  }),

  rest.get('/api/agents', (req, res, ctx) => {
    return res(ctx.json([/* mock agents */]))
  }),
]
```

### 2. Test with Postman/Thunder Client

1. Create collection for bl1nk.site API
2. Add all endpoints
3. Test each endpoint with sample data
4. Verify response formats

### 3. Integration Tests

```typescript
// __tests__/api/agents.test.ts
import { apiClient } from '@/lib/api'

describe('Agents API', () => {
  beforeEach(() => {
    // Mock localStorage
    localStorage.setItem('auth_token', 'test-token')
  })

  it('should fetch agents list', async () => {
    const agents = await apiClient.getAgents()

    expect(agents).toBeInstanceOf(Array)
    expect(agents[0]).toHaveProperty('id')
    expect(agents[0]).toHaveProperty('name')
  })
})
```

---

## 📊 API Rate Limiting

ถ้า bl1nk.site API มี rate limiting คุณควร:

### 1. Handle 429 Responses

```typescript
// lib/api.ts - Response Interceptor
this.client.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 429) {
      const retryAfter = error.response.headers['retry-after']

      // Show user-friendly message
      throw new Error(
        `ทำ request บ่อยเกินไป กรุณารอ ${retryAfter} วินาที`
      )
    }

    return Promise.reject(error)
  }
)
```

### 2. Implement Request Throttling

```typescript
import { throttle } from 'lodash'

// Throttle expensive API calls
const searchTools = throttle(
  async (query: string) => {
    return await apiClient.getTools({ search: query })
  },
  1000  // Max 1 request per second
)
```

### 3. Use SWR for Caching

```bash
npm install swr
```

```typescript
import useSWR from 'swr'

function AgentsList() {
  const { data, error, isLoading } = useSWR(
    '/agents',
    () => apiClient.getAgents(),
    {
      revalidateOnFocus: false,
      refreshInterval: 60000,  // Refresh every 1 minute
    }
  )

  // ...
}
```

---

## 🚀 Deployment Checklist

ก่อน deploy production ตรวจสอบ:

- [ ] Environment variables ครบทุกตัว
- [ ] `NEXT_PUBLIC_API_BASE_URL` เป็น production URL
- [ ] `NEXTAUTH_URL` เป็น production domain
- [ ] API keys เป็น production keys (ไม่ใช่ development)
- [ ] CORS settings ถูกต้องบน bl1nk.site API
- [ ] SSL/HTTPS enabled
- [ ] Error tracking setup (Sentry, LogRocket)
- [ ] API response time monitoring

---

## 📞 Support

หากมีปัญหาการเชื่อมต่อ API:

1. ตรวจสอบ Network tab ใน DevTools
2. ตรวจสอบ Console ว่ามี error อะไร
3. ตรวจสอบ API documentation ของ bl1nk.site
4. ติดต่อ bl1nk.site support team

---

**Happy Integrating! 🎉**
