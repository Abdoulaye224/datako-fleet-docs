interface FormulaBlockProps {
  formule: string
  exemple?: string
}

export function FormulaBlock({ formule, exemple }: FormulaBlockProps) {
  return (
    <div className="rounded-lg border border-white/10 bg-surface-3 p-4 font-mono text-sm">
      <p className="text-[color:var(--text-primary)]">{formule}</p>
      {exemple && <p className="mt-2 text-[color:var(--text-muted)] italic">{exemple}</p>}
    </div>
  )
}
