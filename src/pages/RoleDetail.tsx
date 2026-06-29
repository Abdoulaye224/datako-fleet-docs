import { Link, Navigate, useParams } from 'react-router-dom'
import { ArticleCard } from '@/components/ui/ArticleCard'
import { CalloutBlock } from '@/components/ui/CalloutBlock'
import { CheckList } from '@/components/ui/CheckList'
import { Breadcrumb } from '@/components/navigation/Breadcrumb'
import { PageTransition } from '@/components/ui/PageTransition'
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

const roleColors: Record<string, string> = {
  org_admin: '#3B82F6',
  operator: '#10B981',
  finance: '#F59E0B',
  viewer: '#94A3B8',
  owner: '#A78BFA',
}

export function RoleDetail() {
  const { id } = useParams<{ id: string }>()
  const resolvedId = id ? roleAliases[id] ?? id : undefined
  const role = ROLES.find(item => item.id === resolvedId)

  if (!role) return <Navigate to="/roles" replace />

  const relatedGuides = guides.filter(guide =>
    roleKeywords[role.id]?.some(keyword =>
      [guide.objectif, ...guide.prerequis, ...guide.erreurs].some(content => content.includes(keyword)),
    ),
  )

  return (
    <PageTransition>
      <div className="space-y-8">
        <Breadcrumb
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Les rôles', href: '/roles' },
            { label: role.nom },
          ]}
        />

        <section className="overflow-hidden rounded-3xl border border-[var(--border)] bg-surface-2">
          <div
            className="h-1.5"
            style={{ background: `linear-gradient(135deg, ${roleColors[role.id]}, var(--gradient-end))` }}
          />
          <div className="p-6">
            <div className="flex flex-wrap items-start gap-4">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-3xl text-4xl"
                style={{ backgroundColor: `${roleColors[role.id]}22`, color: roleColors[role.id] }}
              >
                {role.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl font-bold text-[var(--text-primary)]">{role.nom}</h1>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{role.mission}</p>
              </div>
            </div>
          </div>
        </section>

        <CalloutBlock variant="astuce" title="Utilisateurs concernés">
          {role.utilisateurs}
        </CalloutBlock>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-base font-semibold text-emerald-400">Ce que vous pouvez faire</h2>
              <span className="rounded-full border border-emerald-500/20 px-2 py-1 text-xs text-emerald-300">
                {role.peutFaire.length} actions
              </span>
            </div>
            <CheckList items={role.peutFaire} variant="resultat" showLabel={false} />
          </div>

          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-base font-semibold text-red-400">Ce que vous ne pouvez pas faire</h2>
              <span className="rounded-full border border-red-500/20 px-2 py-1 text-xs text-red-300">
                {role.nePeutPasFaire.length} limites
              </span>
            </div>
            <CheckList items={role.nePeutPasFaire} variant="erreur" showLabel={false} />
          </div>
        </section>

        <CalloutBlock variant="exemple" title="Exemple concret">
          {role.exemple}
        </CalloutBlock>

        {relatedGuides.length > 0 && (
          <section className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">Guides recommandés pour ce rôle</h2>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Les articles les plus utiles pour ce profil dans les opérations quotidiennes.
              </p>
            </div>
            <div className="space-y-3">
              {relatedGuides.map(guide => (
                <ArticleCard
                  key={guide.id}
                  titre={guide.title}
                  chapeau={guide.objectif}
                  href={`/transport/guides/${guide.id}`}
                  section="Transport"
                  badge="Guide pas-à-pas"
                />
              ))}
            </div>
          </section>
        )}

        <Link
          to="/roles"
          className="inline-flex items-center text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
        >
          ← Retour aux rôles
        </Link>
      </div>
    </PageTransition>
  )
}
