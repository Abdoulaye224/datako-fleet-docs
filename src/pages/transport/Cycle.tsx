import { PageTransition } from '@/components/ui/PageTransition'
import { Timeline } from '@/components/ui/Timeline'
import { cycleEtapes } from '@/data/fleet/transport/cycle'
import { CalloutBlock } from '@/components/ui/CalloutBlock'

export function Cycle() {
  return (
    <PageTransition>
      <div className="space-y-8 max-w-3xl">
        <div>
          <p className="text-xs text-[#64748B] mb-1">Transport</p>
          <h1 className="text-2xl font-bold" style={{
            background: 'linear-gradient(135deg, #F1F5F9 60%, #94A3B8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Cycle d'une rotation
          </h1>
          <p className="text-[#94A3B8] mt-2 text-sm leading-relaxed">
            De la création à l'impact sur les tableaux de bord — les 6 étapes du cycle complet d'une livraison.
          </p>
        </div>

        <CalloutBlock variant="astuce" title="Pourquoi ce cycle est important">
          Une livraison non validée n'impacte pas vos indicateurs financiers. Comprendre les étapes vous aide à savoir exactement où chaque donnée entre dans les calculs.
        </CalloutBlock>

        <Timeline steps={cycleEtapes} />

        <CalloutBlock variant="attention" title="Point critique">
          Seules les livraisons au statut "Livré" sont intégrées dans les KPIs (Dashboard, Gains, Profit par camion). Les livraisons "En cours" sont visibles mais ne comptent pas encore.
        </CalloutBlock>
      </div>
    </PageTransition>
  )
}
