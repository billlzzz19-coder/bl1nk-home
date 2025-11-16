import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.bl1nk.site/v1'
const API_TIMEOUT = parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000')

// Types
export interface Agent {
  id: string
  name: string
  role: string
  description: string
  icon: string
  capabilities: string[]
  status: 'active' | 'idle' | 'busy'
  version: string
}

export interface Tool {
  id: string
  name: string
  description: string
  icon: string
  category: string
  version: string
  author: string
  downloads: number
  rating: number
  installed: boolean
}

export interface ProjectStats {
  progress: number
  buildTime: string
  errors: number
  warnings: number
}

export interface UsageMetrics {
  cpu: number
  memory: number
  tokens: number
}

export interface Activity {
  id: string
  type: 'refactor' | 'approval' | 'index' | 'deployment'
  message: string
  timestamp: string
  agentId?: string
}

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  plan: 'free' | 'pro' | 'enterprise'
  apiKey?: string
}

// API Client Class
class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if exists
        const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }

        // Add API key if exists
        const apiKey = process.env.BLINK_API_KEY
        if (apiKey) {
          config.headers['X-API-Key'] = apiKey
        }

        return config
      },
      (error) => Promise.reject(error)
    )

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized
          if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token')
            window.location.href = '/login'
          }
        }
        return Promise.reject(error)
      }
    )
  }

  // Auth Methods
  async login(email: string, password: string) {
    const response = await this.client.post('/auth/login', { email, password })
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token)
    }
    return response.data
  }

  async logout() {
    localStorage.removeItem('auth_token')
    await this.client.post('/auth/logout')
  }

  async getCurrentUser(): Promise<User> {
    const response = await this.client.get('/auth/me')
    return response.data
  }

  // Agents Methods
  async getAgents(): Promise<Agent[]> {
    const response = await this.client.get('/agents')
    return response.data
  }

  async getAgent(id: string): Promise<Agent> {
    const response = await this.client.get(`/agents/${id}`)
    return response.data
  }

  async executeAgent(id: string, task: string, params?: any) {
    const response = await this.client.post(`/agents/${id}/execute`, {
      task,
      params,
    })
    return response.data
  }

  // Tools/Marketplace Methods
  async getTools(params?: { category?: string; search?: string }): Promise<Tool[]> {
    const response = await this.client.get('/tools', { params })
    return response.data
  }

  async getTool(id: string): Promise<Tool> {
    const response = await this.client.get(`/tools/${id}`)
    return response.data
  }

  async installTool(id: string) {
    const response = await this.client.post(`/tools/${id}/install`)
    return response.data
  }

  async uninstallTool(id: string) {
    const response = await this.client.post(`/tools/${id}/uninstall`)
    return response.data
  }

  async getInstalledTools(): Promise<Tool[]> {
    const response = await this.client.get('/tools/installed')
    return response.data
  }

  // Dashboard/Stats Methods
  async getProjectStats(): Promise<ProjectStats> {
    const response = await this.client.get('/stats/project')
    return response.data
  }

  async getUsageMetrics(): Promise<UsageMetrics> {
    const response = await this.client.get('/stats/usage')
    return response.data
  }

  async getActivities(limit = 10): Promise<Activity[]> {
    const response = await this.client.get('/activities', { params: { limit } })
    return response.data
  }

  // Generic request method
  async request<T>(config: AxiosRequestConfig): Promise<T> {
    const response = await this.client.request<T>(config)
    return response.data
  }
}

// Export singleton instance
export const apiClient = new ApiClient()

// Export default
export default apiClient
