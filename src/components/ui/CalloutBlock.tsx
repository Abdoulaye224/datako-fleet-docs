import { Lightbulb, AlertTriangle, BookOpen } from 'lucide-react'

interface CalloutBlockProps {
  variant: 'astuce' | 'attention' | 'exemple'
  title?: string
  children: React.ReactNode
}

const config = {
  astuce: {
    icon: Lightbulb,
    className: 'bg-[var(--accent-blue-bg)] border-[var(--accent-blue-border)] text-[var(--accent-blue-fg)]',
    iconClass: 'text-[var(--accent-blue-icon)]',
    label: 'Astuce',
  },
  attention: {
    icon: AlertTriangle,
    className: 'bg-[var(--accent-amber-bg)] border-[var(--accent-amber-border)] text-[var(--accent-amber-fg)]',
    iconClass: 'text-[var(--accent-amber-icon)]',
    label: 'Attention',
  },
  exemple: {
    icon: BookOpen,
    className: 'bg-[var(--accent-emerald-bg)] border-[var(--accent-emerald-border)] text-[var(--accent-emerald-fg)]',
    iconClass: 'text-[var(--accent-emerald-icon)]',
    label: 'Exemple',
  },
}

export function CalloutBlock({ variant, title, children }: CalloutBlockProps) {
  const { icon: Icon, className, iconClass, label } = config[variant]
  return (
    <div className={`rounded-lg border p-4 flex gap-3 ${className}`}>
      <Icon size={20} className={`flex-shrink-0 mt-0.5 ${iconClass}`} />
      <div>
        <p className="font-semibold mb-1 text-sm">{title ?? label}</p>
        <div className="text-sm">{children}</div>
      </div>
    </div>
  )
}
