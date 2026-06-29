import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { PageTransition } from '@/components/ui/PageTransition'
import { CalloutBlock } from '@/components/ui/CalloutBlock'
import { casParticuliers } from '@/data/fleet/transport/casParticuliers'
import { TRANSITIONS } from '@/lib/motion'

export function CasParticuliers() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <PageTransition>
      <div className="space-y-8 max-w-3xl">
        <div>
          <p className="text-xs text-[var(--text-muted)] mb-1">Transport</p>
          <h1 className="text-2xl font-bold" style={{
            background: 'linear-gradient(135deg, var(--text-primary) 60%, var(--text-secondary))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Cas particuliers
          </h1>
          <p className="text-[var(--text-secondary)] mt-2 text-sm leading-relaxed">
            Les situations complexes qui méritent une explication spécifique.
          </p>
        </div>

        <div className="space-y-3">
          {casParticuliers.map(cas => {
            const isOpen = openId === cas.id
            return (
              <div
                key={cas.id}
                className={`rounded-xl border transition-colors ${
                  isOpen
                    ? 'border-blue-500/30 bg-[var(--surface-2)]'
                    : 'border-[var(--border)] bg-surface-2'
                }`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : cas.id)}
                  className="w-full flex items-center justify-between gap-3 p-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className={`font-medium text-sm ${isOpen ? 'text-blue-400' : 'text-[var(--text-primary)]'}`}>
                    {cas.titre}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={TRANSITIONS.fast}
                    className="flex-shrink-0"
                  >
                    <ChevronDown size={16} className="text-[var(--text-muted)]" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={TRANSITIONS.default}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 space-y-4 border-t border-[var(--border)] pt-3">
                        <p className="text-xs text-[var(--text-muted)] leading-relaxed">{cas.contexte}</p>
                        <CalloutBlock variant="astuce" title="Règle">
                          {cas.regle}
                        </CalloutBlock>
                        {cas.exemple && (
                          <CalloutBlock variant="exemple" title="Exemple">
                            {cas.exemple}
                          </CalloutBlock>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </PageTransition>
  )
}
