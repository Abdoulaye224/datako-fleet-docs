import { Link } from 'react-router-dom'
import { ChevronRight, Compass } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageTransition } from '@/components/ui/PageTransition'
import { StaggerList } from '@/components/ui/StaggerList'
import { ACCUEIL_ICONS } from '@/components/ui/MetierCard'
import { TRANSITIONS } from '@/lib/motion'
import { LANDING_MARKETEUR } from '@/data/fleet/accueil'

const liensSecondaires = [
  { label: 'Toutes les pages du module', href: '/vente/pages' },
  { label: 'Tous les guides', href: '/vente/guides' },
  { label: 'Tous les indicateurs', href: '/vente/indicateurs' },
  { label: 'Parcours selon mon rôle', href: '/profils' },
]

export function VenteIndex() {
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
            Marketeur
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
            Gérez vos achats SONAP, votre stock, vos ventes, vos encaissements et vos obligations réglementaires. Dans
            Fleet Manager, ce module apparaît sous le nom <span className="text-[var(--text-primary)]">Vente</span>.
          </p>
        </div>

        <StaggerList className="space-y-3">
          {LANDING_MARKETEUR.map(entree => {
            const Icon = ACCUEIL_ICONS[entree.icon] ?? Compass
            return (
              <motion.div key={entree.href} whileHover={{ x: 4 }} transition={TRANSITIONS.fast}>
                <Link
                  to={entree.href}
                  className="group flex items-center gap-4 rounded-xl border border-[var(--border)] bg-surface-2 p-5 transition-colors hover:border-emerald-500/30 hover:bg-surface-3"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                    <Icon size={18} className="text-emerald-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-[var(--text-primary)] transition-colors group-hover:text-emerald-400">
                      {entree.titre}
                    </p>
                    <p className="mt-0.5 text-sm text-[var(--text-muted)]">{entree.description}</p>
                  </div>
                  <ChevronRight size={16} className="flex-shrink-0 text-[var(--text-muted)] transition-colors group-hover:text-emerald-400" />
                </Link>
              </motion.div>
            )
          })}
        </StaggerList>

        <div className="rounded-xl border border-[var(--border)] bg-surface-2 p-5">
          <p className="text-sm font-medium text-[var(--text-primary)]">Aller plus loin</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {liensSecondaires.map(lien => (
              <Link
                key={lien.href}
                to={lien.href}
                className="rounded-full border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--text-secondary)] transition-colors hover:border-emerald-500/30 hover:text-emerald-400"
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
