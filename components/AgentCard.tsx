'use client'

import { Agent } from '@/lib/api'

interface AgentCardProps {
  agent: Agent
  onClick?: () => void
}

export default function AgentCard({ agent, onClick }: AgentCardProps) {
  const statusColors = {
    active: 'bg-success/20 text-success',
    idle: 'bg-warning/20 text-warning',
    busy: 'bg-error/20 text-error',
  }

  return (
    <div
      onClick={onClick}
      className="card hover:scale-105 transition-transform duration-300 cursor-pointer"
    >
      <div className="flex flex-col items-center text-center">
        {/* Icon */}
        <div className="w-20 h-20 mb-4 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-3xl">
          {agent.icon}
        </div>

        {/* Name */}
        <h3 className="text-lg font-semibold mb-1">{agent.name}</h3>

        {/* Role */}
        <p className="text-sm text-gray-400 mb-3">{agent.role}</p>

        {/* Status Badge */}
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
            statusColors[agent.status]
          }`}
        >
          {agent.status.toUpperCase()}
        </span>

        {/* Description */}
        <p className="text-sm text-gray-500 mb-4">{agent.description}</p>

        {/* Capabilities */}
        {agent.capabilities && agent.capabilities.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center">
            {agent.capabilities.slice(0, 3).map((cap, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-white/5 rounded-lg text-xs text-gray-400"
              >
                {cap}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
