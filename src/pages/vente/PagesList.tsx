import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageTransition } from '@/components/ui/PageTransition'
import { StaggerList } from '@/components/ui/StaggerList'
import { Breadcrumb } from '@/components/navigation/Breadcrumb'
import { appPages as ventePagesData } from '@/data/fleet/vente/pages'
import { TRANSITIONS } from '@/lib/motion'

export function VentePagesList() {
  return (
    <PageTransition>
      <div className="space-y-8">
        <Breadcrumb
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Vente / Distribution', href: '/vente' },
            { label: 'Comprendre les pages' },
          ]}
        />

        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Comprendre les pages Vente</h1>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
            Description de chaque écran du module Vente / Distribution.
          </p>
        </div>

        <StaggerList className="space-y-3">
          {ventePagesData.map(page => (
            <motion.div key={page.id} whileHover={{ x: 4 }} transition={TRANSITIONS.fast}>
              <Link
                to={`/vente/pages/${page.id}`}
                className="group block rounded-xl border border-[var(--border)] bg-surface-2 p-5 transition-colors hover:border-emerald-500/30 hover:bg-surface-3"
              >
                <p className="font-medium text-[var(--text-primary)] transition-colors group-hover:text-emerald-400">
                  {page.name}
                </p>
                <p className="mt-1 text-sm text-[var(--text-muted)]">{page.see}</p>
              </Link>
            </motion.div>
          ))}
        </StaggerList>
      </div>
    </PageTransition>
  )
}
