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
React 19 + TypeScript + Vite + Tailwind CSS 3
```

Pas de framework de doc (Docusaurus, VitePress, etc.) — site React custom pour garder la flexibilité de design.

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
    transport.ts     ← contenu section Transport (pages, guides, FAQ)
    vente.ts         ← contenu section Vente/Distribution (V2)
    roles.ts         ← contenu section Rôles
    indicateurs.ts   ← contenu section Indicateurs
    faq.ts           ← FAQ globale
  components/
    Layout.tsx       ← shell : sidebar sticky + header mobile
    Sidebar.tsx      ← sommaire latéral desktop
    MobileMenu.tsx   ← menu accordéon mobile
    SearchBar.tsx    ← recherche client-side
    Section.tsx      ← bloc de section réutilisable
    CalloutBlock.tsx ← blocs Astuce/Attention/Exemple
    Timeline.tsx     ← composant timeline pour cycle rotation
  pages/
    Home.tsx
    Transport.tsx
    Roles.tsx
    Indicateurs.tsx
    FAQ.tsx
  App.tsx
  main.tsx
```

**Règle d'architecture** : le contenu est dans `src/data/` sous forme de tableaux TypeScript (pas de JSX en dur dans les pages). Les pages itèrent sur ces tableaux. Cela permet d'ajouter facilement une section Vente, WhatsApp, Portail Propriétaire plus tard.

## Règles de développement

- `npx tsc --noEmit` doit passer sans erreur avant chaque commit.
- Pas de bibliothèques inutiles — Tailwind + lucide-react suffisent.
- Responsive : desktop (sidebar sticky) + mobile (menu accordéon).
- Pas de backend, pas d'auth, pas de Supabase.
- Pas de vraies captures d'écran — utiliser des icônes lucide-react comme illustrations.
- Langue : **français** partout.

## Ce que Copilot NE doit PAS faire

- Modifier le repo `datako-fleet-manager`
- Créer un backend ou une base de données
- Installer Docusaurus, VitePress ou tout autre framework de doc
- Utiliser du contenu inventé sur Datakö — s'appuyer uniquement sur `BRIEF.md`

## Voir aussi

- `BRIEF.md` — contenu complet de chaque section, structure des données, critères d'acceptation
