import { Menu, Moon, Sun } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SearchBar } from '@/components/search/SearchBar'
import { useTheme } from '@/context/ThemeContext'

interface MobileHeaderProps {
  onMenuOpen: () => void
}

export function MobileHeader({ onMenuOpen }: MobileHeaderProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[var(--border)] bg-surface-2 px-4 py-3 lg:hidden">
      <button
        type="button"
        onClick={onMenuOpen}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--text-secondary)] transition-colors hover:bg-surface-3 hover:text-[var(--text-primary)]"
        aria-label="Ouvrir le menu"
      >
        <Menu size={20} />
      </button>

      <Link to="/" className="flex items-center gap-2">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white"
          style={{ background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))' }}
        >
          D
        </div>
        <span className="text-sm font-semibold text-[var(--text-primary)]">Datakö Fleet</span>
      </Link>

      <div className="flex items-center gap-2">
        <SearchBar variant="icon" />
        <button
          type="button"
          onClick={toggleTheme}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--text-secondary)] transition-colors hover:bg-surface-3 hover:text-[var(--text-primary)]"
          aria-label={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  )
}
