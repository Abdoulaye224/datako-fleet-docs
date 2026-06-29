import { createContext, useContext, useMemo, useState } from 'react'
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
import { buildSearchIndex, searchIndex as doSearch, type SearchEntry } from '@/lib/search'

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
      }),
    [],
  )

  const results = useMemo(() => doSearch(query, searchEntries), [query, searchEntries])

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
