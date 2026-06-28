import { Compass, X } from 'lucide-react'
import { PageTransition } from '@/components/ui/PageTransition'
import { StaggerList } from '@/components/ui/StaggerList'
import { ProfilCard } from '@/components/ui/ProfilCard'
import { PROFILS } from '@/data/fleet'
import { useProfil } from '@/context/ProfilContext'

export function Profils() {
  const { profilActif, setProfilActif } = useProfil()

  return (
    <PageTransition>
      <div className="space-y-8">
        <div>
          <p className="mb-1 text-xs text-[#64748B]">Personnalisation</p>
          <h1 className="text-2xl font-bold text-[#F1F5F9]">Choisissez votre profil</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#94A3B8]">
            Accédez à un parcours personnalisé selon votre rôle dans l'organisation.
          </p>
        </div>

        <StaggerList className="grid grid-cols-2 gap-4 xl:grid-cols-5">
          {[
            ...PROFILS.map(profil => (
              <ProfilCard
                key={profil.id}
                profil={profil}
                onSelect={setProfilActif}
                isActive={profilActif === profil.id}
              />
            )),
            <button
              key="reset-profil"
              type="button"
              onClick={() => setProfilActif(null)}
              className="flex h-full min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-surface-2 p-5 text-center transition-colors hover:border-blue-500/25 hover:bg-surface-3"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-[#94A3B8]">
                {profilActif ? <X size={20} /> : <Compass size={20} />}
              </div>
              <p className="text-base font-semibold text-[#F1F5F9]">Tout afficher</p>
              <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">
                Réinitialisez le profil actif pour parcourir toute la documentation sans filtre personnalisé.
              </p>
            </button>,
          ]}
        </StaggerList>
      </div>
    </PageTransition>
  )
}
