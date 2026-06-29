import { Navigate, useParams } from 'react-router-dom'
import { Eye, Target } from 'lucide-react'
import { PageTransition } from '@/components/ui/PageTransition'
import { CalloutBlock } from '@/components/ui/CalloutBlock'
import { Breadcrumb } from '@/components/navigation/Breadcrumb'
import { PrevNext } from '@/components/navigation/PrevNext'
import { appPages as ventePagesData } from '@/data/fleet/vente/pages'

export function VentePageDetail() {
  const { id } = useParams<{ id: string }>()
  const page = ventePagesData.find(p => p.id === id)

  if (!page) return <Navigate to="/vente/pages" replace />

  const currentIndex = ventePagesData.findIndex(p => p.id === id)
  const prev = currentIndex > 0 ? ventePagesData[currentIndex - 1] : null
  const next = currentIndex < ventePagesData.length - 1 ? ventePagesData[currentIndex + 1] : null

  return (
    <PageTransition>
      <div className="max-w-3xl space-y-8">
        <Breadcrumb
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Vente / Distribution', href: '/vente' },
            { label: 'Comprendre les pages', href: '/vente/pages' },
            { label: page.name },
          ]}
        />

        <div>
          <span className="rounded-full border border-[var(--border)] bg-surface-3 px-2 py-0.5 text-xs font-medium text-[var(--text-muted)]">
            Module Vente
          </span>
          <h1
            className="mt-3 text-2xl font-bold"
            style={{
              background: 'linear-gradient(135deg, var(--text-primary) 60%, var(--text-secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {page.name}
          </h1>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)]">
            <Eye size={16} />
            Ce que vous voyez
          </div>
          <p className="pl-6 text-sm leading-relaxed text-[var(--text-secondary)]">{page.see}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)]">
            <Target size={16} />
            Pourquoi c'est utile
          </div>
          <p className="pl-6 text-sm leading-relaxed text-[var(--text-secondary)]">{page.why}</p>
        </div>

        <CalloutBlock variant="astuce" title="Comment lire cette page">
          {page.read}
        </CalloutBlock>

        <PrevNext
          precedent={prev ? { titre: prev.name, href: `/vente/pages/${prev.id}` } : undefined}
          suivant={next ? { titre: next.name, href: `/vente/pages/${next.id}` } : undefined}
        />
      </div>
    </PageTransition>
  )
}
