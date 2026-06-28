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
        <div className="flex items-center gap-2 text-xs text-[#64748B]">
          <Link to="/indicateurs" className="flex items-center gap-1 transition-colors hover:text-[#94A3B8]">
            <ArrowLeft size={12} />
            Indicateurs
          </Link>
          <span>›</span>
          <span className="text-[#94A3B8]">{indicateur.nom}</span>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-[#F1F5F9]">{indicateur.nom}</h1>
          <p className="mt-3 text-sm leading-relaxed text-[#94A3B8]">{indicateur.definition}</p>
        </div>

        {indicateur.formule && <FormulaBlock formule={indicateur.formule} exemple={indicateur.exemple} />}
        <CalloutBlock variant="exemple">{indicateur.exemple}</CalloutBlock>
        <CalloutBlock variant="astuce">{indicateur.conseil}</CalloutBlock>
      </div>
    </PageTransition>
  )
}
