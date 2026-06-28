import { ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageTransition } from '@/components/ui/PageTransition'
import { StaggerList } from '@/components/ui/StaggerList'
import { RolePermissionGrid, ROLE_PERMISSIONS } from '@/components/ui/RolePermissionGrid'
import { ROLES } from '@/data/fleet'

export function RolesList() {
  return (
    <PageTransition>
      <div className="space-y-10">
        <div>
          <p className="mb-1 text-xs text-[#64748B]">Organisation</p>
          <h1 className="text-2xl font-bold text-[#F1F5F9]">Les rôles</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#94A3B8]">
            Comprenez qui peut faire quoi dans Fleet Manager : accès, limites et exemples concrets par profil métier.
          </p>
        </div>

        <StaggerList className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {ROLES.map(role => (
            <Link
              key={role.id}
              to={`/roles/${role.id}`}
              className="group rounded-2xl border border-white/10 bg-surface-2 p-5 transition-colors hover:border-blue-500/25 hover:bg-surface-3"
            >
              <div className="mb-4 flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-2xl">
                  {role.emoji}
                </div>
                <div>
                  <h2 className="text-base font-semibold text-[#F1F5F9] transition-colors group-hover:text-blue-400">{role.nom}</h2>
                  <p className="mt-1 text-sm text-[#94A3B8]">{role.mission}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#64748B]">
                <ShieldCheck size={16} className="text-emerald-400" />
                {role.peutFaire.length} actions autorisées
              </div>
            </Link>
          ))}
        </StaggerList>

        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-[#F1F5F9]">Tableau comparatif des permissions</h2>
            <p className="mt-1 text-sm text-[#94A3B8]">Vue rapide des droits principaux par rôle Fleet Manager.</p>
          </div>
          <RolePermissionGrid permissions={ROLE_PERMISSIONS} />
        </section>
      </div>
    </PageTransition>
  )
}
