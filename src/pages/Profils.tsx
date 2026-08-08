import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import { PageTransition } from '@/components/ui/PageTransition'
import { StaggerList } from '@/components/ui/StaggerList'
import { ProfilCard } from '@/components/ui/ProfilCard'
import { PROFILS, PROFIL_CATEGORIES } from '@/data/fleet'
import { useProfil } from '@/context/ProfilContext'

export function Profils() {
  const { profilActif, setProfilActif } = useProfil()

  return (
    <PageTransition>
      <div className="space-y-10">
        <div>
          <p className="mb-1 text-xs text-[var(--text-muted)]">Personnalisation</p>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Quel est votre rôle ?</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">
            Chaque rôle a son propre parcours : les articles à lire en priorité, les erreurs à éviter et les
            indicateurs à surveiller. Votre activité — Transport, Marketeur ou les deux — se choisit depuis{' '}
            <Link to="/" className="text-blue-400 underline-offset-2 hover:underline">
              l’accueil
            </Link>
            .
          </p>
        </div>

        {PROFIL_CATEGORIES.map(categorie => {
          const profils = PROFILS.filter(profil => profil.categorie === categorie.id)
          if (profils.length === 0) return null

          return (
            <section key={categorie.id} className="space-y-4">
              <div>
                <h2 className="text-base font-semibold text-[var(--text-primary)]">{categorie.label}</h2>
                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-[var(--text-muted)]">{categorie.description}</p>
              </div>
              <StaggerList className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {profils.map(profil => (
                  <ProfilCard
                    key={profil.id}
                    profil={profil}
                    onSelect={setProfilActif}
                    isActive={profilActif === profil.id}
                  />
                ))}
              </StaggerList>
            </section>
          )
        })}

        {profilActif && (
          <button
            type="button"
            onClick={() => setProfilActif(null)}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-2.5 text-sm text-[var(--text-secondary)] transition-colors hover:border-blue-500/25 hover:text-[var(--text-primary)]"
          >
            <X size={14} />
            Retirer mon profil et parcourir toute la documentation
          </button>
        )}

        <p className="border-t border-[var(--border)] pt-6 text-xs text-[var(--text-muted)]">
          Vous faites partie de l’équipe Datakö ?{' '}
          <Link to="/profils/super-admin" className="underline-offset-2 hover:text-[var(--text-secondary)] hover:underline">
            Accéder au parcours administration interne
          </Link>
          .
        </p>
      </div>
    </PageTransition>
  )
}
