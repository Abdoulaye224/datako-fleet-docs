import { Link } from 'react-router-dom'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Fil d'Ariane" className="mb-6 hidden flex-wrap items-center gap-1.5 text-xs text-[var(--text-muted)] lg:flex">
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <span key={`${item.label}-${index}`} className="inline-flex items-center gap-1.5">
            {item.href && !isLast ? (
              <Link to={item.href} className="transition-colors hover:text-[var(--text-secondary)]">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'text-[var(--text-secondary)]' : undefined}>{item.label}</span>
            )}
            {!isLast && <span aria-hidden>›</span>}
          </span>
        )
      })}
    </nav>
  )
}
