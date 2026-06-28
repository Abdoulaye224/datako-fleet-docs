# Datakö Fleet Docs — Instructions Copilot

## Ce que tu construis

La documentation client officielle de **Datakö Fleet Manager** — la plateforme de gestion de flotte transport et distribution pour PME en Guinée.

Ce site sera accessible à `fleet-docs.datako.app` (ou `help.datako.app`). Il est destiné aux clients (directeurs, opérateurs, financiers, propriétaires de camions) pour comprendre et utiliser la plateforme en autonomie.

**Ce produit est dédié à Fleet Manager.** Il n'est pas une plateforme multi-produits. L'architecture `src/data/fleet/` est organisée pour que l'ajout d'un futur produit (`src/data/erp/`, `src/data/academy/`) soit possible sans refactorisation — mais ne pas construire ce futur maintenant.

**Ce n'est pas** :
- Une application web avec backend ou auth
- Un repo lié au code de Fleet Manager (repo séparé, `datako-fleet-manager`)
- "Datakö Academy" (plateforme d'apprentissage data/AI — produit distinct, sans rapport)
- Une plateforme de documentation générique multi-produits

## Stack

```
React 19 + TypeScript + Vite + Tailwind CSS 3 + Framer Motion + react-router-dom
```

Pas de framework de doc (Docusaurus, VitePress, etc.) — site React custom pour garder la flexibilité de design.

**Framer Motion est obligatoire** (`npm install framer-motion`) pour les animations de page, les cartes interactives, les transitions et les micro-interactions. Voir `docs/help-center/09-ux-premium.md` pour les specs complètes.

## Ambition UX

Ce n'est **pas** un simple site de documentation. C'est un outil d'onboarding et de formation qui doit donner **envie** d'être utilisé.

Exigences non-négociables :
- Animations de page fluides (slide-up, fade) via Framer Motion
- Cartes interactives avec hover premium (lévitation, gradient glow, flèche animée)
- Navigation par profil utilisateur (10 profils — première classe, pas un filtre secondaire)
- Recherche style Command Palette (Cmd+K, stagger results, surlignage terme)
- Micro-interactions sur chaque élément cliquable
- Expérience mobile soignée (swipe drawer, touch targets 44px min)
- Stagger lists sur toutes les grilles de cartes
- Barre de progression animée sur les parcours guidés par profil
- Typographie premium (gradient sur H1, code inline stylé)

Le résultat doit être digne d'un SaaS professionnel. Chaque composant doit avoir des états hover, focus et active soignés.

## Charte graphique Datakö

```css
/* Couleurs principales */
--datako-blue: #3B82F6
--datako-navy: #1E3A5F
--datako-gradient-start: #2563EB
--datako-gradient-end: #7C3AED

/* Surfaces (dark mode natif) */
--surface:   #0F1117
--surface-2: #181C27
--surface-3: #1F2537
--border: rgba(255,255,255,0.08)

/* Texte */
--text-primary:   #F1F5F9
--text-secondary: #94A3B8
--text-muted:     #64748B

/* États sémantiques */
--success: #10B981
--warning: #F59E0B
--error:   #EF4444
--info:    #3B82F6
```

Thème dark par défaut (cohérent avec Fleet Manager). Pas de toggle light/dark en V1.

## Architecture des fichiers

```
src/
  data/
    fleet/                        ← tout le contenu Fleet Manager V1
      transport/
        pages.ts                  ← 10 pages de l'application Fleet
        guides.ts                 ← 10 guides pas-à-pas
        cycle.ts                  ← 6 étapes du cycle rotation
        casParticuliers.ts        ← cas complexes (volume manquant, véhicule géré...)
      roles.ts                    ← 5 rôles Fleet Manager
      indicateurs.ts              ← 7 indicateurs financiers
      faq.ts                      ← FAQ globale Fleet
      profils.ts                  ← 10 profils utilisateur avec parcours complets
      onboarding.ts               ← parcours onboarding par rôle
      nouveautes.ts               ← changelog client Fleet
    # Futur (ne pas créer maintenant) :
    # erp/     ← si Datakö ERP voit le jour
    # academy/ ← si Datakö Academy a besoin de docs ici
  lib/
    motion.ts                     ← tokens Framer Motion (TRANSITIONS, VARIANTS)
    search.ts                     ← index et algorithme de recherche client-side
  context/
    SearchContext.tsx              ← index de recherche global (built from src/data/fleet/)
    ProfilContext.tsx              ← profil actif + progress → localStorage
  components/
    layout/
      Layout.tsx
      Sidebar.tsx
      MobileHeader.tsx
      MobileMenu.tsx
    ui/
      CalloutBlock.tsx             ← astuce / attention / exemple
      StepList.tsx                 ← étapes numérotées
      CheckList.tsx                ← prérequis / résultat / erreurs
      Timeline.tsx                 ← cycle rotation
      Badge.tsx                    ← section / rôle / difficulté / nouveauté
      FormulaBlock.tsx             ← formules financières
      ArticleCard.tsx
      SectionCard.tsx
      ProfilCard.tsx
      StaggerList.tsx              ← wrapper grilles animées
      PageTransition.tsx           ← wrapper animation de page
    navigation/
      Breadcrumb.tsx
      PrevNext.tsx
      TableOfContents.tsx
      ArticlesConnexes.tsx
    search/
      SearchBar.tsx
      SearchPalette.tsx
    onboarding/
      OnboardingChecklist.tsx
      ProfilProgress.tsx
  pages/
    Home.tsx
    Profils.tsx                    ← sélecteur de profil (grille 10 cartes)
    profils/[id].tsx               ← parcours par profil
    transport/
      index.tsx
      PagesList.tsx / PageDetail.tsx
      GuidesList.tsx / GuideDetail.tsx
      Cycle.tsx
      CasParticuliers.tsx
    RolesList.tsx / RoleDetail.tsx
    IndicateursList.tsx / IndicateurDetail.tsx
    FAQ.tsx
    OnboardingSelect.tsx / OnboardingDetail.tsx
    Nouveautes.tsx
    Recherche.tsx
    NotFound.tsx                   ← 404
  App.tsx
  main.tsx
```

**Règle absolue** : le contenu est dans `src/data/fleet/` sous forme de tableaux TypeScript typés. Zéro contenu métier en dur dans les composants JSX. Les pages itèrent sur les données.

## Règles de développement

- `npx tsc --noEmit` doit passer sans erreur avant chaque commit
- Librairies autorisées : Tailwind + lucide-react + framer-motion + react-router-dom. Rien d'autre sans justification.
- Responsive : desktop (sidebar sticky 260px) + mobile (drawer swipe-to-close)
- Pas de backend, pas d'auth, pas de Supabase, pas de fetch réseau
- Pas de vraies captures d'écran — icônes lucide-react comme illustrations
- Langue : **français** partout (code en anglais, contenu en français)
- Tout état persistant → **`localStorage`** uniquement (profil actif, progression, historique recherche)
- `prefers-reduced-motion` : hook `useReducedMotion()` Framer Motion — désactiver animations si activé
- Lazy-loader toutes les pages (`React.lazy()` + `Suspense`)
- Performance : bundle final < 500kb gzip

## Ce que Copilot NE doit PAS faire

- Modifier le repo `datako-fleet-manager`
- Créer un backend, une base de données, ou des routes API
- Installer Docusaurus, VitePress ou tout autre framework de doc
- Utiliser du contenu inventé — s'appuyer uniquement sur `BRIEF.md` et `docs/help-center/`
- Omettre les animations Framer Motion — elles font partie des exigences produit
- Créer `src/data/erp/` ou `src/data/academy/` — ces produits n'existent pas encore
- Implémenter les modules V2 (Vente, WhatsApp, Portail Propriétaire) avant validation V1
- Abstraire un système multi-produits — cette app est dédiée à Fleet Manager

## Index de la documentation de cadrage

- `BRIEF.md` — contenu complet V1 (données TypeScript, 10 guides, 5 rôles, 7 indicateurs, 10 FAQ, critères d'acceptation)
- `docs/help-center/00-vision.md` — pourquoi ce produit existe, utilisateurs cibles, philosophie
- `docs/help-center/01-information-architecture.md` — arborescence complète, URLs, `src/data/fleet/`
- `docs/help-center/02-design-system.md` — tokens, typographie, grille, responsive, règles d'or
- `docs/help-center/03-pages.md` — maquettes textuelles de chaque page
- `docs/help-center/04-navigation.md` — sidebar, breadcrumb, recherche, TOC, PrevNext, URLs
- `docs/help-center/05-components.md` — inventaire complet (30+ composants) avec props TypeScript
- `docs/help-center/06-search.md` — algorithme de scoring, SearchPalette, localStorage
- `docs/help-center/07-roadmap.md` — 4 phases, critères de validation, définition of done
- `docs/help-center/08-profils.md` — **10 profils complets avec parcours, erreurs, indicateurs, exports**
- `docs/help-center/09-ux-premium.md` — **Framer Motion tokens, micro-interactions, cartes premium, animations**
