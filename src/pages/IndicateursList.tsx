import { PageTransition } from '@/components/ui/PageTransition'
import { StaggerList } from '@/components/ui/StaggerList'
import { ArticleCard } from '@/components/ui/ArticleCard'
import { INDICATEURS } from '@/data/fleet'

export function IndicateursList() {
  return (
    <PageTransition>
      <div className="space-y-8">
        <div>
          <p className="mb-1 text-xs text-[#64748B]">Finance</p>
          <h1 className="text-2xl font-bold text-[#F1F5F9]">Comprendre les indicateurs</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#94A3B8]">
            Définitions simples, formules et conseils de lecture pour interpréter les chiffres clés de Fleet Manager.
          </p>
        </div>

        <StaggerList className="space-y-3">
          {INDICATEURS.map(indicateur => (
            <ArticleCard
              key={indicateur.id}
              titre={indicateur.nom}
              chapeau={indicateur.definition}
              href={`/indicateurs/${indicateur.id}`}
            />
          ))}
        </StaggerList>
      </div>
    </PageTransition>
  )
}
