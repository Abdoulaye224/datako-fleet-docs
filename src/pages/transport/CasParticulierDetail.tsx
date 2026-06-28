import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { PageTransition } from '@/components/ui/PageTransition'
import { CalloutBlock } from '@/components/ui/CalloutBlock'
import { casParticuliers } from '@/data/fleet'

const caseAliases: Record<string, string> = {
  'vehicule-gere-vs-propre': 'vehicule-propre-vs-gere',
  'volume-manquant': 'volume-livre-different',
}

export function CasParticulierDetail() {
  const { id } = useParams<{ id: string }>()
  const resolvedId = id ? caseAliases[id] ?? id : undefined
  const article = casParticuliers.find(item => item.id === resolvedId)

  if (!article) return <Navigate to="/transport/cas-particuliers" replace />

  return (
    <PageTransition>
      <div className="max-w-3xl space-y-8">
        <div className="flex items-center gap-2 text-xs text-[#64748B]">
          <Link to="/transport/cas-particuliers" className="flex items-center gap-1 transition-colors hover:text-[#94A3B8]">
            <ArrowLeft size={12} />
            Cas particuliers
          </Link>
          <span>›</span>
          <span className="text-[#94A3B8]">{article.titre}</span>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-[#F1F5F9]">{article.titre}</h1>
          <p className="mt-3 text-sm leading-relaxed text-[#94A3B8]">{article.contexte}</p>
        </div>

        <CalloutBlock variant="astuce" title="Règle à retenir">
          {article.regle}
        </CalloutBlock>

        {article.exemple && <CalloutBlock variant="exemple">{article.exemple}</CalloutBlock>}
      </div>
    </PageTransition>
  )
}
