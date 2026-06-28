# 05 — Composants

Inventaire complet des composants à implémenter. Organisés de l'atomique au composé.

---

## Composants atomiques

### `Badge`
```typescript
interface BadgeProps {
  label: string
  variant: 'section' | 'role' | 'difficulte' | 'nouveaute'
  color?: 'blue' | 'emerald' | 'amber' | 'red' | 'purple' | 'slate'
}
```
Rendu : `text-xs px-2 py-0.5 rounded-full border`

Variantes couleur :
- `section` : `bg-surface-3 text-text-muted border-border`
- `role` : couleur par rôle (admin=blue, operator=emerald, finance=amber, viewer=slate, owner=purple)
- `difficulte` : debutant=emerald, intermediaire=amber, avance=red
- `nouveaute` : nouveau=blue, amelioration=emerald, corrige=amber, deprecated=red

---

### `IconWrapper`
Enveloppe une icône lucide-react avec une taille et couleur standardisées.
```typescript
interface IconWrapperProps {
  icon: LucideIcon
  size?: 'sm' | 'md' | 'lg'   // 16 | 20 | 24
  color?: string               // classe Tailwind text-*
}
```

---

### `Divider`
`<hr className="border-t border-border my-6" />`
Utilisé entre les grandes sections d'un article.

---

## Composants de contenu

### `CalloutBlock`
Bloc d'information contextuel. 3 variantes sémantiques.

```typescript
interface CalloutBlockProps {
  variant: 'astuce' | 'attention' | 'exemple'
  title?: string
  children: React.ReactNode
}
```

Rendu par variante :
```
astuce    : bg-blue-500/5   border-blue-500/20  text-blue-300   icône: Lightbulb
attention : bg-amber-500/5  border-amber-500/20 text-amber-300  icône: AlertTriangle
exemple   : bg-emerald-500/5 border-emerald-500/20 text-emerald-300 icône: BookOpen
```

Structure HTML :
```
<div class="rounded-lg border p-4 flex gap-3">
  <Icon size={20} />
  <div>
    [<strong>Titre</strong> si fourni]
    <p>Contenu</p>
  </div>
</div>
```

---

### `StepList` (liste d'étapes numérotées)
```typescript
interface StepListProps {
  steps: string[]
  startFrom?: number   // défaut 1
}
```

Rendu :
```
① Allez dans "Nouvelle Rotation"
② Sélectionnez le camion
③ ...
```
Numéros : cercle `bg-datako-blue text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold`

---

### `CheckList` (prérequis ou résultat)
```typescript
interface CheckListProps {
  items: string[]
  variant: 'prerequis' | 'resultat' | 'erreur'
}
```
Icônes :
- `prerequis` : `Circle` (creux) — choses à avoir avant de commencer
- `resultat` : `CheckCircle2` emerald — ce qui doit se passer
- `erreur` : `XCircle` red — erreurs fréquentes à éviter

---

### `Timeline` (cycle de vie)
```typescript
interface TimelineStep {
  numero: number
  titre: string
  description: string
  complete?: boolean
}

interface TimelineProps {
  steps: TimelineStep[]
}
```

Rendu vertical :
```
●── 1. Création
│        Saisie dans "Nouvelle Rotation"
│
●── 2. Gain estimé
│        Calcul automatique
│
○── 3. En route   ← étape future (cercle vide)
         La livraison est en cours
```

- Ligne verticale entre les étapes : `border-l-2 border-border ml-3`
- Étape passée/active : cercle plein `bg-datako-blue`
- Étape future : cercle vide `border-2 border-border`
- `complete` prop : toutes les étapes pleines quand `true`

---

### `FormulaBlock` (affichage formule financière)
```typescript
interface FormulaBlockProps {
  formule: string
  exemple?: string
}
```

Rendu :
```
┌─────────────────────────────────────────┐
│  Marge d'Exploitation =                 │
│  Marge Produit − Coûts Exploitation     │
│                                         │
│  Exemple : 12M − 4M = 8M GNF           │
└─────────────────────────────────────────┘
```
Style : `bg-surface-3 border border-border rounded-lg p-4 font-mono text-sm`

---

### `RolePermissionGrid` (tableau comparatif des rôles)
```typescript
interface Permission {
  action: string
  admin: boolean
  operator: boolean
  finance: boolean
  viewer: boolean
  owner: boolean
}

interface RolePermissionGridProps {
  permissions: Permission[]
}
```

Rendu : tableau HTML avec entêtes de colonnes (rôles) et lignes (actions).
Cellule : `✅` ou `—`
Responsive : scroll horizontal sur mobile.

---

### `ArticleCard` (carte lien vers un article)
```typescript
interface ArticleCardProps {
  titre: string
  chapeau: string
  href: string
  section?: string
  badge?: string
}
```

Rendu :
```
┌──────────────────────────────────────────┐
│  [badge section]                         │
│  Titre de l'article                      │
│  Chapeau court en 1-2 phrases...         │
│  → Lire l'article                        │
└──────────────────────────────────────────┘
```
Hover : `border-datako-blue/50 bg-surface-3`

---

### `SectionCard` (carte catégorie sur Accueil)
```typescript
interface SectionCardProps {
  icon: LucideIcon
  titre: string
  description: string
  nbArticles: number
  href: string
}
```

Plus grande qu'`ArticleCard`, icône centrée en haut.

---

### `GuideCard` (carte guide dans la liste des guides)
```typescript
interface GuideCardProps {
  titre: string
  objectif: string
  nbEtapes: number
  roles: string[]
  href: string
}
```

---

## Composants de mise en page

### `Layout`
Shell principal : sidebar + zone contenu.

```typescript
interface LayoutProps {
  children: React.ReactNode
}
```

Structure :
```tsx
<div className="flex min-h-screen bg-surface">
  <Sidebar className="hidden lg:flex" />
  <main className="flex-1 overflow-y-auto">
    <MobileHeader className="lg:hidden" />
    <div className="max-w-3xl mx-auto px-4 lg:px-8 py-8">
      {children}
    </div>
  </main>
</div>
```

---

### `Sidebar`
Navigation desktop. Voir `04-navigation.md` pour le détail de la structure.

```typescript
interface SidebarProps {
  activeHref: string
}
```

---

### `MobileHeader`
Header visible uniquement mobile :
```typescript
// Pas de props — utilise le router pour le titre actif
```
Contient : bouton hamburger, logo, bouton recherche.

---

### `MobileMenu`
Drawer mobile. Contenu identique à `Sidebar`.

```typescript
interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  activeHref: string
}
```

---

### `Breadcrumb`
Fil d'Ariane. Desktop uniquement (`hidden lg:flex`).

```typescript
interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}
```

---

### `TableOfContents`
Table des matières sticky à droite. Desktop uniquement.

```typescript
interface TOCItem {
  id: string
  label: string
}

interface TableOfContentsProps {
  items: TOCItem[]
  activeId?: string
}
```

Implémentation : `IntersectionObserver` pour détecter l'élément actif dans le viewport.

---

### `PrevNext`
Navigation précédent / suivant en bas d'article.

```typescript
interface PrevNextProps {
  precedent?: { titre: string; href: string }
  suivant?: { titre: string; href: string }
}
```

---

### `ArticlesConnexes`
Bloc "Articles connexes" en bas d'article.

```typescript
interface ArticlesConnexesProps {
  articles: Array<{ titre: string; href: string; section: string }>
}
```

---

## Composants interactifs

### `SearchPalette`
Modale de recherche globale. Activée par `Cmd+K` ou clic sur SearchBar.

```typescript
interface SearchPaletteProps {
  isOpen: boolean
  onClose: () => void
}
```

État interne : `query` string, `results` array, `activeIndex` number, `recentSearches` from localStorage.

---

### `SearchBar`
Input déclencheur (dans sidebar et header mobile). Ouvre `SearchPalette` au clic, n'effectue pas la recherche lui-même.

```typescript
// Pas de props — état géré par le contexte global SearchContext
```

---

### `Accordion` (FAQ)
```typescript
interface AccordionItem {
  question: string
  reponse: string
  categorie: string
}

interface AccordionProps {
  items: AccordionItem[]
  filtreCategorie?: string
}
```

Un seul item ouvert à la fois. Animation `max-height` 200ms.

---

### `OnboardingChecklist`
```typescript
interface OnboardingStep {
  titre: string
  description: string
  href: string
}

interface OnboardingChecklistProps {
  role: string
  steps: OnboardingStep[]
}
```

État des cases : `localStorage` keyed par `role`. Bouton "Tout réinitialiser".

---

### `CategoryFilter` (FAQ)
Tabs ou boutons pilules pour filtrer par catégorie.

```typescript
interface CategoryFilterProps {
  categories: string[]
  active: string
  onChange: (cat: string) => void
}
```

---

## Composants de données (V2)

Ces composants sont spécifiés mais pas à implémenter en V1 :

### `ScreenshotFrame` (V2)
Encadre une image de capture d'écran avec un label et un numéro d'annotation.

### `VideoEmbed` (V2)
Embed Loom ou YouTube avec thumbnail et bouton Play custom.

### `ComparisonTable` (V2)
Tableau comparatif à 2+ colonnes avec surlignage de la colonne recommandée.

---

## Ordre d'implémentation suggéré

1. `Layout` + `Sidebar` + `MobileHeader` + `MobileMenu` — shell de l'app
2. `CalloutBlock` + `StepList` + `CheckList` — contenu de base
3. `ArticleCard` + `SectionCard` — pages liste
4. `Timeline` — cycle rotation
5. `Accordion` — FAQ
6. `SearchPalette` + `SearchBar` — recherche
7. `OnboardingChecklist` — onboarding
8. `Breadcrumb` + `PrevNext` + `TableOfContents` + `ArticlesConnexes` — navigation fine
9. `Badge` + `FormulaBlock` + `RolePermissionGrid` — enrichissement contenu
