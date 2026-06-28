import { motion } from 'framer-motion'
import { FileText, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { TRANSITIONS } from '@/lib/motion'

interface ArticleCardProps {
  titre: string
  chapeau: string
  href: string
  section?: string
  badge?: string
}

export function ArticleCard({ titre, chapeau, href }: ArticleCardProps) {
  return (
    <motion.div whileHover={{ x: 4 }} transition={TRANSITIONS.fast}>
      <Link
        to={href}
        className="flex items-start gap-3 p-4 rounded-lg border border-[rgba(255,255,255,0.08)]
          hover:border-blue-500/30 hover:bg-[#1F2537] transition-colors group"
      >
        <div className="mt-0.5 text-[#64748B] group-hover:text-blue-400 transition-colors flex-shrink-0">
          <FileText size={16} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[#F1F5F9] group-hover:text-blue-400 transition-colors truncate">
            {titre}
          </p>
          <p className="text-xs text-[#64748B] mt-0.5 line-clamp-2">{chapeau}</p>
        </div>
        <div className="opacity-0 group-hover:opacity-100 text-blue-400 flex-shrink-0 mt-0.5 transition-opacity">
          <ChevronRight size={14} />
        </div>
      </Link>
    </motion.div>
  )
}
