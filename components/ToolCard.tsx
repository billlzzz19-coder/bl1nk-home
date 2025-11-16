'use client'

import { Tool } from '@/lib/api'
import { useState } from 'react'

interface ToolCardProps {
  tool: Tool
  onInstall?: (toolId: string) => void
  onUninstall?: (toolId: string) => void
}

export default function ToolCard({ tool, onInstall, onUninstall }: ToolCardProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleAction = async () => {
    setIsLoading(true)
    try {
      if (tool.installed) {
        await onUninstall?.(tool.id)
      } else {
        await onInstall?.(tool.id)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="card text-center">
      {/* Icon */}
      <div className="w-16 h-16 mx-auto mb-4 bg-bg-darker rounded-2xl flex items-center justify-center text-3xl">
        {tool.icon}
      </div>

      {/* Name */}
      <h4 className="text-lg font-semibold mb-2">{tool.name}</h4>

      {/* Category */}
      <span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-xs mb-3">
        {tool.category}
      </span>

      {/* Description */}
      <p className="text-sm text-gray-400 mb-4 line-clamp-2">{tool.description}</p>

      {/* Stats */}
      <div className="flex justify-center gap-4 mb-4 text-xs text-gray-500">
        <span>⭐ {tool.rating.toFixed(1)}</span>
        <span>⬇️ {tool.downloads.toLocaleString()}</span>
        <span>v{tool.version}</span>
      </div>

      {/* Action Button */}
      <button
        onClick={handleAction}
        disabled={isLoading}
        className={`btn w-full ${
          tool.installed ? 'btn-secondary' : 'btn-primary'
        } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? (
          <div className="spinner mx-auto" style={{ width: 20, height: 20, borderWidth: 2 }}></div>
        ) : tool.installed ? (
          'Uninstall'
        ) : (
          'Install'
        )}
      </button>
    </div>
  )
}
