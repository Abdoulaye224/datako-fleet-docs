import { Link } from 'react-router-dom'
import { BookOpen, ChevronRight, BarChart2, Layout } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageTransition } from '@/components/ui/PageTransition'
import { StaggerList } from '@/components/ui/StaggerList'
import { TRANSITIONS } from '@/lib/motion'

const venteSections = [
  {
    titre: 'Comprendre les pages',
    description: 'Les pages de l\'interface Vente : commandes, tournées, facturation, clients et rapports.',
    href: '/vente/pages',
    icon: Layout,
    count: 7,
  },
  {
    titre: 'Guides pas-à-pas',
    description: 'Créer une commande, planifier une tournée, facturer un client, exporter les rapports.',
    href: '/vente/guides',
    icon: BookOpen,
    count: 6,
  },
  {
    titre: 'Indicateurs vente',
    description: 'CA Vente, Marge brute, Taux de livraison, Panier moyen — définitions et formules.',
    href: '/vente/indicateurs',
    icon: BarChart2,
    count: 5,
  },
]

export function VenteIndex() {
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
            Vente / Distribution
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
            Le module de gestion des ventes et de la distribution : commandes, tournées, facturation et rapports d'activité.
          </p>
        </div>

        <StaggerList className="space-y-3">
          {venteSections.map(section => (
            <motion.div key={section.href} whileHover={{ x: 4 }} transition={TRANSITIONS.fast}>
              <Link
                to={section.href}
                className="group flex items-center gap-4 rounded-xl border border-[var(--border)] bg-surface-2 p-5 transition-colors hover:border-blue-500/30 hover:bg-surface-3"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                  <section.icon size={18} className="text-emerald-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-[var(--text-primary)] transition-colors group-hover:text-emerald-400">
                    {section.titre}
                  </p>
                  <p className="mt-0.5 text-sm text-[var(--text-muted)]">{section.description}</p>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">{section.count} articles</p>
                </div>
                <ChevronRight size={16} className="flex-shrink-0 text-[var(--text-muted)] transition-colors group-hover:text-emerald-400" />
              </Link>
            </motion.div>
          ))}
        </StaggerList>
      </div>
    </PageTransition>
  )
}
