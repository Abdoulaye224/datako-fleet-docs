import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { PageTransition } from '@/components/ui/PageTransition'
import { StaggerList } from '@/components/ui/StaggerList'
import { NOUVEAUTES, NOUVEAUTES_A_VENIR } from '@/data/fleet'

const typeMeta = {
  nouveau: { label: 'Nouveau', color: 'blue' },
  amelioration: { label: 'Amélioration', color: 'emerald' },
  corrige: { label: 'Corrigé', color: 'amber' },
  deprecated: { label: 'Déprécié', color: 'red' },
} as const

export function Nouveautes() {
  const grouped = NOUVEAUTES.reduce<Record<string, typeof NOUVEAUTES>>((acc, nouveaute) => {
    acc[nouveaute.mois] ??= []
    acc[nouveaute.mois].push(nouveaute)
    return acc
  }, {})

  return (
    <PageTransition>
      <div className="space-y-8">
        <div>
          <p className="mb-1 text-xs text-[var(--text-muted)]">Produit</p>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Nouveautés</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">
            Suivez les derniers ajouts, améliorations et corrections disponibles dans Fleet Manager.
          </p>
        </div>

        {NOUVEAUTES_A_VENIR.length > 0 && (
          <section className="space-y-4">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">À venir</h2>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Ces fonctionnalités sont en préparation. Elles ne sont pas encore disponibles dans Fleet Manager, et
                aucune date de mise en service n'est annoncée.
              </p>
            </div>
            <StaggerList className="space-y-3">
              {NOUVEAUTES_A_VENIR.map(item => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-dashed border-[var(--accent-purple-border)] bg-[var(--accent-purple-bg)] p-5"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge label="À venir" color="purple" />
                    {item.module && (
                      <span className="rounded-full border border-[var(--border)] px-2 py-0.5 text-xs text-[var(--text-secondary)]">
                        {item.module}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-[var(--text-primary)]">{item.titre}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{item.description}</p>
                </div>
              ))}
            </StaggerList>
          </section>
        )}

        <div className="space-y-8">
          <div className="border-t border-[var(--border)] pt-6">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">Déjà disponible</h2>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Les fonctionnalités ci-dessous sont en service, classées par mois de mise à disposition.
            </p>
          </div>
          {Object.entries(grouped).map(([mois, items]) => (
            <section key={mois} className="space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">{mois}</h2>
              <StaggerList className="space-y-3">
                {items.map(item => {
                  const meta = typeMeta[item.type]
                  return (
                    <div key={item.id} className="rounded-2xl border border-[var(--border)] bg-surface-2 p-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge label={meta.label} color={meta.color} />
                        {item.module && (
                          <span className="rounded-full border border-[var(--border)] px-2 py-0.5 text-xs text-[var(--text-secondary)]">
                            {item.module}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-3 text-base font-semibold text-[var(--text-primary)]">{item.titre}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{item.description}</p>
                      {item.liens && item.liens.length > 0 && (
                        <div className="mt-4 border-t border-[var(--border)] pt-3">
                          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                            Comment s'en servir
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {item.liens.map(lien => (
                              <Link
                                key={lien.href}
                                to={lien.href}
                                className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:border-blue-500/40 hover:bg-surface-3 hover:text-[var(--text-primary)]"
                              >
                                {lien.titre}
                                <ArrowRight size={12} />
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </StaggerList>
            </section>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
