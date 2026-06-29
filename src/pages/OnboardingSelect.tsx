import { Clock3 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageTransition } from '@/components/ui/PageTransition'
import { StaggerList } from '@/components/ui/StaggerList'
import { ONBOARDING_PARCOURS } from '@/data/fleet'

export function OnboardingSelect() {
  return (
    <PageTransition>
      <div className="space-y-8">
        <div>
          <p className="mb-1 text-xs text-[var(--text-muted)]">Onboarding</p>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Démarrage rapide — Choisissez votre rôle</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">
            Suivez un parcours guidé selon votre rôle pour être opérationnel rapidement dans Fleet Manager.
          </p>
        </div>

        <StaggerList className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {ONBOARDING_PARCOURS.map(parcours => (
            <Link
              key={parcours.id}
              to={`/onboarding/${parcours.id}`}
              className="group rounded-2xl border border-[var(--border)] bg-surface-2 p-5 shadow-sm transition-all hover:border-blue-500/30 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="mb-3 text-3xl">{parcours.emoji}</div>
                  <h2 className="text-lg font-semibold text-[var(--text-primary)] transition-colors group-hover:text-blue-400">{parcours.roleNom}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{parcours.objectif}</p>
                </div>
                <span className="flex shrink-0 items-center gap-1 rounded-full border border-[var(--border)] px-2 py-1 text-xs text-[var(--text-secondary)]">
                  <Clock3 size={12} />
                  {parcours.duree}
                </span>
              </div>
            </Link>
          ))}
        </StaggerList>
      </div>
    </PageTransition>
  )
}
