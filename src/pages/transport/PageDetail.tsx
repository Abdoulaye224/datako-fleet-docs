import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, Eye, Target, ArrowRight, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'
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
        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <Link to="/transport/pages" className="flex items-center gap-1 transition-colors hover:text-[var(--text-secondary)]">
            <ArrowLeft size={12} />
            Comprendre les pages
          </Link>
          <span>›</span>
          <span className="text-[var(--text-secondary)]">{page.name}</span>
        </div>

        <div>
          <span className="rounded-full border border-[var(--border)] bg-surface-3 px-2 py-0.5 text-xs font-medium text-[var(--text-muted)]">
            Onglet {page.onglet}
          </span>
          <h1 className="mt-3 text-2xl font-bold" style={{
            background: 'linear-gradient(135deg, var(--text-primary) 60%, var(--text-secondary))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
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

        {page.guideAssocie && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
          >
            <Link
              to={page.guideAssocie.href}
              className="group flex items-center justify-between rounded-xl border border-blue-500/20 bg-gradient-to-r from-blue-500/5 to-violet-500/5 p-4 transition-all hover:border-blue-500/40 hover:from-blue-500/10 hover:to-violet-500/10"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                  <BookOpen size={16} />
                </div>
                <div>
                  <p className="text-xs text-[var(--text-muted)]">Prêt à passer à l'action ?</p>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{page.guideAssocie.titre}</p>
                </div>
              </div>
              <ArrowRight size={16} className="text-[var(--text-muted)] transition-transform group-hover:translate-x-1 group-hover:text-blue-400" />
            </Link>
          </motion.div>
        )}

        <div className="flex gap-3 border-t border-[var(--border)] pt-4">
          {prev && (
            <Link
              to={`/transport/pages/${prev.id}`}
              className="flex-1 rounded-lg border border-[var(--border)] p-3 transition-colors hover:border-blue-500/30 hover:bg-surface-3"
            >
              <p className="text-xs text-[var(--text-muted)]">← Précédent</p>
              <p className="mt-0.5 truncate text-sm font-medium text-[var(--text-primary)]">{prev.name}</p>
            </Link>
          )}
          {next && (
            <Link
              to={`/transport/pages/${next.id}`}
              className="flex-1 rounded-lg border border-[var(--border)] p-3 text-right transition-colors hover:border-blue-500/30 hover:bg-surface-3"
            >
              <p className="text-xs text-[var(--text-muted)]">Suivant →</p>
              <p className="mt-0.5 truncate text-sm font-medium text-[var(--text-primary)]">{next.name}</p>
            </Link>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
