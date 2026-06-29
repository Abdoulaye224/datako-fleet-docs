import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

interface ProfilContextValue {
  profilActif: string | null
  setProfilActif: (id: string | null) => void
  /** Indices (dans parcoursRecommande) des articles marqués comme lus pour le profil actif */
  progress: Set<number>
  toggleProgress: (index: number) => void
  resetProgress: () => void
}

const defaultValue: ProfilContextValue = {
  profilActif: null,
  setProfilActif: () => undefined,
  progress: new Set(),
  toggleProgress: () => undefined,
  resetProgress: () => undefined,
}

export const ProfilContext = createContext<ProfilContextValue>(defaultValue)

interface ProfilProviderProps {
  children: ReactNode
}

export function ProfilProvider({ children }: ProfilProviderProps) {
  const [profilActif, setProfilActif] = useState<string | null>(null)
  const [progress, setProgress] = useState<Set<number>>(new Set())

  useEffect(() => {
    try {
      const savedProfil = window.localStorage.getItem('hc-profil')
      if (savedProfil) {
        setProfilActif(savedProfil)
        const savedProgress = window.localStorage.getItem(`hc-profil-progress-${savedProfil}`)
        if (savedProgress) {
          const parsed = JSON.parse(savedProgress) as number[]
          setProgress(new Set(Array.isArray(parsed) ? parsed : []))
        }
      }
    } catch {
      setProfilActif(null)
    }
  }, [])

  useEffect(() => {
    try {
      if (profilActif) {
        window.localStorage.setItem('hc-profil', profilActif)
        const savedProgress = window.localStorage.getItem(`hc-profil-progress-${profilActif}`)
        if (savedProgress) {
          const parsed = JSON.parse(savedProgress) as number[]
          setProgress(new Set(Array.isArray(parsed) ? parsed : []))
        } else {
          setProgress(new Set())
        }
      } else {
        window.localStorage.removeItem('hc-profil')
        setProgress(new Set())
      }
    } catch {
      // ignore storage failures
    }
  }, [profilActif])

  const toggleProgress = useCallback((index: number) => {
    if (!profilActif) return
    setProgress(prev => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      try {
        window.localStorage.setItem(`hc-profil-progress-${profilActif}`, JSON.stringify([...next]))
      } catch { /* ignore */ }
      return next
    })
  }, [profilActif])

  const resetProgress = useCallback(() => {
    if (!profilActif) return
    setProgress(new Set())
    try {
      window.localStorage.removeItem(`hc-profil-progress-${profilActif}`)
    } catch { /* ignore */ }
  }, [profilActif])

  const value = useMemo(
    () => ({ profilActif, setProfilActif, progress, toggleProgress, resetProgress }),
    [profilActif, progress, toggleProgress, resetProgress],
  )

  return <ProfilContext.Provider value={value}>{children}</ProfilContext.Provider>
}

export function useProfil() {
  return useContext(ProfilContext)
}
