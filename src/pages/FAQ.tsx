import { useMemo, useState } from 'react'
import { PageTransition } from '@/components/ui/PageTransition'
import { CategoryFilter } from '@/components/ui/CategoryFilter'
import { Accordion } from '@/components/ui/Accordion'
import { FAQ_ITEMS } from '@/data/fleet'

const categories = [
  { id: 'all', label: 'Tout' },
  { id: 'operations', label: 'Opérations' },
  { id: 'finance', label: 'Finance' },
  { id: 'technique', label: 'Technique' },
  { id: 'roles', label: 'Rôles' },
] as const

export function FAQ() {
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const items = useMemo(
    () =>
      FAQ_ITEMS.filter(item => activeCategory === 'all' || item.categorie === activeCategory).map(item => ({
        id: item.id,
        question: item.question,
        reponse: item.reponse,
      })),
    [activeCategory],
  )

  return (
    <PageTransition>
      <div className="max-w-3xl space-y-8">
        <div>
          <p className="mb-1 text-xs text-[#64748B]">Aide</p>
          <h1 className="text-2xl font-bold text-[#F1F5F9]">Questions fréquentes</h1>
          <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">
            Réponses rapides aux questions les plus courantes sur les opérations, la finance, la technique et les droits d'accès.
          </p>
        </div>

        <CategoryFilter categories={categories.map(category => ({ ...category }))} active={activeCategory} onChange={setActiveCategory} />

        <Accordion items={items} />
      </div>
    </PageTransition>
  )
}
