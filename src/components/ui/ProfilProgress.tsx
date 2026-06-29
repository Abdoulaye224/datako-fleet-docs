import { motion } from 'framer-motion'
import { TRANSITIONS } from '@/lib/motion'

interface ProfilProgressProps {
  done: number
  total: number
  className?: string
}

export function ProfilProgress({ done, total, className = '' }: ProfilProgressProps) {
  if (total === 0) return null

  const percent = Math.round((done / total) * 100)

  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
        <span>Mon parcours</span>
        <span className={done === total ? 'font-semibold text-emerald-400' : ''}>
          {done}/{total}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-[var(--surface-3)]">
        <motion.div
          className={`h-full rounded-full ${done === total ? 'bg-emerald-400' : 'bg-[var(--datako-blue)]'}`}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      {done === total && total > 0 && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={TRANSITIONS.fast}
          className="text-xs font-medium text-emerald-400"
        >
          ✓ Parcours terminé !
        </motion.p>
      )}
    </div>
  )
}
