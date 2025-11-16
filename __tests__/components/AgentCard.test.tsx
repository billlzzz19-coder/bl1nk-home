import { render, screen, fireEvent } from '@testing-library/react'
import AgentCard from '@/components/AgentCard'
import { Agent } from '@/lib/api'

const mockAgent: Agent = {
  id: 'test-001',
  name: 'Test Agent',
  role: 'Testing',
  description: 'A test agent',
  icon: '🤖',
  capabilities: ['Test 1', 'Test 2'],
  status: 'active',
  version: '1.0.0',
}

describe('AgentCard', () => {
  it('renders agent information correctly', () => {
    render(<AgentCard agent={mockAgent} />)

    expect(screen.getByText('Test Agent')).toBeInTheDocument()
    expect(screen.getByText('Testing')).toBeInTheDocument()
    expect(screen.getByText('A test agent')).toBeInTheDocument()
    expect(screen.getByText('🤖')).toBeInTheDocument()
  })

  it('displays correct status badge', () => {
    render(<AgentCard agent={mockAgent} />)

    const statusBadge = screen.getByText('ACTIVE')
    expect(statusBadge).toBeInTheDocument()
    expect(statusBadge).toHaveClass('bg-success/20')
  })

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn()
    render(<AgentCard agent={mockAgent} onClick={handleClick} />)

    fireEvent.click(screen.getByText('Test Agent'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('displays capabilities', () => {
    render(<AgentCard agent={mockAgent} />)

    expect(screen.getByText('Test 1')).toBeInTheDocument()
    expect(screen.getByText('Test 2')).toBeInTheDocument()
  })
})