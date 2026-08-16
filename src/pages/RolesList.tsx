import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { RolePermissionGrid } from '@/components/ui/RolePermissionGrid'
import { RoleRecapTable } from '@/components/ui/RoleRecapTable'
import { CalloutBlock } from '@/components/ui/CalloutBlock'
import { PageTransition } from '@/components/ui/PageTransition'
import { StaggerList } from '@/components/ui/StaggerList'
import {
  ACTIONS_RESERVEES,
  ACTIONS_RESERVEES_ACCROCHE,
  ACTIONS_RESERVEES_TITRE,
  MATRICE_ACCROCHE,
  MATRICE_PERMISSIONS,
  MATRICE_TITRE,
  ROLES,
  ROLES_CONSEIL,
  ROLES_INTRO,
  ROLES_RECAP,
  ROLES_RECAP_ACCROCHE,
  ROLES_RECAP_TITRE,
} from '@/data/fleet'
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
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">{ROLES_INTRO}</p>
        </div>

        <CalloutBlock variant="astuce" title="Quel rôle attribuer">
          {ROLES_CONSEIL}
        </CalloutBlock>

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
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl text-2xl"
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

                <p className="text-xs leading-relaxed text-[var(--text-secondary)]">{role.aQuiLAttribuer}</p>

                <p className="mt-4 text-sm font-medium text-blue-400">Voir le détail →</p>
              </Link>
            </motion.div>
          ))}
        </StaggerList>

        <section className="space-y-4 border-t border-[var(--border)] pt-8">
          <div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">{ROLES_RECAP_TITRE}</h2>
            <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">{ROLES_RECAP_ACCROCHE}</p>
          </div>
          <RoleRecapTable lignes={ROLES_RECAP} />
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">{MATRICE_TITRE}</h2>
            <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">{MATRICE_ACCROCHE}</p>
          </div>
          <RolePermissionGrid permissions={MATRICE_PERMISSIONS} />
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">{ACTIONS_RESERVEES_TITRE}</h2>
            <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">{ACTIONS_RESERVEES_ACCROCHE}</p>
          </div>
          <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
            <table className="min-w-full text-sm">
              <thead className="bg-surface text-left text-[var(--text-secondary)]">
                <tr>
                  <th className="px-4 py-3 font-semibold">Action</th>
                  <th className="px-4 py-3 font-semibold">Rôles autorisés</th>
                  <th className="px-4 py-3 font-semibold">Où</th>
                </tr>
              </thead>
              <tbody>
                {ACTIONS_RESERVEES.map((action, index) => (
                  <tr
                    key={action.action}
                    className={index % 2 === 0 ? 'bg-[var(--surface-2)]' : 'bg-[var(--surface-3)]'}
                  >
                    <td className="px-4 py-3 font-medium text-[var(--text-primary)]">{action.action}</td>
                    <td className="px-4 py-3 text-[var(--text-secondary)]">{action.roles}</td>
                    <td className="px-4 py-3 text-[var(--text-muted)]">{action.ou}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
