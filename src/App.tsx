import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Layout } from '@/components/layout/Layout'

const Home = lazy(() => import('@/pages/Home').then(m => ({ default: m.Home })))
const TransportIndex = lazy(() => import('@/pages/transport/index').then(m => ({ default: m.TransportIndex })))
const PagesList = lazy(() => import('@/pages/transport/PagesList').then(m => ({ default: m.PagesList })))
const PageDetail = lazy(() => import('@/pages/transport/PageDetail').then(m => ({ default: m.PageDetail })))
const GuidesList = lazy(() => import('@/pages/transport/GuidesList').then(m => ({ default: m.GuidesList })))
const GuideDetail = lazy(() => import('@/pages/transport/GuideDetail').then(m => ({ default: m.GuideDetail })))
const Cycle = lazy(() => import('@/pages/transport/Cycle').then(m => ({ default: m.Cycle })))
const CasParticuliers = lazy(() => import('@/pages/transport/CasParticuliers').then(m => ({ default: m.CasParticuliers })))
const RolesList = lazy(() => import('@/pages/RolesList').then(m => ({ default: m.RolesList })))
const IndicateursList = lazy(() => import('@/pages/IndicateursList').then(m => ({ default: m.IndicateursList })))
const FAQ = lazy(() => import('@/pages/FAQ').then(m => ({ default: m.FAQ })))
const Nouveautes = lazy(() => import('@/pages/Nouveautes').then(m => ({ default: m.Nouveautes })))
const NotFound = lazy(() => import('@/pages/NotFound').then(m => ({ default: m.NotFound })))

function AppRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Suspense fallback={<div />}><Home /></Suspense>} />
          <Route path="transport" element={<Suspense fallback={<div />}><TransportIndex /></Suspense>} />
          <Route path="transport/pages" element={<Suspense fallback={<div />}><PagesList /></Suspense>} />
          <Route path="transport/pages/:id" element={<Suspense fallback={<div />}><PageDetail /></Suspense>} />
          <Route path="transport/guides" element={<Suspense fallback={<div />}><GuidesList /></Suspense>} />
          <Route path="transport/guides/:id" element={<Suspense fallback={<div />}><GuideDetail /></Suspense>} />
          <Route path="transport/cycle" element={<Suspense fallback={<div />}><Cycle /></Suspense>} />
          <Route path="transport/cas-particuliers" element={<Suspense fallback={<div />}><CasParticuliers /></Suspense>} />
          <Route path="roles" element={<Suspense fallback={<div />}><RolesList /></Suspense>} />
          <Route path="indicateurs" element={<Suspense fallback={<div />}><IndicateursList /></Suspense>} />
          <Route path="faq" element={<Suspense fallback={<div />}><FAQ /></Suspense>} />
          <Route path="nouveautes" element={<Suspense fallback={<div />}><Nouveautes /></Suspense>} />
          <Route path="*" element={<Suspense fallback={<div />}><NotFound /></Suspense>} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
