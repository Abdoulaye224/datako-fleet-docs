import { Lightbulb, AlertTriangle, BookOpen } from 'lucide-react'

interface CalloutBlockProps {
  variant: 'astuce' | 'attention' | 'exemple'
  title?: string
  children: React.ReactNode
}

const config = {
  astuce: {
    icon: Lightbulb,
    className: 'bg-blue-500/5 border-blue-500/20 text-blue-300',
    iconClass: 'text-blue-400',
    label: 'Astuce',
  },
  attention: {
    icon: AlertTriangle,
    className: 'bg-amber-500/5 border-amber-500/20 text-amber-300',
    iconClass: 'text-amber-400',
    label: 'Attention',
  },
  exemple: {
    icon: BookOpen,
    className: 'bg-emerald-500/5 border-emerald-500/20 text-emerald-300',
    iconClass: 'text-emerald-400',
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
        <div className="text-sm opacity-90">{children}</div>
      </div>
    </div>
  )
}
