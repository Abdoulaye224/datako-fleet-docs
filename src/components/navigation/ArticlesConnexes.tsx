import { ArticleCard } from '@/components/ui/ArticleCard'

interface ArticlesConnexesProps {
  articles: Array<{ href: string; titre: string; section: string }>
}

export function ArticlesConnexes({ articles }: ArticlesConnexesProps) {
  if (articles.length === 0) return null

  return (
    <section className="mt-8 space-y-3" aria-label="Articles connexes">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
        Articles connexes
      </h2>
      <div className="space-y-3">
        {articles.map(article => (
          <ArticleCard
            key={`${article.href}-${article.titre}`}
            titre={article.titre}
            chapeau={article.section}
            href={article.href}
            badge={article.section}
          />
        ))}
      </div>
    </section>
  )
}
