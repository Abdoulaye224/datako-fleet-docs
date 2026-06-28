# 03 — Description des pages

## Page Accueil (`/`)

### Objectif
Orienter rapidement l'utilisateur vers la section ou le guide dont il a besoin.

### Structure

```
┌─────────────────────────────────────────────────────────┐
│  [logo Datakö]   Datakö Help Center                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Bonjour. Comment pouvons-nous vous aider ?             │
│  ┌─────────────────────────────────────────────────┐    │
│  │  🔍  Rechercher un guide, un indicateur...      │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │ 🚛       │ │ 👥       │ │ 📊       │ │ ❓       │  │
│  │Transport │ │  Rôles   │ │Indicateurs│ │   FAQ    │  │
│  │ 20 guides│ │ 5 rôles  │ │ 7 KPIs   │ │10 questions│ │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
│                                                         │
│  🆕 Nouveautés                                          │
│  ▸ [date] Titre mise à jour 1                           │
│  ▸ [date] Titre mise à jour 2                           │
│                                                         │
│  Démarrage rapide                                       │
│  Je suis nouveau sur Datakö → [Choisir mon rôle]       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Règles
- Barre de recherche : focus automatique à l'ouverture de la page sur desktop
- Cartes catégories : compteur d'articles en sous-titre, clic → section correspondante
- Nouveautés : 3 dernières entrées de `nouveautes.ts`, lien "Voir toutes les nouveautés"
- Démarrage rapide : lien vers `/onboarding/` avec sélection de rôle

---

## Page Résultats de Recherche (`/recherche?q=`)

### Objectif
Afficher les résultats de la recherche client-side de manière claire et hiérarchisée.

### Structure

```
┌─────────────────────────────────────────────────────────┐
│  ← Retour                                               │
│  Résultats pour "cashflow"   (4 résultats)              │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │ 📊 Indicateurs > Cashflow Net                   │    │
│  │ Ce qui reste après paiement du crédit-bail...   │    │
│  └─────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────┐    │
│  │ 🚛 Transport > Pages > Dashboard                │    │
│  │ Le tableau de bord principal : CA, marge...     │    │
│  └─────────────────────────────────────────────────┘    │
│  ...                                                     │
└─────────────────────────────────────────────────────────┘
```

### Règles
- Recherche sur : titres, définitions, formules, étapes de guides, questions FAQ
- Aucun résultat → message d'état + suggestions ("Essayez : rotation, marge, export")
- Chaque résultat : titre + extrait avec terme surligné + badge section
- Tri par pertinence : titre exact > titre partiel > contenu

---

## Page Section / Catégorie

### Exemple : `/transport/guides/`

```
┌────────────┬────────────────────────────────────────────┐
│  Sidebar   │  Transport > Guides                        │
│            │                                            │
│  Transport │  Guides pas-à-pas                          │
│  ├ Pages   │  Comment effectuer les opérations           │
│  ├ Guides ●│  quotidiennes dans Fleet Manager.           │
│  ├ Cycle   │                                            │
│  └ Cas...  │  ┌──────────────────────┐ ┌─────────────┐ │
│            │  │ Ajouter un camion    │ │Ajouter un   │ │
│  Rôles     │  │ → Flotte             │ │client       │ │
│  Indicateurs│  │ Rôle : Admin        │ │→ Clients    │ │
│  FAQ       │  │ 5 étapes            │ │ Rôle : Admin│ │
│            │  └──────────────────────┘ └─────────────┘ │
│            │  ...                                       │
└────────────┴────────────────────────────────────────────┘
```

### Règles
- Cartes : titre + destination dans l'app + rôle requis + nb d'étapes
- Tri : ordre logique d'usage (pas alphabétique)
- Filtres optionnels V2 : par rôle, par difficulté

---

## Page Article

### Structure type (guide pas-à-pas)

```
┌────────────┬──────────────────────────────┬────────────┐
│  Sidebar   │  Accueil > Transport >       │  Sur cette │
│            │  Guides > Créer une rotation │  page      │
│            │                              │            │
│            │  Créer une rotation          │  ▸ Avant   │
│            │  ────────────────────        │    de      │
│            │  Enregistre un trajet dans   │    commencer│
│            │  Fleet Manager.              │  ▸ Étapes  │
│            │                              │  ▸ Résultat│
│            │  ⚠️ Prérequis                │  ▸ Erreurs │
│            │  Un camion et un client      │            │
│            │  doivent exister.            │ (TOC sticky│
│            │                              │  desktop)  │
│            │  Étapes                      │            │
│            │  ① Allez dans "Nouvelle      │            │
│            │    Rotation" dans le menu    │            │
│            │  ② Sélectionnez le camion    │            │
│            │  ③ ...                       │            │
│            │                              │            │
│            │  ✅ Résultat attendu          │            │
│            │  La rotation apparaît dans   │            │
│            │  Livraisons et Gains.        │            │
│            │                              │            │
│            │  💡 Astuce                   │            │
│            │  Si le gain est négatif...   │            │
│            │                              │            │
│            │  Articles connexes           │            │
│            │  ▸ Valider une livraison     │            │
│            │  ▸ Confirmer un paiement     │            │
│            │                              │            │
│            │  ← Précédent   Suivant →     │            │
└────────────┴──────────────────────────────┴────────────┘
```

### Structure type (page de l'application)

```
[Icône] Nom de la page
─────────────────────
Chapeau : ce que vous voyez sur cette page en 2 phrases.

[Ce que vous voyez]
Description narrative de l'interface.

[Pourquoi c'est important]
La valeur métier de cette page.

[Comment lire les données]
Conseils d'interprétation.

💡 Astuce : ...
⚠️ Attention : ...

Articles connexes : ...
```

### Structure type (indicateur)

```
[Icône] Nom de l'indicateur
─────────────────────────────
Définition en une phrase.

Formule :
  [formule lisible]

Exemple :
  [chiffres concrets en GNF]

Comment l'interpréter :
  [conseil actionnable]

⚠️ Erreur fréquente : ...

Voir aussi : [liens indicateurs connexes]
```

---

## Page Rôle (`/roles/administrateur`)

```
┌────────────────────────────────────────────────────────┐
│  🏢 Administrateur                                     │
│  ───────────────────────────────────────               │
│  Mission : Piloter et configurer l'organisation.       │
│  Utilisateurs types : DG, DAF, manager de flotte.      │
│                                                        │
│  ✅ Ce rôle peut :                                     │
│  · Créer, modifier et supprimer des rotations          │
│  · Gérer les véhicules, clients, conducteurs           │
│  · ...                                                 │
│                                                        │
│  ❌ Ce rôle ne peut pas :                              │
│  · Accéder au Backoffice Datakö                        │
│  · ...                                                 │
│                                                        │
│  Exemple concret :                                     │
│  "Le DG configure les camions, ajoute les clients..."  │
│                                                        │
│  Guides pour ce rôle :                                 │
│  ▸ Ajouter un camion   ▸ Créer une rotation   ...      │
│                                                        │
│  [← Opérateur]              [Finance →]                │
└────────────────────────────────────────────────────────┘
```

---

## Page Onboarding (`/onboarding/operateur`)

```
┌────────────────────────────────────────────────────────┐
│  Je suis... [Administrateur ▾]                         │
│                                                        │
│  Bienvenue, Opérateur.                                 │
│  Voici les 5 choses à faire pour être opérationnel.   │
│                                                        │
│  ☑️ 1. Comprendre votre rôle                            │
│        → Lire la page "Opérateur"                      │
│                                                        │
│  ☐  2. Créer votre première rotation                   │
│        → Guide "Créer une rotation"                    │
│                                                        │
│  ☐  3. Valider une livraison                           │
│        → Guide "Valider une livraison"                 │
│                                                        │
│  ☐  4. Confirmer un paiement                           │
│        → Guide "Confirmer un paiement"                 │
│                                                        │
│  ☐  5. Comprendre les indicateurs clés                 │
│        → Gains, Profit par camion                      │
│                                                        │
│  [Marquer tout comme lu]                               │
└────────────────────────────────────────────────────────┘
```

État des cases : stocké dans `localStorage`, pas de backend.

---

## Page FAQ (`/faq`)

```
┌────────────────────────────────────────────────────────┐
│  FAQ — Questions fréquentes                            │
│                                                        │
│  [Toutes ▾] [Opérations] [Finance] [Rôles] [Technique]│
│                                                        │
│  ▸ Pourquoi une rotation n'apparaît pas dans Gains ?   │
│     ─────────────────────────────────────────────────  │
│     Une rotation doit être marquée "Livré" pour...    │
│                                                        │
│  ▸ Comment corriger une erreur sur une rotation ?      │
│  ▸ Pourquoi le Cashflow est différent de la Marge ?    │
│  ...                                                   │
└────────────────────────────────────────────────────────┘
```

Filtre par catégorie : client-side, pas de navigation vers une nouvelle URL.

---

## Page Nouveautés (`/nouveautes`)

```
┌────────────────────────────────────────────────────────┐
│  Nouveautés                                            │
│  Les dernières mises à jour de Datakö Fleet Manager.  │
│                                                        │
│  Juin 2026                                             │
│  ──────────                                            │
│  🆕 White-label — Personnalisez l'interface            │
│     Les organisations peuvent maintenant afficher...   │
│                                                        │
│  🛠️ Amélioration — Vue mobile Propriétaire             │
│     L'espace propriétaire est maintenant responsive.   │
│                                                        │
│  Mai 2026                                              │
│  ────────                                              │
│  ...                                                   │
└────────────────────────────────────────────────────────┘
```

Types d'entrées : `nouveau` (feature) | `amelioration` | `corrige` | `deprecated`
