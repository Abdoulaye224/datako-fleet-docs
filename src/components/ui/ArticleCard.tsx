import { motion } from 'framer-motion'
import { ChevronRight, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import { TRANSITIONS } from '@/lib/motion'

interface ArticleCardProps {
  titre: string
  chapeau: string
  href: string
  section?: string
  badge?: string
}

export function ArticleCard({ titre, chapeau, href, section, badge }: ArticleCardProps) {
  return (
    <motion.div whileHover={{ x: 4 }} transition={TRANSITIONS.fast}>
      <Link
        to={href}
        className="group flex items-start gap-3 rounded-xl border border-[var(--border)] bg-surface-2 p-4 transition-colors hover:border-blue-500/30 hover:bg-surface-3"
      >
        <div className="mt-0.5 flex-shrink-0 text-[var(--text-muted)] transition-colors group-hover:text-blue-400">
          <FileText size={16} />
        </div>
        <div className="min-w-0 flex-1">
          {(section || badge) && (
            <div className="mb-1 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
              {section && <span>{section}</span>}
              {badge && <span className="rounded-full border border-[var(--border)] px-2 py-0.5 normal-case tracking-normal">{badge}</span>}
            </div>
          )}
          <p className="truncate text-sm font-medium text-[var(--text-primary)] transition-colors group-hover:text-blue-400">
            {titre}
          </p>
          <p className="mt-0.5 line-clamp-2 text-xs text-[var(--text-muted)]">{chapeau}</p>
        </div>
        <div className="mt-0.5 flex-shrink-0 text-blue-400 opacity-0 transition-opacity group-hover:opacity-100">
          <ChevronRight size={14} />
        </div>
      </Link>
    </motion.div>
  )
}
