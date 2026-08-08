import { Link } from 'react-router-dom'
import { ChevronRight, Compass } from 'lucide-react'
import { PageTransition } from '@/components/ui/PageTransition'
import { StaggerList } from '@/components/ui/StaggerList'
import { ACCUEIL_ICONS } from '@/components/ui/MetierCard'
import { motion } from 'framer-motion'
import { TRANSITIONS } from '@/lib/motion'
import { LANDING_TRANSPORT } from '@/data/fleet/accueil'

const liensSecondaires = [
  { label: 'Cas particuliers', href: '/transport/cas-particuliers' },
  { label: 'Portail Propriétaire', href: '/portail-proprietaire' },
  { label: 'Alertes WhatsApp', href: '/whatsapp' },
  { label: 'Guide destinataire', href: '/confirmation-livraison' },
]

export function TransportIndex() {
  return (
    <PageTransition>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold" style={{
            background: 'linear-gradient(135deg, var(--text-primary) 60%, var(--text-secondary))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Transport
          </h1>
          <p className="text-[var(--text-secondary)] mt-2 text-sm leading-relaxed">
            Gérez votre flotte, vos rotations, vos livraisons, vos clients et suivez la rentabilité de votre activité.
          </p>
        </div>

        <StaggerList className="space-y-3">
          {LANDING_TRANSPORT.map(entree => {
            const Icon = ACCUEIL_ICONS[entree.icon] ?? Compass
            return (
              <motion.div key={entree.href} whileHover={{ x: 4 }} transition={TRANSITIONS.fast}>
                <Link
                  to={entree.href}
                  className="flex items-center gap-4 p-5 rounded-xl border border-[var(--border)] bg-surface-2 hover:border-blue-500/30 hover:bg-surface-3 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[var(--text-primary)] group-hover:text-blue-400 transition-colors">
                      {entree.titre}
                    </p>
                    <p className="text-sm text-[var(--text-muted)] mt-0.5">{entree.description}</p>
                  </div>
                  <ChevronRight size={16} className="text-[var(--text-muted)] group-hover:text-blue-400 transition-colors flex-shrink-0" />
                </Link>
              </motion.div>
            )
          })}
        </StaggerList>

        <div className="rounded-xl border border-[var(--border)] bg-surface-2 p-5">
          <p className="text-sm font-medium text-[var(--text-primary)]">Aussi lié au Transport</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {liensSecondaires.map(lien => (
              <Link
                key={lien.href}
                to={lien.href}
                className="rounded-full border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--text-secondary)] transition-colors hover:border-blue-500/30 hover:text-blue-400"
              >
                {lien.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
