import { Link } from 'react-router-dom'
import {
  AlertTriangle,
  Ban,
  Crown,
  LifeBuoy,
  ListChecks,
  MessageSquare,
  QrCode,
  Truck,
  UserCheck,
  type LucideIcon,
} from 'lucide-react'
import { PageTransition } from '@/components/ui/PageTransition'
import { StaggerList } from '@/components/ui/StaggerList'
import { Badge } from '@/components/ui/Badge'
import { CalloutBlock } from '@/components/ui/CalloutBlock'
import { CheckList } from '@/components/ui/CheckList'
import { PageMeta } from '@/components/ui/PageMeta'
import { Breadcrumb } from '@/components/navigation/Breadcrumb'
import {
  MISSION_CONDUCTEUR_ACCROCHE,
  MISSION_CONDUCTEUR_DEPANNAGE,
  MISSION_CONDUCTEUR_DEPANNAGE_INTRO,
  MISSION_CONDUCTEUR_DEPANNAGE_TITRE,
  MISSION_CONDUCTEUR_ETAPES,
  MISSION_CONDUCTEUR_HORS_PERIMETRE,
  MISSION_CONDUCTEUR_HORS_PERIMETRE_TITRE,
  MISSION_CONDUCTEUR_POSITIONNEMENT,
  MISSION_CONDUCTEUR_PREREQUIS,
  MISSION_CONDUCTEUR_STATUTS,
  MISSION_CONDUCTEUR_TITRE,
  MISSION_CONDUCTEUR_VIGILANCE,
  type MissionEtapeActeur,
} from '@/data/fleet/whatsapp/missionConducteur'

const ACTEUR_CONFIG: Record<
  MissionEtapeActeur,
  { label: string; icon: LucideIcon; surface: string; icone: string }
> = {
  exploitant: { label: 'Exploitant', icon: ListChecks, surface: 'bg-purple-500/10', icone: 'text-purple-400' },
  conducteur: { label: 'Conducteur', icon: Truck, surface: 'bg-blue-500/10', icone: 'text-blue-400' },
  destinataire: { label: 'Destinataire', icon: UserCheck, surface: 'bg-emerald-500/10', icone: 'text-emerald-400' },
}

export function MissionConducteur() {
  return (
    <PageTransition>
      <PageMeta title={MISSION_CONDUCTEUR_TITRE} description={MISSION_CONDUCTEUR_ACCROCHE} />

      <Breadcrumb
        items={[
          { label: 'Accueil', href: '/' },
          { label: 'WhatsApp', href: '/whatsapp' },
          { label: MISSION_CONDUCTEUR_TITRE },
        ]}
      />

      <div className="space-y-10">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Badge label="Premium" color="purple" />
            <Badge label="Plan Business" color="purple" />
            <Badge label="Transport" color="blue" />
          </div>
          <h1
            className="text-2xl font-bold"
            style={{
              background: 'linear-gradient(135deg, var(--text-primary) 60%, var(--text-secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {MISSION_CONDUCTEUR_TITRE}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">
            {MISSION_CONDUCTEUR_ACCROCHE}
          </p>
        </div>

        <section className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-purple-500/10">
              <Crown size={20} className="text-purple-400" />
            </div>
            <div className="min-w-0 space-y-2">
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                {MISSION_CONDUCTEUR_POSITIONNEMENT.titre}
              </h2>
              {MISSION_CONDUCTEUR_POSITIONNEMENT.paragraphes.map(paragraphe => (
                <p key={paragraphe} className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {paragraphe}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Ce qu’il faut avant de commencer</h2>
          <CheckList items={MISSION_CONDUCTEUR_PREREQUIS} variant="prerequis" />
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Le parcours, étape par étape</h2>
          <StaggerList className="space-y-4">
            {MISSION_CONDUCTEUR_ETAPES.map(etape => {
              const acteur = ACTEUR_CONFIG[etape.acteur]
              const Icon = acteur.icon

              return (
                <article
                  key={etape.numero}
                  className="rounded-2xl border border-[var(--border)] bg-surface-2 p-5"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl ${acteur.surface}`}
                    >
                      <Icon size={20} className={acteur.icone} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold text-[var(--text-muted)]">Étape {etape.numero}</span>
                        <Badge
                          label={acteur.label}
                          color={etape.acteur === 'conducteur' ? 'blue' : etape.acteur === 'destinataire' ? 'emerald' : 'purple'}
                        />
                      </div>
                      <h3 className="mt-1 font-medium text-[var(--text-primary)]">{etape.titre}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{etape.description}</p>
                    </div>
                  </div>

                  <ul className="mt-4 space-y-2 border-t border-[var(--border)] pt-4">
                    {etape.details.map(detail => (
                      <li
                        key={detail}
                        className="flex gap-3 text-sm leading-relaxed text-[var(--text-secondary)]"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--text-muted)]" />
                        {detail}
                      </li>
                    ))}
                  </ul>

                  {etape.message && (
                    <div className="mt-4">
                      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                        <MessageSquare size={12} />
                        Message reçu sur WhatsApp
                      </p>
                      <div className="mt-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
                        <p className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-[var(--text-primary)]">
                          {etape.message}
                        </p>
                      </div>
                    </div>
                  )}

                  {etape.aRetenir && (
                    <p className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {etape.aRetenir}
                    </p>
                  )}
                </article>
              )
            })}
          </StaggerList>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Les états d’une mission</h2>
          <p className="max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">
            Ces mentions s’affichent dans la page Livraisons, à côté du statut de la livraison. Elles décrivent l’avancée
            du conducteur — pas celle de la livraison, qui garde son propre statut.
          </p>
          <StaggerList className="grid gap-3 sm:grid-cols-2">
            {MISSION_CONDUCTEUR_STATUTS.map(statut => (
              <div key={statut.libelle} className="rounded-xl border border-[var(--border)] bg-surface-2 p-4">
                <Badge label={statut.libelle} color={statut.couleur} />
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{statut.quand}</p>
              </div>
            ))}
          </StaggerList>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle size={18} className="text-amber-400" />
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Points de vigilance</h2>
          </div>
          <StaggerList className="space-y-3">
            {MISSION_CONDUCTEUR_VIGILANCE.map(point => (
              <div key={point.titre} className="rounded-xl border border-[var(--border)] bg-surface-2 p-4">
                <p className="text-sm font-medium text-[var(--text-primary)]">{point.titre}</p>
                <p className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">{point.description}</p>
              </div>
            ))}
          </StaggerList>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <LifeBuoy size={18} className="text-blue-400" />
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">{MISSION_CONDUCTEUR_DEPANNAGE_TITRE}</h2>
          </div>
          <p className="max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">
            {MISSION_CONDUCTEUR_DEPANNAGE_INTRO}
          </p>
          <StaggerList className="space-y-3">
            {MISSION_CONDUCTEUR_DEPANNAGE.map(cas => (
              <div key={cas.cause} className="rounded-xl border border-[var(--border)] bg-surface-2 p-4">
                <p className="text-sm font-medium text-[var(--text-primary)]">{cas.cause}</p>
                <p className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">{cas.quoiFaire}</p>
              </div>
            ))}
          </StaggerList>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Ban size={18} className="text-[var(--text-muted)]" />
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              {MISSION_CONDUCTEUR_HORS_PERIMETRE_TITRE}
            </h2>
          </div>
          <CheckList items={MISSION_CONDUCTEUR_HORS_PERIMETRE} variant="erreur" showLabel={false} />
        </section>

        <CalloutBlock variant="astuce" title="Du côté du destinataire">
          <p>
            La personne qui réceptionne dispose de son propre guide, sans compte ni installation.{' '}
            <Link to="/confirmation-livraison" className="text-blue-400 underline-offset-2 hover:underline">
              Voir le guide destinataire
            </Link>
            .
          </p>
        </CalloutBlock>

        <p className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <QrCode size={14} />
          Le QR présenté par le conducteur ouvre la même page de confirmation que le lien envoyé par votre opérateur.
        </p>
      </div>
    </PageTransition>
  )
}
