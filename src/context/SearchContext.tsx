import { createContext, useContext, useMemo, useState } from 'react'
import Fuse from 'fuse.js'
import {
  FAQ_ITEMS,
  INDICATEURS,
  NOUVEAUTES,
  ONBOARDING_PARCOURS,
  PROFILS,
  ROLES,
  appPages,
  casParticuliers,
  cycleEtapes,
  guides,
} from '@/data/fleet'
import { appPages as ventePages } from '@/data/fleet/vente/pages'
import { guides as venteGuides } from '@/data/fleet/vente/guides'
import { INDICATEURS as venteIndicateurs } from '@/data/fleet/vente/indicateurs'
import { WHATSAPP_FLUX } from '@/data/fleet/whatsapp'
import { PORTAIL_SECTIONS } from '@/data/fleet/portail'
import { buildSearchIndex, scoreEntry, type SearchEntry } from '@/lib/search'

interface SearchContextValue {
  isOpen: boolean
  openSearch: () => void
  closeSearch: () => void
  searchEntries: SearchEntry[]
  query: string
  setQuery: (query: string) => void
  results: SearchEntry[]
}

const SearchContext = createContext<SearchContextValue | null>(null)

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')

  const searchEntries = useMemo(
    () =>
      buildSearchIndex({
        pages: appPages,
        guides,
        cycle: cycleEtapes,
        casParticuliers,
        roles: ROLES,
        indicateurs: INDICATEURS,
        faqItems: FAQ_ITEMS,
        profils: PROFILS,
        onboarding: ONBOARDING_PARCOURS,
        nouveautes: NOUVEAUTES,
        ventePages,
        venteGuides,
        venteIndicateurs,
        whatsappFlux: WHATSAPP_FLUX,
        portailSections: PORTAIL_SECTIONS,
      }),
    [],
  )

  const fuse = useMemo(
    () =>
      new Fuse(searchEntries, {
        keys: [
          { name: 'titre', weight: 0.5 },
          { name: 'chapeau', weight: 0.3 },
          { name: 'tags', weight: 0.2 },
        ],
        threshold: 0.4,
        minMatchCharLength: 2,
        includeScore: true,
      }),
    [searchEntries],
  )

  const results = useMemo(() => {
    const trimmed = query.trim()
    if (trimmed.length < 2) return []

    // Scoring exact d'abord
    const exactResults = searchEntries
      .map(entry => ({ entry, score: scoreEntry(entry, trimmed) }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map(item => item.entry)

    if (exactResults.length >= 3) return exactResults

    // Compléter avec Fuse.js (fuzzy) si pas assez de résultats exacts
    const fuseResults = fuse
      .search(trimmed, { limit: 8 })
      .map(result => result.item)
      .filter(item => !exactResults.some(r => r.id === item.id))

    return [...exactResults, ...fuseResults].slice(0, 8)
  }, [query, searchEntries, fuse])

  const closeSearch = () => {
    setIsOpen(false)
    setQuery('')
  }

  return (
    <SearchContext.Provider
      value={{
        isOpen,
        openSearch: () => setIsOpen(true),
        closeSearch,
        searchEntries,
        query,
        setQuery,
        results,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (!context) throw new Error('useSearch must be used within SearchProvider')
  return context
}
