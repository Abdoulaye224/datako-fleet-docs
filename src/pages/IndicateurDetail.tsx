import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { PageTransition } from '@/components/ui/PageTransition'
import { FormulaBlock } from '@/components/ui/FormulaBlock'
import { CalloutBlock } from '@/components/ui/CalloutBlock'
import { INDICATEURS } from '@/data/fleet'

export function IndicateurDetail() {
  const { id } = useParams<{ id: string }>()

  if (id === 'profit-par-camion') {
    return <Navigate to="/transport/pages/profit-camion" replace />
  }

  const indicateur = INDICATEURS.find(item => item.id === id)

  if (!indicateur) return <Navigate to="/indicateurs" replace />

  return (
    <PageTransition>
      <div className="max-w-3xl space-y-8">
        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <Link to="/indicateurs" className="flex items-center gap-1 transition-colors hover:text-[var(--text-secondary)]">
            <ArrowLeft size={12} />
            Indicateurs
          </Link>
          <span>›</span>
          <span className="text-[var(--text-secondary)]">{indicateur.nom}</span>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">{indicateur.nom}</h1>
          <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">{indicateur.definition}</p>
        </div>

        {indicateur.formule && <FormulaBlock formule={indicateur.formule} exemple={indicateur.exemple} />}
        <CalloutBlock variant="exemple">{indicateur.exemple}</CalloutBlock>
        <CalloutBlock variant="astuce">{indicateur.conseil}</CalloutBlock>
      </div>
    </PageTransition>
  )
}
