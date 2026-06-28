# 09 — UX Premium & Interactions

## Vision

Le Help Center n'est pas un site de documentation ordinaire. C'est la vitrine de la qualité produit Datakö. Quand un prospect ou un client ouvre ce site, il doit ressentir la même rigueur que dans Fleet Manager — voire plus.

L'objectif : une documentation qu'on **a envie** d'utiliser. Fluide, réactive, belle. Digne d'un SaaS professionnel.

---

## Librairie d'animations

### Framer Motion (obligatoire)

```bash
npm install framer-motion
```

Framer Motion est la référence pour les animations React : API déclarative, gestion du `AnimatePresence` pour les entrées/sorties, `layout` animations, `whileHover`/`whileTap`.

**Ne pas utiliser** : react-spring, GSAP, ou des keyframes CSS à la main pour les animations de composants. Réserver CSS uniquement pour les micro-transitions simples (`transition` sur `border-color`, `opacity`).

---

## Système d'animation

### Tokens d'animation

```typescript
// src/lib/motion.ts
export const TRANSITIONS = {
  fast:    { duration: 0.15, ease: 'easeOut' },
  default: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] },  // easeOutQuart
  slow:    { duration: 0.4,  ease: [0.25, 0.46, 0.45, 0.94] },
  spring:  { type: 'spring', stiffness: 400, damping: 30 },
  springGentle: { type: 'spring', stiffness: 200, damping: 25 },
}

export const VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit:    { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit:    { opacity: 0, y: -8 },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit:    { opacity: 0, x: -20 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit:    { opacity: 0, scale: 0.95 },
  },
  stagger: {
    animate: { transition: { staggerChildren: 0.06 } },
  },
}
```

### Règle d'or : moins = mieux

- **Entrée de page** : `slideUp` 0.25s — toujours
- **Cartes en liste** : stagger 0.06s entre chaque carte
- **Modale / Drawer** : `scaleIn` 0.2s pour la modale, `slideInLeft` 0.25s pour le drawer
- **Hover** : CSS transition 0.15s, pas Framer Motion (perf)
- **Accordéon** : `AnimatePresence` + `height` animée via `motion.div`
- Jamais d'animation > 0.5s sur les interactions répétées

---

## Page transitions

```typescript
// src/components/PageTransition.tsx
import { motion } from 'framer-motion'
import { VARIANTS, TRANSITIONS } from '@/lib/motion'

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={VARIANTS.slideUp}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={TRANSITIONS.default}
    >
      {children}
    </motion.div>
  )
}
```

Wrapper tous les composants `<Page />` dans `<PageTransition>`. Utiliser `AnimatePresence` dans le router.

---

## Cartes interactives

### SectionCard (page Accueil)

```typescript
// Comportement hover premium
<motion.div
  whileHover={{ y: -4, transition: TRANSITIONS.spring }}
  whileTap={{ scale: 0.98 }}
  className="relative overflow-hidden rounded-xl border border-border bg-surface-2 p-6 cursor-pointer group"
>
  {/* Gradient glow au hover — masqué par défaut */}
  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
    bg-gradient-to-br from-datako-blue/5 to-purple-500/5" />

  {/* Icône avec ring animé */}
  <motion.div
    className="w-12 h-12 rounded-xl bg-datako-blue/10 flex items-center justify-center mb-4"
    whileHover={{ scale: 1.1, rotate: 3 }}
    transition={TRANSITIONS.spring}
  >
    <Icon className="text-datako-blue" size={24} />
  </motion.div>

  <h3 className="font-semibold text-text-primary group-hover:text-datako-blue transition-colors">
    {titre}
  </h3>
  <p className="text-sm text-text-muted mt-1">{description}</p>
  <span className="text-xs text-text-muted mt-3 block">{nbArticles} articles</span>

  {/* Flèche apparaissant au hover */}
  <motion.div
    className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100"
    initial={{ x: -4 }}
    whileHover={{ x: 0 }}
    transition={TRANSITIONS.fast}
  >
    <ArrowRight size={16} className="text-datako-blue" />
  </motion.div>
</motion.div>
```

### ArticleCard

```typescript
<motion.a
  href={href}
  whileHover={{ x: 4 }}
  transition={TRANSITIONS.fast}
  className="flex items-start gap-3 p-4 rounded-lg border border-border
    hover:border-datako-blue/30 hover:bg-surface-3 transition-colors group"
>
  <div className="mt-0.5 text-text-muted group-hover:text-datako-blue transition-colors">
    <FileText size={16} />
  </div>
  <div className="flex-1 min-w-0">
    <p className="text-sm font-medium text-text-primary group-hover:text-datako-blue transition-colors truncate">
      {titre}
    </p>
    <p className="text-xs text-text-muted mt-0.5 line-clamp-2">{chapeau}</p>
  </div>
  <motion.div
    className="opacity-0 group-hover:opacity-100 text-datako-blue flex-shrink-0 mt-0.5"
    animate={{ x: 0 }}
    whileHover={{ x: 2 }}
    transition={TRANSITIONS.fast}
  >
    <ChevronRight size={14} />
  </motion.div>
</motion.a>
```

### ProfilCard (page /profils/)

```typescript
// Carte profil — effet premium au hover
<motion.div
  layoutId={`profil-${id}`}  // pour la transition vers la page détail
  whileHover={{ y: -6, scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={TRANSITIONS.springGentle}
  className="relative rounded-2xl border border-border bg-surface-2 p-6 cursor-pointer overflow-hidden"
>
  {/* Gradient de fond animé */}
  <motion.div
    className="absolute inset-0 opacity-0 pointer-events-none"
    whileHover={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
    style={{
      background: `radial-gradient(circle at 30% 50%, ${profilColor}15, transparent 70%)`
    }}
  />

  <div className="text-4xl mb-3">{emoji}</div>
  <h3 className="font-semibold text-text-primary">{nom}</h3>
  <p className="text-sm text-text-muted mt-1">{sousTitre}</p>

  {/* Modules */}
  <div className="flex gap-2 mt-4">
    {modules.map(m => <Badge key={m} label={m} variant="section" />)}
  </div>

  {/* CTA */}
  <motion.div
    className="mt-5 flex items-center gap-1 text-datako-blue text-sm font-medium"
    whileHover={{ gap: '0.5rem' }}
  >
    <span>Voir mon parcours</span>
    <ArrowRight size={14} />
  </motion.div>
</motion.div>
```

---

## Stagger lists

Les listes de cartes doivent apparaître en cascade :

```typescript
// src/components/StaggerList.tsx
import { motion } from 'framer-motion'
import { VARIANTS, TRANSITIONS } from '@/lib/motion'

interface StaggerListProps {
  children: React.ReactNode[]
  className?: string
}

export function StaggerList({ children, className }: StaggerListProps) {
  return (
    <motion.div
      className={className}
      variants={VARIANTS.stagger}
      initial="initial"
      animate="animate"
    >
      {children.map((child, i) => (
        <motion.div key={i} variants={VARIANTS.slideUp} transition={TRANSITIONS.default}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
```

Usage : `<StaggerList className="grid grid-cols-2 gap-4">` sur toutes les grilles de cartes.

---

## Recherche premium

### SearchPalette — expérience Spotlight

Inspirée de la Command Palette Linear / Raycast :

```
┌──────────────────────────────────────────────────────┐
│  [fond blur + overlay]                               │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │ 🔍  Rechercher...                        Esc  │  │
│  │                                                │  │
│  │  Résultats (4)                                 │  │
│  │  ─────────────────────────────────────────     │  │
│  │  🚛 Transport › Guides                         │  │
│  │  ❯  Créer une rotation    ← surligné, actif   │  │ ← bg-surface-3, left-accent-bar blue
│  │     Enregistre un trajet...                   │  │
│  │                                                │  │
│  │     Valider une livraison                      │  │
│  │     Confirme le volume livré...               │  │
│  │                                                │  │
│  │  📊 Indicateurs                                │  │
│  │     Gain par rotation                          │  │
│  │     Ce que vous gagnez sur...                 │  │
│  │  ─────────────────────────────────────────     │  │
│  │  ↑↓ naviguer  ↵ ouvrir  Esc fermer            │  │
│  └────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘
```

Détails d'implémentation :
- Backdrop : `backdrop-blur-md bg-black/60`
- Modale : `bg-surface-2 rounded-2xl shadow-2xl border border-border`
- Animation d'ouverture : `scaleIn` depuis `scale(0.97)` en 0.15s
- Groupement des résultats par section (Transport, Indicateurs, FAQ...)
- Terme surlighté en `bg-datako-blue/20 text-datako-blue rounded px-0.5`
- Résultat actif : `bg-surface-3 border-l-2 border-datako-blue`
- Shortcut affiché : `⌘K` dans un `kbd` stylé

### Effet d'apparition des résultats

```typescript
// Les résultats apparaissent en stagger dès la frappe
<AnimatePresence mode="wait">
  <motion.div
    key={query}  // re-anime à chaque nouvelle query
    variants={VARIANTS.stagger}
    initial="initial"
    animate="animate"
  >
    {results.map((r, i) => (
      <motion.div key={r.id} variants={VARIANTS.slideUp} transition={{ duration: 0.1, delay: i * 0.03 }}>
        <SearchResult result={r} active={i === activeIndex} query={query} />
      </motion.div>
    ))}
  </motion.div>
</AnimatePresence>
```

---

## Sidebar premium

### Indicateur d'article actif

```typescript
// Barre animée sur le lien actif — partage le layoutId entre les liens
// pour que la barre "glisse" d'un lien à l'autre
{isActive && (
  <motion.div
    layoutId="sidebar-active-indicator"
    className="absolute left-0 top-0 bottom-0 w-0.5 bg-datako-blue rounded-full"
    transition={TRANSITIONS.springGentle}
  />
)}
```

### Accordéon section

```typescript
// Hauteur animée proprement avec Framer Motion
<motion.div
  initial={false}
  animate={{ height: isOpen ? 'auto' : 0 }}
  transition={TRANSITIONS.default}
  className="overflow-hidden"
>
  {children}
</motion.div>
```

### Scroll indicator

Ombre en haut et en bas de la sidebar quand le contenu déborde :

```css
.sidebar-scroll::before,
.sidebar-scroll::after {
  content: '';
  position: sticky;
  display: block;
  height: 24px;
  pointer-events: none;
}
.sidebar-scroll::before {
  top: 0;
  background: linear-gradient(to bottom, var(--surface-2), transparent);
}
.sidebar-scroll::after {
  bottom: 0;
  background: linear-gradient(to top, var(--surface-2), transparent);
}
```

---

## Parcours guidé par profil

### Barre de progression

En haut du parcours dans la sidebar :

```
Mon parcours (3/10)
████████░░░░░░░░░░  30%
```

```typescript
<div className="mb-4">
  <div className="flex justify-between text-xs text-text-muted mb-1.5">
    <span>Mon parcours</span>
    <span>{done}/{total}</span>
  </div>
  <div className="h-1 bg-surface-3 rounded-full overflow-hidden">
    <motion.div
      className="h-full bg-datako-blue rounded-full"
      initial={{ width: 0 }}
      animate={{ width: `${(done / total) * 100}%` }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    />
  </div>
</div>
```

### Validation d'étape

Quand l'utilisateur coche une étape :
- Animation de la coche (scale 0 → 1, 200ms, spring)
- Barre de progression se remplit en douceur
- Confetti micro-animation si 100% atteint (optionnel V2)

```typescript
// Coche animée
<motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={TRANSITIONS.spring}
  className="text-emerald-400"
>
  <CheckCircle2 size={16} />
</motion.div>
```

---

## Timeline animée

Le composant `Timeline` (cycle rotation) utilise un effet de "reveal" progressif :

```typescript
// Chaque étape se révèle en séquence (utilisé sur la page /transport/cycle)
{steps.map((step, i) => (
  <motion.div
    key={step.numero}
    initial={{ opacity: 0, x: -16 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ ...TRANSITIONS.default, delay: i * 0.1 }}
  >
    <TimelineStep step={step} />
  </motion.div>
))}
```

La ligne verticale entre les étapes se "dessine" avec un `scaleY` animé depuis le haut.

---

## Onboarding Checklist

### Confetti à la complétion

```typescript
// Quand toutes les cases sont cochées
useEffect(() => {
  if (progress === 100) {
    // Micro-confetti localisé (pas de lib externe — canvas 2D custom ou canvas-confetti)
    triggerMicroConfetti()
  }
}, [progress])
```

### Animation de case à cocher

```typescript
<motion.button
  onClick={handleCheck}
  whileTap={{ scale: 0.9 }}
  className="..."
>
  <AnimatePresence mode="wait">
    {checked ? (
      <motion.div key="checked" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={TRANSITIONS.spring}>
        <CheckCircle2 className="text-emerald-400" size={18} />
      </motion.div>
    ) : (
      <motion.div key="unchecked" initial={{ scale: 0 }} animate={{ scale: 1 }}>
        <Circle className="text-text-muted" size={18} />
      </motion.div>
    )}
  </AnimatePresence>
</motion.button>
```

---

## Mobile — expérience responsive premium

### Drawer menu mobile

```typescript
// Slide-in depuis la gauche avec overlay animé
<AnimatePresence>
  {isOpen && (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={TRANSITIONS.fast}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      {/* Drawer */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={TRANSITIONS.springGentle}
        className="fixed left-0 top-0 bottom-0 w-72 bg-surface-2 z-50 overflow-y-auto"
      >
        {/* contenu */}
      </motion.div>
    </>
  )}
</AnimatePresence>
```

### Swipe pour fermer le drawer (mobile)

```typescript
// Fermeture du drawer au swipe gauche (drag)
<motion.div
  drag="x"
  dragConstraints={{ left: 0, right: 0 }}
  dragElastic={{ left: 0.3, right: 0 }}
  onDragEnd={(_, info) => {
    if (info.offset.x < -80) onClose()
  }}
  // ...
>
```

### Touch targets

- Minimum 44×44px sur tous les éléments cliquables
- Espacement généreux entre items dans le drawer (min 40px de hauteur)
- Pas d'éléments trop proches sur mobile

---

## Micro-interactions catalogue

| Élément | Interaction | Implémentation |
|---|---|---|
| Lien sidebar | Barre bleue glisse vers le nouveau lien | `layoutId="sidebar-active"` Framer |
| Carte section | Lévite de 4px, gradient glow | `whileHover={{ y: -4 }}` + CSS |
| Bouton CTA | Scale down au clic | `whileTap={{ scale: 0.97 }}` |
| Case onboarding | Coche spring + progress | `AnimatePresence` + spring |
| Résultat recherche | Slide up en stagger | `variants={VARIANTS.stagger}` |
| Accordéon FAQ | Hauteur animée | `animate={{ height: 'auto' }}` |
| Page transition | Slide up fade | `PageTransition` wrapper |
| Badge profil | Pulse au chargement | `initial scale 0 → 1` |
| Barre progression | Fill gauche → droite | `motion.div width animate` |
| Menu mobile | Slide depuis gauche + overlay fade | `AnimatePresence` + `x: -100%` |
| Shortcut Cmd+K | Pulse sur le badge kbd | `whileHover scale 1.05` |
| Article connexe | Translate X +4px | `whileHover={{ x: 4 }}` |
| PrevNext bouton | Arrow se déplace | `whileHover` translate |
| Timeline étape | Reveal au scroll | `whileInView` Framer |
| TOC lien actif | Couleur change smooth | CSS `transition-colors 150ms` |

---

## Accessibilité et performance

### `prefers-reduced-motion`

```typescript
import { useReducedMotion } from 'framer-motion'

export function useMotionSafe() {
  const reduce = useReducedMotion()
  return reduce
    ? { duration: 0 }
    : TRANSITIONS.default
}
```

Toujours respecter `prefers-reduced-motion`. Les utilisateurs qui ont activé ce paramètre ne verront pas d'animations — le contenu doit rester totalement fonctionnel.

### Performance budget

- Bundle Framer Motion : ~45kb gzip — acceptable
- Pas d'animation sur les éléments qui défilent rapide (`scroll-linked`)
- `will-change: transform` uniquement sur les éléments réellement animés
- Pas d'animation de `box-shadow` (coûteuse GPU) — préférer `opacity` + `border-color`

### Lazy loading

```typescript
// Les pages sont lazy-loadées (code splitting par route)
const Transport = lazy(() => import('./pages/Transport'))
const Profils = lazy(() => import('./pages/Profils'))
// ... etc
```

`Suspense` avec un fallback minimaliste (spinner `opacity` animé, pas de skeleton complex).

---

## Typographie premium

### Hiérarchie visuelle dans les articles

```css
/* Titres d'article — léger gradient sur les H1 */
h1.article-title {
  background: linear-gradient(135deg, #F1F5F9 60%, #94A3B8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

/* Numéros d'étapes — style badge premium */
.step-number {
  background: linear-gradient(135deg, #2563EB, #7C3AED);
  color: white;
  font-weight: 700;
  /* ... */
}
```

### Code inline

```css
code.inline {
  background: rgba(59, 130, 246, 0.08);
  border: 1px solid rgba(59, 130, 246, 0.15);
  color: #93C5FD;
  border-radius: 4px;
  padding: 1px 6px;
  font-size: 0.875em;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}
```

---

## Philosophie UX finale

> "La meilleure animation est celle qu'on ne remarque pas — mais dont on ressent l'absence."

Chaque interaction doit avoir **un rôle** :
- **Transitions de page** → signaler le changement de contexte
- **Stagger des cartes** → donner de la profondeur, pas juste "c'est joli"
- **Hover states** → confirmer que l'élément est cliquable
- **Animations de validation** → récompenser l'utilisateur (case cochée, parcours complété)
- **Drawer slide** → ancrer spatialement le menu (il vient de la gauche, il y retourne)

Ne jamais animer pour animer. Si supprimer une animation ne dégrade pas l'expérience — la supprimer.
