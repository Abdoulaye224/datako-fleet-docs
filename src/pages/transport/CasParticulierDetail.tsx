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
        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <Link to="/transport/cas-particuliers" className="flex items-center gap-1 transition-colors hover:text-[var(--text-secondary)]">
            <ArrowLeft size={12} />
            Cas particuliers
          </Link>
          <span>›</span>
          <span className="text-[var(--text-secondary)]">{article.titre}</span>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">{article.titre}</h1>
          <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">{article.contexte}</p>
        </div>

        <CalloutBlock variant="astuce" title="Règle à retenir">
          {article.regle}
        </CalloutBlock>

        {article.exemple && <CalloutBlock variant="exemple">{article.exemple}</CalloutBlock>}
      </div>
    </PageTransition>
  )
}
