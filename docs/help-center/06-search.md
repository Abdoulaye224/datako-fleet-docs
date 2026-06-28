# 06 — Recherche

## Principes directeurs

- **Client-side uniquement** — pas de serveur, pas d'API. Tout le contenu est dans le bundle JS.
- **Instantanée** — résultats dès la 2ème lettre, debounce 150ms.
- **Accessible** — navigation clavier complète, shortcut `Cmd+K` / `Ctrl+K`.
- **Sans dépendance externe** — pas d'Algolia, pas de Fuse.js en V1. Algorithme maison suffisant pour < 200 articles.

---

## Architecture

### Index de recherche

Généré au démarrage de l'application depuis les fichiers `src/data/`. Structure :

```typescript
interface SearchEntry {
  id: string
  titre: string
  chapeau: string
  contenu: string        // tout le texte de l'article concaténé
  section: string        // 'transport' | 'roles' | 'indicateurs' | 'faq' | 'onboarding' | 'nouveautes'
  categorie: string
  href: string
  tags: string[]
  roles?: string[]
}
```

Construit une fois au `useMemo` dans `SearchContext`, disponible globalement.

---

## Algorithme de scoring

```typescript
function scoreEntry(entry: SearchEntry, query: string): number {
  const q = query.toLowerCase().trim()
  let score = 0

  // Correspondance exacte dans le titre : score maximal
  if (entry.titre.toLowerCase() === q) score += 100

  // Titre commence par le terme
  if (entry.titre.toLowerCase().startsWith(q)) score += 50

  // Titre contient le terme
  if (entry.titre.toLowerCase().includes(q)) score += 30

  // Chapeau contient le terme
  if (entry.chapeau.toLowerCase().includes(q)) score += 20

  // Tags contiennent le terme
  if (entry.tags.some(t => t.toLowerCase().includes(q))) score += 15

  // Contenu contient le terme
  if (entry.contenu.toLowerCase().includes(q)) score += 10

  // Bonus section principale (transport = cœur du produit)
  if (entry.section === 'transport') score *= 1.2

  return score
}

function search(query: string, index: SearchEntry[]): SearchEntry[] {
  if (query.length < 2) return []
  return index
    .map(entry => ({ entry, score: scoreEntry(entry, query) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map(({ entry }) => entry)
}
```

---

## Palette de recherche (`SearchPalette`)

### État interne

```typescript
const [query, setQuery] = useState('')
const [activeIndex, setActiveIndex] = useState(0)
const [recentSearches, setRecentSearches] = useLocalStorage<string[]>('hc-recent-searches', [])

const results = useMemo(() => search(query, searchIndex), [query, searchIndex])
```

### Flux UX

```
Ouverture (Cmd+K ou clic SearchBar)
  → focus automatique sur l'input
  → affichage "Recherches récentes" si query vide

Frappe (debounce 150ms)
  → affichage des résultats scorés (max 8)
  → surligneur du terme dans le titre

Navigation clavier
  ↑ / ↓  → déplace activeIndex
  Enter   → navigue vers l'article actif + ferme la palette + sauvegarde dans recentSearches
  Escape  → ferme la palette, remet query à ''

Clic sur un résultat
  → navigue + ferme + sauvegarde

Fermeture
  → overlay cliquable derrière la modale
  → aucun reset de query (si on réouvre, le dernier terme est encore là)
```

### Rendu

```
┌─────────────────────────────────────────────────────┐
│ overlay bg-black/60 backdrop-blur-sm                │
│                                                     │
│  ┌───────────────────────────────────────────────┐  │
│  │ 🔍  [input query]                      [Esc] │  │
│  ├───────────────────────────────────────────────┤  │
│  │ ▸ Transport › Guides › Créer une rotation    │  │  ← activeIndex=0, bg-surface-3
│  │   Enregistre un trajet dans Fleet Manager... │  │
│  │                                               │  │
│  │   Indicateurs › Cashflow Net                 │  │
│  │   Ce qui reste après paiement du crédit-bail │  │
│  │                                               │  │
│  │   ...                                         │  │
│  ├───────────────────────────────────────────────┤  │
│  │ ↑↓ naviguer  ↵ ouvrir  Esc fermer            │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

- Largeur modale : `max-w-xl w-full mx-4`
- Position : `fixed inset-0 flex items-start justify-center pt-[15vh]`
- Ombre : `shadow-2xl`
- Border : `border border-border`

---

## Surlignage du terme trouvé

```typescript
function highlight(text: string, query: string): JSX.Element {
  const index = text.toLowerCase().indexOf(query.toLowerCase())
  if (index === -1) return <span>{text}</span>
  return (
    <>
      {text.slice(0, index)}
      <mark className="bg-datako-blue/20 text-datako-blue rounded px-0.5">
        {text.slice(index, index + query.length)}
      </mark>
      {text.slice(index + query.length)}
    </>
  )
}
```

Appliqué sur le titre du résultat. Pas sur le chapeau (trop de bruit visuel).

---

## Historique des recherches récentes

```typescript
// localStorage key : 'hc-recent-searches'
// Format : string[] (termes de recherche)
// Limite : 5 entrées max (FIFO)
// Affichage : quand query === '' et recentSearches.length > 0
```

Rendu :
```
Recherches récentes
  🕐 cashflow              ✕
  🕐 créer rotation        ✕
  🕐 rôle opérateur        ✕
```
Clic sur un terme → préremplit l'input.
Clic sur `✕` → supprime du localStorage.

---

## Page de résultats `/recherche?q=`

Pour les utilisateurs qui arrivent via un lien direct avec un terme de recherche, une page dédiée affiche les résultats.

Différence avec la palette : la page n'est pas une modale, elle s'intègre dans le layout normal avec sidebar. Utilisée aussi quand l'utilisateur appuie sur `Enter` depuis la barre de recherche du header mobile (qui n'a pas de palette modale).

```
Résultats pour "cashflow"     (4 résultats)
──────────────────────────────────────────
[ArticleCard] ...
[ArticleCard] ...
[ArticleCard] ...
[ArticleCard] ...
```

Si 0 résultats :
```
Aucun résultat pour "foobar"

Suggestions :
→ Cashflow Net
→ Créer une rotation
→ Retour à l'accueil
```
Suggestions : les 3 articles les plus consultés (top 3 de `recentSearches` global ou hardcodé).

---

## Évolutions V2 (ne pas implémenter en V1)

- **Indexation des ancres** — remonter au bon paragraphe dans un long article (pas seulement la page)
- **Filtres par section** dans la palette ("Chercher uniquement dans Guides")
- **Typos tolérées** — Levenshtein distance ou bibliothèque Fuse.js si le corpus grossit
- **Suggestions à la frappe** (autocomplete dropdown) dans la SearchBar de la sidebar
- **Analytics** — enregistrer les termes recherchés sans résultat pour identifier les lacunes de contenu
