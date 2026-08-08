import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Eye, ListChecks, Navigation } from 'lucide-react'
import { PageTransition } from '@/components/ui/PageTransition'
import { CalloutBlock } from '@/components/ui/CalloutBlock'
import { StaggerList } from '@/components/ui/StaggerList'
import { motion } from 'framer-motion'
import { PORTAIL_SECTIONS } from '@/data/fleet/portail'
import { TRANSITIONS, VARIANTS } from '@/lib/motion'

export function PortailSectionDetail() {
  const { id } = useParams<{ id: string }>()
  const index = PORTAIL_SECTIONS.findIndex(section => section.id === id)

  if (index === -1) return <Navigate to="/portail-proprietaire" replace />

  const section = PORTAIL_SECTIONS[index]
  const prev = index > 0 ? PORTAIL_SECTIONS[index - 1] : null
  const next = index < PORTAIL_SECTIONS.length - 1 ? PORTAIL_SECTIONS[index + 1] : null

  return (
    <PageTransition>
      <div className="max-w-3xl space-y-8">
        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <Link
            to="/portail-proprietaire"
            className="flex items-center gap-1 transition-colors hover:text-[var(--text-secondary)]"
          >
            <ArrowLeft size={12} />
            Portail Propriétaire
          </Link>
          <span>›</span>
          <span className="text-[var(--text-secondary)]">{section.titre}</span>
        </div>

        <div>
          <h1
            className="text-2xl font-bold"
            style={{
              background: 'linear-gradient(135deg, var(--text-primary) 60%, var(--text-secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {section.titre}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{section.description}</p>
        </div>

        {section.prerequis.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)]">
              <ListChecks size={16} />
              Prérequis
            </div>
            <ul className="space-y-1 pl-6">
              {section.prerequis.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                  <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0 text-amber-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)]">
            <Eye size={16} />
            Ce que vous pouvez faire
          </div>
          <ul className="space-y-1.5 pl-6">
            {section.quoi.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)]">
            <Navigation size={16} />
            Comment y accéder
          </div>
          <p className="pl-6 text-sm leading-relaxed text-[var(--text-secondary)]">{section.comment}</p>
        </div>

        {section.sousSections && section.sousSections.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Détail du panneau
            </p>
            <StaggerList className="space-y-3">
              {section.sousSections.map((sous, i) => (
                <motion.div
                  key={i}
                  variants={VARIANTS.slideUp}
                  transition={TRANSITIONS.fast}
                  className="rounded-xl border border-[var(--border)] bg-surface-2 p-4"
                >
                  <p className="text-sm font-medium text-[var(--text-primary)]">{sous.titre}</p>
                  <ul className="mt-2 space-y-1.5">
                    {sous.points.map((point, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-400" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </StaggerList>
          </div>
        )}

        {section.astuce && (
          <CalloutBlock variant="astuce" title="Astuce">
            {section.astuce}
          </CalloutBlock>
        )}

        <div className="flex gap-3 border-t border-[var(--border)] pt-4">
          {prev && (
            <Link
              to={prev.href}
              className="flex-1 rounded-lg border border-[var(--border)] p-3 transition-colors hover:border-amber-500/30 hover:bg-surface-3"
            >
              <p className="text-xs text-[var(--text-muted)]">← Précédent</p>
              <p className="mt-0.5 truncate text-sm font-medium text-[var(--text-primary)]">{prev.titre}</p>
            </Link>
          )}
          {next && (
            <Link
              to={next.href}
              className="flex-1 rounded-lg border border-[var(--border)] p-3 text-right transition-colors hover:border-amber-500/30 hover:bg-surface-3"
            >
              <p className="text-xs text-[var(--text-muted)]">Suivant →</p>
              <p className="mt-0.5 truncate text-sm font-medium text-[var(--text-primary)]">{next.titre}</p>
            </Link>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
