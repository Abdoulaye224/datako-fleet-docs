import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Clock3, Search, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSearch } from '@/context/SearchContext'
import { getHighlightParts, getSectionLabel, type SearchEntry } from '@/lib/search'
import { TRANSITIONS, VARIANTS } from '@/lib/motion'

const RECENT_SEARCHES_KEY = 'hc-recent-searches'

function readRecentSearches() {
  if (typeof window === 'undefined') return [] as string[]

  try {
    const raw = window.localStorage.getItem(RECENT_SEARCHES_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as string[]
    return Array.isArray(parsed) ? parsed.slice(0, 5) : []
  } catch {
    return []
  }
}

export function SearchPalette() {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const { isOpen, closeSearch, query, setQuery, results } = useSearch()
  const [activeIndex, setActiveIndex] = useState(0)
  const [recentSearches, setRecentSearches] = useState<string[]>(() => readRecentSearches())

  useEffect(() => {
    if (!isOpen) return

    const timer = window.setTimeout(() => inputRef.current?.focus(), 10)
    setActiveIndex(0)
    return () => window.clearTimeout(timer)
  }, [isOpen])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  const groupedResults = useMemo(() => {
    return results.reduce<Record<string, SearchEntry[]>>((acc, entry) => {
      acc[entry.section] ??= []
      acc[entry.section].push(entry)
      return acc
    }, {})
  }, [results])

  const saveRecentSearch = (term: string) => {
    const value = term.trim()
    if (value.length < 2) return

    const next = [value, ...recentSearches.filter(item => item.toLowerCase() !== value.toLowerCase())].slice(0, 5)
    setRecentSearches(next)
    window.localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(next))
  }

  const removeRecentSearch = (term: string) => {
    const next = recentSearches.filter(item => item !== term)
    setRecentSearches(next)
    window.localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(next))
  }

  const navigateToEntry = (entry: SearchEntry) => {
    saveRecentSearch(query || entry.titre)
    navigate(entry.href)
    closeSearch()
  }

  const openSearchPage = () => {
    const trimmed = query.trim()
    if (trimmed.length < 2) return
    saveRecentSearch(trimmed)
    navigate(`/recherche?q=${encodeURIComponent(trimmed)}`)
    closeSearch()
  }

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      if (results.length === 0) return
      event.preventDefault()
      setActiveIndex(index => Math.min(index + 1, results.length - 1))
      return
    }

    if (event.key === 'ArrowUp') {
      if (results.length === 0) return
      event.preventDefault()
      setActiveIndex(index => Math.max(index - 1, 0))
      return
    }

    if (event.key === 'Enter') {
      event.preventDefault()
      if (results[activeIndex]) navigateToEntry(results[activeIndex])
      else openSearchPage()
      return
    }

    if (event.key === 'Escape') {
      event.preventDefault()
      closeSearch()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 pt-[12vh] backdrop-blur-sm"
          variants={VARIANTS.fadeIn}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={TRANSITIONS.fast}
          onClick={closeSearch}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Palette de recherche"
            className="w-full max-w-2xl overflow-hidden rounded-3xl border border-[var(--border)] bg-surface-2 shadow-2xl"
            variants={VARIANTS.scaleIn}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={TRANSITIONS.default}
            onClick={event => event.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-3">
              <Search size={18} className="text-[var(--text-secondary)]" />
              <input
                ref={inputRef}
                value={query}
                onChange={event => setQuery(event.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Rechercher un guide, un rôle, un indicateur..."
                className="flex-1 bg-transparent text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
              />
              <button
                type="button"
                onClick={closeSearch}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-muted)] transition-colors hover:bg-surface-3 hover:text-[var(--text-primary)]"
                aria-label="Fermer la recherche"
              >
                <X size={16} />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {query.trim().length < 2 ? (
                <div className="p-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                    Recherches récentes
                  </p>
                  {recentSearches.length > 0 ? (
                    <div className="space-y-2">
                      {recentSearches.map(term => (
                        <div key={term} className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-surface-3 px-3 py-2">
                          <Clock3 size={14} className="text-[var(--text-muted)]" />
                          <button
                            type="button"
                            onClick={() => setQuery(term)}
                            className="flex-1 text-left text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                          >
                            {term}
                          </button>
                          <button
                            type="button"
                            onClick={() => removeRecentSearch(term)}
                            className="flex h-7 w-7 items-center justify-center rounded-md text-[var(--text-muted)] transition-colors hover:bg-surface-2 hover:text-[var(--text-primary)]"
                            aria-label={`Supprimer la recherche ${term}`}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-[var(--text-muted)]">Tapez au moins deux caractères pour lancer la recherche.</p>
                  )}
                </div>
              ) : results.length > 0 ? (
                <motion.div variants={VARIANTS.stagger} initial="initial" animate="animate" className="py-2">
                  {Object.entries(groupedResults).map(([section, entries]) => (
                    <div key={section} className="pb-2">
                      <p className="px-4 pb-2 pt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                        {getSectionLabel(section as SearchEntry['section'])}
                      </p>
                      {entries.map(entry => {
                        const absoluteIndex = results.findIndex(result => result.id === entry.id)
                        const titleParts = getHighlightParts(entry.titre, query)
                        const chapeauParts = getHighlightParts(entry.chapeau, query)
                        const isActive = absoluteIndex === activeIndex

                        return (
                          <motion.button
                            key={entry.id}
                            type="button"
                            variants={VARIANTS.slideUp}
                            transition={TRANSITIONS.fast}
                            onClick={() => navigateToEntry(entry)}
                            className={`flex w-full items-start gap-3 border-l-2 px-4 py-3 text-left transition-colors ${
                              isActive
                                ? 'border-blue-500 bg-[var(--surface-3)]'
                                : 'border-transparent hover:bg-[var(--surface-3)]'
                            }`}
                          >
                            <div className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-500/60" />
                            <div className="min-w-0 flex-1">
                              <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
                                {getSectionLabel(entry.section)} › {entry.categorie}
                              </p>
                              <p className="mt-1 truncate text-sm font-medium text-[var(--text-primary)]">
                                {titleParts ? (
                                  <>
                                    {titleParts.before}
                                    <mark className="rounded bg-blue-500/20 px-0.5 font-medium text-[var(--datako-blue)]">
                                      {titleParts.match}
                                    </mark>
                                    {titleParts.after}
                                  </>
                                ) : (
                                  entry.titre
                                )}
                              </p>
                              <p className="mt-1 line-clamp-1 text-xs text-[var(--text-secondary)]">
                                {chapeauParts ? (
                                  <>
                                    {chapeauParts.before}
                                    <mark className="rounded bg-blue-500/20 px-0.5 text-[var(--datako-blue)]">
                                      {chapeauParts.match}
                                    </mark>
                                    {chapeauParts.after}
                                  </>
                                ) : (
                                  entry.chapeau
                                )}
                              </p>
                            </div>
                          </motion.button>
                        )
                      })}
                    </div>
                  ))}
                </motion.div>
              ) : (
                <div className="space-y-3 p-4">
                  <p className="text-sm font-medium text-[var(--text-primary)]">Aucun résultat pour “{query}”.</p>
                  <p className="text-sm text-[var(--text-muted)]">Essayez un rôle, un indicateur, un guide ou ouvrez la page de recherche complète.</p>
                  <button
                    type="button"
                    onClick={openSearchPage}
                    className="inline-flex items-center rounded-xl border border-blue-500/20 bg-blue-500/10 px-3 py-2 text-sm font-medium text-blue-400 transition-colors hover:bg-blue-500/15"
                  >
                    Ouvrir la recherche avancée
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-4 border-t border-[var(--border)] px-4 py-2 text-xs text-[var(--text-muted)]">
              <span>↑↓ naviguer</span>
              <span>↵ ouvrir</span>
              <span>Esc fermer</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
