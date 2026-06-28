import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { PageTransition } from '@/components/ui/PageTransition'
import { StepList } from '@/components/ui/StepList'
import { CheckList } from '@/components/ui/CheckList'
import { CalloutBlock } from '@/components/ui/CalloutBlock'
import { guides } from '@/data/fleet/transport/guides'

export function GuideDetail() {
  const { id } = useParams<{ id: string }>()
  const guide = guides.find(g => g.id === id)

  if (!guide) return <Navigate to="/transport/guides" replace />

  const currentIndex = guides.findIndex(g => g.id === id)
  const prev = currentIndex > 0 ? guides[currentIndex - 1] : null
  const next = currentIndex < guides.length - 1 ? guides[currentIndex + 1] : null

  return (
    <PageTransition>
      <div className="space-y-8 max-w-3xl">
        <div className="flex items-center gap-2 text-xs text-[#64748B]">
          <Link to="/transport/guides" className="hover:text-[#94A3B8] transition-colors flex items-center gap-1">
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
          <p className="text-sm text-[#94A3B8] mt-2 leading-relaxed">{guide.objectif}</p>
        </div>

        {guide.prerequis.length > 0 && (
          <CheckList items={guide.prerequis} variant="prerequis" />
        )}

        <div>
          <h2 className="text-base font-semibold text-[#F1F5F9] mb-4">Étapes</h2>
          <StepList steps={guide.etapes} />
        </div>

        <CalloutBlock variant="exemple" title="Résultat attendu">
          {guide.resultat}
        </CalloutBlock>

        {guide.erreurs.length > 0 && (
          <CheckList items={guide.erreurs} variant="erreur" />
        )}

        <div className="flex gap-3 pt-4 border-t border-[rgba(255,255,255,0.08)]">
          {prev && (
            <Link
              to={`/transport/guides/${prev.id}`}
              className="flex-1 p-3 rounded-lg border border-[rgba(255,255,255,0.08)] hover:border-blue-500/30 hover:bg-[#1F2537] transition-colors"
            >
              <p className="text-xs text-[#64748B]">← Précédent</p>
              <p className="text-sm font-medium text-[#F1F5F9] mt-0.5 truncate">{prev.title}</p>
            </Link>
          )}
          {next && (
            <Link
              to={`/transport/guides/${next.id}`}
              className="flex-1 p-3 rounded-lg border border-[rgba(255,255,255,0.08)] hover:border-blue-500/30 hover:bg-[#1F2537] transition-colors text-right"
            >
              <p className="text-xs text-[#64748B]">Suivant →</p>
              <p className="text-sm font-medium text-[#F1F5F9] mt-0.5 truncate">{next.title}</p>
            </Link>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
