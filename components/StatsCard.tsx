interface StatsCardProps {
  title: string
  value: string | number
  label?: string
  progress?: number
  icon?: React.ReactNode
}

export default function StatsCard({ title, value, label, progress, icon }: StatsCardProps) {
  return (
    <div className="card">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-sm text-gray-400 uppercase tracking-wide">{title}</h3>
        {icon && <div className="text-primary">{icon}</div>}
      </div>

      <div className="text-3xl font-bold text-primary mb-2">{value}</div>

      {label && <div className="text-sm text-gray-500">{label}</div>}

      {progress !== undefined && (
        <div className="mt-4 w-full h-2 bg-bg-darker rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  )
}
