import { BarChart3, Compass, HelpCircle, MessageCircle, Package, Truck, Users, ArrowRight, Zap, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageTransition } from '@/components/ui/PageTransition'
import { SectionCard } from '@/components/ui/SectionCard'
import { StaggerList } from '@/components/ui/StaggerList'
import { Badge } from '@/components/ui/Badge'
import { NOUVEAUTES } from '@/data/fleet'
import { TRANSITIONS } from '@/lib/motion'

const sections = [
  {
    titre: 'Transport',
    description: 'Comprendre les pages, créer des rotations, valider des livraisons et piloter la flotte.',
    href: '/transport/pages',
    icon: Truck,
    nbArticles: 30,
    color: '#3B82F6',
  },
  {
    titre: 'Vente / Distribution',
    description: 'Commandes, tournées, facturation et indicateurs du module distribution.',
    href: '/vente',
    icon: Package,
    nbArticles: 18,
    color: '#10B981',
  },
  {
    titre: 'WhatsApp',
    description: 'Flux automatiques WhatsApp pour conducteurs, chefs d\'exploitation et DG.',
    href: '/whatsapp',
    icon: MessageCircle,
    nbArticles: 6,
    color: '#22C55E',
  },
  {
    titre: 'Portail Propriétaire',
    description: 'Espace dédié aux propriétaires de véhicules gérés : bilans et exports PDF.',
    href: '/portail-proprietaire',
    icon: BookOpen,
    nbArticles: 5,
    color: '#F59E0B',
  },
  {
    titre: 'Les rôles',
    description: 'Qui peut faire quoi dans Fleet Manager : Admin, Opérateur, Finance, Observateur, Propriétaire.',
    href: '/roles',
    icon: Users,
    nbArticles: 5,
    color: '#10B981',
  },
  {
    titre: 'Indicateurs',
    description: "CA Transport, Marge d'Exploitation, Cashflow, Gain par rotation — définitions et formules.",
    href: '/indicateurs',
    icon: BarChart3,
    nbArticles: 7,
    color: '#F59E0B',
  },
  {
    titre: 'FAQ',
    description: 'Réponses aux questions fréquentes sur les opérations, la finance et les rôles.',
    href: '/faq',
    icon: HelpCircle,
    nbArticles: 10,
    color: '#7C3AED',
  },
]

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
            Bienvenue dans le guide Datakö Fleet
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...TRANSITIONS.default, delay: 0.05 }}
            className="max-w-xl text-base leading-relaxed text-[var(--text-secondary)]"
          >
            Dashboard BI pour PME transport et distribution en Guinée. Trouvez ici la réponse à toutes vos questions sur Fleet Manager.
          </motion.p>
        </div>

        <div>
          <h2 className="mb-4 text-base font-semibold text-[var(--text-secondary)]">Explorer les sections</h2>
          <StaggerList className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map(section => (
              <SectionCard key={section.href} {...section} />
            ))}
          </StaggerList>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...TRANSITIONS.default, delay: 0.15 }}
          className="rounded-2xl border border-[var(--border)] bg-surface-2 p-5"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                <Compass size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">Quel est votre profil ?</p>
                <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                  Choisissez votre profil métier pour accéder à un parcours personnalisé et aux articles les plus utiles.
                </p>
              </div>
            </div>
            <Link
              to="/profils"
              className="inline-flex items-center gap-2 self-start rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400 transition-colors hover:bg-blue-500/15 hover:text-blue-300"
            >
              Choisir mon profil
              <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...TRANSITIONS.default, delay: 0.2 }}
          className="flex items-center justify-between gap-4 rounded-xl border border-blue-500/20 bg-blue-500/5 p-5"
        >
          <div className="flex items-start gap-3">
            <Zap size={20} className="mt-0.5 flex-shrink-0 text-blue-400" />
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">Nouveau sur Fleet Manager ?</p>
              <p className="mt-0.5 text-xs text-[var(--text-muted)]">Commencez par les guides pas-à-pas pour créer votre première rotation.</p>
            </div>
          </div>
          <motion.div whileHover={{ x: 2 }} transition={TRANSITIONS.fast}>
            <Link
              to="/onboarding"
              className="flex flex-shrink-0 items-center gap-1 text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
            >
              Démarrer <ArrowRight size={14} />
            </Link>
          </motion.div>
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
