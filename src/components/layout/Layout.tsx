import { useMemo, useState } from 'react'
import { Outlet, matchPath, useLocation } from 'react-router-dom'
import { SearchPalette } from '@/components/search/SearchPalette'
import { PageMeta } from '@/components/ui/PageMeta'
import { FAQ_ITEMS, INDICATEURS, ONBOARDING_PARCOURS, PROFILS, ROLES, appPages, casParticuliers, guides } from '@/data/fleet'
import { appPages as ventePages } from '@/data/fleet/vente/pages'
import { guides as venteGuides } from '@/data/fleet/vente/guides'
import { INDICATEURS as venteIndicateurs } from '@/data/fleet/vente/indicateurs'
import { MobileHeader } from './MobileHeader'
import { MobileMenu } from './MobileMenu'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

function RouteMeta() {
  const location = useLocation()

  const meta = useMemo(() => {
    const pathname = location.pathname

    if (pathname === '/') {
      return {
        title: 'Accueil',
        description: 'Documentation officielle de Datakö Fleet Manager — guides, indicateurs, rôles et FAQ.',
      }
    }

    if (pathname === '/roles') return { title: 'Les rôles', description: 'Comprenez qui peut faire quoi dans Fleet Manager.' }
    if (pathname === '/indicateurs') return { title: 'Indicateurs financiers', description: 'Définitions, formules et conseils de lecture des KPI Fleet Manager.' }
    if (pathname === '/faq') return { title: 'Questions fréquentes', description: 'Réponses rapides aux questions courantes sur Datakö Fleet Manager.' }
    if (pathname === '/profils') return { title: 'Choisissez votre profil', description: 'Sélectionnez votre profil métier pour accéder à un parcours personnalisé.' }
    if (pathname === '/onboarding') return { title: 'Onboarding', description: 'Parcours guidés pour bien démarrer dans Fleet Manager.' }
    if (pathname === '/transport') return { title: 'Transport', description: 'Tout le module transport : pages, guides, cycle et cas particuliers.' }
    if (pathname === '/transport/pages') return { title: 'Comprendre les pages', description: 'Découvrez chaque page du module Transport.' }
    if (pathname === '/transport/guides') return { title: 'Guides pas-à-pas', description: 'Procédures étape par étape pour utiliser Fleet Manager.' }
    if (pathname === '/transport/cycle') return { title: "Cycle d'une rotation", description: "Les 6 étapes du cycle complet d'une livraison." }
    if (pathname === '/transport/cas-particuliers') return { title: 'Cas particuliers', description: 'Les situations complexes expliquées clairement.' }
    if (pathname === '/nouveautes') return { title: 'Nouveautés', description: 'Suivez les derniers ajouts et améliorations de Fleet Manager.' }
    if (pathname === '/recherche') return { title: 'Recherche', description: 'Recherchez dans toute la documentation Datakö Fleet.' }
    if (pathname === '/vente') return { title: 'Vente / Distribution', description: 'Le module Vente : commandes, tournées, facturation et indicateurs distribution.' }
    if (pathname === '/vente/pages') return { title: 'Pages Vente', description: 'Description de chaque écran du module Vente / Distribution.' }
    if (pathname === '/vente/guides') return { title: 'Guides Vente', description: 'Guides pas-à-pas pour maîtriser le module Vente.' }
    if (pathname === '/vente/indicateurs') return { title: 'Indicateurs Vente', description: 'CA Vente, Marge brute, Taux de livraison — définitions et formules.' }
    if (pathname === '/whatsapp') return { title: 'Module WhatsApp', description: 'Flux automatiques WhatsApp pour conducteurs, chefs d\'exploitation et DG.' }
    if (pathname === '/portail-proprietaire') return { title: 'Portail Propriétaire', description: 'Espace dédié aux propriétaires de véhicules gérés : bilans et exports PDF.' }

    const roleAliases: Record<string, string> = { administrateur: 'org_admin', operateur: 'operator', proprietaire: 'owner' }
    const roleMatch = matchPath('/roles/:id', pathname)
    if (roleMatch?.params.id) {
      const roleId = roleAliases[roleMatch.params.id] ?? roleMatch.params.id
      const role = ROLES.find(item => item.id === roleId)
      if (role) return { title: role.nom, description: role.mission }
    }

    const indicateurMatch = matchPath('/indicateurs/:id', pathname)
    if (indicateurMatch?.params.id) {
      const indicateur = INDICATEURS.find(item => item.id === indicateurMatch.params.id)
      if (indicateur) return { title: indicateur.nom, description: indicateur.definition }
    }

    const profilMatch = matchPath('/profils/:id', pathname)
    if (profilMatch?.params.id) {
      const profil = PROFILS.find(item => item.id === profilMatch.params.id)
      if (profil) return { title: profil.nom, description: profil.description }
    }

    const onboardingMatch = matchPath('/onboarding/:id', pathname)
    if (onboardingMatch?.params.id) {
      const onboarding = ONBOARDING_PARCOURS.find(item => item.id === onboardingMatch.params.id)
      if (onboarding) return { title: onboarding.roleNom, description: onboarding.objectif }
    }

    const pageMatch = matchPath('/transport/pages/:id', pathname)
    if (pageMatch?.params.id) {
      const page = appPages.find(item => item.id === pageMatch.params.id || (pageMatch.params.id === 'profit-par-camion' && item.id === 'profit-camion'))
      if (page) return { title: page.name, description: page.see }
    }

    const guideAliases: Record<string, string> = {
      'ajouter-un-camion': 'ajouter-camion',
      'ajouter-un-client': 'ajouter-client',
      'creer-une-rotation': 'creer-rotation',
      'valider-une-livraison': 'valider-livraison',
      'confirmer-un-paiement': 'confirmer-paiement',
      'ajouter-une-charge-fixe': 'ajouter-charge-fixe',
      'ajouter-une-maintenance': 'ajouter-maintenance',
      'generer-releve-client-pdf': 'releve-client-pdf',
      'generer-bilan-proprietaire-pdf': 'bilan-proprietaire-pdf',
    }
    const guideMatch = matchPath('/transport/guides/:id', pathname)
    if (guideMatch?.params.id) {
      const guideId = guideAliases[guideMatch.params.id] ?? guideMatch.params.id
      const guide = guides.find(item => item.id === guideId)
      if (guide) return { title: guide.title, description: guide.objectif }
    }

    const casAliases: Record<string, string> = {
      'vehicule-gere-vs-propre': 'vehicule-propre-vs-gere',
      'volume-manquant': 'volume-livre-different',
    }
    const casMatch = matchPath('/transport/cas-particuliers/:id', pathname)
    if (casMatch?.params.id) {
      const casId = casAliases[casMatch.params.id] ?? casMatch.params.id
      const cas = casParticuliers.find(item => item.id === casId)
      if (cas) return { title: cas.titre, description: cas.contexte }
    }

    const ventePageMatch = matchPath('/vente/pages/:id', pathname)
    if (ventePageMatch?.params.id) {
      const page = ventePages.find(item => item.id === ventePageMatch.params.id)
      if (page) return { title: page.name, description: page.see }
    }

    const venteGuideMatch = matchPath('/vente/guides/:id', pathname)
    if (venteGuideMatch?.params.id) {
      const guide = venteGuides.find(item => item.id === venteGuideMatch.params.id)
      if (guide) return { title: guide.title, description: guide.objectif }
    }

    const venteIndicateurMatch = matchPath('/vente/indicateurs/:id', pathname)
    if (venteIndicateurMatch?.params.id) {
      const indicateur = venteIndicateurs.find(item => item.id === venteIndicateurMatch.params.id)
      if (indicateur) return { title: indicateur.nom, description: indicateur.definition }
    }

    return {
      title: 'Documentation',
      description: `${FAQ_ITEMS[0]?.reponse ?? 'Documentation Fleet Manager.'}`,
    }
  }, [location.pathname])

  return <PageMeta title={meta.title} description={meta.description} />
}

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[var(--surface)]">
      <RouteMeta />
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <MobileHeader onMenuOpen={() => setMobileMenuOpen(true)} />
        <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
        <main className="flex-1 px-6 py-8 lg:px-10 lg:py-10" role="main">
          <div className="w-full max-w-5xl">
            <Outlet />
          </div>
        </main>
      </div>
      <SearchPalette />
    </div>
  )
}
