import type { AppPage } from '@/data/fleet/transport/pages'
import type { Guide } from '@/data/fleet/transport/guides'
import type { CycleEtape } from '@/data/fleet/transport/cycle'
import type { CasParticulier } from '@/data/fleet/transport/casParticuliers'
import type { Role } from '@/data/fleet/roles'
import type { Indicateur } from '@/data/fleet/indicateurs'
import type { FAQItem } from '@/data/fleet/faq'
import type { Profil } from '@/data/fleet/profils'
import type { OnboardingParcours } from '@/data/fleet/onboarding'
import type { Nouveaute } from '@/data/fleet/nouveautes'

export interface SearchEntry {
  id: string
  titre: string
  chapeau: string
  contenu: string
  section: 'transport' | 'roles' | 'indicateurs' | 'faq' | 'onboarding' | 'nouveautes' | 'profils'
  categorie: string
  href: string
  tags: string[]
  roles?: string[]
}

export function scoreEntry(entry: SearchEntry, query: string): number {
  const q = query.toLowerCase().trim()
  if (q.length < 2) return 0

  let score = 0
  const titre = entry.titre.toLowerCase()
  const chapeau = entry.chapeau.toLowerCase()
  const contenu = entry.contenu.toLowerCase()

  if (titre === q) score += 100
  if (titre.startsWith(q)) score += 50
  if (titre.includes(q)) score += 30
  if (chapeau.includes(q)) score += 20
  if (entry.tags.some(tag => tag.toLowerCase().includes(q))) score += 15
  if (contenu.includes(q)) score += 10

  if (entry.section === 'transport') score *= 1.2

  return score
}

export function searchIndex(query: string, index: SearchEntry[]): SearchEntry[] {
  if (query.trim().length < 2) return []

  return index
    .map(entry => ({ entry, score: scoreEntry(entry, query) }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map(item => item.entry)
}

interface SearchData {
  pages: AppPage[]
  guides: Guide[]
  cycle: CycleEtape[]
  casParticuliers: CasParticulier[]
  roles: Role[]
  indicateurs: Indicateur[]
  faqItems: FAQItem[]
  profils: Profil[]
  onboarding: OnboardingParcours[]
  nouveautes: Nouveaute[]
}

export function buildSearchIndex(data: SearchData): SearchEntry[] {
  const entries: SearchEntry[] = []

  data.pages.forEach(page => {
    entries.push({
      id: `page-${page.id}`,
      titre: page.name,
      chapeau: page.see,
      contenu: `${page.see} ${page.why} ${page.read}`,
      section: 'transport',
      categorie: "Pages de l'application",
      href: `/transport/pages/${page.id}`,
      tags: ['transport', 'page', page.onglet],
    })
  })

  data.guides.forEach(guide => {
    entries.push({
      id: `guide-${guide.id}`,
      titre: guide.title,
      chapeau: guide.objectif,
      contenu: `${guide.objectif} ${guide.prerequis.join(' ')} ${guide.etapes.join(' ')} ${guide.resultat} ${guide.erreurs.join(' ')}`,
      section: 'transport',
      categorie: 'Guides pas-à-pas',
      href: `/transport/guides/${guide.id}`,
      tags: ['guide', 'transport', 'pas-à-pas'],
    })
  })

  data.cycle.forEach(step => {
    entries.push({
      id: `cycle-${step.numero}`,
      titre: step.titre,
      chapeau: step.description,
      contenu: `${step.description} ${step.action} ${step.statut}`,
      section: 'transport',
      categorie: "Cycle d'une rotation",
      href: '/transport/cycle',
      tags: ['cycle', 'rotation', step.statut],
    })
  })

  data.casParticuliers.forEach(cas => {
    const slug = cas.id === 'vehicule-propre-vs-gere'
      ? 'vehicule-gere-vs-propre'
      : cas.id === 'volume-livre-different'
        ? 'volume-manquant'
        : cas.id

    entries.push({
      id: `cas-${cas.id}`,
      titre: cas.titre,
      chapeau: cas.contexte,
      contenu: `${cas.contexte} ${cas.regle} ${cas.exemple ?? ''}`,
      section: 'transport',
      categorie: 'Cas particuliers',
      href: `/transport/cas-particuliers/${slug}`,
      tags: ['transport', 'cas', 'rotation'],
    })
  })

  data.roles.forEach(role => {
    entries.push({
      id: `role-${role.id}`,
      titre: role.nom,
      chapeau: role.mission,
      contenu: `${role.mission} ${role.utilisateurs} ${role.peutFaire.join(' ')} ${role.nePeutPasFaire.join(' ')} ${role.exemple}`,
      section: 'roles',
      categorie: 'Les rôles',
      href: `/roles/${role.id}`,
      tags: ['role', role.id, 'permission', 'accès'],
    })
  })

  data.indicateurs.forEach(indicateur => {
    entries.push({
      id: `indicateur-${indicateur.id}`,
      titre: indicateur.nom,
      chapeau: indicateur.definition,
      contenu: `${indicateur.definition} ${indicateur.formule ?? ''} ${indicateur.exemple} ${indicateur.conseil}`,
      section: 'indicateurs',
      categorie: 'Indicateurs financiers',
      href: `/indicateurs/${indicateur.id}`,
      tags: ['indicateur', 'KPI', 'finance', indicateur.nom.toLowerCase()],
    })
  })

  data.faqItems.forEach(item => {
    entries.push({
      id: `faq-${item.id}`,
      titre: item.question,
      chapeau: `${item.reponse.slice(0, 120)}...`,
      contenu: `${item.question} ${item.reponse}`,
      section: 'faq',
      categorie: 'FAQ',
      href: '/faq',
      tags: ['faq', 'question', item.categorie],
    })
  })

  data.profils.forEach(profil => {
    entries.push({
      id: `profil-${profil.id}`,
      titre: profil.nom,
      chapeau: profil.sousTitre,
      contenu: `${profil.nom} ${profil.sousTitre} ${profil.description}`,
      section: 'profils',
      categorie: 'Profils',
      href: `/profils/${profil.id}`,
      tags: ['profil', profil.id, ...profil.rolesFleetManager],
      roles: profil.rolesFleetManager,
    })
  })

  data.onboarding.forEach(parcours => {
    entries.push({
      id: `onboarding-${parcours.id}`,
      titre: parcours.roleNom,
      chapeau: parcours.objectif,
      contenu: `${parcours.objectif} ${parcours.steps.map(step => `${step.titre} ${step.description}`).join(' ')}`,
      section: 'onboarding',
      categorie: 'Parcours onboarding',
      href: `/onboarding/${parcours.id}`,
      tags: ['onboarding', parcours.roleId, parcours.roleNom],
    })
  })

  data.nouveautes.forEach(item => {
    entries.push({
      id: `nouveaute-${item.id}`,
      titre: item.titre,
      chapeau: item.description,
      contenu: `${item.titre} ${item.description} ${item.module ?? ''} ${item.mois}`,
      section: 'nouveautes',
      categorie: 'Nouveautés',
      href: '/nouveautes',
      tags: ['nouveauté', item.type, item.module ?? ''],
    })
  })

  return entries
}

export function getHighlightParts(text: string, query: string): { before: string; match: string; after: string } | null {
  const q = query.trim()
  if (q.length < 2) return null

  const index = text.toLowerCase().indexOf(q.toLowerCase())
  if (index === -1) return null

  return {
    before: text.slice(0, index),
    match: text.slice(index, index + q.length),
    after: text.slice(index + q.length),
  }
}

export function getSectionLabel(section: SearchEntry['section']) {
  const labels: Record<SearchEntry['section'], string> = {
    transport: 'Transport',
    roles: 'Rôles',
    indicateurs: 'Indicateurs',
    faq: 'FAQ',
    onboarding: 'Onboarding',
    nouveautes: 'Nouveautés',
    profils: 'Profils',
  }

  return labels[section]
}
