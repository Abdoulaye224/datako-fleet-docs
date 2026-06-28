interface BadgeProps {
  label: string
  variant?: 'section' | 'role' | 'difficulte' | 'nouveaute'
  color?: 'blue' | 'emerald' | 'amber' | 'red' | 'purple' | 'slate'
}

const colorMap = {
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  red: 'bg-red-500/10 text-red-400 border-red-500/20',
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  slate: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
}

export function Badge({ label, color = 'slate' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center text-xs px-2 py-0.5 rounded-full border font-medium ${colorMap[color]}`}>
      {label}
    </span>
  )
}
