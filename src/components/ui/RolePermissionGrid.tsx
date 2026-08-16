import type { ReactNode } from 'react'
import type { PermissionLigne } from '@/data/fleet/roles'

interface RolePermissionGridProps {
  permissions: PermissionLigne[]
}

function renderPermission(value: boolean): ReactNode {
  return value ? (
    <span className="text-[var(--accent-emerald-icon)]" title="Autorisé">
      ✅
    </span>
  ) : (
    <span className="text-[var(--text-muted)]" title="Non autorisé">
      —
    </span>
  )
}

export function RolePermissionGrid({ permissions }: RolePermissionGridProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
      <table className="min-w-full text-sm">
        <thead className="bg-surface text-left text-[var(--text-secondary)]">
          <tr>
            <th className="px-4 py-3 font-semibold">Action</th>
            <th className="px-4 py-3 font-semibold">Administrateur 🏢</th>
            <th className="px-4 py-3 font-semibold">Opérateur 🚛</th>
            <th className="px-4 py-3 font-semibold">Finance 📊</th>
            <th className="px-4 py-3 font-semibold">Lecteur 👁</th>
            <th className="px-4 py-3 font-semibold">Propriétaire 🔑</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission, index) => (
            <tr key={permission.action} className={index % 2 === 0 ? 'bg-[var(--surface-2)]' : 'bg-[var(--surface-3)]'}>
              <td className="px-4 py-3 font-medium text-[var(--text-primary)]">{permission.action}</td>
              <td className="px-4 py-3">{renderPermission(permission.admin)}</td>
              <td className="px-4 py-3">{renderPermission(permission.operator)}</td>
              <td className="px-4 py-3">{renderPermission(permission.finance)}</td>
              <td className="px-4 py-3">{renderPermission(permission.viewer)}</td>
              <td className="px-4 py-3">{renderPermission(permission.owner)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
