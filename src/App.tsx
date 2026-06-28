import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Layout } from '@/components/layout/Layout'
import { ProfilProvider } from '@/context/ProfilContext'

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
const NotFound = lazy(() => import('@/pages/NotFound').then(m => ({ default: m.NotFound })))

function AppRoutes() {
  const location = useLocation()
  const suspenseFallback = <div />

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
          <Route path="*" element={<Suspense fallback={suspenseFallback}><NotFound /></Suspense>} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <ProfilProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ProfilProvider>
  )
}
