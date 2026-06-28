import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

interface ProfilContextValue {
  profilActif: string | null
  setProfilActif: (id: string | null) => void
}

const defaultValue: ProfilContextValue = {
  profilActif: null,
  setProfilActif: () => undefined,
}

export const ProfilContext = createContext<ProfilContextValue>(defaultValue)

interface ProfilProviderProps {
  children: ReactNode
}

export function ProfilProvider({ children }: ProfilProviderProps) {
  const [profilActif, setProfilActif] = useState<string | null>(null)

  useEffect(() => {
    try {
      const savedProfil = window.localStorage.getItem('hc-profil')
      if (savedProfil) {
        setProfilActif(savedProfil)
      }
    } catch {
      setProfilActif(null)
    }
  }, [])

  useEffect(() => {
    try {
      if (profilActif) {
        window.localStorage.setItem('hc-profil', profilActif)
      } else {
        window.localStorage.removeItem('hc-profil')
      }
    } catch {
      // ignore storage failures
    }
  }, [profilActif])

  const value = useMemo(() => ({ profilActif, setProfilActif }), [profilActif])

  return <ProfilContext.Provider value={value}>{children}</ProfilContext.Provider>
}

export function useProfil() {
  return useContext(ProfilContext)
}
