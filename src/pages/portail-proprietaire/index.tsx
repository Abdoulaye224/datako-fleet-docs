import { BookOpen, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageTransition } from '@/components/ui/PageTransition'
import { StaggerList } from '@/components/ui/StaggerList'
import { CalloutBlock } from '@/components/ui/CalloutBlock'
import { PORTAIL_SECTIONS } from '@/data/fleet/portail'
import { TRANSITIONS, VARIANTS } from '@/lib/motion'

export function PortailProprietaireIndex() {
  return (
    <PageTransition>
      <div className="space-y-8">
        <div>
          <h1
            className="text-2xl font-bold"
            style={{
              background: 'linear-gradient(135deg, var(--text-primary) 60%, var(--text-secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Portail Propriétaire
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">
            Espace dédié aux propriétaires de véhicules gérés. Accédez à vos rotations, bilans et exports PDF depuis une interface simplifiée, sans accès aux données de l'organisation.
          </p>
        </div>

        <CalloutBlock variant="attention" title="Pour les propriétaires de véhicules gérés">
          Le Portail Propriétaire est accessible uniquement si votre véhicule est enregistré comme "géré" dans Fleet Manager. L'administrateur de votre organisation vous envoie vos identifiants par WhatsApp ou email.
        </CalloutBlock>

        <StaggerList className="space-y-2">
          {PORTAIL_SECTIONS.map(section => (
            <motion.div key={section.id} variants={VARIANTS.slideUp} whileHover={{ x: 4 }} transition={TRANSITIONS.fast}>
              <Link
                to={section.href}
                className="group flex items-center gap-3 rounded-lg border border-[var(--border)] bg-surface-2 p-4 transition-colors hover:border-amber-500/30 hover:bg-surface-3"
              >
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
                  <BookOpen size={16} className="text-amber-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-[var(--text-primary)] transition-colors group-hover:text-amber-400">
                    {section.titre}
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-xs text-[var(--text-muted)]">{section.description}</p>
                </div>
                <ChevronRight
                  size={14}
                  className="flex-shrink-0 text-[var(--text-muted)] transition-colors group-hover:text-amber-400"
                />
              </Link>
            </motion.div>
          ))}
        </StaggerList>
      </div>
    </PageTransition>
  )
}
