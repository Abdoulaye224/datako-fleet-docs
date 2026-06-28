import { Circle, CheckCircle2, XCircle } from 'lucide-react'

interface CheckListProps {
  items: string[]
  variant: 'prerequis' | 'resultat' | 'erreur'
}

export function CheckList({ items, variant }: CheckListProps) {
  const config = {
    prerequis: {
      icon: Circle,
      color: 'text-[#94A3B8]',
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
      <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2">{label}</p>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 items-start">
            <Icon size={16} className={`flex-shrink-0 mt-0.5 ${color}`} />
            <span className="text-sm text-[#94A3B8]">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
