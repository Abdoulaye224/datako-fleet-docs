import { useState } from 'react'
import { BookOpen, CheckCircle2, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageTransition } from '@/components/ui/PageTransition'
import { StaggerList } from '@/components/ui/StaggerList'
import { CalloutBlock } from '@/components/ui/CalloutBlock'
import { PORTAIL_SECTIONS } from '@/data/fleet/portail'
import { TRANSITIONS, VARIANTS } from '@/lib/motion'

export function PortailProprietaireIndex() {
  const [openSection, setOpenSection] = useState<string | null>('connexion-portail')

  return (
    <PageTransition>
      <div className="space-y-8">
        <div>
          <p className="mb-1 text-xs text-[var(--text-muted)]">Module V2</p>
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

        <StaggerList className="space-y-3">
          {PORTAIL_SECTIONS.map(section => (
            <motion.div
              key={section.id}
              variants={VARIANTS.slideUp}
              transition={TRANSITIONS.fast}
              className="overflow-hidden rounded-2xl border border-[var(--border)] bg-surface-2"
            >
              <button
                type="button"
                onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-surface-3"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-amber-500/10">
                    <BookOpen size={18} className="text-amber-400" />
                  </div>
                  <div>
                    <p className="font-medium text-[var(--text-primary)]">{section.titre}</p>
                    <p className="mt-0.5 text-sm text-[var(--text-muted)]">{section.description}</p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: openSection === section.id ? 180 : 0 }}
                  transition={TRANSITIONS.fast}
                >
                  <ChevronDown size={16} className="flex-shrink-0 text-[var(--text-muted)]" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openSection === section.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={TRANSITIONS.default}
                    className="border-t border-[var(--border)] px-5 pb-5 pt-4 space-y-4"
                  >
                    {section.prerequis.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Prérequis</p>
                        <ul className="mt-2 space-y-1">
                          {section.prerequis.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                              <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0 text-amber-400" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Ce que vous pouvez faire</p>
                      <ul className="mt-2 space-y-1">
                        {section.quoi.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Comment y accéder</p>
                      <p className="mt-1 text-sm text-[var(--text-secondary)]">{section.comment}</p>
                    </div>

                    {section.astuce && (
                      <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 px-4 py-3 text-sm text-[var(--text-secondary)]">
                        💡 {section.astuce}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </StaggerList>
      </div>
    </PageTransition>
  )
}
