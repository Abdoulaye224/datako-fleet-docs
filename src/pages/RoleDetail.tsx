import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { PageTransition } from '@/components/ui/PageTransition'
import { CheckList } from '@/components/ui/CheckList'
import { CalloutBlock } from '@/components/ui/CalloutBlock'
import { ArticleCard } from '@/components/ui/ArticleCard'
import { ROLES, guides } from '@/data/fleet'

const roleAliases: Record<string, string> = {
  administrateur: 'org_admin',
  operateur: 'operator',
  proprietaire: 'owner',
}

const roleKeywords: Record<string, string[]> = {
  org_admin: ['Administrateur'],
  operator: ['Opérateur'],
  finance: ['Finance'],
  viewer: ['Observateur'],
  owner: ['Propriétaire'],
}

export function RoleDetail() {
  const { id } = useParams<{ id: string }>()
  const resolvedId = id ? roleAliases[id] ?? id : undefined
  const role = ROLES.find(item => item.id === resolvedId)

  if (!role) return <Navigate to="/roles" replace />

  const relatedGuides = guides.filter(guide =>
    roleKeywords[role.id]?.some(keyword =>
      [...guide.prerequis, guide.objectif, ...guide.erreurs].some(content => content.includes(keyword)),
    ),
  )

  return (
    <PageTransition>
      <div className="max-w-3xl space-y-8">
        <div className="flex items-center gap-2 text-xs text-[#64748B]">
          <Link to="/roles" className="flex items-center gap-1 transition-colors hover:text-[#94A3B8]">
            <ArrowLeft size={12} />
            Les rôles
          </Link>
          <span>›</span>
          <span className="text-[#94A3B8]">{role.nom}</span>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-3">
            <span className="text-4xl">{role.emoji}</span>
            <div>
              <h1 className="text-2xl font-bold text-[#F1F5F9]">{role.nom}</h1>
              <p className="text-sm text-[#94A3B8]">{role.mission}</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-[#94A3B8]">
            <span className="font-semibold text-[#F1F5F9]">Utilisateurs concernés :</span> {role.utilisateurs}
          </p>
        </div>

        <CheckList items={role.peutFaire} variant="resultat" />
        <CheckList items={role.nePeutPasFaire} variant="erreur" />

        <CalloutBlock variant="exemple">{role.exemple}</CalloutBlock>

        {relatedGuides.length > 0 && (
          <section className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-[#F1F5F9]">Guides liés</h2>
              <p className="mt-1 text-sm text-[#94A3B8]">Les articles les plus utiles pour ce rôle.</p>
            </div>
            <div className="space-y-3">
              {relatedGuides.map(guide => (
                <ArticleCard
                  key={guide.id}
                  titre={guide.title}
                  chapeau={guide.objectif}
                  href={`/transport/guides/${guide.id}`}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </PageTransition>
  )
}
