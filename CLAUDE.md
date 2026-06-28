# Datakö Help Center — Instructions Copilot

## Ce que tu construis

Un site de documentation client pour **Datakö Fleet Manager** — la plateforme de gestion de flotte transport et distribution pour PME en Guinée.

Ce site sera accessible à `help.datako.app`. Il est destiné aux clients (directeurs, opérateurs, financiers, propriétaires de camions) pour comprendre et utiliser la plateforme sans assistance.

**Ce n'est pas** :
- Une application web avec backend ou auth
- Un repo lié au code de Fleet Manager (repo séparé)
- "Datakö Academy" (plateforme d'apprentissage data/AI — produit distinct et sans rapport)

## Stack

```
React 19 + TypeScript + Vite + Tailwind CSS 3 + Framer Motion
```

Pas de framework de doc (Docusaurus, VitePress, etc.) — site React custom pour garder la flexibilité de design.

**Framer Motion est obligatoire** (`npm install framer-motion`) pour les animations de page, les cartes interactives, les transitions et les micro-interactions. Voir `docs/help-center/09-ux-premium.md` pour les specs complètes.

## Ambition UX

Ce n'est **pas** un simple site de documentation. C'est un outil d'onboarding et de formation qui doit donner **envie** d'être utilisé.

Exigences non-négociables :
- Animations de page fluides (slide-up, fade)
- Cartes interactives avec hover premium (lévitation, gradient glow)
- Navigation par profil utilisateur (première classe, pas un filtre secondaire)
- Recherche style Command Palette (Cmd+K, stagger results, surlignage)
- Micro-interactions sur chaque élément cliquable
- Expérience mobile soignée (swipe drawer, touch targets 44px)
- Transitions Framer Motion sur accordéons, drawers, listes
- Stagger lists sur toutes les grilles de cartes
- Barre de progression animée sur les parcours guidés
- Typographie premium (gradient sur H1, code inline stylé)

Le résultat doit être digne d'un SaaS professionnel. Chaque composant doit avoir des états hover, focus et active soignés.

## Charte graphique Datakö

Reprendre les tokens de couleur du projet Fleet Manager (dupliquer/adapter, pas importer) :

```css
/* Couleurs principales */
--datako-blue: #3B82F6       /* bleu primaire */
--datako-navy: #1E3A5F       /* navy foncé */
--datako-gradient-start: #2563EB
--datako-gradient-end: #7C3AED

/* Surfaces (dark mode natif) */
--surface: #0F1117
--surface-2: #181C27
--surface-3: #1F2537
--border: rgba(255,255,255,0.08)
--text-primary: #F1F5F9
--text-secondary: #94A3B8
--text-muted: #64748B
```

Thème dark par défaut (cohérent avec Fleet Manager).

## Architecture des fichiers

```
src/
  data/
    transport/
      pages.ts         ← 10 pages de l'application
      guides.ts        ← 10 guides pas-à-pas
      cycle.ts         ← 6 étapes du cycle rotation
      casParticuliers.ts
    roles.ts           ← 5 rôles
    indicateurs.ts     ← 7 indicateurs
    faq.ts             ← FAQ globale
    profils.ts         ← 10 profils utilisateur avec parcours
    onboarding.ts      ← 4 parcours onboarding par rôle
    nouveautes.ts      ← changelog client
  lib/
    motion.ts          ← tokens Framer Motion (TRANSITIONS, VARIANTS)
    search.ts          ← index et algorithme de recherche
  context/
    SearchContext.tsx  ← index de recherche global
    ProfilContext.tsx  ← profil actif + progress stockés dans localStorage
  components/
    layout/
      Layout.tsx
      Sidebar.tsx
      MobileHeader.tsx
      MobileMenu.tsx
    ui/
      CalloutBlock.tsx
      StepList.tsx
      CheckList.tsx
      Timeline.tsx
      Badge.tsx
      FormulaBlock.tsx
      ArticleCard.tsx
      SectionCard.tsx
      ProfilCard.tsx
      StaggerList.tsx
      PageTransition.tsx
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
    Profils.tsx              ← sélecteur de profil
    profils/[id].tsx         ← parcours par profil
    transport/
      index.tsx
      Pages.tsx / PageDetail.tsx
      Guides.tsx / GuideDetail.tsx
      Cycle.tsx
      CasParticuliers.tsx
    Roles.tsx / RoleDetail.tsx
    Indicateurs.tsx / IndicateurDetail.tsx
    FAQ.tsx
    Onboarding.tsx / OnboardingDetail.tsx
    Nouveautes.tsx
    Recherche.tsx
    404.tsx
  App.tsx
  main.tsx
```

**Règle d'architecture** : le contenu est dans `src/data/` sous forme de tableaux TypeScript (pas de JSX en dur dans les pages). Les pages itèrent sur ces tableaux.

## Règles de développement

- `npx tsc --noEmit` doit passer sans erreur avant chaque commit.
- Librairies autorisées : Tailwind + lucide-react + **framer-motion** + react-router-dom.
- Responsive : desktop (sidebar sticky) + mobile (menu accordéon + swipe).
- Pas de backend, pas d'auth, pas de Supabase.
- Pas de vraies captures d'écran — utiliser des icônes lucide-react comme illustrations.
- Langue : **français** partout.
- Tout état persistant (profil actif, progression parcours, historique recherche) → **`localStorage`** uniquement.
- `prefers-reduced-motion` : respecter via le hook `useReducedMotion()` de Framer Motion — désactiver les animations si activé.
- Performance : lazy-loader toutes les pages avec `React.lazy()` + `Suspense`.

## Ce que Copilot NE doit PAS faire

- Modifier le repo `datako-fleet-manager`
- Créer un backend ou une base de données
- Installer Docusaurus, VitePress ou tout autre framework de doc
- Utiliser du contenu inventé sur Datakö — s'appuyer uniquement sur `BRIEF.md`

## Ce que Copilot NE doit PAS faire

- Modifier le repo `datako-fleet-manager`
- Créer un backend ou une base de données
- Installer Docusaurus, VitePress ou tout autre framework de doc
- Utiliser du contenu inventé sur Datakö — s'appuyer uniquement sur `BRIEF.md` et `docs/help-center/`
- Omettre les animations Framer Motion — elles font partie des exigences produit
- Implémenter les modules V2 (Vente, WhatsApp, Portail Propriétaire) avant que la V1 soit validée

## Voir aussi

- `BRIEF.md` — contenu complet (données TypeScript V1), critères d'acceptation
- `docs/help-center/00-vision.md` — pourquoi ce produit existe, utilisateurs cibles
- `docs/help-center/01-information-architecture.md` — arborescence, URLs, structure `src/data/`
- `docs/help-center/02-design-system.md` — tokens, typographie, grille, responsive
- `docs/help-center/03-pages.md` — maquettes textuelles de chaque page
- `docs/help-center/04-navigation.md` — sidebar, breadcrumb, recherche, TOC, PrevNext
- `docs/help-center/05-components.md` — inventaire complet des composants avec props TypeScript
- `docs/help-center/06-search.md` — algorithme de scoring, SearchPalette, localStorage
- `docs/help-center/07-roadmap.md` — phases de réalisation et critères de validation
- `docs/help-center/08-profils.md` — **navigation par profil : 10 profils complets avec parcours**
- `docs/help-center/09-ux-premium.md` — **animations Framer Motion, micro-interactions, expérience premium**
