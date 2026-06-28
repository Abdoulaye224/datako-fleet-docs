import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { PageTransition } from '@/components/ui/PageTransition'
import { Badge } from '@/components/ui/Badge'
import { CalloutBlock } from '@/components/ui/CalloutBlock'
import { PROFILS, type Profil } from '@/data/fleet'
import { useProfil } from '@/context/ProfilContext'

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

const priorityColors: Record<Profil['parcoursRecommande'][number]['priorite'], 'red' | 'amber' | 'blue'> = {
  critique: 'red',
  importante: 'amber',
  utile: 'blue',
}

const priorityLabels: Record<Profil['parcoursRecommande'][number]['priorite'], string> = {
  critique: 'Critique',
  importante: 'Importante',
  utile: 'Utile',
}

export function ProfilDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { setProfilActif } = useProfil()
  const profil = PROFILS.find(item => item.id === id)

  if (!profil) return <Navigate to="/profils" replace />

  const choisirProfil = () => {
    setProfilActif(profil.id)
    navigate(profil.parcoursRecommande[0]?.href ?? '/profils')
  }

  return (
    <PageTransition>
      <div className="space-y-10">
        <div className="flex items-center gap-2 text-xs text-[#64748B]">
          <Link to="/profils" className="flex items-center gap-1 transition-colors hover:text-[#94A3B8]">
            <ArrowLeft size={12} />
            Profils
          </Link>
          <span>›</span>
          <span className="text-[#94A3B8]">{profil.nom}</span>
        </div>

        <section className="rounded-3xl border border-white/10 bg-surface-2 p-6">
          <div className="flex flex-wrap items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl text-3xl" style={{ backgroundColor: `${profil.color}22` }}>
              {profil.emoji}
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-[#F1F5F9]">{profil.nom}</h1>
              <p className="mt-1 text-sm text-[#94A3B8]">{profil.sousTitre}</p>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#94A3B8]">{profil.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {profil.modules.map(module => (
                  <Badge key={module} label={moduleLabels[module]} color={moduleColors[module]} />
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={choisirProfil}
              className="rounded-xl bg-datako-blue px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500"
            >
              Choisir ce profil
            </button>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-[#F1F5F9]">Parcours recommandé</h2>
          <div className="space-y-3">
            {profil.parcoursRecommande.map(article => (
              <Link
                key={`${article.href}-${article.label}`}
                to={article.href}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-surface-2 p-4 transition-colors hover:border-blue-500/25 hover:bg-surface-3"
              >
                <span className="text-sm font-medium text-[#F1F5F9]">{article.label}</span>
                <Badge label={priorityLabels[article.priorite]} color={priorityColors[article.priorite]} />
              </Link>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-[#F1F5F9]">Actions typiques</h2>
          <div className="space-y-3">
            {profil.actionsTupiques.map(action => (
              <Link
                key={`${action.titre}-${action.guide}`}
                to={action.guide}
                className="block rounded-2xl border border-white/10 bg-surface-2 p-4 transition-colors hover:border-blue-500/25 hover:bg-surface-3"
              >
                <p className="text-sm font-medium text-[#F1F5F9]">{action.titre}</p>
                <p className="mt-1 text-sm text-blue-400">Ouvrir le guide →</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-[#F1F5F9]">Erreurs fréquentes</h2>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {profil.erreursFréquentes.map((erreur, index) => (
              <div key={`${erreur.situation}-${index}`} className="rounded-2xl border border-white/10 bg-surface-2 p-5">
                <p className="text-sm font-semibold text-[#F1F5F9]">{erreur.situation}</p>
                <p className="mt-2 text-sm text-amber-300">Conséquence : {erreur.consequence}</p>
                <p className="mt-3 text-sm leading-relaxed text-[#94A3B8]">Solution : {erreur.solution}</p>
                {erreur.articleLie && (
                  <Link to={erreur.articleLie} className="mt-4 inline-flex text-sm font-medium text-blue-400 hover:text-blue-300">
                    Voir l'article lié →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-[#F1F5F9]">Indicateurs clés</h2>
          <div className="space-y-3">
            {profil.indicateurs.map(indicateur => (
              <Link
                key={`${indicateur.nom}-${indicateur.href}`}
                to={indicateur.href}
                className="block rounded-2xl border border-white/10 bg-surface-2 p-4 transition-colors hover:border-blue-500/25 hover:bg-surface-3"
              >
                <p className="text-sm font-semibold text-[#F1F5F9]">{indicateur.nom}</p>
                <p className="mt-1 text-sm text-[#94A3B8]">{indicateur.pourquoi}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-[#F1F5F9]">Exports disponibles</h2>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {profil.exports.map((item, index) => (
              <CalloutBlock key={`${item.nom}-${index}`} variant="exemple" title={item.nom}>
                <p>Quand : {item.quand}</p>
                <p className="mt-1">Comment : {item.comment}</p>
              </CalloutBlock>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
