import { PageTransition } from '@/components/ui/PageTransition'
export function Nouveautes() {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#F1F5F9]">Nouveautés</h1>
          <p className="text-[#94A3B8] mt-2 text-sm">Changelog Fleet Manager — disponible en Phase 2.</p>
        </div>
      </div>
    </PageTransition>
  )
}
