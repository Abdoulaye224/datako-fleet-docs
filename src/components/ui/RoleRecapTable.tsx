import { Link } from 'react-router-dom'
import type { RoleRecapLigne } from '@/data/fleet/roles'

interface RoleRecapTableProps {
  lignes: RoleRecapLigne[]
}

export function RoleRecapTable({ lignes }: RoleRecapTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
      <table className="min-w-full text-sm">
        <thead className="bg-surface text-left text-[var(--text-secondary)]">
          <tr>
            <th className="px-4 py-3 font-semibold">Rôle</th>
            <th className="px-4 py-3 font-semibold">Peut consulter</th>
            <th className="px-4 py-3 font-semibold">Peut gérer</th>
            <th className="px-4 py-3 font-semibold">Restrictions principales</th>
          </tr>
        </thead>
        <tbody>
          {lignes.map((ligne, index) => (
            <tr key={ligne.roleId} className={index % 2 === 0 ? 'bg-[var(--surface-2)]' : 'bg-[var(--surface-3)]'}>
              <td className="whitespace-nowrap px-4 py-3 align-top">
                <Link
                  to={`/roles/${ligne.roleId}`}
                  className="font-medium text-[var(--text-primary)] hover:text-blue-400 hover:underline"
                >
                  <span className="mr-1.5">{ligne.emoji}</span>
                  {ligne.role}
                </Link>
              </td>
              <td className="px-4 py-3 align-top leading-relaxed text-[var(--text-secondary)]">{ligne.consulter}</td>
              <td className="px-4 py-3 align-top leading-relaxed text-[var(--text-secondary)]">{ligne.gerer}</td>
              <td className="px-4 py-3 align-top leading-relaxed text-[var(--text-secondary)]">{ligne.restrictions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
