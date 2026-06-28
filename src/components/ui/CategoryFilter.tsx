import { motion } from 'framer-motion'
import { TRANSITIONS } from '@/lib/motion'

interface CategoryFilterProps {
  categories: Array<{ id: string; label: string }>
  active: string
  onChange: (id: string) => void
}

export function CategoryFilter({ categories, active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map(category => {
        const isActive = active === category.id
        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onChange(category.id)}
            className={`relative overflow-hidden rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? 'text-white'
                : 'bg-surface-3 text-[#64748B] hover:bg-surface-3/80 hover:text-[#F1F5F9]'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="category-filter-pill"
                className="absolute inset-0 rounded-full bg-datako-blue"
                transition={TRANSITIONS.springGentle}
              />
            )}
            <span className="relative z-10">{category.label}</span>
          </button>
        )
      })}
    </div>
  )
}
