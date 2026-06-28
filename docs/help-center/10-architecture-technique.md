# 10 — Architecture technique

## Vue d'ensemble

```
datako-fleet-docs/
├── src/
│   ├── data/fleet/          ← contenu métier (TypeScript pur, aucun JSX)
│   ├── lib/                 ← utilitaires transverses (motion, search)
│   ├── context/             ← état global React (search, profil)
│   ├── components/          ← composants réutilisables (aucune dépendance sur data/)
│   ├── pages/               ← pages routées (itèrent sur data/, utilisent components/)
│   ├── App.tsx              ← router + providers
│   └── main.tsx             ← entry point
├── .github/workflows/       ← CI/CD GitHub Actions → GitHub Pages
└── docs/help-center/        ← documentation de conception (ce dossier)
```

**Règle de dépendance stricte :**
```
data/fleet/ ← lib/ ← context/ ← pages/ ← components/
```
Les composants ne connaissent pas `data/fleet/`. Les pages font le pont. Jamais l'inverse.

---

## Routing

### Librairie
`react-router-dom` v6+, mode `BrowserRouter`.

### Structure des routes

```typescript
// App.tsx
<BrowserRouter>
  <AnimatePresence mode="wait">
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        {/* Profils */}
        <Route path="profils" element={<Profils />} />
        <Route path="profils/:id" element={<ProfilDetail />} />

        {/* Transport */}
        <Route path="transport">
          <Route index element={<TransportIndex />} />
          <Route path="pages" element={<PagesList />} />
          <Route path="pages/:id" element={<PageDetail />} />
          <Route path="guides" element={<GuidesList />} />
          <Route path="guides/:id" element={<GuideDetail />} />
          <Route path="cycle" element={<Cycle />} />
          <Route path="cas-particuliers" element={<CasParticuliers />} />
          <Route path="cas-particuliers/:id" element={<CasDetail />} />
        </Route>

        {/* Transverses */}
        <Route path="roles" element={<RolesList />} />
        <Route path="roles/:id" element={<RoleDetail />} />
        <Route path="indicateurs" element={<IndicateursList />} />
        <Route path="indicateurs/:id" element={<IndicateurDetail />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="onboarding" element={<OnboardingSelect />} />
        <Route path="onboarding/:role" element={<OnboardingDetail />} />
        <Route path="nouveautes" element={<Nouveautes />} />
        <Route path="recherche" element={<Recherche />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </AnimatePresence>
</BrowserRouter>
```

### Layout comme Outlet

`Layout.tsx` est le shell permanent (sidebar + header mobile). Les pages sont rendues via `<Outlet />` — elles ne redéfinissent pas la sidebar.

```typescript
// Layout.tsx
export function Layout() {
  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar className="hidden lg:flex w-[260px] flex-shrink-0" />
      <div className="flex-1 flex flex-col min-w-0">
        <MobileHeader className="lg:hidden" />
        <main role="main" className="flex-1 overflow-y-auto">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
      </div>
    </div>
  )
}
```

### Lazy loading

Toutes les pages sont lazy-loadées pour réduire le bundle initial :

```typescript
const Home = lazy(() => import('./pages/Home'))
const Profils = lazy(() => import('./pages/Profils'))
const GuideDetail = lazy(() => import('./pages/transport/GuideDetail'))
// ...

// Suspense dans App.tsx
<Suspense fallback={<PageSpinner />}>
  <Routes>...</Routes>
</Suspense>
```

---

## Couche données — `src/data/fleet/`

### Principe

Tout le contenu métier est du TypeScript pur : tableaux d'objets typés, exportés nommément. Aucune dépendance React, aucun JSX. Importable dans n'importe quel contexte (tests, scripts, SSR futur).

### Pattern d'import dans les pages

```typescript
// ✅ Correct — la page importe les données et itère
import { GUIDES } from '@/data/fleet/transport/guides'

export function GuidesList() {
  return (
    <StaggerList>
      {GUIDES.map(g => <GuideCard key={g.id} guide={g} />)}
    </StaggerList>
  )
}

// ✅ Correct — la page trouve un article par ID de route
import { GUIDES } from '@/data/fleet/transport/guides'
import { useParams } from 'react-router-dom'

export function GuideDetail() {
  const { id } = useParams()
  const guide = GUIDES.find(g => g.id === id)
  if (!guide) return <NotFound />
  // ...
}

// ❌ Interdit — contenu en dur dans le JSX
export function GuidesList() {
  return <div>Créer une rotation — Enregistre un trajet...</div>
}
```

### Barrel export

```typescript
// src/data/fleet/index.ts
export * from './transport/pages'
export * from './transport/guides'
export * from './transport/cycle'
export * from './transport/casParticuliers'
export * from './roles'
export * from './indicateurs'
export * from './faq'
export * from './profils'
export * from './onboarding'
export * from './nouveautes'
```

### Extensibilité future

```
src/data/
  fleet/      ← V1, actuel
  erp/        ← futur Datakö ERP (ne pas créer maintenant)
  academy/    ← futur Datakö Academy (ne pas créer maintenant)
```

Si un deuxième produit est ajouté, ajouter un `ProduitsContext` avec le produit actif, et filtrer la sidebar en conséquence.

---

## Gestion d'état

Pas de librairie externe (pas de Zustand, Redux, Jotai). Deux contextes React suffisent.

### `SearchContext`

```typescript
interface SearchContextValue {
  index: SearchEntry[]        // construit une fois depuis data/fleet/
  search: (q: string) => SearchEntry[]
  isOpen: boolean             // palette ouverte/fermée
  openSearch: () => void
  closeSearch: () => void
}
```

L'index est construit en `useMemo` au montage du `SearchProvider`, jamais recalculé sauf si les données changent (ce qui n'arrive pas en production — données statiques).

```typescript
// SearchProvider.tsx
const index = useMemo(() => buildSearchIndex([
  ...PAGES.map(pageToSearchEntry),
  ...GUIDES.map(guideToSearchEntry),
  ...INDICATEURS.map(indicateurToSearchEntry),
  ...FAQ.map(faqToSearchEntry),
  ...PROFILS.map(profilToSearchEntry),
]), [])
```

### `ProfilContext`

```typescript
interface ProfilContextValue {
  profil: Profil | null
  setProfil: (id: string | null) => void
  progress: Record<string, boolean>   // { [articleHref]: completed }
  toggleProgress: (href: string) => void
  completion: number                  // 0-100
}
```

Persistance `localStorage` :
- `hc-profil` → id du profil actif (`string | null`)
- `hc-progress-{profilId}` → objet `{ [href]: boolean }`

---

## Système d'animation

### Tokens — `src/lib/motion.ts`

```typescript
export const TRANSITIONS = {
  fast:         { duration: 0.15, ease: 'easeOut' },
  default:      { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] },
  slow:         { duration: 0.4,  ease: [0.25, 0.46, 0.45, 0.94] },
  spring:       { type: 'spring', stiffness: 400, damping: 30 },
  springGentle: { type: 'spring', stiffness: 200, damping: 25 },
}

export const VARIANTS = {
  fadeIn:      { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } },
  slideUp:     { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 } },
  slideInLeft: { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 } },
  scaleIn:     { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.95 } },
  stagger:     { animate: { transition: { staggerChildren: 0.06 } } },
}
```

### `PageTransition`

Wraps `<Outlet />` dans `Layout.tsx`. Utilise `AnimatePresence` avec `mode="wait"` pour que la page sortante finisse son exit avant que l'entrante s'anime.

```typescript
// PageTransition.tsx
export function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={VARIANTS.slideUp}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={TRANSITIONS.default}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

### `StaggerList`

Wrapper pour les grilles de cartes. Chaque enfant reçoit `variants={VARIANTS.slideUp}` automatiquement via la propagation Framer Motion.

```typescript
export function StaggerList({ children, className }: StaggerListProps) {
  return (
    <motion.div
      className={className}
      variants={VARIANTS.stagger}
      initial="initial"
      animate="animate"
    >
      {React.Children.map(children, (child, i) => (
        <motion.div key={i} variants={VARIANTS.slideUp} transition={TRANSITIONS.default}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
```

### `prefers-reduced-motion`

```typescript
// Hook à utiliser dans tous les composants animés
import { useReducedMotion } from 'framer-motion'

function MyComponent() {
  const reduceMotion = useReducedMotion()
  const transition = reduceMotion ? { duration: 0 } : TRANSITIONS.default
  // ...
}
```

---

## Recherche client-side

### Architecture

```
src/data/fleet/ (données brutes)
       ↓
buildSearchIndex() dans SearchProvider (useMemo, une fois)
       ↓
SearchEntry[] en mémoire
       ↓
scoreEntry() à chaque frappe (debounce 150ms)
       ↓
SearchPalette (résultats en temps réel)
       ↓
localStorage 'hc-recent-searches' (historique)
```

### `buildSearchIndex`

```typescript
// src/lib/search.ts
export function buildSearchIndex(sources: SearchSource[]): SearchEntry[] {
  return sources.flatMap(source => source.items.map(item => ({
    id: `${source.section}-${item.id}`,
    titre: item.titre,
    chapeau: item.chapeau ?? '',
    contenu: extractText(item),   // concatène tous les champs texte
    section: source.section,
    categorie: item.categorie ?? source.section,
    href: item.href,
    tags: item.tags ?? [],
  })))
}
```

### Shortcut global

```typescript
// App.tsx ou un hook useSearchShortcut()
useEffect(() => {
  function handler(e: KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      openSearch()
    }
  }
  document.addEventListener('keydown', handler)
  return () => document.removeEventListener('keydown', handler)
}, [openSearch])
```

---

## Navigation par profil

### Flux

```
Accueil → clic carte profil
  → setProfil(id) dans ProfilContext
  → localStorage 'hc-profil' = id
  → redirect vers /profils/{id}
  → Sidebar affiche "Mon parcours" en tête avec ProfilProgress
```

### Sidebar avec profil actif

```typescript
// Sidebar.tsx
const { profil, progress, completion } = useProfilContext()

// Si profil actif → afficher "Mon parcours" avant les sections
{profil && (
  <div className="mb-4">
    <ProfilProgress profil={profil} completion={completion} />
    {profil.parcoursRecommande.map(article => (
      <ParcoursItem
        key={article.href}
        article={article}
        done={progress[article.href] ?? false}
      />
    ))}
  </div>
)}
```

### Indicateur de lien actif avec Framer Motion

```typescript
// Pattern layoutId pour l'indicateur glissant
{isActive && (
  <motion.div
    layoutId="sidebar-active-bar"
    className="absolute left-0 inset-y-0 w-0.5 bg-datako-blue rounded-full"
    transition={TRANSITIONS.springGentle}
  />
)}
```

---

## Alias de chemins

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

```json
// tsconfig.app.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Usage : `import { GUIDES } from '@/data/fleet/transport/guides'`

---

## CI/CD — `.github/workflows/deploy.yml`

```
Push sur master
  → ubuntu-latest
  → npm ci
  → npm run build  (Vite → dist/)
  → peaceiris/actions-gh-pages → branche gh-pages
  → CNAME: fleet-docs.datako.app
```

GitHub Pages sert le contenu de `gh-pages` sur `fleet-docs.datako.app`.

**Premier déploiement** : le workflow se déclenche automatiquement au premier push contenant un `package.json` et un script `build`.

---

## Conventions de nommage

| Élément | Convention | Exemple |
|---|---|---|
| Composants | PascalCase | `ArticleCard.tsx` |
| Pages | PascalCase | `GuideDetail.tsx` |
| Données | UPPER_SNAKE_CASE export | `export const GUIDES` |
| IDs articles | kebab-case | `creer-une-rotation` |
| URLs | kebab-case français | `/transport/guides/creer-une-rotation` |
| localStorage keys | `hc-` préfixe | `hc-profil`, `hc-recent-searches` |
| Fichiers data | camelCase | `guides.ts`, `casParticuliers.ts` |
| CSS variables | `--datako-` préfixe | `--datako-blue` |

---

## Comment ajouter un article

1. Ajouter l'objet dans le bon fichier `src/data/fleet/`
2. La page liste (`GuidesList`) l'affiche automatiquement via `.map()`
3. La page détail (`GuideDetail`) le trouve via `useParams()` + `.find()`
4. Ajouter la route dans `App.tsx` si c'est une nouvelle section (rare)
5. Ajouter l'entrée dans la sidebar (`Sidebar.tsx` → données de navigation)
6. `npx tsc --noEmit` — vérifier zéro erreur

## Comment ajouter une section entière (ex: module Vente V2)

1. Créer `src/data/fleet/vente/` avec les fichiers de données typés
2. Créer les pages dans `src/pages/vente/`
3. Ajouter les routes dans `App.tsx`
4. Ajouter la section dans `Sidebar.tsx`
5. Étendre `buildSearchIndex()` dans `SearchProvider`
6. Ajouter les profils concernés dans `src/data/fleet/profils.ts`

---

## Décisions techniques

| Décision | Choix | Raison |
|---|---|---|
| Framework | React 19 + Vite | Cohérence avec Fleet Manager, rapidité de build |
| Animations | Framer Motion | API déclarative, AnimatePresence, layoutId |
| Routing | react-router-dom v6 | Standard React, Outlet pour Layout |
| State | React Context only | Pas besoin de Zustand pour 2 contextes |
| CSS | Tailwind 3 | Cohérence avec Fleet Manager |
| Icônes | lucide-react | Cohérence avec Fleet Manager |
| Persistance | localStorage | Site statique, pas de backend |
| Deploy | GitHub Actions → GitHub Pages | Gratuit, intégré GitHub, CNAME custom |
| Multi-produit | Non (V1) | YAGNI — `src/data/fleet/` extensible si besoin |
