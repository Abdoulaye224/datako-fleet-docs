import { PageTransition } from '@/components/ui/PageTransition'
export function RolesList() {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#F1F5F9]">Les rôles</h1>
          <p className="text-[#94A3B8] mt-2 text-sm">Documentation des rôles — disponible en Phase 2.</p>
        </div>
      </div>
    </PageTransition>
  )
}
