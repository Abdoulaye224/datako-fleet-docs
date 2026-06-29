interface StepListProps {
  steps: string[]
  startFrom?: number
}

export function StepList({ steps, startFrom = 1 }: StepListProps) {
  return (
    <ol className="space-y-3">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-3 items-start">
          <span
            className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))' }}
          >
            {startFrom + i}
          </span>
          <span className="text-sm text-[var(--text-secondary)] leading-relaxed pt-0.5">{step}</span>
        </li>
      ))}
    </ol>
  )
}
