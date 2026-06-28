import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { TRANSITIONS } from '@/lib/motion'

export interface AccordionItem {
  id: string
  question: string
  reponse: string
}

interface AccordionProps {
  items: AccordionItem[]
}

export function Accordion({ items }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null)

  return (
    <div className="space-y-3">
      {items.map(item => {
        const isOpen = openId === item.id
        return (
          <div
            key={item.id}
            className={`overflow-hidden rounded-xl border transition-colors ${
              isOpen ? 'border-blue-500/30 bg-surface-2' : 'border-white/10 bg-surface-2'
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex w-full items-center justify-between gap-3 p-4 text-left"
              aria-expanded={isOpen}
            >
              <span className={`text-sm font-medium ${isOpen ? 'text-blue-400' : 'text-[#F1F5F9]'}`}>
                {item.question}
              </span>
              <ChevronDown
                size={16}
                className={`flex-shrink-0 text-[#64748B] transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={TRANSITIONS.default}
                  className="overflow-hidden"
                >
                  <div className="border-t border-white/10 px-4 pb-4 pt-3 text-sm leading-relaxed text-[#94A3B8]">
                    {item.reponse}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
