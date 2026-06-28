import { Link } from 'react-router-dom'
import { BookOpen, Layout, RefreshCw, AlertCircle, ChevronRight } from 'lucide-react'
import { PageTransition } from '@/components/ui/PageTransition'
import { StaggerList } from '@/components/ui/StaggerList'
import { motion } from 'framer-motion'
import { TRANSITIONS } from '@/lib/motion'

const transportSections = [
  {
    titre: 'Comprendre les pages',
    description: "10 pages expliquées : ce que vous voyez, pourquoi c'est utile, comment lire les données.",
    href: '/transport/pages',
    icon: Layout,
    count: 10,
  },
  {
    titre: 'Guides pas-à-pas',
    description: '10 guides pour créer des rotations, valider des livraisons, générer des PDFs et plus.',
    href: '/transport/guides',
    icon: BookOpen,
    count: 10,
  },
  {
    titre: "Cycle d'une rotation",
    description: 'Les 6 étapes de la création à l\'impact sur les tableaux de bord.',
    href: '/transport/cycle',
    icon: RefreshCw,
    count: 6,
  },
  {
    titre: 'Cas particuliers',
    description: 'Véhicule géré, volume manquant, crédit-bail — les situations complexes expliquées.',
    href: '/transport/cas-particuliers',
    icon: AlertCircle,
    count: 6,
  },
]

export function TransportIndex() {
  return (
    <PageTransition>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold" style={{
            background: 'linear-gradient(135deg, #F1F5F9 60%, #94A3B8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Transport
          </h1>
          <p className="text-[#94A3B8] mt-2 text-sm leading-relaxed">
            Le module principal de Fleet Manager : rotations, livraisons, flotte, gains.
          </p>
        </div>

        <StaggerList className="space-y-3">
          {transportSections.map(s => (
            <motion.div key={s.href} whileHover={{ x: 4 }} transition={TRANSITIONS.fast}>
              <Link
                to={s.href}
                className="flex items-center gap-4 p-5 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#181C27] hover:border-blue-500/30 hover:bg-[#1F2537] transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <s.icon size={18} className="text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[#F1F5F9] group-hover:text-blue-400 transition-colors">
                    {s.titre}
                  </p>
                  <p className="text-sm text-[#64748B] mt-0.5">{s.description}</p>
                  <p className="text-xs text-[#64748B] mt-1">{s.count} articles</p>
                </div>
                <ChevronRight size={16} className="text-[#64748B] group-hover:text-blue-400 transition-colors flex-shrink-0" />
              </Link>
            </motion.div>
          ))}
        </StaggerList>
      </div>
    </PageTransition>
  )
}
