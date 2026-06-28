# 04 — Navigation

## Sidebar (desktop, ≥ 1024px)

### Position et comportement
- Fixe à gauche, largeur 260px, hauteur 100vh, `position: sticky; top: 0`
- `overflow-y: auto` — scroll indépendant si le contenu déborde
- `bg-surface-2`, séparée du contenu par un `border-r border-border`

### Structure

```
┌─────────────────────┐
│  [logo]  Datakö     │  ← lien vers Accueil
│          Help Center│
├─────────────────────┤
│  🔍 Rechercher...   │  ← input, ouvre la palette
├─────────────────────┤
│  Transport          │  ← section label (non-cliquable)
│    Comprendre       │    ← sous-section
│    les pages  ▾     │
│    ├ Dashboard      │    ← liens articles
│    ├ Livraisons     │
│    └ ...            │
│    Guides     ▾     │
│    ├ Créer rotation │
│    └ ...            │
│    Cycle rotation   │
│    Cas particuliers │
├─────────────────────┤
│  Rôles              │
│  ├ Vue d'ensemble   │
│  ├ Administrateur   │
│  └ ...              │
├─────────────────────┤
│  Indicateurs        │
│  FAQ                │
│  Onboarding         │
│  Nouveautés         │
└─────────────────────┘
```

### Comportement des sections

- Les sections se déploient / ferment via accordéon (clic sur la section label)
- La section active se déploie automatiquement à l'entrée sur une page
- L'article actif est surligné : `bg-surface-3 text-text-primary border-l-2 border-datako-blue`
- Les articles non-actifs : `text-text-muted hover:text-text-secondary`
- Transition d'ouverture : `max-height` 200ms ease-out

### Profondeur maximale
```
Section (Transport)
  └── Sous-section (Guides)
        └── Article (Créer une rotation)
```
Pas de 4ème niveau — si nécessaire, restructurer la section.

---

## Menu mobile (< 1024px)

### Déclencheur
Bouton hamburger `☰` dans le header, en haut à gauche. `aria-label="Ouvrir le menu"`.

### Comportement
- Drawer qui slide depuis la gauche (`transform: translateX(-100%)` → `translateX(0)`)
- Overlay sombre derrière (`bg-black/50`), clic ferme le drawer
- Fermeture : bouton ✕ en haut du drawer ou clic sur l'overlay ou `Escape`
- Contenu identique à la sidebar desktop, optimisé pour le touch (hauteur min 44px par lien)

### Header mobile
```
┌────────────────────────────────────────────┐
│  ☰  [logo] Datakö Fleet Docs    🔍        │
└────────────────────────────────────────────┘
```
- `☰` → ouvre le drawer
- `🔍` → ouvre la palette de recherche

---

## Fil d'Ariane (Breadcrumb)

### Affichage
Desktop uniquement (`hidden lg:flex`). Positionné en haut de la zone de contenu, sous le header.

### Format
```
Accueil  >  Transport  >  Guides  >  Créer une rotation
```

### Règles
- Dernier élément : `text-text-primary font-medium` (non-cliquable)
- Éléments parents : `text-text-muted hover:text-text-secondary`
- Séparateur : `>` en `text-text-muted`
- Pas de fil d'Ariane sur la page Accueil

### Implémentation
```typescript
// Dérivé de la route courante — pas de prop manuelle
// /transport/guides/creer-une-rotation →
// [{ label: 'Accueil', href: '/' },
//  { label: 'Transport', href: '/transport' },
//  { label: 'Guides', href: '/transport/guides' },
//  { label: 'Créer une rotation', href: null }]
```

---

## Recherche

### Comportement global
- Shortcut `Cmd+K` (Mac) / `Ctrl+K` (Windows) — disponible sur toutes les pages
- Clic sur le champ de recherche dans la sidebar ou le header mobile
- Ouvre une palette modale centrée (pas une page dédiée — résultats en temps réel)

### Palette de recherche

```
┌─────────────────────────────────────────────────┐
│  🔍  Rechercher...                         [Esc]│
├─────────────────────────────────────────────────┤
│  Résultats récents                              │
│  ▸ Créer une rotation                           │
│  ▸ Cashflow Net                                 │
├─────────────────────────────────────────────────┤
│  Transport › Guides › Créer une rotation        │
│  Enregistre un trajet dans Fleet Manager...     │
│                                                 │
│  Indicateurs › Cashflow Net                     │
│  Ce qui reste après paiement du crédit-bail...  │
└─────────────────────────────────────────────────┘
```

- Délai de frappe : debounce 150ms
- Navigation clavier : `↑` `↓` entre résultats, `Enter` pour naviguer
- Fermeture : `Escape`, clic hors de la modale
- Résultats max affichés : 8 (les plus pertinents)
- Historique récent : 5 dernières recherches en `localStorage`

### Algorithme de scoring
```
Score = 10  si le terme est dans le titre exact
Score = 7   si le terme est dans le chapeau
Score = 5   si le terme est dans le contenu
Score = 3   si le terme est dans les tags
Score ×2    si la section est "Transport" (section principale)
```

---

## Liens rapides

### "Articles connexes" (bas de chaque article)
```
Articles connexes
─────────────────
→ Valider une livraison
→ Confirmer un paiement
→ Comprendre le gain par rotation
```
- 2 à 4 liens maximum
- Définis manuellement dans `src/data/fleet/` (pas d'algorithme automatique en V1)
- Prop `articlesConnexes: string[]` (IDs des articles)

### "Voir aussi" dans les indicateurs
Liens vers les pages de l'application qui affichent cet indicateur.

### "Guides pour ce rôle"
Sur chaque page de rôle : liste des guides réalisables par ce rôle.
Dérivé de la propriété `roles?: string[]` des guides dans `src/data/fleet/`.

---

## Navigation précédent / suivant

### Contexte d'usage
- Dans les guides pas-à-pas (séquence logique)
- Dans le cycle de vie d'une rotation (étapes 1→6)
- Dans les rôles (Administrateur → Opérateur → Finance → Observateur → Propriétaire)

### Rendu

```
┌─────────────────────────────────────────────────┐
│  ← Ajouter un client          Valider une →      │
│     livraison                 livraison           │
└─────────────────────────────────────────────────┘
```

- Gauche : Précédent (absent sur le premier article)
- Droite : Suivant (absent sur le dernier article)
- Séquence définie dans `src/data/fleet/` par un champ `suivant?: string` et `precedent?: string`

---

## Table des matières article (TOC)

### Affichage
Desktop uniquement, sticky à droite du contenu, pour les articles > 400 mots (heuristique : plus de 3 sections H2).

### Structure
```
Sur cette page
──────────────
▸ Prérequis
▸ Étapes
▸ Résultat attendu
▸ Erreurs fréquentes
▸ Articles connexes
```

- Liens ancrés vers les `id` des titres H2
- L'élément actif (dans la viewport) est surligné : `text-datako-blue`
- Généré automatiquement par le composant `TableOfContents.tsx` depuis les props `sections` de l'article

---

## URL et routing

### Règle de naming
- URLs en kebab-case, en français
- Pas d'IDs numériques dans les URLs
- Pas de paramètres de query pour la navigation (sauf `/recherche?q=`)

### Exemples
```
/                                         ← Accueil
/transport/guides/creer-une-rotation      ← Article guide
/transport/pages/dashboard                ← Article page
/roles/administrateur                     ← Article rôle
/indicateurs/cashflow-net                 ← Article indicateur
/faq                                      ← Liste FAQ
/onboarding/operateur                     ← Onboarding par rôle
/nouveautes                               ← Changelog client
/recherche?q=cashflow                     ← Résultats recherche
```

### 404
Page d'erreur avec : message "Cette page n'existe pas", barre de recherche, lien vers l'Accueil.
