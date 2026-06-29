import { ChevronRight, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageTransition } from '@/components/ui/PageTransition'
import { StaggerList } from '@/components/ui/StaggerList'
import { guides } from '@/data/fleet/transport/guides'
import { TRANSITIONS } from '@/lib/motion'

export function GuidesList() {
  return (
    <PageTransition>
      <div className="space-y-8">
        <div>
          <p className="text-xs text-[var(--text-muted)] mb-1">Transport</p>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Guides pas-à-pas</h1>
          <p className="text-[var(--text-secondary)] mt-2 text-sm leading-relaxed">
            Instructions étape par étape pour chaque tâche dans Fleet Manager.
          </p>
        </div>

        <StaggerList className="space-y-3">
          {guides.map((guide, i) => (
            <motion.div key={guide.id} whileHover={{ x: 4 }} transition={TRANSITIONS.fast}>
              <Link
                to={`/transport/guides/${guide.id}`}
                className="flex items-center gap-4 p-4 rounded-xl border border-[var(--border)] bg-surface-2 hover:border-blue-500/30 hover:bg-surface-3 transition-colors group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold text-sm"
                  style={{ background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))' }}
                >
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--text-primary)] group-hover:text-blue-400 transition-colors">
                    {guide.title}
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5 truncate">{guide.objectif}</p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <Clock size={10} className="text-[var(--text-muted)]" />
                    <span className="text-xs text-[var(--text-muted)]">{guide.etapes.length} étapes</span>
                  </div>
                </div>
                <ChevronRight size={14} className="text-[var(--text-muted)] group-hover:text-blue-400 transition-colors flex-shrink-0" />
              </Link>
            </motion.div>
          ))}
        </StaggerList>
      </div>
    </PageTransition>
  )
}
