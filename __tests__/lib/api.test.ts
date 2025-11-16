import { apiClient } from '@/lib/api'
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('API Client', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
  })

  describe('Authentication', () => {
    it('should login successfully', async () => {
      const mockResponse = {
        data: {
          token: 'test-token',
          user: {
            id: '1',
            email: 'test@example.com',
            name: 'Test User',
          },
        },
      }

      mockedAxios.create.mockReturnValue({
        post: jest.fn().mockResolvedValue(mockResponse),
      } as any)

      const result = await apiClient.login('test@example.com', 'password')

      expect(result.email).toBe('test@example.com')
      expect(localStorage.getItem('auth_token')).toBe('test-token')
    })

    it('should handle login errors', async () => {
      mockedAxios.create.mockReturnValue({
        post: jest.fn().mockRejectedValue({
          response: {
            data: { message: 'Invalid credentials' },
          },
        }),
      } as any)

      await expect(
        apiClient.login('test@example.com', 'wrong-password')
      ).rejects.toThrow()
    })
  })

  describe('Agents', () => {
    it('should fetch agents list', async () => {
      const mockAgents = [
        { id: '1', name: 'Agent 1' },
        { id: '2', name: 'Agent 2' },
      ]

      mockedAxios.create.mockReturnValue({
        get: jest.fn().mockResolvedValue({ data: mockAgents }),
      } as any)

      const result = await apiClient.getAgents()

      expect(result).toHaveLength(2)
      expect(result[0].name).toBe('Agent 1')
    })
  })
})