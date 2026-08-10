import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, BarChart3, Check, ClipboardList, Combine, HelpCircle, Layout, Package, Rocket, Sparkles, Truck, User, type LucideIcon } from 'lucide-react'
import { TRANSITIONS } from '@/lib/motion'
import type { AccueilAccent } from '@/data/fleet/accueil'
import illustrationTransport from '@/assets/illustrations/carte-transport.webp'
import illustrationMarketeur from '@/assets/illustrations/carte-marketeur.webp'
import illustrationMixte from '@/assets/illustrations/carte-transport-marketeur.webp'

const ILLUSTRATIONS: Record<AccueilAccent, string> = {
  transport: illustrationTransport,
  marketeur: illustrationMarketeur,
  mixte: illustrationMixte,
}

export const ACCUEIL_ICONS: Record<string, LucideIcon> = {
  truck: Truck,
  package: Package,
  combine: Combine,
  rocket: Rocket,
  user: User,
  help: HelpCircle,
  sparkles: Sparkles,
  clipboard: ClipboardList,
  chart: BarChart3,
  layout: Layout,
}

const FADE_MASK = 'linear-gradient(to bottom, #000 45%, rgba(0,0,0,0.45) 78%, transparent 100%)'

const ACCENTS: Record<AccueilAccent, { text: string; border: string; button: string; glow: string; wash: string }> = {
  transport: {
    text: 'text-[var(--accent-blue-icon)]',
    border: 'hover:border-blue-500/40',
    button: 'bg-[var(--accent-blue-bg)] text-[var(--accent-blue-fg)] group-hover:bg-blue-500/25',
    glow: 'linear-gradient(135deg, rgba(59,130,246,0.10), rgba(59,130,246,0))',
    wash: 'linear-gradient(to bottom, rgba(59,130,246,0.16), rgba(59,130,246,0.04))',
  },
  marketeur: {
    text: 'text-[var(--accent-emerald-icon)]',
    border: 'hover:border-emerald-500/40',
    button: 'bg-[var(--accent-emerald-bg)] text-[var(--accent-emerald-fg)] group-hover:bg-emerald-500/25',
    glow: 'linear-gradient(135deg, rgba(16,185,129,0.10), rgba(16,185,129,0))',
    wash: 'linear-gradient(to bottom, rgba(16,185,129,0.16), rgba(16,185,129,0.04))',
  },
  mixte: {
    text: 'text-[var(--accent-amber-icon)]',
    border: 'hover:border-amber-500/40',
    button: 'bg-[var(--accent-amber-bg)] text-[var(--accent-amber-fg)] group-hover:bg-amber-500/25',
    glow: 'linear-gradient(135deg, rgba(245,158,11,0.10), rgba(245,158,11,0))',
    wash: 'linear-gradient(to bottom, rgba(245,158,11,0.16), rgba(245,158,11,0.04))',
  },
}

interface MetierCardProps {
  titre: string
  description: string
  points: string[]
  cta: string
  href: string
  icon: string
  accent: AccueilAccent
}

export function MetierCard({ titre, description, points, cta, href, icon, accent }: MetierCardProps) {
  const Icon = ACCUEIL_ICONS[icon] ?? Truck
  const style = ACCENTS[accent]

  return (
    <motion.div whileHover={{ y: -6, transition: TRANSITIONS.spring }} whileTap={{ scale: 0.99 }} className="h-full">
      <Link
        to={href}
        className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-surface-2 p-6 transition-colors ${style.border}`}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: style.glow }}
        />
        <div className="relative -mx-6 -mt-6 mb-5 overflow-hidden border-b border-[var(--border)]">
          <motion.img
            src={ILLUSTRATIONS[accent]}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            width={900}
            height={297}
            className="h-32 w-full object-cover object-center opacity-90 saturate-[0.9] transition-opacity duration-300 group-hover:opacity-100"
            style={{ maskImage: FADE_MASK, WebkitMaskImage: FADE_MASK }}
            whileHover={{ scale: 1.03 }}
            transition={TRANSITIONS.spring}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: style.wash, maskImage: FADE_MASK, WebkitMaskImage: FADE_MASK }}
          />
          <motion.div
            className="absolute bottom-3 left-6 flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border)] shadow-lg shadow-black/30"
            style={{ backgroundColor: 'var(--surface-2)' }}
            whileHover={{ scale: 1.08, rotate: 3 }}
            transition={TRANSITIONS.spring}
          >
            <Icon size={20} className={style.text} />
          </motion.div>
        </div>

        <h3 className="relative z-10 text-lg font-semibold text-[var(--text-primary)]">{titre}</h3>
        <p className="relative z-10 mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{description}</p>

        <ul className="relative z-10 mt-5 space-y-2">
          {points.map(point => (
            <li key={point} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
              <Check size={14} className={`mt-0.5 flex-shrink-0 ${style.text}`} />
              {point}
            </li>
          ))}
        </ul>

        <span
          className={`relative z-10 mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${style.button}`}
        >
          {cta}
          <motion.span className="inline-flex" whileHover={{ x: 3 }} transition={TRANSITIONS.fast}>
            <ArrowRight size={15} />
          </motion.span>
        </span>
      </Link>
    </motion.div>
  )
}
