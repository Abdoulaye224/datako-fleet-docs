import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Circle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { TRANSITIONS } from '@/lib/motion'

interface OnboardingStep {
  titre: string
  description: string
  href: string
}

interface OnboardingChecklistProps {
  roleId: string
  steps: OnboardingStep[]
}

function readChecked(key: string) {
  if (typeof window === 'undefined') return new Set<number>()
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return new Set<number>()
    const parsed = JSON.parse(raw) as number[]
    return new Set<number>(parsed)
  } catch {
    return new Set<number>()
  }
}

export function OnboardingChecklist({ roleId, steps }: OnboardingChecklistProps) {
  const storageKey = `hc-onboarding-${roleId}`
  const [checked, setChecked] = useState<Set<number>>(() => readChecked(storageKey))

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify([...checked]))
  }, [checked, storageKey])

  const completed = checked.size
  const hasChecked = completed > 0
  const progressLabel = useMemo(() => `${completed} / ${steps.length} étapes complétées`, [completed, steps.length])

  const toggleStep = (index: number) => {
    setChecked(prev => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-surface-2 p-4">
        <div>
          <p className="text-sm font-semibold text-[#F1F5F9]">Progression</p>
          <p className="text-sm text-[#94A3B8]">{progressLabel}</p>
        </div>
        {hasChecked && (
          <button
            type="button"
            onClick={() => setChecked(new Set<number>())}
            className="text-sm text-[#64748B] transition-colors hover:text-[#F1F5F9]"
          >
            Tout réinitialiser
          </button>
        )}
      </div>

      <div className="space-y-3">
        {steps.map((step, index) => {
          const isChecked = checked.has(index)
          return (
            <div
              key={`${step.href}-${index}`}
              role="button"
              tabIndex={0}
              onClick={() => toggleStep(index)}
              onKeyDown={event => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  toggleStep(index)
                }
              }}
              className={`rounded-xl border p-4 transition-colors ${
                isChecked ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-white/10 bg-surface-2 hover:border-blue-500/20'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center">
                  <AnimatePresence mode="wait" initial={false}>
                    {isChecked ? (
                      <motion.span
                        key="checked"
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }}
                        transition={TRANSITIONS.springGentle}
                      >
                        <CheckCircle2 size={20} className="text-emerald-400" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="unchecked"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={TRANSITIONS.fast}
                      >
                        <Circle size={20} className="text-[#64748B]" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className={`text-sm font-medium ${isChecked ? 'text-emerald-300' : 'text-[#F1F5F9]'}`}>
                        {step.titre}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-[#94A3B8]">{step.description}</p>
                    </div>
                    <Link
                      to={step.href}
                      onClick={event => event.stopPropagation()}
                      className="text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
                    >
                      Ouvrir →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
