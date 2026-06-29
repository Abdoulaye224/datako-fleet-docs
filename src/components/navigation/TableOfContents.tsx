import { useEffect, useState } from 'react'

export interface TOCItem {
  id: string
  label: string
  level?: 1 | 2
}

interface TableOfContentsProps {
  items: TOCItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState(items[0]?.id)

  useEffect(() => {
    const elements = items
      .map(item => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element))

    if (!elements.length) return

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible[0]?.target.id) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.25, 1] },
    )

    elements.forEach(element => observer.observe(element))
    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <aside className="fixed right-8 top-24 hidden w-48 xl:block" aria-label="Table des matières">
      <div className="rounded-2xl border border-[var(--border)] bg-surface-2 p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">Sur cette page</p>
        <nav className="space-y-2">
          {items.map(item => {
            const isActive = item.id === activeId
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className={`block w-full text-left text-sm transition-colors ${
                  isActive ? 'text-[var(--datako-blue)]' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                } ${item.level === 2 ? 'pl-3' : ''}`}
              >
                {item.label}
              </button>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
