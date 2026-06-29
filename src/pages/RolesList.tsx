import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { RolePermissionGrid, ROLE_PERMISSIONS } from '@/components/ui/RolePermissionGrid'
import { PageTransition } from '@/components/ui/PageTransition'
import { StaggerList } from '@/components/ui/StaggerList'
import { ROLES } from '@/data/fleet'
import { TRANSITIONS } from '@/lib/motion'

const roleColors: Record<string, string> = {
  org_admin: '#3B82F6',
  operator: '#10B981',
  finance: '#F59E0B',
  viewer: '#94A3B8',
  owner: '#A78BFA',
}

export function RolesList() {
  return (
    <PageTransition>
      <div className="space-y-10">
        <div>
          <p className="mb-1 text-xs text-[var(--text-muted)]">Organisation</p>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Les rôles</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">
            Comprenez qui peut faire quoi dans Fleet Manager : accès, limites et exemples concrets par profil métier.
          </p>
        </div>

        <StaggerList className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {ROLES.map(role => (
            <motion.div key={role.id} whileHover={{ y: -2, transition: TRANSITIONS.spring }}>
              <Link
                to={`/roles/${role.id}`}
                className="group block h-full rounded-2xl border border-[var(--border)] bg-surface-2 p-5 shadow-sm transition-all hover:border-blue-500/30 hover:shadow-md"
                style={{ borderLeftWidth: '4px', borderLeftColor: roleColors[role.id] }}
              >
                <div className="mb-4 flex items-start gap-3">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl"
                    style={{ backgroundColor: `${roleColors[role.id]}22`, color: roleColors[role.id] }}
                  >
                    {role.emoji}
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-base font-semibold text-[var(--text-primary)] transition-colors group-hover:text-blue-400">
                      {role.nom}
                    </h2>
                    <p className="mt-1 text-sm text-[var(--text-secondary)]">{role.mission}</p>
                    <p className="mt-2 text-xs text-[var(--text-muted)]">{role.utilisateurs}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {role.peutFaire.slice(0, 2).map(action => (
                    <span key={action} className="rounded-full border border-[var(--border)] bg-surface-3 px-2 py-1 text-xs text-[var(--text-secondary)]">
                      {action}
                    </span>
                  ))}
                </div>

                <p className="mt-4 text-sm font-medium text-blue-400">Voir le détail →</p>
              </Link>
            </motion.div>
          ))}
        </StaggerList>

        <section className="space-y-4 border-t border-[var(--border)] pt-8">
          <div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Tableau comparatif des permissions</h2>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Vue rapide des droits principaux par rôle Fleet Manager pour repérer immédiatement qui peut créer, exporter ou consulter.
            </p>
          </div>
          <RolePermissionGrid permissions={ROLE_PERMISSIONS} />
        </section>
      </div>
    </PageTransition>
  )
}
