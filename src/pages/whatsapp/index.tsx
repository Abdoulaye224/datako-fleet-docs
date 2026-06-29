import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageTransition } from '@/components/ui/PageTransition'
import { StaggerList } from '@/components/ui/StaggerList'
import { Badge } from '@/components/ui/Badge'
import { CalloutBlock } from '@/components/ui/CalloutBlock'
import { CategoryFilter } from '@/components/ui/CategoryFilter'
import { WHATSAPP_FLUX, type WhatsAppFlux } from '@/data/fleet/whatsapp'
import { TRANSITIONS, VARIANTS } from '@/lib/motion'

const categories = [
  { id: 'all', label: 'Tous les flux' },
  { id: 'conducteur', label: 'Conducteur' },
  { id: 'chef-exploitation', label: "Chef d'exploitation" },
  { id: 'dg', label: 'DG' },
  { id: 'proprietaire', label: 'Propriétaire' },
] as const

const profilColors: Record<WhatsAppFlux['profil'], 'blue' | 'amber' | 'purple' | 'emerald'> = {
  conducteur: 'blue',
  'chef-exploitation': 'amber',
  dg: 'purple',
  proprietaire: 'emerald',
}

const profilLabels: Record<WhatsAppFlux['profil'], string> = {
  conducteur: 'Conducteur',
  'chef-exploitation': "Chef d'exploitation",
  dg: 'Directeur Général',
  proprietaire: 'Propriétaire',
}

const messageTypeLabels: Record<WhatsAppFlux['messageType'], string> = {
  notification: 'Notification',
  validation: 'Validation',
  alerte: 'Alerte',
  resume: 'Résumé',
}

export function WhatsAppIndex() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [openFlux, setOpenFlux] = useState<string | null>(null)

  const filtered = WHATSAPP_FLUX.filter(
    flux => activeFilter === 'all' || flux.profil === activeFilter,
  )

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
            Module WhatsApp
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">
            Fleet Manager envoie des messages automatiques via WhatsApp pour coordonner conducteurs, chefs d'exploitation, DG et propriétaires. Retrouvez ici tous les flux actifs et comment les configurer.
          </p>
        </div>

        <CalloutBlock variant="astuce" title="Activation">
          Le module WhatsApp est disponible sur les plans Pro et Enterprise. Activez-le dans Paramètres → Intégrations → WhatsApp Business.
        </CalloutBlock>

        <CategoryFilter
          categories={categories.map(c => ({ ...c }))}
          active={activeFilter}
          onChange={setActiveFilter}
        />

        <StaggerList className="space-y-3">
          {filtered.map(flux => (
            <motion.div
              key={flux.id}
              variants={VARIANTS.slideUp}
              transition={TRANSITIONS.fast}
              className="overflow-hidden rounded-2xl border border-[var(--border)] bg-surface-2"
            >
              <button
                type="button"
                onClick={() => setOpenFlux(openFlux === flux.id ? null : flux.id)}
                className="flex w-full items-start gap-4 p-5 text-left transition-colors hover:bg-surface-3"
              >
                <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-green-500/10">
                  <MessageCircle size={18} className="text-green-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium text-[var(--text-primary)]">{flux.titre}</p>
                    <Badge label={profilLabels[flux.profil]} color={profilColors[flux.profil]} />
                    <Badge label={messageTypeLabels[flux.messageType]} color="blue" />
                  </div>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">{flux.description}</p>
                </div>
              </button>

              {openFlux === flux.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={TRANSITIONS.default}
                  className="border-t border-[var(--border)] px-5 pb-5 pt-4 space-y-4"
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Déclencheur</p>
                    <p className="mt-1 text-sm text-[var(--text-secondary)]">{flux.quand}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Exemple de message reçu</p>
                    <div className="mt-2 rounded-xl border border-green-500/20 bg-green-500/5 px-4 py-3">
                      <p className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-[var(--text-primary)]">
                        {flux.exempleMessage}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Comment l'activer</p>
                    <p className="mt-1 text-sm text-[var(--text-secondary)]">{flux.activation}</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </StaggerList>
      </div>
    </PageTransition>
  )
}
