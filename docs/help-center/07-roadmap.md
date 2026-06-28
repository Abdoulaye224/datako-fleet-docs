# 07 — Roadmap de réalisation

## Vue d'ensemble

```
Phase 1 — Fondations       (Semaine 1)    Shell + contenu Transport
Phase 2 — Contenu complet  (Semaine 2)    Rôles + Indicateurs + FAQ + Onboarding
Phase 3 — Navigation fine  (Semaine 3)    Recherche + TOC + PrevNext + Nouveautés
Phase 4 — Modules V2       (Post-démo)    Vente + WhatsApp + Portail Propriétaire
```

Chaque phase produit une version déployable et utilisable, pas un work-in-progress.

---

## Phase 1 — Fondations

**Objectif** : site fonctionnel avec le contenu le plus important (Transport).

### 1.1 — Scaffold
- [ ] `npm create vite@latest datako-help-center -- --template react-ts`
- [ ] Installer Tailwind CSS 3 + PostCSS
- [ ] Installer lucide-react
- [ ] Configurer les CSS variables dans `index.css`
- [ ] Vérifier : `npm run dev` fonctionne, `npx tsc --noEmit` passe
- [ ] Configurer le router (`react-router-dom`)
- [ ] Créer le fichier `src/data/fleet/index.ts` (barrel export)

### 1.2 — Shell de l'application
- [ ] `Layout.tsx` — structure flex sidebar + contenu
- [ ] `Sidebar.tsx` — navigation desktop, accordéon sections, lien actif
- [ ] `MobileHeader.tsx` — hamburger + logo + icône recherche
- [ ] `MobileMenu.tsx` — drawer slide-in avec même contenu que Sidebar
- [ ] Routing : toutes les routes définies (même si les pages sont vides)

**Critère de validation** : la sidebar s'affiche sur desktop, le menu hamburger fonctionne sur mobile.

### 1.3 — Contenu Transport dans `src/data/fleet/`
- [ ] `src/data/fleet/transport/pages.ts` — 10 pages de l'application
- [ ] `src/data/fleet/transport/guides.ts` — 10 guides pas-à-pas
- [ ] `src/data/fleet/transport/cycle.ts` — 6 étapes du cycle rotation
- [ ] `src/data/fleet/transport/casParticuliers.ts` — 6 cas particuliers

### 1.4 — Pages Transport
- [ ] `pages/transport/Pages.tsx` — liste des pages de l'application (cartes)
- [ ] `pages/transport/PageDetail.tsx` — article d'une page
- [ ] `pages/transport/Guides.tsx` — liste des guides (cartes)
- [ ] `pages/transport/GuideDetail.tsx` — guide pas-à-pas avec StepList
- [ ] `pages/transport/Cycle.tsx` — timeline du cycle rotation
- [ ] `pages/transport/CasParticuliers.tsx` — liste + détail

### 1.5 — Composants de base
- [ ] `CalloutBlock` — astuce / attention / exemple
- [ ] `StepList` — étapes numérotées
- [ ] `CheckList` — prérequis / résultat / erreurs
- [ ] `Timeline` — cycle rotation
- [ ] `ArticleCard` — carte lien
- [ ] `SectionCard` — carte section Accueil

### 1.6 — Page Accueil
- [ ] Barre de recherche (déclenche palette)
- [ ] 4 cartes sections
- [ ] Bloc "Nouveautés" (3 entrées hardcodées en V1)
- [ ] Lien "Démarrage rapide"

**Livrable Phase 1** : `npm run build` clean, toute la section Transport navigable, contenu complet.

---

## Phase 2 — Contenu complet

**Objectif** : toutes les sections V1 sont peuplées et navigables.

### 2.1 — Données complémentaires
- [ ] `src/data/fleet/roles.ts` — 5 rôles
- [ ] `src/data/fleet/indicateurs.ts` — 7 indicateurs
- [ ] `src/data/fleet/faq.ts` — 10+ questions
- [ ] `src/data/fleet/onboarding.ts` — 4 parcours par rôle
- [ ] `src/data/fleet/nouveautes.ts` — entrées changelog

### 2.2 — Pages Rôles
- [ ] `pages/roles/RolesIndex.tsx` — vue d'ensemble + tableau comparatif (`RolePermissionGrid`)
- [ ] `pages/roles/RoleDetail.tsx` — page par rôle (mission, droits, exemple, guides associés)

### 2.3 — Pages Indicateurs
- [ ] `pages/indicateurs/IndicateursIndex.tsx` — liste des KPIs
- [ ] `pages/indicateurs/IndicateurDetail.tsx` — définition + formule (`FormulaBlock`) + exemple + conseil

### 2.4 — Page FAQ
- [ ] `pages/FAQ.tsx` — accordéon + filtre par catégorie (`CategoryFilter`)

### 2.5 — Page Onboarding
- [ ] `pages/onboarding/OnboardingSelect.tsx` — sélection du rôle
- [ ] `pages/onboarding/OnboardingDetail.tsx` — checklist par rôle (`OnboardingChecklist`)

### 2.6 — Page Nouveautés
- [ ] `pages/Nouveautes.tsx` — liste chronologique par mois, badges par type

### 2.7 — Composants manquants
- [ ] `Accordion` — FAQ
- [ ] `FormulaBlock` — indicateurs
- [ ] `RolePermissionGrid` — tableau comparatif rôles
- [ ] `OnboardingChecklist` — état dans localStorage
- [ ] `CategoryFilter` — pills filtre FAQ
- [ ] `Badge` — section, rôle, difficulté, type nouveauté
- [ ] `GuideCard` — carte guide enrichie (rôles + nb étapes)

**Livrable Phase 2** : site complet V1 en contenu. Toutes les pages navigables avec vrai contenu.

---

## Phase 3 — Navigation fine & UX complète

**Objectif** : expérience utilisateur soignée — recherche, navigation entre articles, accessibilité.

### 3.1 — Recherche
- [ ] `SearchContext.tsx` — index en mémoire depuis `src/data/fleet/`, disponible globalement
- [ ] `SearchPalette.tsx` — modale Cmd+K avec scoring, surlignage, historique
- [ ] `SearchBar.tsx` — déclencheur dans sidebar et header mobile
- [ ] `pages/Recherche.tsx` — page résultats `/recherche?q=`
- [ ] Shortcut `Cmd+K` / `Ctrl+K` global (listener sur `document`)
- [ ] Historique recherches dans localStorage

### 3.2 — Navigation entre articles
- [ ] `Breadcrumb.tsx` — fil d'Ariane desktop
- [ ] `PrevNext.tsx` — précédent / suivant dans les séquences
- [ ] `ArticlesConnexes.tsx` — liens connexes bas d'article
- [ ] `TableOfContents.tsx` — TOC sticky desktop (`IntersectionObserver`)
- [ ] Ajouter les propriétés `precedent`, `suivant`, `articlesConnexes` dans les données

### 3.3 — Polish
- [ ] Page 404 (message + recherche + lien accueil)
- [ ] `aria-label` sur tous les éléments interactifs
- [ ] `role="navigation"` / `role="main"` sur les éléments sémantiques
- [ ] Focus visible sur tous les éléments (outline bleu)
- [ ] Navigation clavier dans le menu mobile (Escape ferme)
- [ ] Meta tags `<title>` et `<meta name="description">` par page

### 3.4 — Build final
- [ ] `npx tsc --noEmit` — zéro erreur
- [ ] `npm run build` — bundle < 500kb gzippé
- [ ] Lighthouse score ≥ 90 (Performance, Accessibilité)

**Livrable Phase 3** : site production-ready, déployable sur `help.datako.app` via Netlify.

---

## Phase 4 — Modules V2 (post-démo, non daté)

Ces modules ne seront pas implémentés avant la validation complète des phases 1-3.

### 4.1 — Module Vente / Distribution
- [ ] `src/data/fleet/vente/` — pages, guides, indicateurs vente
- [ ] Section `/vente/` dans la sidebar et l'architecture
- [ ] Intégration dans la recherche

### 4.2 — Module WhatsApp
- [ ] `src/data/fleet/whatsapp/` — flux conducteur, DG, chef exploitation
- [ ] Section `/whatsapp/`

### 4.3 — Portail Propriétaire
- [ ] `src/data/fleet/portail/` — accès, bilan, PDF
- [ ] Section `/portail-proprietaire/`

### 4.4 — Deep-linking depuis Fleet Manager
- [ ] Lien "Voir le guide →" dans `HelpGuide.tsx` (composant Fleet Manager existant)
- [ ] URLs stables et prévisibles pour chaque article

### 4.5 — Améliorations UX
- [ ] Toggle dark/light mode
- [ ] Filtres par rôle dans les guides ("En tant qu'Opérateur, voir uniquement mes guides")
- [ ] Mode impression (CSS `@media print`)
- [ ] Fuse.js pour tolérance aux fautes de frappe si corpus > 100 articles

---

## Définition of Done

Un article est "terminé" quand :
- [ ] Le contenu est dans `src/data/fleet/` (pas dans le JSX)
- [ ] La page s'affiche sans erreur console
- [ ] Les liens connexes pointent vers des pages existantes
- [ ] `npx tsc --noEmit` passe
- [ ] Lisible sur mobile (375px) et desktop (1280px)

Un composant est "terminé" quand :
- [ ] Il est typé (pas de `any`)
- [ ] Il a au moins 2 usages réels dans l'app
- [ ] Il passe le `tsc` sans erreur
- [ ] Il fonctionne keyboard-only

Le site est "production-ready" quand :
- [ ] Toutes les phases 1-3 sont complètes
- [ ] `npm run build` produit un bundle propre
- [ ] Aucune route 404 interne (tous les liens internes fonctionnent)
- [ ] Contenu relu et validé par l'équipe Datakö
