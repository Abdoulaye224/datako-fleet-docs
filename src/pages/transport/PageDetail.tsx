import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, Eye, Target } from 'lucide-react'
import { PageTransition } from '@/components/ui/PageTransition'
import { CalloutBlock } from '@/components/ui/CalloutBlock'
import { appPages } from '@/data/fleet/transport/pages'

const pageAliases: Record<string, string> = {
  'profit-par-camion': 'profit-camion',
}

export function PageDetail() {
  const { id } = useParams<{ id: string }>()
  const resolvedId = id ? pageAliases[id] ?? id : undefined
  const page = appPages.find(p => p.id === resolvedId)

  if (!page) return <Navigate to="/transport/pages" replace />

  const currentIndex = appPages.findIndex(p => p.id === resolvedId)
  const prev = currentIndex > 0 ? appPages[currentIndex - 1] : null
  const next = currentIndex < appPages.length - 1 ? appPages[currentIndex + 1] : null

  return (
    <PageTransition>
      <div className="max-w-3xl space-y-8">
        <div className="flex items-center gap-2 text-xs text-[#64748B]">
          <Link to="/transport/pages" className="flex items-center gap-1 transition-colors hover:text-[#94A3B8]">
            <ArrowLeft size={12} />
            Comprendre les pages
          </Link>
          <span>›</span>
          <span className="text-[#94A3B8]">{page.name}</span>
        </div>

        <div>
          <span className="rounded-full border border-white/10 bg-surface-3 px-2 py-0.5 text-xs font-medium text-[#64748B]">
            Onglet {page.onglet}
          </span>
          <h1 className="mt-3 text-2xl font-bold" style={{
            background: 'linear-gradient(135deg, #F1F5F9 60%, #94A3B8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            {page.name}
          </h1>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#94A3B8]">
            <Eye size={16} />
            Ce que vous voyez
          </div>
          <p className="pl-6 text-sm leading-relaxed text-[#94A3B8]">{page.see}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#94A3B8]">
            <Target size={16} />
            Pourquoi c'est utile
          </div>
          <p className="pl-6 text-sm leading-relaxed text-[#94A3B8]">{page.why}</p>
        </div>

        <CalloutBlock variant="astuce" title="Comment lire cette page">
          {page.read}
        </CalloutBlock>

        <div className="flex gap-3 border-t border-white/10 pt-4">
          {prev && (
            <Link
              to={`/transport/pages/${prev.id}`}
              className="flex-1 rounded-lg border border-white/10 p-3 transition-colors hover:border-blue-500/30 hover:bg-surface-3"
            >
              <p className="text-xs text-[#64748B]">← Précédent</p>
              <p className="mt-0.5 truncate text-sm font-medium text-[#F1F5F9]">{prev.name}</p>
            </Link>
          )}
          {next && (
            <Link
              to={`/transport/pages/${next.id}`}
              className="flex-1 rounded-lg border border-white/10 p-3 text-right transition-colors hover:border-blue-500/30 hover:bg-surface-3"
            >
              <p className="text-xs text-[#64748B]">Suivant →</p>
              <p className="mt-0.5 truncate text-sm font-medium text-[#F1F5F9]">{next.name}</p>
            </Link>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
