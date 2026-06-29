import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { PageTransition } from '@/components/ui/PageTransition'
import { FormulaBlock } from '@/components/ui/FormulaBlock'
import { CalloutBlock } from '@/components/ui/CalloutBlock'
import { INDICATEURS as venteIndicateurs } from '@/data/fleet/vente/indicateurs'

export function VenteIndicateurDetail() {
  const { id } = useParams<{ id: string }>()
  const indicateur = venteIndicateurs.find(item => item.id === id)

  if (!indicateur) return <Navigate to="/vente/indicateurs" replace />

  return (
    <PageTransition>
      <div className="max-w-3xl space-y-8">
        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <Link to="/vente/indicateurs" className="flex items-center gap-1 transition-colors hover:text-[var(--text-secondary)]">
            <ArrowLeft size={12} />
            Indicateurs Vente
          </Link>
          <span>›</span>
          <span className="text-[var(--text-secondary)]">{indicateur.nom}</span>
        </div>

        <div>
          <p className="mb-1 text-xs text-[var(--text-muted)]">Indicateur Vente</p>
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
