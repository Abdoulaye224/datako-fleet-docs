import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, Eye, Target } from 'lucide-react'
import { PageTransition } from '@/components/ui/PageTransition'
import { CalloutBlock } from '@/components/ui/CalloutBlock'
import { appPages } from '@/data/fleet/transport/pages'

export function PageDetail() {
  const { id } = useParams<{ id: string }>()
  const page = appPages.find(p => p.id === id)

  if (!page) return <Navigate to="/transport/pages" replace />

  const currentIndex = appPages.findIndex(p => p.id === id)
  const prev = currentIndex > 0 ? appPages[currentIndex - 1] : null
  const next = currentIndex < appPages.length - 1 ? appPages[currentIndex + 1] : null

  return (
    <PageTransition>
      <div className="space-y-8 max-w-3xl">
        <div className="flex items-center gap-2 text-xs text-[#64748B]">
          <Link to="/transport/pages" className="hover:text-[#94A3B8] transition-colors flex items-center gap-1">
            <ArrowLeft size={12} />
            Comprendre les pages
          </Link>
          <span>›</span>
          <span className="text-[#94A3B8]">{page.name}</span>
        </div>

        <div>
          <span className="text-xs text-[#64748B] font-medium bg-[#1F2537] px-2 py-0.5 rounded-full border border-[rgba(255,255,255,0.08)]">
            Onglet {page.onglet}
          </span>
          <h1 className="text-2xl font-bold mt-3" style={{
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
          <p className="text-sm text-[#94A3B8] leading-relaxed pl-6">{page.see}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#94A3B8]">
            <Target size={16} />
            Pourquoi c'est utile
          </div>
          <p className="text-sm text-[#94A3B8] leading-relaxed pl-6">{page.why}</p>
        </div>

        <CalloutBlock variant="astuce" title="Comment lire cette page">
          {page.read}
        </CalloutBlock>

        <div className="flex gap-3 pt-4 border-t border-[rgba(255,255,255,0.08)]">
          {prev && (
            <Link
              to={`/transport/pages/${prev.id}`}
              className="flex-1 p-3 rounded-lg border border-[rgba(255,255,255,0.08)] hover:border-blue-500/30 hover:bg-[#1F2537] transition-colors"
            >
              <p className="text-xs text-[#64748B]">← Précédent</p>
              <p className="text-sm font-medium text-[#F1F5F9] mt-0.5 truncate">{prev.name}</p>
            </Link>
          )}
          {next && (
            <Link
              to={`/transport/pages/${next.id}`}
              className="flex-1 p-3 rounded-lg border border-[rgba(255,255,255,0.08)] hover:border-blue-500/30 hover:bg-[#1F2537] transition-colors text-right"
            >
              <p className="text-xs text-[#64748B]">Suivant →</p>
              <p className="text-sm font-medium text-[#F1F5F9] mt-0.5 truncate">{next.name}</p>
            </Link>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
