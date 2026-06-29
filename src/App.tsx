import { Suspense, lazy, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { ProfilProvider } from '@/context/ProfilContext'
import { SearchProvider, useSearch } from '@/context/SearchContext'
import { ThemeProvider } from '@/context/ThemeContext'

const Home = lazy(() => import('@/pages/Home').then(m => ({ default: m.Home })))
const TransportIndex = lazy(() => import('@/pages/transport/index').then(m => ({ default: m.TransportIndex })))
const PagesList = lazy(() => import('@/pages/transport/PagesList').then(m => ({ default: m.PagesList })))
const PageDetail = lazy(() => import('@/pages/transport/PageDetail').then(m => ({ default: m.PageDetail })))
const GuidesList = lazy(() => import('@/pages/transport/GuidesList').then(m => ({ default: m.GuidesList })))
const GuideDetail = lazy(() => import('@/pages/transport/GuideDetail').then(m => ({ default: m.GuideDetail })))
const Cycle = lazy(() => import('@/pages/transport/Cycle').then(m => ({ default: m.Cycle })))
const CasParticuliers = lazy(() => import('@/pages/transport/CasParticuliers').then(m => ({ default: m.CasParticuliers })))
const CasParticulierDetail = lazy(() => import('@/pages/transport/CasParticulierDetail').then(m => ({ default: m.CasParticulierDetail })))
const RolesList = lazy(() => import('@/pages/RolesList').then(m => ({ default: m.RolesList })))
const RoleDetail = lazy(() => import('@/pages/RoleDetail').then(m => ({ default: m.RoleDetail })))
const IndicateursList = lazy(() => import('@/pages/IndicateursList').then(m => ({ default: m.IndicateursList })))
const IndicateurDetail = lazy(() => import('@/pages/IndicateurDetail').then(m => ({ default: m.IndicateurDetail })))
const FAQ = lazy(() => import('@/pages/FAQ').then(m => ({ default: m.FAQ })))
const Nouveautes = lazy(() => import('@/pages/Nouveautes').then(m => ({ default: m.Nouveautes })))
const OnboardingSelect = lazy(() => import('@/pages/OnboardingSelect').then(m => ({ default: m.OnboardingSelect })))
const OnboardingDetail = lazy(() => import('@/pages/OnboardingDetail').then(m => ({ default: m.OnboardingDetail })))
const Profils = lazy(() => import('@/pages/Profils').then(m => ({ default: m.Profils })))
const ProfilDetail = lazy(() => import('@/pages/ProfilDetail').then(m => ({ default: m.ProfilDetail })))
const Recherche = lazy(() => import('@/pages/Recherche').then(m => ({ default: m.Recherche })))
const NotFound = lazy(() => import('@/pages/NotFound').then(m => ({ default: m.NotFound })))

// V2 — Vente / Distribution
const VenteIndex = lazy(() => import('@/pages/vente/index').then(m => ({ default: m.VenteIndex })))
const VentePagesList = lazy(() => import('@/pages/vente/PagesList').then(m => ({ default: m.VentePagesList })))
const VentePageDetail = lazy(() => import('@/pages/vente/PageDetail').then(m => ({ default: m.VentePageDetail })))
const VenteGuidesList = lazy(() => import('@/pages/vente/GuidesList').then(m => ({ default: m.VenteGuidesList })))
const VenteGuideDetail = lazy(() => import('@/pages/vente/GuideDetail').then(m => ({ default: m.VenteGuideDetail })))
const VenteIndicateursList = lazy(() => import('@/pages/vente/IndicateursList').then(m => ({ default: m.VenteIndicateursList })))
const VenteIndicateurDetail = lazy(() => import('@/pages/vente/IndicateurDetail').then(m => ({ default: m.VenteIndicateurDetail })))

// V2 — WhatsApp
const WhatsAppIndex = lazy(() => import('@/pages/whatsapp/index').then(m => ({ default: m.WhatsAppIndex })))

// V2 — Portail Propriétaire
const PortailProprietaireIndex = lazy(() => import('@/pages/portail-proprietaire/index').then(m => ({ default: m.PortailProprietaireIndex })))

function AppRoutes() {
  const location = useLocation()
  const { openSearch } = useSearch()
  const suspenseFallback = <div />

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        openSearch()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [openSearch])

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Suspense fallback={suspenseFallback}><Home /></Suspense>} />
          <Route path="transport" element={<Suspense fallback={suspenseFallback}><TransportIndex /></Suspense>} />
          <Route path="transport/pages" element={<Suspense fallback={suspenseFallback}><PagesList /></Suspense>} />
          <Route path="transport/pages/:id" element={<Suspense fallback={suspenseFallback}><PageDetail /></Suspense>} />
          <Route path="transport/guides" element={<Suspense fallback={suspenseFallback}><GuidesList /></Suspense>} />
          <Route path="transport/guides/:id" element={<Suspense fallback={suspenseFallback}><GuideDetail /></Suspense>} />
          <Route path="transport/cycle" element={<Suspense fallback={suspenseFallback}><Cycle /></Suspense>} />
          <Route path="transport/cas-particuliers" element={<Suspense fallback={suspenseFallback}><CasParticuliers /></Suspense>} />
          <Route path="transport/cas-particuliers/:id" element={<Suspense fallback={suspenseFallback}><CasParticulierDetail /></Suspense>} />
          <Route path="roles" element={<Suspense fallback={suspenseFallback}><RolesList /></Suspense>} />
          <Route path="roles/:id" element={<Suspense fallback={suspenseFallback}><RoleDetail /></Suspense>} />
          <Route path="indicateurs" element={<Suspense fallback={suspenseFallback}><IndicateursList /></Suspense>} />
          <Route path="indicateurs/:id" element={<Suspense fallback={suspenseFallback}><IndicateurDetail /></Suspense>} />
          <Route path="faq" element={<Suspense fallback={suspenseFallback}><FAQ /></Suspense>} />
          <Route path="nouveautes" element={<Suspense fallback={suspenseFallback}><Nouveautes /></Suspense>} />
          <Route path="onboarding" element={<Suspense fallback={suspenseFallback}><OnboardingSelect /></Suspense>} />
          <Route path="onboarding/:id" element={<Suspense fallback={suspenseFallback}><OnboardingDetail /></Suspense>} />
          <Route path="profils" element={<Suspense fallback={suspenseFallback}><Profils /></Suspense>} />
          <Route path="profils/:id" element={<Suspense fallback={suspenseFallback}><ProfilDetail /></Suspense>} />
          <Route path="recherche" element={<Suspense fallback={suspenseFallback}><Recherche /></Suspense>} />
          {/* V2 — Vente / Distribution */}
          <Route path="vente" element={<Suspense fallback={suspenseFallback}><VenteIndex /></Suspense>} />
          <Route path="vente/pages" element={<Suspense fallback={suspenseFallback}><VentePagesList /></Suspense>} />
          <Route path="vente/pages/:id" element={<Suspense fallback={suspenseFallback}><VentePageDetail /></Suspense>} />
          <Route path="vente/guides" element={<Suspense fallback={suspenseFallback}><VenteGuidesList /></Suspense>} />
          <Route path="vente/guides/:id" element={<Suspense fallback={suspenseFallback}><VenteGuideDetail /></Suspense>} />
          <Route path="vente/indicateurs" element={<Suspense fallback={suspenseFallback}><VenteIndicateursList /></Suspense>} />
          <Route path="vente/indicateurs/:id" element={<Suspense fallback={suspenseFallback}><VenteIndicateurDetail /></Suspense>} />
          {/* V2 — WhatsApp */}
          <Route path="whatsapp" element={<Suspense fallback={suspenseFallback}><WhatsAppIndex /></Suspense>} />
          {/* V2 — Portail Propriétaire */}
          <Route path="portail-proprietaire" element={<Suspense fallback={suspenseFallback}><PortailProprietaireIndex /></Suspense>} />
          <Route path="*" element={<Suspense fallback={suspenseFallback}><NotFound /></Suspense>} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <SearchProvider>
        <ProfilProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ProfilProvider>
      </SearchProvider>
    </ThemeProvider>
  )
}
