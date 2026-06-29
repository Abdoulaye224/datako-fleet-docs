import { Moon, Search, Sun } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'
import { useSearch } from '@/context/SearchContext'
import { TRANSITIONS } from '@/lib/motion'

export function TopBar() {
  const { theme, toggleTheme } = useTheme()
  const { openSearch } = useSearch()

  return (
    <div className="sticky top-0 z-20 hidden lg:flex items-center justify-end gap-2 border-b border-[var(--border)] bg-surface-2/80 backdrop-blur-md px-6 py-3">
      {/* Search trigger */}
      <button
        type="button"
        onClick={openSearch}
        className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-surface-3 px-3 py-1.5 text-xs text-[var(--text-muted)] transition-colors hover:border-blue-500/30 hover:text-[var(--text-secondary)]"
        aria-label="Rechercher (⌘K)"
      >
        <Search size={13} />
        <span>Rechercher…</span>
        <kbd className="ml-1 rounded border border-[var(--border)] bg-surface px-1.5 py-0.5 text-[10px] font-mono text-[var(--text-muted)]">
          ⌘K
        </kbd>
      </button>

      {/* Theme toggle */}
      <motion.button
        type="button"
        onClick={toggleTheme}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={TRANSITIONS.spring}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-surface-3 text-[var(--text-secondary)] transition-colors hover:border-blue-500/30 hover:bg-surface hover:text-[var(--datako-blue)]"
        aria-label={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
        title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
      >
        <motion.div
          key={theme}
          initial={{ rotate: -30, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 30, opacity: 0 }}
          transition={TRANSITIONS.fast}
        >
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </motion.div>
      </motion.button>
    </div>
  )
}
