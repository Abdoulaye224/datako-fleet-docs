import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { PageTransition } from '@/components/ui/PageTransition'
import { StepList } from '@/components/ui/StepList'
import { CheckList } from '@/components/ui/CheckList'
import { CalloutBlock } from '@/components/ui/CalloutBlock'
import { guides } from '@/data/fleet/transport/guides'

const guideAliases: Record<string, string> = {
  'ajouter-un-camion': 'ajouter-camion',
  'ajouter-un-client': 'ajouter-client',
  'creer-une-rotation': 'creer-rotation',
  'valider-une-livraison': 'valider-livraison',
  'confirmer-un-paiement': 'confirmer-paiement',
  'ajouter-une-charge-fixe': 'ajouter-charge-fixe',
  'ajouter-une-maintenance': 'ajouter-maintenance',
  'generer-releve-client-pdf': 'releve-client-pdf',
  'generer-bilan-proprietaire-pdf': 'bilan-proprietaire-pdf',
}

export function GuideDetail() {
  const { id } = useParams<{ id: string }>()
  const resolvedId = id ? guideAliases[id] ?? id : undefined
  const guide = guides.find(g => g.id === resolvedId)

  if (!guide) return <Navigate to="/transport/guides" replace />

  const currentIndex = guides.findIndex(g => g.id === resolvedId)
  const prev = currentIndex > 0 ? guides[currentIndex - 1] : null
  const next = currentIndex < guides.length - 1 ? guides[currentIndex + 1] : null

  return (
    <PageTransition>
      <div className="max-w-3xl space-y-8">
        <div className="flex items-center gap-2 text-xs text-[#64748B]">
          <Link to="/transport/guides" className="flex items-center gap-1 transition-colors hover:text-[#94A3B8]">
            <ArrowLeft size={12} />
            Guides pas-à-pas
          </Link>
          <span>›</span>
          <span className="text-[#94A3B8]">{guide.title}</span>
        </div>

        <div>
          <h1 className="text-2xl font-bold" style={{
            background: 'linear-gradient(135deg, #F1F5F9 60%, #94A3B8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            {guide.title}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">{guide.objectif}</p>
        </div>

        {guide.prerequis.length > 0 && <CheckList items={guide.prerequis} variant="prerequis" />}

        <div>
          <h2 className="mb-4 text-base font-semibold text-[#F1F5F9]">Étapes</h2>
          <StepList steps={guide.etapes} />
        </div>

        <CalloutBlock variant="exemple" title="Résultat attendu">
          {guide.resultat}
        </CalloutBlock>

        {guide.erreurs.length > 0 && <CheckList items={guide.erreurs} variant="erreur" />}

        <div className="flex gap-3 border-t border-white/10 pt-4">
          {prev && (
            <Link
              to={`/transport/guides/${prev.id}`}
              className="flex-1 rounded-lg border border-white/10 p-3 transition-colors hover:border-blue-500/30 hover:bg-surface-3"
            >
              <p className="text-xs text-[#64748B]">← Précédent</p>
              <p className="mt-0.5 truncate text-sm font-medium text-[#F1F5F9]">{prev.title}</p>
            </Link>
          )}
          {next && (
            <Link
              to={`/transport/guides/${next.id}`}
              className="flex-1 rounded-lg border border-white/10 p-3 text-right transition-colors hover:border-blue-500/30 hover:bg-surface-3"
            >
              <p className="text-xs text-[#64748B]">Suivant →</p>
              <p className="mt-0.5 truncate text-sm font-medium text-[#F1F5F9]">{next.title}</p>
            </Link>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
