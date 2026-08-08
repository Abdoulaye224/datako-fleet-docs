import { motion } from 'framer-motion'
import { PageTransition } from '@/components/ui/PageTransition'
import { StaggerList } from '@/components/ui/StaggerList'
import { CalloutBlock } from '@/components/ui/CalloutBlock'
import { GUIDE_CONFIRMATION_DESTINATAIRE as GUIDE } from '@/data/fleet/transport/confirmationDestinataire'
import { TRANSITIONS } from '@/lib/motion'

export function ConfirmationLivraison() {
  return (
    <PageTransition>
      <div className="max-w-3xl space-y-8">
        <div>
          <p className="mb-1 text-xs text-[var(--text-muted)]">Destinataire d'une livraison</p>
          <h1
            className="text-2xl font-bold"
            style={{
              background: 'linear-gradient(135deg, var(--text-primary) 60%, var(--text-secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {GUIDE.titre}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{GUIDE.accroche}</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Pourquoi ce message ?</h2>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{GUIDE.pourquoiCeMessage}</p>
        </section>

        <CalloutBlock variant="astuce" title="Ce qu'on vous demande">
          {GUIDE.cequonVousDemande}
        </CalloutBlock>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Comment faire, étape par étape</h2>
          <StaggerList className="space-y-3">
            {GUIDE.etapes.map((etape, index) => (
              <motion.div
                key={etape.titre}
                whileHover={{ x: 4 }}
                transition={TRANSITIONS.fast}
                className="flex gap-4 rounded-xl border border-[var(--border)] bg-surface-2 p-4"
              >
                <span
                  className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))' }}
                >
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <p className="font-medium text-[var(--text-primary)]">{etape.titre}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">{etape.description}</p>
                </div>
              </motion.div>
            ))}
          </StaggerList>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">À retenir</h2>
          <ul className="space-y-2">
            {GUIDE.aRetenir.map(point => (
              <li key={point} className="flex gap-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--info)]" />
                {point}
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Questions fréquentes</h2>
          <StaggerList className="space-y-3">
            {GUIDE.questions.map(item => (
              <div key={item.question} className="rounded-xl border border-[var(--border)] bg-surface-2 p-4">
                <p className="font-medium text-[var(--text-primary)]">{item.question}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">{item.reponse}</p>
              </div>
            ))}
          </StaggerList>
        </section>
      </div>
    </PageTransition>
  )
}
