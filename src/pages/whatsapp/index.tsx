import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BarChart3, Bell, Check, ChevronDown, Zap, type LucideIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { PageTransition } from '@/components/ui/PageTransition'
import { StaggerList } from '@/components/ui/StaggerList'
import { Badge } from '@/components/ui/Badge'
import { CalloutBlock } from '@/components/ui/CalloutBlock'
import {
  WHATSAPP_ACCROCHE,
  WHATSAPP_BLOCS,
  WHATSAPP_FLUX,
  WHATSAPP_LIMITES,
  WHATSAPP_LIMITES_TITRE,
  WHATSAPP_PREREQUIS,
  WHATSAPP_PREREQUIS_TITRE,
  WHATSAPP_PRINCIPE,
  WHATSAPP_TITRE,
  type WhatsAppAccent,
  type WhatsAppFlux,
} from '@/data/fleet/whatsapp'
import { TRANSITIONS } from '@/lib/motion'

const BLOC_ICONS: Record<string, LucideIcon> = {
  chart: BarChart3,
  zap: Zap,
  check: Check,
  bell: Bell,
}

const ACCENT_CLASSES: Record<WhatsAppAccent, { icon: string; surface: string; border: string }> = {
  blue: { icon: 'text-blue-400', surface: 'bg-blue-500/10', border: 'hover:border-blue-500/30' },
  emerald: { icon: 'text-emerald-400', surface: 'bg-emerald-500/10', border: 'hover:border-emerald-500/30' },
  amber: { icon: 'text-amber-400', surface: 'bg-amber-500/10', border: 'hover:border-amber-500/30' },
  purple: { icon: 'text-purple-400', surface: 'bg-purple-500/10', border: 'hover:border-purple-500/30' },
}

function FluxItem({ flux, accent }: { flux: WhatsAppFlux; accent: WhatsAppAccent }) {
  const [open, setOpen] = useState(false)
  const panelId = `flux-${flux.id}`
  const style = ACCENT_CLASSES[accent]
  const aVenir = flux.disponibilite === 'a-venir'

  return (
    <div
      className={`overflow-hidden rounded-xl border border-[var(--border)] bg-surface-2 transition-colors ${style.border}`}
    >
      <button
        type="button"
        onClick={() => setOpen(value => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-start gap-3 p-4 text-left transition-colors hover:bg-surface-3"
      >
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span className="font-medium text-[var(--text-primary)]">{flux.titre}</span>
            {aVenir && <Badge label="À venir" color="amber" />}
          </span>
          <span className="mt-1 block text-xs text-[var(--text-muted)]">{flux.acteur}</span>
          <span className="mt-2 block text-sm leading-relaxed text-[var(--text-secondary)]">{flux.description}</span>
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={TRANSITIONS.fast} className="mt-1 flex-shrink-0">
          <ChevronDown size={16} className="text-[var(--text-muted)]" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
      {open && (
        <motion.div
          id={panelId}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={TRANSITIONS.default}
          className="overflow-hidden"
        >
          <div className="space-y-4 border-t border-[var(--border)] px-4 pb-5 pt-4">
          {flux.etapes.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Comment faire</p>
              <ol className="mt-2 space-y-2">
                {flux.etapes.map((etape, index) => (
                  <li key={etape} className="flex gap-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                    <span
                      className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold ${style.surface} ${style.icon}`}
                    >
                      {index + 1}
                    </span>
                    {etape}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {flux.resultat && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Bon à savoir</p>
              <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">{flux.resultat}</p>
            </div>
          )}

          {flux.exempleMessage && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Exemple de message reçu
              </p>
              <div className="mt-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
                <p className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-[var(--text-primary)]">
                  {flux.exempleMessage}
                </p>
              </div>
            </div>
          )}

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Qui y a accès</p>
            <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">{flux.acces}</p>
          </div>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  )
}

export function WhatsAppIndex() {
  return (
    <PageTransition>
      <div className="space-y-10">
        <div>
          <h1
            className="text-2xl font-bold"
            style={{
              background: 'linear-gradient(135deg, var(--text-primary) 60%, var(--text-secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {WHATSAPP_TITRE}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">{WHATSAPP_ACCROCHE}</p>
        </div>

        <CalloutBlock variant="astuce" title="Comment ça marche">
          <ul className="space-y-1">
            {WHATSAPP_PRINCIPE.map(ligne => (
              <li key={ligne}>{ligne}</li>
            ))}
          </ul>
        </CalloutBlock>

        {WHATSAPP_BLOCS.map(bloc => {
          const Icon = BLOC_ICONS[bloc.icon] ?? BarChart3
          const style = ACCENT_CLASSES[bloc.accent]
          const fluxDuBloc = WHATSAPP_FLUX.filter(flux => flux.bloc === bloc.id)

          return (
            <section key={bloc.id} className="space-y-4">
              <div className="flex items-start gap-4">
                <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl ${style.surface}`}>
                  <Icon size={20} className={style.icon} />
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold text-[var(--text-primary)]">{bloc.titre}</h2>
                  <p className="mt-0.5 text-sm text-[var(--text-secondary)]">{bloc.sousTitre}</p>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">{bloc.pourQui}</p>
                </div>
              </div>

              <StaggerList className="space-y-3">
                {fluxDuBloc.map(flux => (
                  <FluxItem key={flux.id} flux={flux} accent={bloc.accent} />
                ))}
              </StaggerList>

              {bloc.lien && (
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {bloc.lien.texte}{' '}
                  <Link to={bloc.lien.href} className={`${style.icon} underline-offset-2 hover:underline`}>
                    {bloc.lien.label}
                  </Link>
                  .
                </p>
              )}
            </section>
          )
        })}

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">{WHATSAPP_PREREQUIS_TITRE}</h2>
          <StaggerList className="grid gap-3 sm:grid-cols-2">
            {WHATSAPP_PREREQUIS.map(prerequis => (
              <div
                key={prerequis.titre}
                className="rounded-xl border border-[var(--border)] bg-surface-2 p-4"
              >
                <p className="text-sm font-medium text-[var(--text-primary)]">{prerequis.titre}</p>
                <p className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">{prerequis.description}</p>
              </div>
            ))}
          </StaggerList>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">{WHATSAPP_LIMITES_TITRE}</h2>
          <StaggerList className="space-y-3">
            {WHATSAPP_LIMITES.map(limite => (
              <div
                key={limite.titre}
                className="rounded-xl border border-[var(--border)] bg-surface-2 p-4"
              >
                <p className="text-sm font-medium text-[var(--text-primary)]">{limite.titre}</p>
                <p className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">{limite.description}</p>
              </div>
            ))}
          </StaggerList>
        </section>
      </div>
    </PageTransition>
  )
}
