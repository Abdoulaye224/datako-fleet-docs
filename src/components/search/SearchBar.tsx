import { Search } from 'lucide-react'
import { useSearch } from '@/context/SearchContext'

interface SearchBarProps {
  variant?: 'full' | 'icon'
}

export function SearchBar({ variant = 'full' }: SearchBarProps) {
  const { openSearch } = useSearch()

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={openSearch}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-surface-2 text-[var(--text-secondary)] transition-colors hover:bg-surface-3 hover:text-[var(--text-primary)]"
        aria-label="Ouvrir la recherche"
      >
        <Search size={18} />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={openSearch}
      className="flex w-full items-center gap-3 rounded-xl border border-[var(--border)] bg-surface-3 px-3 py-2.5 text-left text-sm text-[var(--text-muted)] transition-colors hover:border-blue-500/30 hover:text-[var(--text-secondary)]"
      aria-label="Ouvrir la recherche"
    >
      <Search size={16} className="text-[var(--text-secondary)]" />
      <span className="flex-1">Rechercher...</span>
      <span className="rounded-md border border-[var(--border)] bg-surface-2 px-1.5 py-0.5 text-[11px] text-[var(--text-secondary)]">
        ⌘K
      </span>
    </button>
  )
}
