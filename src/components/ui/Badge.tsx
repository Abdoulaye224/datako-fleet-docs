interface BadgeProps {
  label: string
  variant?: 'section' | 'role' | 'difficulte' | 'nouveaute'
  color?: 'blue' | 'emerald' | 'amber' | 'red' | 'purple' | 'slate'
}

const colorMap = {
  blue: 'bg-[var(--accent-blue-bg)] text-[var(--accent-blue-fg)] border-[var(--accent-blue-border)]',
  emerald: 'bg-[var(--accent-emerald-bg)] text-[var(--accent-emerald-fg)] border-[var(--accent-emerald-border)]',
  amber: 'bg-[var(--accent-amber-bg)] text-[var(--accent-amber-fg)] border-[var(--accent-amber-border)]',
  red: 'bg-[var(--accent-red-bg)] text-[var(--accent-red-fg)] border-[var(--accent-red-border)]',
  purple: 'bg-[var(--accent-purple-bg)] text-[var(--accent-purple-fg)] border-[var(--accent-purple-border)]',
  slate: 'bg-[var(--accent-slate-bg)] text-[var(--accent-slate-fg)] border-[var(--accent-slate-border)]',
}

export function Badge({ label, color = 'slate' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center text-xs px-2 py-0.5 rounded-full border font-medium ${colorMap[color]}`}>
      {label}
    </span>
  )
}
