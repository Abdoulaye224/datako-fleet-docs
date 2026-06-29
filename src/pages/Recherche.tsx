import { useMemo } from 'react'
import { Search } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { ArticleCard } from '@/components/ui/ArticleCard'
import { PageMeta } from '@/components/ui/PageMeta'
import { PageTransition } from '@/components/ui/PageTransition'
import { StaggerList } from '@/components/ui/StaggerList'
import { useSearch } from '@/context/SearchContext'
import { getSectionLabel, scoreEntry } from '@/lib/search'

export function Recherche() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { searchEntries } = useSearch()
  const query = searchParams.get('q') ?? ''

  const results = useMemo(() => {
    const trimmed = query.trim()
    if (trimmed.length < 2) return []

    return searchEntries
      .map(entry => ({ entry, score: scoreEntry(entry, trimmed) }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.entry)
  }, [query, searchEntries])

  return (
    <PageTransition>
      <PageMeta title="Recherche" description="Recherchez dans les guides, rôles, profils, onboarding et indicateurs de Datakö Fleet Docs." />
      <div className="space-y-8">
        <div>
          <p className="mb-1 text-xs text-[var(--text-muted)]">Recherche</p>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Trouver un article</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">
            Recherchez un guide, un rôle, un indicateur financier ou un parcours onboarding.
          </p>
        </div>

        <label className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-surface-2 px-4 py-3">
          <Search size={18} className="text-[var(--text-secondary)]" />
          <input
            value={query}
            onChange={event => {
              const next = event.target.value
              if (next) setSearchParams({ q: next })
              else setSearchParams({})
            }}
            placeholder="Ex. rotation, cashflow, propriétaire..."
            className="flex-1 bg-transparent text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
          />
        </label>

        {query.trim().length < 2 ? (
          <div className="rounded-2xl border border-[var(--border)] bg-surface-2 p-5 text-sm text-[var(--text-muted)]">
            Tapez au moins deux caractères pour lancer la recherche.
          </div>
        ) : results.length > 0 ? (
          <StaggerList className="space-y-3">
            {results.map(result => (
              <ArticleCard
                key={result.id}
                titre={result.titre}
                chapeau={result.chapeau}
                href={result.href}
                section={getSectionLabel(result.section)}
                badge={result.categorie}
              />
            ))}
          </StaggerList>
        ) : (
          <div className="rounded-2xl border border-[var(--border)] bg-surface-2 p-5">
            <p className="text-sm font-medium text-[var(--text-primary)]">Aucun résultat</p>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Essayez des termes proches comme <code>rotation</code>, <code>cashflow</code>, <code>propriétaire</code> ou <code>export</code>.
            </p>
          </div>
        )}
      </div>
    </PageTransition>
  )
}
