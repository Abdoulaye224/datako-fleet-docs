import { Layout as LayoutIcon, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageTransition } from '@/components/ui/PageTransition'
import { StaggerList } from '@/components/ui/StaggerList'
import { appPages } from '@/data/fleet/transport/pages'
import { TRANSITIONS } from '@/lib/motion'

const onglets = ['Opérations', 'Performance', 'Investissement', 'Acteurs']

export function PagesList() {
  return (
    <PageTransition>
      <div className="space-y-8">
        <div>
          <p className="text-xs text-[#64748B] mb-1">Transport</p>
          <h1 className="text-2xl font-bold text-[#F1F5F9]">Comprendre les pages</h1>
          <p className="text-[#94A3B8] mt-2 text-sm leading-relaxed">
            Fleet Manager est organisé en onglets. Voici à quoi sert chaque page et comment la lire.
          </p>
        </div>

        {onglets.map(onglet => {
          const pages = appPages.filter(p => p.onglet === onglet)
          if (!pages.length) return null
          return (
            <div key={onglet}>
              <h2 className="text-sm font-semibold text-[#64748B] uppercase tracking-wider mb-3">
                Onglet {onglet}
              </h2>
              <StaggerList className="space-y-2">
                {pages.map(page => (
                  <motion.div key={page.id} whileHover={{ x: 4 }} transition={TRANSITIONS.fast}>
                    <Link
                      to={`/transport/pages/${page.id}`}
                      className="flex items-center gap-3 p-4 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#181C27] hover:border-blue-500/30 hover:bg-[#1F2537] transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                        <LayoutIcon size={14} className="text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#F1F5F9] group-hover:text-blue-400 transition-colors">
                          {page.name}
                        </p>
                        <p className="text-xs text-[#64748B] mt-0.5 truncate">{page.see}</p>
                      </div>
                      <ChevronRight size={14} className="text-[#64748B] group-hover:text-blue-400 transition-colors flex-shrink-0" />
                    </Link>
                  </motion.div>
                ))}
              </StaggerList>
            </div>
          )
        })}
      </div>
    </PageTransition>
  )
}
