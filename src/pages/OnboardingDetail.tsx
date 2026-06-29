import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, Clock3 } from 'lucide-react'
import { PageTransition } from '@/components/ui/PageTransition'
import { OnboardingChecklist } from '@/components/ui/OnboardingChecklist'
import { ONBOARDING_PARCOURS } from '@/data/fleet'

export function OnboardingDetail() {
  const { id } = useParams<{ id: string }>()
  const parcours = ONBOARDING_PARCOURS.find(item => item.id === id)

  if (!parcours) return <Navigate to="/onboarding" replace />

  return (
    <PageTransition>
      <div className="max-w-3xl space-y-8">
        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <Link to="/onboarding" className="flex items-center gap-1 transition-colors hover:text-[var(--text-secondary)]">
            <ArrowLeft size={12} />
            Onboarding
          </Link>
          <span>›</span>
          <span className="text-[var(--text-secondary)]">{parcours.roleNom}</span>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-3">
            <span className="text-4xl">{parcours.emoji}</span>
            <div>
              <h1 className="text-2xl font-bold text-[var(--text-primary)]">{parcours.roleNom}</h1>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">{parcours.objectif}</p>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-surface-2 px-3 py-1.5 text-sm text-[var(--text-secondary)]">
            <Clock3 size={14} />
            Durée estimée : {parcours.duree}
          </div>
        </div>

        <OnboardingChecklist roleId={parcours.roleId} steps={parcours.steps} />
      </div>
    </PageTransition>
  )
}
