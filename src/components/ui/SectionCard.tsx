import { motion } from 'framer-motion'
import { ArrowRight, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { TRANSITIONS } from '@/lib/motion'

interface SectionCardProps {
  titre: string
  description: string
  href: string
  icon: LucideIcon
  nbArticles?: number
  color?: string
}

export function SectionCard({ titre, description, href, icon: Icon, nbArticles, color = '#3B82F6' }: SectionCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, transition: TRANSITIONS.spring }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        to={href}
        className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-surface-2 p-6 cursor-pointer group block h-full"
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.05), rgba(124,58,237,0.05))' }}
        />
        <motion.div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 relative z-10"
          style={{ background: `${color}15` }}
          whileHover={{ scale: 1.1, rotate: 3 }}
          transition={TRANSITIONS.spring}
        >
          <Icon size={24} style={{ color }} />
        </motion.div>
        <h3 className="font-semibold text-[var(--text-primary)] group-hover:text-blue-400 transition-colors relative z-10">
          {titre}
        </h3>
        <p className="text-sm text-[var(--text-muted)] mt-1 relative z-10">{description}</p>
        {nbArticles !== undefined && (
          <span className="text-xs text-[var(--text-muted)] mt-3 block relative z-10">{nbArticles} articles</span>
        )}
        <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowRight size={16} className="text-blue-400" />
        </div>
      </Link>
    </motion.div>
  )
}
