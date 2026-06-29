import { Link } from 'react-router-dom'
import { SearchBar } from '@/components/search/SearchBar'
import { PageTransition } from '@/components/ui/PageTransition'

const suggestions = [
  { href: '/transport/guides/creer-rotation', label: 'Créer une rotation' },
  { href: '/indicateurs/cashflow-net', label: 'Comprendre le cashflow' },
  { href: '/faq', label: 'Questions fréquentes' },
]

export function NotFound() {
  return (
    <PageTransition>
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-8 text-center">
        <div className="space-y-3">
          <p
            className="text-7xl font-bold"
            style={{
              background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            404
          </p>
          <h1 className="text-2xl font-semibold text-[var(--text-primary)]">Page introuvable</h1>
          <p className="text-sm text-[var(--text-secondary)]">Cette page n'existe pas ou a été déplacée.</p>
        </div>

        <div className="w-full max-w-md">
          <SearchBar />
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400 transition-colors hover:bg-blue-500/20"
        >
          Retour à l'accueil
        </Link>

        <div className="w-full max-w-xl rounded-2xl border border-[var(--border)] bg-surface-2 p-5 text-left">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Suggestions</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {suggestions.map(suggestion => (
              <Link
                key={suggestion.href}
                to={suggestion.href}
                className="rounded-xl border border-[var(--border)] bg-surface-3 px-4 py-3 text-sm text-[var(--text-primary)] transition-colors hover:border-blue-500/30 hover:text-blue-400"
              >
                {suggestion.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
