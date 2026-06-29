import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { TRANSITIONS } from '@/lib/motion'

interface LinkItem {
  titre: string
  href: string
}

interface PrevNextProps {
  precedent?: LinkItem
  suivant?: LinkItem
}

export function PrevNext({ precedent, suivant }: PrevNextProps) {
  if (!precedent && !suivant) return null

  return (
    <div className="mt-12 border-t border-[var(--border)] pt-6">
      <div className={`grid gap-3 ${precedent && suivant ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}>
        {precedent ? (
          <motion.div whileHover={{ x: -4 }} transition={TRANSITIONS.springGentle}>
            <Link
              to={precedent.href}
              className="block rounded-2xl border border-[var(--border)] bg-surface-2 p-4 transition-colors hover:border-blue-500/30 hover:bg-surface-3"
            >
              <p className="text-xs text-[var(--text-muted)]">← Précédent</p>
              <p className="mt-1 text-sm font-medium text-[var(--text-primary)]">{precedent.titre}</p>
            </Link>
          </motion.div>
        ) : null}

        {suivant ? (
          <motion.div whileHover={{ x: 4 }} transition={TRANSITIONS.springGentle}>
            <Link
              to={suivant.href}
              className="block rounded-2xl border border-[var(--border)] bg-surface-2 p-4 text-left transition-colors hover:border-blue-500/30 hover:bg-surface-3 md:text-right"
            >
              <p className="text-xs text-[var(--text-muted)]">Suivant →</p>
              <p className="mt-1 text-sm font-medium text-[var(--text-primary)]">{suivant.titre}</p>
            </Link>
          </motion.div>
        ) : null}
      </div>
    </div>
  )
}
