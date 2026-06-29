import { motion } from 'framer-motion'
import { TRANSITIONS } from '@/lib/motion'
import type { CycleEtape } from '@/data/fleet/transport/cycle'

interface TimelineProps {
  steps: CycleEtape[]
  activeStep?: number
}

export function Timeline({ steps, activeStep }: TimelineProps) {
  return (
    <div className="relative">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1
        const isDone = activeStep !== undefined ? step.numero <= activeStep : true
        return (
          <motion.div
            key={step.numero}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ ...TRANSITIONS.default, delay: i * 0.1 }}
            className="flex gap-4"
          >
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 z-10
                  ${isDone
                    ? 'text-white'
                    : 'border-2 border-[var(--border)] text-[var(--text-muted)]'
                  }`}
                style={isDone ? { background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))' } : {}}
              >
                {step.numero}
              </div>
              {!isLast && (
                <div className="w-0.5 h-full min-h-[40px] bg-[var(--border)] mt-1 mb-1" />
              )}
            </div>
            <div className="pb-8 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-[var(--text-primary)]">{step.titre}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-surface-3 text-[var(--text-muted)] border border-[var(--border)]">
                  {step.statut}
                </span>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{step.description}</p>
              <p className="text-xs text-[var(--text-muted)] mt-1">→ {step.action}</p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
