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
                    : 'border-2 border-[rgba(255,255,255,0.08)] text-[#64748B]'
                  }`}
                style={isDone ? { background: 'linear-gradient(135deg, #2563EB, #7C3AED)' } : {}}
              >
                {step.numero}
              </div>
              {!isLast && (
                <div className="w-0.5 h-full min-h-[40px] bg-[rgba(255,255,255,0.08)] mt-1 mb-1" />
              )}
            </div>
            <div className="pb-8 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-[#F1F5F9]">{step.titre}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#1F2537] text-[#64748B] border border-[rgba(255,255,255,0.08)]">
                  {step.statut}
                </span>
              </div>
              <p className="text-sm text-[#94A3B8] leading-relaxed">{step.description}</p>
              <p className="text-xs text-[#64748B] mt-1">→ {step.action}</p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
