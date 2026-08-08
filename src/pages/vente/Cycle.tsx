import { PageTransition } from '@/components/ui/PageTransition'
import { Timeline } from '@/components/ui/Timeline'
import { cycleEtapes } from '@/data/fleet/vente/cycle'
import { CalloutBlock } from '@/components/ui/CalloutBlock'

export function VenteCycle() {
  return (
    <PageTransition>
      <div className="space-y-8 max-w-3xl">
        <div>
          <p className="text-xs text-[var(--text-muted)] mb-1">Marketeur</p>
          <h1 className="text-2xl font-bold" style={{
            background: 'linear-gradient(135deg, var(--text-primary) 60%, var(--text-secondary))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Le cycle Marketeur
          </h1>
          <p className="text-[var(--text-secondary)] mt-2 text-sm leading-relaxed">
            De l'achat à la SONAP jusqu'au pilotage de votre résultat — les {cycleEtapes.length} étapes que suit chaque litre de carburant.
          </p>
        </div>

        <CalloutBlock variant="astuce" title="Commencez par là">
          Chaque page du module se rattache à une étape de ce cycle. Si vous ne savez pas où trouver une information, demandez-vous d'abord à quelle étape elle appartient : l'achat, le stock, la vente, la facturation, l'encaissement ou le reversement.
        </CalloutBlock>

        <Timeline steps={cycleEtapes} />

        <CalloutBlock variant="attention" title="Le prix ne se négocie pas">
          Contrairement à une activité commerciale classique, votre prix de vente découle de la structure des prix officielle applicable au produit, au régime et à la date. Vos vrais leviers de marge sont le transport négocié, vos charges et les ristournes que vous accordez.
        </CalloutBlock>
      </div>
    </PageTransition>
  )
}
