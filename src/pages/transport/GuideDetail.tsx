import { Navigate, useParams } from 'react-router-dom'
import { ArticlesConnexes } from '@/components/navigation/ArticlesConnexes'
import { Breadcrumb } from '@/components/navigation/Breadcrumb'
import { PrevNext } from '@/components/navigation/PrevNext'
import { TableOfContents } from '@/components/navigation/TableOfContents'
import { CalloutBlock } from '@/components/ui/CalloutBlock'
import { CheckList } from '@/components/ui/CheckList'
import { ComparisonTable } from '@/components/ui/ComparisonTable'
import { PageTransition } from '@/components/ui/PageTransition'
import { StepList } from '@/components/ui/StepList'
import { guides } from '@/data/fleet/transport/guides'

const guideAliases: Record<string, string> = {
  'ajouter-un-camion': 'ajouter-camion',
  'ajouter-un-client': 'ajouter-client',
  'creer-une-rotation': 'creer-rotation',
  'valider-une-livraison': 'valider-livraison',
  'confirmer-un-paiement': 'confirmer-paiement',
  'ajouter-une-charge-fixe': 'ajouter-charge-fixe',
  'ajouter-une-maintenance': 'ajouter-maintenance',
  'generer-releve-client-pdf': 'releve-client-pdf',
  'generer-bilan-proprietaire-pdf': 'bilan-proprietaire-pdf',
}

export function GuideDetail() {
  const { id } = useParams<{ id: string }>()
  const resolvedId = id ? guideAliases[id] ?? id : undefined
  const guide = guides.find(item => item.id === resolvedId)

  if (!guide) return <Navigate to="/transport/guides" replace />

  const tocItems = [
    ...(guide.prerequis.length > 0 ? [{ id: 'prerequis', label: 'Prérequis' as const }] : []),
    { id: 'etapes', label: 'Étapes' as const },
    { id: 'resultat', label: 'Résultat attendu' as const },
    ...(guide.exempleConcret ? [{ id: 'exemple-concret', label: 'Exemple concret' as const }] : []),
    ...(guide.avantApres ? [{ id: 'avant-apres', label: 'Avant / après' as const }] : []),
    ...(guide.impacts?.length ? [{ id: 'impacts', label: 'Impacts financiers' as const }] : []),
    ...(guide.attention?.length ? [{ id: 'attention', label: 'Points de vigilance' as const }] : []),
    ...(guide.erreurs.length > 0 ? [{ id: 'erreurs', label: 'Erreurs fréquentes' as const }] : []),
    ...(guide.articlesConnexes?.length ? [{ id: 'articles-connexes', label: 'Articles connexes' as const }] : []),
  ]

  return (
    <PageTransition>
      <div className="relative space-y-8 xl:pr-56">
        <Breadcrumb
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Transport', href: '/transport' },
            { label: 'Guides', href: '/transport/guides' },
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

          {guide.exempleConcret && (
            <section id="exemple-concret">
              <CalloutBlock variant="exemple" title="Exemple concret">
                {guide.exempleConcret}
              </CalloutBlock>
            </section>
          )}

          {guide.avantApres && (
            <section id="avant-apres">
              <h2 className="mb-4 text-base font-semibold text-[var(--text-primary)]">Avant / après</h2>
              <ComparisonTable titre={guide.avantApres.titre} lignes={guide.avantApres.lignes} />
            </section>
          )}

          {guide.impacts && guide.impacts.length > 0 && (
            <section id="impacts">
              <CheckList items={guide.impacts} variant="impact" />
            </section>
          )}

          {guide.attention && guide.attention.length > 0 && (
            <section id="attention">
              <CalloutBlock variant="attention" title="Points de vigilance">
                <ul className="list-disc space-y-1.5 pl-4">
                  {guide.attention.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </CalloutBlock>
            </section>
          )}

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
