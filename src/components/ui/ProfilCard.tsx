import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Profil } from '@/data/fleet/profils'
import { Badge } from '@/components/ui/Badge'
import { TRANSITIONS } from '@/lib/motion'

interface ProfilCardProps {
  profil: Profil
  onSelect: (id: string) => void
  isActive?: boolean
}

const moduleLabels: Record<Profil['modules'][number], string> = {
  transport: 'Transport',
  vente: 'Marketeur',
  proprietaire: 'Propriétaire',
  backoffice: 'Backoffice',
}

const moduleColors: Record<Profil['modules'][number], 'blue' | 'emerald' | 'amber' | 'purple'> = {
  transport: 'blue',
  vente: 'emerald',
  proprietaire: 'amber',
  backoffice: 'purple',
}

export function ProfilCard({ profil, onSelect, isActive = false }: ProfilCardProps) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={TRANSITIONS.springGentle} className="h-full">
      <Link
        to={`/profils/${profil.id}`}
        onClick={() => onSelect(profil.id)}
        className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-[var(--surface-2)] p-5 transition-colors ${
          isActive ? 'border-blue-500/40' : 'border-[var(--border)] hover:border-blue-500/25'
        }`}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: `radial-gradient(circle at top right, ${profil.color}26 0%, transparent 60%)` }}
        />

        {isActive && (
          <div className="absolute right-4 top-4 z-10 rounded-full border border-blue-500/30 bg-blue-500/10 p-1">
            <CheckCircle2 size={14} className="text-blue-400" />
          </div>
        )}

        <div
          className="relative z-10 mb-3 flex h-11 w-11 items-center justify-center rounded-2xl text-xl"
          style={{ backgroundColor: `${profil.color}22` }}
        >
          {profil.emoji}
        </div>

        <h3 className="relative z-10 text-sm font-semibold leading-tight text-[var(--text-primary)] transition-colors group-hover:text-blue-400">
          {profil.nom}
        </h3>
        <p className="relative z-10 mt-1.5 text-xs leading-relaxed text-[var(--text-secondary)]">{profil.phrase}</p>

        <div className="relative z-10 mt-auto flex items-center justify-between gap-3 pt-4">
          <div className="flex flex-wrap gap-1.5">
            {profil.modules.map(module => (
              <Badge key={module} label={moduleLabels[module]} color={moduleColors[module]} />
            ))}
          </div>
          <motion.span
            className="inline-flex flex-shrink-0 text-[var(--text-muted)] transition-colors group-hover:text-blue-400"
            whileHover={{ x: 3 }}
            transition={TRANSITIONS.fast}
          >
            <ArrowRight size={16} />
          </motion.span>
        </div>
      </Link>
    </motion.div>
  )
}
