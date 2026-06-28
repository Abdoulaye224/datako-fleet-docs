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
          <p className="text-xs text-[#64748B] mb-1">Transport</p>
          <h1 className="text-2xl font-bold text-[#F1F5F9]">Guides pas-à-pas</h1>
          <p className="text-[#94A3B8] mt-2 text-sm leading-relaxed">
            Instructions étape par étape pour chaque tâche dans Fleet Manager.
          </p>
        </div>

        <StaggerList className="space-y-3">
          {guides.map((guide, i) => (
            <motion.div key={guide.id} whileHover={{ x: 4 }} transition={TRANSITIONS.fast}>
              <Link
                to={`/transport/guides/${guide.id}`}
                className="flex items-center gap-4 p-4 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#181C27] hover:border-blue-500/30 hover:bg-[#1F2537] transition-colors group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold text-sm"
                  style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}
                >
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#F1F5F9] group-hover:text-blue-400 transition-colors">
                    {guide.title}
                  </p>
                  <p className="text-xs text-[#64748B] mt-0.5 truncate">{guide.objectif}</p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <Clock size={10} className="text-[#64748B]" />
                    <span className="text-xs text-[#64748B]">{guide.etapes.length} étapes</span>
                  </div>
                </div>
                <ChevronRight size={14} className="text-[#64748B] group-hover:text-blue-400 transition-colors flex-shrink-0" />
              </Link>
            </motion.div>
          ))}
        </StaggerList>
      </div>
    </PageTransition>
  )
}
