import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle2,
  CircleDot,
  MapPin,
  Rocket,
  ShieldCheck,
  Sparkles,
  UserCircle2,
} from 'lucide-react'
import { PageTransition } from '@/components/ui/PageTransition'
import { StaggerList } from '@/components/ui/StaggerList'
import { CalloutBlock } from '@/components/ui/CalloutBlock'
import { Badge } from '@/components/ui/Badge'
import { TRANSITIONS } from '@/lib/motion'
import {
  AVANT_DE_COMMENCER_ACCROCHE,
  AVANT_DE_COMMENCER_NOTE,
  AVANT_DE_COMMENCER_TITRE,
  CE_QUE_DATAKO_A_FAIT,
  CE_QUE_DATAKO_A_FAIT_TITRE,
  CE_QUE_VOUS_FAITES,
  CE_QUE_VOUS_FAITES_TITRE,
  CHECKLIST_ACCROCHE,
  CHECKLIST_TITRE,
  DEMARRAGE_ACCROCHE,
  DEMARRAGE_CHECKLIST,
  DEMARRAGE_NOTE_ACTIVITE,
  DEMARRAGE_PROMESSE,
  DEMARRAGE_TITRE,
  ETAPES_DEMARRAGE,
  GROUPES_DEMARRAGE,
  PREMIERE_ROTATION_ACCROCHE,
  PREMIERE_ROTATION_LIENS,
  PREMIERE_ROTATION_TITRE,
  VERIFICATIONS_ACCROCHE,
  VERIFICATIONS_FINALES,
  VERIFICATIONS_TITRE,
  type EtapeDemarrage,
} from '@/data/fleet/demarrage'

function EtapeCarte({ etape }: { etape: EtapeDemarrage }) {
  return (
    <motion.article
      whileHover={{ y: -2 }}
      transition={TRANSITIONS.fast}
      className="rounded-2xl border border-[var(--border)] bg-surface-2 p-5 transition-colors hover:border-[var(--accent-blue-border)]"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--accent-blue-bg)] text-sm font-bold text-[var(--accent-blue-fg)]">
          {etape.numero}
        </div>
        <div className="min-w-0 flex-1 space-y-4">
          <div>
            <h3 className="text-base font-semibold text-[var(--text-primary)]">{etape.titre}</h3>
            <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">{etape.ceQueCest}</p>
          </div>

          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-start gap-2">
              <MapPin size={14} className="mt-0.5 flex-shrink-0 text-[var(--text-muted)]" />
              <div>
                <dt className="text-[11px] uppercase tracking-wide text-[var(--text-muted)]">Où</dt>
                <dd className="text-xs leading-relaxed text-[var(--text-secondary)]">{etape.ou}</dd>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <UserCircle2 size={14} className="mt-0.5 flex-shrink-0 text-[var(--text-muted)]" />
              <div>
                <dt className="text-[11px] uppercase tracking-wide text-[var(--text-muted)]">Qui</dt>
                <dd className="text-xs leading-relaxed text-[var(--text-secondary)]">{etape.qui}</dd>
              </div>
            </div>
          </dl>

          <div className="space-y-3 border-t border-[var(--border)] pt-4">
            <div>
              <p className="text-[11px] uppercase tracking-wide text-[var(--text-muted)]">Pourquoi maintenant</p>
              <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">{etape.pourquoiMaintenant}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wide text-[var(--accent-red-fg)]">
                Ce qui casse si vous la sautez
              </p>
              <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">{etape.siOnSaute}</p>
            </div>
          </div>

          {etape.details && etape.details.length > 0 && (
            <ul className="space-y-1.5">
              {etape.details.map(detail => (
                <li key={detail} className="flex items-start gap-2 text-xs leading-relaxed text-[var(--text-muted)]">
                  <CircleDot size={11} className="mt-1 flex-shrink-0" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          )}

          {etape.attention && <CalloutBlock variant="attention">{etape.attention}</CalloutBlock>}

          {etape.pourAllerPlusLoin && (
            <Link
              to={etape.pourAllerPlusLoin.href}
              className="group inline-flex items-center gap-1.5 text-xs font-medium text-[var(--accent-blue-fg)] hover:underline"
            >
              {etape.pourAllerPlusLoin.titre}
              <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export function Demarrage() {
  return (
    <PageTransition>
      <div className="max-w-3xl space-y-12">
        <header>
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-blue-bg)]">
            <Rocket size={20} className="text-[var(--accent-blue-icon)]" />
          </div>
          <h1
            className="text-2xl font-bold"
            style={{
              background: 'linear-gradient(135deg, var(--text-primary) 60%, var(--text-secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {DEMARRAGE_TITRE}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{DEMARRAGE_ACCROCHE}</p>
          <div className="mt-4">
            <CalloutBlock variant="astuce" title="Ce que vous pouvez faire tout de suite">
              {DEMARRAGE_PROMESSE}
            </CalloutBlock>
          </div>
        </header>

        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">{AVANT_DE_COMMENCER_TITRE}</h2>
            <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">{AVANT_DE_COMMENCER_ACCROCHE}</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border)] bg-surface-2 p-5">
              <div className="mb-3 flex items-center gap-2">
                <ShieldCheck size={15} className="text-[var(--accent-emerald-icon)]" />
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">{CE_QUE_DATAKO_A_FAIT_TITRE}</h3>
              </div>
              <ul className="space-y-2">
                {CE_QUE_DATAKO_A_FAIT.map(item => (
                  <li key={item} className="flex items-start gap-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                    <CheckCircle2 size={13} className="mt-0.5 flex-shrink-0 text-[var(--accent-emerald-icon)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-surface-2 p-5">
              <div className="mb-3 flex items-center gap-2">
                <Sparkles size={15} className="text-[var(--accent-blue-icon)]" />
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">{CE_QUE_VOUS_FAITES_TITRE}</h3>
              </div>
              <ul className="space-y-2">
                {CE_QUE_VOUS_FAITES.map(item => (
                  <li key={item} className="flex items-start gap-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                    <CircleDot size={13} className="mt-0.5 flex-shrink-0 text-[var(--accent-blue-icon)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <CalloutBlock variant="astuce">{AVANT_DE_COMMENCER_NOTE}</CalloutBlock>
        </section>

        {GROUPES_DEMARRAGE.map(groupe => {
          const etapes = ETAPES_DEMARRAGE.filter(etape => etape.groupe === groupe.id)
          return (
            <section key={groupe.id} className="space-y-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-semibold text-[var(--text-primary)]">{groupe.titre}</h2>
                  <Badge
                    label={`Étapes ${etapes[0].numero} à ${etapes[etapes.length - 1].numero}`}
                    color={groupe.id === 'rotation' ? 'blue' : 'amber'}
                  />
                </div>
                <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">{groupe.accroche}</p>
              </div>
              <StaggerList className="space-y-4">
                {etapes.map(etape => (
                  <EtapeCarte key={etape.id} etape={etape} />
                ))}
              </StaggerList>
            </section>
          )
        })}

        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">{PREMIERE_ROTATION_TITRE}</h2>
            <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">{PREMIERE_ROTATION_ACCROCHE}</p>
          </div>
          <StaggerList className="space-y-2.5">
            {PREMIERE_ROTATION_LIENS.map(lien => (
              <motion.div key={lien.href} whileHover={{ x: 4 }} transition={TRANSITIONS.fast}>
                <Link
                  to={lien.href}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-surface-2 p-4 transition-colors hover:bg-surface-3"
                >
                  <span className="text-sm font-medium text-[var(--text-primary)]">{lien.titre}</span>
                  <ArrowRight size={14} className="flex-shrink-0 text-[var(--text-muted)]" />
                </Link>
              </motion.div>
            ))}
          </StaggerList>
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">{CHECKLIST_TITRE}</h2>
            <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">{CHECKLIST_ACCROCHE}</p>
          </div>
          <ul className="grid grid-cols-1 gap-2 rounded-2xl border border-[var(--border)] bg-surface-2 p-5 sm:grid-cols-2">
            {DEMARRAGE_CHECKLIST.map(item => (
              <li key={item} className="flex items-start gap-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                <CheckCircle2 size={13} className="mt-0.5 flex-shrink-0 text-[var(--accent-emerald-icon)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">{VERIFICATIONS_TITRE}</h2>
            <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">{VERIFICATIONS_ACCROCHE}</p>
          </div>
          <StaggerList className="space-y-3">
            {VERIFICATIONS_FINALES.map(verification => (
              <div
                key={verification.titre}
                className="rounded-2xl border border-[var(--border)] bg-surface-2 p-5"
              >
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">{verification.titre}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">{verification.comment}</p>
              </div>
            ))}
          </StaggerList>
          <CalloutBlock variant="astuce">{DEMARRAGE_NOTE_ACTIVITE}</CalloutBlock>
        </section>
      </div>
    </PageTransition>
  )
}
