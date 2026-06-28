import { Truck, Users, BarChart3, HelpCircle, ArrowRight, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageTransition } from '@/components/ui/PageTransition'
import { SectionCard } from '@/components/ui/SectionCard'
import { StaggerList } from '@/components/ui/StaggerList'
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

const nouveautes = [
  {
    date: 'Juin 2025',
    titre: 'Bilan propriétaire PDF amélioré',
    description: 'Le bilan PDF inclut maintenant le détail de chaque rotation avec les charges déduites.',
    type: 'amélioration',
  },
  {
    date: 'Mai 2025',
    titre: 'Validation WhatsApp conducteur',
    description: 'Les conducteurs peuvent maintenant valider leur livraison directement via WhatsApp.',
    type: 'nouveau',
  },
  {
    date: 'Avril 2025',
    titre: 'Simulations de scénarios',
    description: "Nouvelle page Simulations pour tester l'impact d'ajout de camions ou de changements de tarif.",
    type: 'nouveau',
  },
]

export function Home() {
  return (
    <PageTransition>
      <div className="space-y-12">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={TRANSITIONS.default}
            className="text-3xl font-bold mb-3"
            style={{
              background: 'linear-gradient(135deg, #F1F5F9 60%, #94A3B8)',
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
            className="text-[#94A3B8] text-base leading-relaxed max-w-xl"
          >
            Dashboard BI pour PME transport et distribution en Guinée. Trouvez ici la réponse à toutes vos questions sur Fleet Manager.
          </motion.p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-[#94A3B8] mb-4">Explorer les sections</h2>
          <StaggerList className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sections.map(s => (
              <SectionCard key={s.href} {...s} />
            ))}
          </StaggerList>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...TRANSITIONS.default, delay: 0.2 }}
          className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-5 flex items-center justify-between gap-4"
        >
          <div className="flex items-start gap-3">
            <Zap size={20} className="text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-[#F1F5F9] text-sm">Nouveau sur Fleet Manager ?</p>
              <p className="text-xs text-[#64748B] mt-0.5">Commencez par les guides pas-à-pas pour créer votre première rotation.</p>
            </div>
          </div>
          <motion.div whileHover={{ x: 2 }} transition={TRANSITIONS.fast}>
            <Link
              to="/transport/guides"
              className="flex items-center gap-1 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors flex-shrink-0"
            >
              Démarrer <ArrowRight size={14} />
            </Link>
          </motion.div>
        </motion.div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-[#94A3B8]">Dernières nouveautés</h2>
            <Link to="/nouveautes" className="text-xs text-[#64748B] hover:text-[#94A3B8] transition-colors">
              Voir tout →
            </Link>
          </div>
          <div className="space-y-3">
            {nouveautes.map((n, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...TRANSITIONS.default, delay: 0.1 + i * 0.05 }}
                className="flex gap-3 p-3 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#181C27]"
              >
                <div className="flex flex-col items-center">
                  <span className="text-xs text-[#64748B] whitespace-nowrap">{n.date}</span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-medium text-[#F1F5F9]">{n.titre}</p>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full border font-medium ${
                      n.type === 'nouveau'
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    }`}>
                      {n.type}
                    </span>
                  </div>
                  <p className="text-xs text-[#64748B]">{n.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="text-xs text-[#64748B] text-center pb-4">
          Vous utilisez Datakö Fleet ?{' '}
          <a
            href="https://fleet.datako.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Connectez-vous sur fleet.datako.app
          </a>
        </p>
      </div>
    </PageTransition>
  )
}
