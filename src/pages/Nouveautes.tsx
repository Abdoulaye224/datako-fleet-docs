import { Badge } from '@/components/ui/Badge'
import { PageTransition } from '@/components/ui/PageTransition'
import { StaggerList } from '@/components/ui/StaggerList'
import { NOUVEAUTES } from '@/data/fleet'

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
          <p className="mb-1 text-xs text-[#64748B]">Produit</p>
          <h1 className="text-2xl font-bold text-[#F1F5F9]">Nouveautés</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#94A3B8]">
            Suivez les derniers ajouts, améliorations et corrections disponibles dans Fleet Manager.
          </p>
        </div>

        <div className="space-y-8">
          {Object.entries(grouped).map(([mois, items]) => (
            <section key={mois} className="space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#64748B]">{mois}</h2>
              <StaggerList className="space-y-3">
                {items.map(item => {
                  const meta = typeMeta[item.type]
                  return (
                    <div key={item.id} className="rounded-2xl border border-white/10 bg-surface-2 p-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge label={meta.label} color={meta.color} />
                        {item.module && (
                          <span className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-[#94A3B8]">
                            {item.module}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-3 text-base font-semibold text-[#F1F5F9]">{item.titre}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">{item.description}</p>
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
