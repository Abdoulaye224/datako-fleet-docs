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
          <p className="mb-1 text-xs text-[#64748B]">Onboarding</p>
          <h1 className="text-2xl font-bold text-[#F1F5F9]">Démarrage rapide — Choisissez votre rôle</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#94A3B8]">
            Suivez un parcours guidé selon votre rôle pour être opérationnel rapidement dans Fleet Manager.
          </p>
        </div>

        <StaggerList className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {ONBOARDING_PARCOURS.map(parcours => (
            <Link
              key={parcours.id}
              to={`/onboarding/${parcours.id}`}
              className="group rounded-2xl border border-white/10 bg-surface-2 p-5 transition-colors hover:border-blue-500/25 hover:bg-surface-3"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mb-3 text-3xl">{parcours.emoji}</div>
                  <h2 className="text-lg font-semibold text-[#F1F5F9] transition-colors group-hover:text-blue-400">{parcours.roleNom}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">{parcours.objectif}</p>
                </div>
                <span className="flex items-center gap-1 rounded-full border border-white/10 px-2 py-1 text-xs text-[#94A3B8]">
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
