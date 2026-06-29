import { CheckCircle2, Circle, XCircle } from 'lucide-react'

interface CheckListProps {
  items: string[]
  variant: 'prerequis' | 'resultat' | 'erreur'
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
      color: 'text-emerald-400',
      label: 'Résultat attendu',
    },
    erreur: {
      icon: XCircle,
      color: 'text-red-400',
      label: 'Erreurs fréquentes',
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
