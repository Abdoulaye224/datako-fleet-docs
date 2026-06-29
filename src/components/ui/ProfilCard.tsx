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
  vente: 'Distribution',
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
    <motion.div whileHover={{ y: -6, scale: 1.02 }} transition={TRANSITIONS.springGentle} className="h-full">
      <Link
        to={`/profils/${profil.id}`}
        onClick={() => onSelect(profil.id)}
        className={`group relative block h-full overflow-hidden rounded-2xl border bg-[var(--surface-2)] p-5 transition-colors ${
          isActive ? 'border-blue-500/40' : 'border-[var(--border)] hover:border-blue-500/25'
        }`}
      >
        <motion.div
          aria-hidden
          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at top right, ${profil.color}33 0%, transparent 55%)`,
          }}
        />

        {isActive && (
          <div className="absolute right-4 top-4 z-10 rounded-full border border-blue-500/30 bg-blue-500/10 p-1">
            <CheckCircle2 size={16} className="text-blue-400" />
          </div>
        )}

        <div className="relative z-10 flex h-full flex-col">
          <div className="mb-3 flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl" style={{ backgroundColor: `${profil.color}22` }}>
              {profil.emoji}
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold leading-tight text-[var(--text-primary)] transition-colors group-hover:text-blue-400">
                {profil.nom}
              </h3>
              <p className="mt-0.5 text-xs text-[var(--text-muted)]">{profil.sousTitre}</p>
            </div>
          </div>

          <p className="line-clamp-2 text-xs leading-relaxed text-[var(--text-secondary)]">{profil.description}</p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {profil.modules.map(module => (
              <Badge key={module} label={moduleLabels[module]} color={moduleColors[module]} />
            ))}
          </div>

          <div className="mt-auto flex items-center gap-1.5 pt-4 text-xs font-medium text-blue-400">
            Voir mon parcours
            <motion.span className="inline-flex" whileHover={{ x: 4 }} transition={TRANSITIONS.fast}>
              <ArrowRight size={16} />
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
