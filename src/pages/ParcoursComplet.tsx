import { Link } from 'react-router-dom'
import { ChevronRight, Combine, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageTransition } from '@/components/ui/PageTransition'
import { StaggerList } from '@/components/ui/StaggerList'
import { ACCUEIL_ICONS } from '@/components/ui/MetierCard'
import { TRANSITIONS } from '@/lib/motion'
import {
  PARCOURS_COMPLET_ACCROCHE,
  PARCOURS_COMPLET_COLONNES,
  PARCOURS_COMPLET_JONCTIONS,
  PARCOURS_COMPLET_JONCTIONS_ACCROCHE,
  PARCOURS_COMPLET_JONCTIONS_TITRE,
  PARCOURS_COMPLET_ROLE_LIEN,
  PARCOURS_COMPLET_ROLE_RAPPEL,
  PARCOURS_COMPLET_TITRE,
  LANDING_MARKETEUR,
  LANDING_TRANSPORT,
} from '@/data/fleet/accueil'

const colonnes = [
  { titre: PARCOURS_COMPLET_COLONNES.transport, href: '/transport', entrees: LANDING_TRANSPORT, accent: 'text-blue-400', bg: 'bg-blue-500/10', border: 'hover:border-blue-500/30', hoverText: 'group-hover:text-blue-400' },
  { titre: PARCOURS_COMPLET_COLONNES.marketeur, href: '/vente', entrees: LANDING_MARKETEUR, accent: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'hover:border-emerald-500/30', hoverText: 'group-hover:text-emerald-400' },
]

export function ParcoursComplet() {
  return (
    <PageTransition>
      <div className="space-y-10">
        <div>
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/10">
            <Combine size={20} className="text-amber-400" />
          </div>
          <h1
            className="text-2xl font-bold"
            style={{
              background: 'linear-gradient(135deg, var(--text-primary) 60%, var(--text-secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {PARCOURS_COMPLET_TITRE}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">
            {PARCOURS_COMPLET_ACCROCHE}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {colonnes.map(colonne => (
            <div key={colonne.href} className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-[var(--text-secondary)]">{colonne.titre}</h2>
                <Link to={colonne.href} className={`inline-flex items-center gap-1 text-xs ${colonne.accent} hover:underline`}>
                  Tout voir <ArrowRight size={12} />
                </Link>
              </div>
              <StaggerList className="space-y-2.5">
                {colonne.entrees.map(entree => {
                  const Icon = ACCUEIL_ICONS[entree.icon] ?? ChevronRight
                  return (
                    <motion.div key={entree.href} whileHover={{ x: 4 }} transition={TRANSITIONS.fast}>
                      <Link
                        to={entree.href}
                        className={`group flex items-start gap-3 rounded-xl border border-[var(--border)] bg-surface-2 p-4 transition-colors hover:bg-surface-3 ${colonne.border}`}
                      >
                        <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${colonne.bg}`}>
                          <Icon size={16} className={colonne.accent} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className={`text-sm font-medium text-[var(--text-primary)] transition-colors ${colonne.hoverText}`}>
                            {entree.titre}
                          </p>
                          <p className="mt-0.5 text-xs leading-relaxed text-[var(--text-muted)]">{entree.description}</p>
                        </div>
                      </Link>
                    </motion.div>
                  )
                })}
              </StaggerList>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-base font-semibold text-[var(--text-primary)]">{PARCOURS_COMPLET_JONCTIONS_TITRE}</h2>
            <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
              {PARCOURS_COMPLET_JONCTIONS_ACCROCHE}
            </p>
          </div>
          <StaggerList className="space-y-3">
            {PARCOURS_COMPLET_JONCTIONS.map(jonction => (
              <motion.div key={jonction.href} whileHover={{ x: 4 }} transition={TRANSITIONS.fast}>
                <Link
                  to={jonction.href}
                  className="group flex items-start gap-4 rounded-xl border border-[var(--border)] bg-surface-2 p-5 transition-colors hover:border-amber-500/30 hover:bg-surface-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-[var(--text-primary)] transition-colors group-hover:text-amber-400">
                      {jonction.titre}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">{jonction.description}</p>
                  </div>
                  <ChevronRight size={16} className="mt-0.5 flex-shrink-0 text-[var(--text-muted)] transition-colors group-hover:text-amber-400" />
                </Link>
              </motion.div>
            ))}
          </StaggerList>
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-surface-2 p-5">
          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
            {PARCOURS_COMPLET_ROLE_RAPPEL}{' '}
            <Link to="/profils" className="text-amber-400 underline-offset-2 hover:underline">
              {PARCOURS_COMPLET_ROLE_LIEN}
            </Link>
            .
          </p>
        </div>
      </div>
    </PageTransition>
  )
}
