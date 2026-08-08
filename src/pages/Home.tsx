import { ArrowRight, Compass, Info } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageTransition } from '@/components/ui/PageTransition'
import { StaggerList } from '@/components/ui/StaggerList'
import { Badge } from '@/components/ui/Badge'
import { MetierCard, ACCUEIL_ICONS } from '@/components/ui/MetierCard'
import { NOUVEAUTES } from '@/data/fleet'
import {
  ACCUEIL_NOTE,
  ACCUEIL_QUESTION,
  ACCUEIL_SECONDAIRE_TITRE,
  ACCUEIL_SOUS_TITRE,
  ACCUEIL_TITRE,
  CARTES_METIER,
  ENTREES_SECONDAIRES,
} from '@/data/fleet/accueil'
import { TRANSITIONS } from '@/lib/motion'

const nouveauteMeta = {
  nouveau: { label: 'Nouveau', color: 'blue' },
  amelioration: { label: 'Amélioration', color: 'emerald' },
  corrige: { label: 'Corrigé', color: 'amber' },
  deprecated: { label: 'Déprécié', color: 'red' },
} as const

export function Home() {
  const nouveautes = NOUVEAUTES.slice(0, 3)

  return (
    <PageTransition>
      <div className="space-y-12">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={TRANSITIONS.default}
            className="mb-3 text-3xl font-bold"
            style={{
              background: 'linear-gradient(135deg, var(--text-primary) 60%, var(--text-secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
            }}
          >
            {ACCUEIL_TITRE}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...TRANSITIONS.default, delay: 0.05 }}
            className="max-w-xl text-base leading-relaxed text-[var(--text-secondary)]"
          >
            {ACCUEIL_SOUS_TITRE}
          </motion.p>
        </div>

        <div>
          <div className="mb-5 flex items-center gap-2.5">
            <Compass size={18} className="text-blue-400" />
            <h2 className="text-base font-semibold text-[var(--text-primary)]">{ACCUEIL_QUESTION}</h2>
          </div>
          <StaggerList className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {CARTES_METIER.map(carte => (
              <MetierCard key={carte.id} {...carte} />
            ))}
          </StaggerList>
        </div>

        <div>
          <h2 className="mb-4 text-base font-semibold text-[var(--text-secondary)]">{ACCUEIL_SECONDAIRE_TITRE}</h2>
          <StaggerList className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {ENTREES_SECONDAIRES.map(entree => {
              const Icon = ACCUEIL_ICONS[entree.icon] ?? Compass
              return (
                <motion.div key={entree.href} whileHover={{ y: -3 }} transition={TRANSITIONS.fast}>
                  <Link
                    to={entree.href}
                    className="group flex h-full items-start gap-3 rounded-xl border border-[var(--border)] bg-surface-2 p-4 transition-colors hover:border-blue-500/30 hover:bg-surface-3"
                  >
                    <Icon size={18} className="mt-0.5 flex-shrink-0 text-[var(--text-muted)] transition-colors group-hover:text-blue-400" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[var(--text-primary)]">{entree.titre}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-[var(--text-muted)]">{entree.description}</p>
                    </div>
                    <ArrowRight size={14} className="mt-0.5 flex-shrink-0 text-[var(--text-muted)] opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </motion.div>
              )
            })}
          </StaggerList>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...TRANSITIONS.default, delay: 0.15 }}
          className="flex items-start gap-3 rounded-xl border border-blue-500/20 bg-blue-500/5 p-5"
        >
          <Info size={18} className="mt-0.5 flex-shrink-0 text-blue-400" />
          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{ACCUEIL_NOTE}</p>
        </motion.div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-[var(--text-secondary)]">Dernières nouveautés</h2>
            <Link to="/nouveautes" className="text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--text-secondary)]">
              Voir tout →
            </Link>
          </div>
          <div className="space-y-3">
            {nouveautes.map((nouveaute, index) => {
              const meta = nouveauteMeta[nouveaute.type]
              return (
                <motion.div
                  key={nouveaute.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...TRANSITIONS.default, delay: 0.1 + index * 0.05 }}
                  className="rounded-xl border border-[var(--border)] bg-surface-2 p-4"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)]">
                    <span>{nouveaute.mois}</span>
                    <Badge label={meta.label} color={meta.color} />
                    {nouveaute.module && (
                      <span className="rounded-full border border-[var(--border)] px-2 py-0.5">{nouveaute.module}</span>
                    )}
                  </div>
                  <p className="mt-3 text-sm font-medium text-[var(--text-primary)]">{nouveaute.titre}</p>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">{nouveaute.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>

        <p className="pb-4 text-center text-xs text-[var(--text-muted)]">
          Vous utilisez Datakö Fleet ?{' '}
          <a
            href="https://fleet.datako.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 transition-colors hover:text-blue-300"
          >
            Connectez-vous sur fleet.datako.app
          </a>
        </p>
      </div>
    </PageTransition>
  )
}
