export interface ComparisonRow {
  ligne: string
  avant: string
  apres: string
}

interface ComparisonTableProps {
  titre?: string
  lignes: ComparisonRow[]
}

export function ComparisonTable({ titre, lignes }: ComparisonTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--border)]">
      {titre && (
        <p className="border-b border-[var(--border)] bg-surface px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          {titre}
        </p>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-surface text-left text-[var(--text-secondary)]">
            <tr>
              <th className="px-4 py-3 font-semibold"></th>
              <th className="px-4 py-3 font-semibold">Avant</th>
              <th className="px-4 py-3 font-semibold">Après</th>
            </tr>
          </thead>
          <tbody>
            {lignes.map((row, index) => (
              <tr key={row.ligne} className={index % 2 === 0 ? 'bg-[var(--surface-2)]' : 'bg-[var(--surface-3)]'}>
                <td className="px-4 py-3 font-medium text-[var(--text-primary)]">{row.ligne}</td>
                <td className="px-4 py-3 text-red-300">{row.avant}</td>
                <td className="px-4 py-3 text-emerald-300">{row.apres}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
