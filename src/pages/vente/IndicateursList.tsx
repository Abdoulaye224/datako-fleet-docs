import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageTransition } from '@/components/ui/PageTransition'
import { StaggerList } from '@/components/ui/StaggerList'
import { Breadcrumb } from '@/components/navigation/Breadcrumb'
import { INDICATEURS as venteIndicateurs } from '@/data/fleet/vente/indicateurs'
import { TRANSITIONS } from '@/lib/motion'

export function VenteIndicateursList() {
  return (
    <PageTransition>
      <div className="space-y-8">
        <Breadcrumb
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Vente / Distribution', href: '/vente' },
            { label: 'Indicateurs vente' },
          ]}
        />

        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Indicateurs Vente</h1>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
            Les indicateurs clés du module Vente — CA, marges, taux de livraison et paniers.
          </p>
        </div>

        <StaggerList className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {venteIndicateurs.map(indicateur => (
            <motion.div key={indicateur.id} whileHover={{ y: -2 }} transition={TRANSITIONS.fast}>
              <Link
                to={`/vente/indicateurs/${indicateur.id}`}
                className="group block h-full rounded-xl border border-[var(--border)] bg-surface-2 p-5 transition-colors hover:border-emerald-500/30 hover:bg-surface-3"
              >
                <p className="font-semibold text-[var(--text-primary)] transition-colors group-hover:text-emerald-400">
                  {indicateur.nom}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{indicateur.definition}</p>
                {indicateur.formule && (
                  <p className="mt-3 rounded-lg bg-surface-3 px-3 py-2 font-mono text-xs text-[var(--text-secondary)]">
                    {indicateur.formule}
                  </p>
                )}
              </Link>
            </motion.div>
          ))}
        </StaggerList>
      </div>
    </PageTransition>
  )
}
