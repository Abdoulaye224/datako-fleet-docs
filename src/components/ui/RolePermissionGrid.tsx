import type { ReactNode } from 'react'

export interface Permission {
  action: string
  admin: boolean
  operator: boolean
  finance: boolean
  viewer: boolean
  owner: boolean
}

interface RolePermissionGridProps {
  permissions: Permission[]
}

export const ROLE_PERMISSIONS: Permission[] = [
  { action: 'Créer des rotations', admin: true, operator: true, finance: false, viewer: false, owner: false },
  { action: 'Valider des livraisons', admin: true, operator: true, finance: false, viewer: false, owner: false },
  { action: 'Confirmer des paiements', admin: true, operator: true, finance: true, viewer: false, owner: false },
  { action: 'Supprimer des données', admin: true, operator: false, finance: false, viewer: false, owner: false },
  { action: 'Gérer les membres', admin: true, operator: false, finance: false, viewer: false, owner: false },
  { action: 'Configurer les paramètres', admin: true, operator: false, finance: false, viewer: false, owner: false },
  { action: 'Exporter PDF / Excel', admin: true, operator: true, finance: true, viewer: false, owner: false },
  { action: 'Voir les tableaux de bord', admin: true, operator: true, finance: true, viewer: true, owner: false },
  { action: 'Consulter ses propres camions', admin: false, operator: false, finance: false, viewer: false, owner: true },
  { action: 'Télécharger son bilan PDF', admin: false, operator: false, finance: false, viewer: false, owner: true },
]

function renderPermission(value: boolean): ReactNode {
  return value ? <span className="text-emerald-400">✅</span> : <span className="text-[var(--text-muted)]">—</span>
}

export function RolePermissionGrid({ permissions }: RolePermissionGridProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
      <table className="min-w-full text-sm">
        <thead className="bg-surface text-left text-[var(--text-secondary)]">
          <tr>
            <th className="px-4 py-3 font-semibold">Action</th>
            <th className="px-4 py-3 font-semibold">Admin 🏢</th>
            <th className="px-4 py-3 font-semibold">Opérateur 🚛</th>
            <th className="px-4 py-3 font-semibold">Finance 📊</th>
            <th className="px-4 py-3 font-semibold">Observateur 👁</th>
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
