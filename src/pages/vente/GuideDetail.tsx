import { Navigate, useParams } from 'react-router-dom'
import { PageTransition } from '@/components/ui/PageTransition'
import { CalloutBlock } from '@/components/ui/CalloutBlock'
import { CheckList } from '@/components/ui/CheckList'
import { StepList } from '@/components/ui/StepList'
import { Breadcrumb } from '@/components/navigation/Breadcrumb'
import { PrevNext } from '@/components/navigation/PrevNext'
import { ArticlesConnexes } from '@/components/navigation/ArticlesConnexes'
import { TableOfContents } from '@/components/navigation/TableOfContents'
import { guides as venteGuides } from '@/data/fleet/vente/guides'

export function VenteGuideDetail() {
  const { id } = useParams<{ id: string }>()
  const guide = venteGuides.find(g => g.id === id)

  if (!guide) return <Navigate to="/vente/guides" replace />

  const tocItems = [
    ...(guide.prerequis.length > 0 ? [{ id: 'prerequis', label: 'Prérequis' as const }] : []),
    { id: 'etapes', label: 'Étapes' as const },
    { id: 'resultat', label: 'Résultat attendu' as const },
    ...(guide.erreurs.length > 0 ? [{ id: 'erreurs', label: 'Erreurs fréquentes' as const }] : []),
    ...(guide.articlesConnexes?.length ? [{ id: 'articles-connexes', label: 'Articles connexes' as const }] : []),
  ]

  return (
    <PageTransition>
      <div className="relative space-y-8 xl:pr-56">
        <Breadcrumb
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Vente / Distribution', href: '/vente' },
            { label: 'Guides pas-à-pas', href: '/vente/guides' },
            { label: guide.title },
          ]}
        />

        <TableOfContents items={tocItems} />

        <div className="max-w-3xl space-y-8">
          <div>
            <h1
              className="text-2xl font-bold"
              style={{
                background: 'linear-gradient(135deg, var(--text-primary) 60%, var(--text-secondary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {guide.title}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{guide.objectif}</p>
          </div>

          {guide.prerequis.length > 0 && (
            <section id="prerequis">
              <CheckList items={guide.prerequis} variant="prerequis" />
            </section>
          )}

          <section id="etapes">
            <h2 className="mb-4 text-base font-semibold text-[var(--text-primary)]">Étapes</h2>
            <StepList steps={guide.etapes} />
          </section>

          <section id="resultat">
            <CalloutBlock variant="exemple" title="Résultat attendu">
              {guide.resultat}
            </CalloutBlock>
          </section>

          {guide.erreurs.length > 0 && (
            <section id="erreurs">
              <CheckList items={guide.erreurs} variant="erreur" />
            </section>
          )}

          {guide.articlesConnexes && guide.articlesConnexes.length > 0 && (
            <section id="articles-connexes">
              <ArticlesConnexes articles={guide.articlesConnexes} />
            </section>
          )}

          <PrevNext precedent={guide.precedent} suivant={guide.suivant} />
        </div>
      </div>
    </PageTransition>
  )
}
