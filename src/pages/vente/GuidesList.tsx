import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageTransition } from '@/components/ui/PageTransition'
import { StaggerList } from '@/components/ui/StaggerList'
import { Badge } from '@/components/ui/Badge'
import { Breadcrumb } from '@/components/navigation/Breadcrumb'
import { guides as venteGuides } from '@/data/fleet/vente/guides'
import { TRANSITIONS } from '@/lib/motion'

export function VenteGuidesList() {
  return (
    <PageTransition>
      <div className="space-y-8">
        <Breadcrumb
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Vente / Distribution', href: '/vente' },
            { label: 'Guides pas-à-pas' },
          ]}
        />

        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Guides Vente / Distribution</h1>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
            Procédures étape par étape pour maîtriser le module Vente.
          </p>
        </div>

        <StaggerList className="space-y-3">
          {venteGuides.map(guide => (
            <motion.div key={guide.id} whileHover={{ x: 4 }} transition={TRANSITIONS.fast}>
              <Link
                to={`/vente/guides/${guide.id}`}
                className="group block rounded-xl border border-[var(--border)] bg-surface-2 p-5 shadow-sm transition-all hover:border-emerald-500/30 hover:shadow-md"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium text-[var(--text-primary)] transition-colors group-hover:text-emerald-400">
                    {guide.title}
                  </p>
                  <Badge label={`${guide.etapes.length} étapes`} color="emerald" />
                </div>
                <p className="mt-1 text-sm text-[var(--text-muted)]">{guide.objectif}</p>
              </Link>
            </motion.div>
          ))}
        </StaggerList>
      </div>
    </PageTransition>
  )
}
