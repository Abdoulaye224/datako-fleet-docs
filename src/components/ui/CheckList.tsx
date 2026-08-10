import { CheckCircle2, Circle, Info, XCircle } from 'lucide-react'

interface CheckListProps {
  items: string[]
  variant: 'prerequis' | 'resultat' | 'erreur' | 'impact'
  showLabel?: boolean
}

export function CheckList({ items, variant, showLabel = true }: CheckListProps) {
  const config = {
    prerequis: {
      icon: Circle,
      color: 'text-[var(--text-secondary)]',
      label: 'Prérequis',
    },
    resultat: {
      icon: CheckCircle2,
      color: 'text-[var(--accent-emerald-icon)]',
      label: 'Résultat attendu',
    },
    erreur: {
      icon: XCircle,
      color: 'text-[var(--accent-red-icon)]',
      label: 'Erreurs fréquentes',
    },
    impact: {
      icon: Info,
      color: 'text-[var(--accent-blue-icon)]',
      label: 'Impacts financiers',
    },
  }

  const { icon: Icon, color, label } = config[variant]

  return (
    <div>
      {showLabel && <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">{label}</p>}
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <Icon size={16} className={`mt-0.5 flex-shrink-0 ${color}`} />
            <span className="text-sm text-[var(--text-secondary)]">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
