# 01 — Architecture de l'information

## Arborescence complète

```
help.datako.app/
│
├── /profils/                      ← Sélecteur de profil (point d'entrée recommandé)
│   ├── /profils/transporteur
│   ├── /profils/marketeur
│   ├── /profils/mixte
│   ├── /profils/proprietaire
│   ├── /profils/dg
│   ├── /profils/comptable
│   ├── /profils/daf
│   ├── /profils/operateur
│   ├── /profils/logistique
│   └── /profils/super-admin
│
├── /                              ← Accueil
│   ├── Barre de recherche globale
│   ├── Catégories en cartes (Transport, Rôles, Indicateurs, FAQ)
│   ├── Mise en avant : "Nouveautés" (derniers articles publiés)
│   └── Lien vers Onboarding rapide
│
├── /transport/                    ← Module Transport (V1)
│   ├── /transport/pages           ← Comprendre les pages de l'application
│   │   ├── dashboard
│   │   ├── nouvelle-rotation
│   │   ├── livraisons
│   │   ├── flotte
│   │   ├── clients
│   │   ├── gains
│   │   ├── profit-par-camion
│   │   ├── cashflow
│   │   ├── simulations
│   │   └── repartition-acteurs
│   ├── /transport/guides          ← Guides pas-à-pas (actions concrètes)
│   │   ├── ajouter-un-camion
│   │   ├── ajouter-un-client
│   │   ├── creer-une-rotation
│   │   ├── valider-une-livraison
│   │   ├── confirmer-un-paiement
│   │   ├── ajouter-une-charge-fixe
│   │   ├── ajouter-une-maintenance
│   │   ├── generer-releve-client-pdf
│   │   ├── generer-bilan-proprietaire
│   │   └── exporter-excel
│   ├── /transport/cycle           ← Cycle de vie d'une rotation (timeline)
│   └── /transport/cas-particuliers ← Cas complexes (volume manquant, véhicule géré, etc.)
│
├── /roles/                        ← Les rôles utilisateur (V1)
│   ├── /roles/vue-densemble       ← Tableau comparatif tous rôles
│   ├── /roles/administrateur
│   ├── /roles/operateur
│   ├── /roles/finance
│   ├── /roles/observateur
│   └── /roles/proprietaire
│
├── /indicateurs/                  ← Comprendre les indicateurs (V1)
│   ├── /indicateurs/ca-transport
│   ├── /indicateurs/marge-produit
│   ├── /indicateurs/marge-exploitation
│   ├── /indicateurs/cashflow-net
│   ├── /indicateurs/gain-par-rotation
│   ├── /indicateurs/part-proprietaire
│   └── /indicateurs/charges-fixes-vehicule
│
├── /faq/                          ← FAQ globale (V1)
│   ├── Filtrage par catégorie (Opérations / Finance / Rôles / Technique)
│   └── Liste de toutes les questions
│
├── /onboarding/                   ← Parcours guidé par rôle (V1)
│   ├── /onboarding/administrateur
│   ├── /onboarding/operateur
│   ├── /onboarding/finance
│   └── /onboarding/proprietaire
│
├── /nouveautes/                   ← Changelog client (V1 allégé → V2 complet)
│   └── Liste des mises à jour produit, les plus récentes en premier
│
├── /recherche/                    ← Résultats de recherche
│
│   ─── V2 (après validation V1) ────────────────────────────────────
│
├── /vente/                        ← Module Vente/Distribution
│   ├── pages, guides, indicateurs vente
│
├── /whatsapp/                     ← Module WhatsApp
│   ├── conducteur, DG, chef exploitation
│
└── /portail-proprietaire/         ← Portail Propriétaire
    ├── accès, bilan, PDF
```

---

## Navigation par profil — première classe

La navigation par profil n'est pas un filtre optionnel. C'est la **porte d'entrée principale** pour les nouveaux utilisateurs.

À l'arrivée sur l'Accueil, le call-to-action principal est "Quel est votre profil ?" — avant même les cartes de sections. L'utilisateur choisit son profil, et la sidebar se réorganise pour mettre son parcours en tête.

Un utilisateur qui ne choisit pas de profil peut toujours naviguer librement (mode "Tout afficher").

Le profil est persisté en `localStorage`. Il peut être changé depuis un pill dans le header.

Pour le détail des 10 profils et leurs parcours : voir `08-profils.md`.

---

## Catégories et leur logique

### `/profils/` (première classe, V1)
Sélecteur de profil avec grille de cartes interactives. Chaque profil a une page dédiée : parcours recommandé, actions typiques, erreurs fréquentes, indicateurs, exports.

### Transport (cœur du produit, V1)
Tout ce qui concerne le module transport : enregistrement des rotations, suivi des livraisons, gestion de la flotte, facturation. C'est là que 80% des utilisateurs passent 80% de leur temps.

Sous-catégories :
- **Pages** — description narrative de chaque écran de l'application
- **Guides** — tâches concrètes à accomplir, format étapes numérotées
- **Cycle** — vue d'ensemble du parcours complet d'une rotation
- **Cas particuliers** — situations moins fréquentes mais importantes

### Rôles (transverse, V1)
Documentation de chaque rôle : mission, droits, restrictions, exemple d'usage. Sert aussi bien à l'onboarding d'un nouveau membre qu'à expliquer à un propriétaire pourquoi il ne voit pas certaines pages.

### Indicateurs (transverse, V1)
Glossaire enrichi : chaque KPI a une définition, une formule, un exemple chiffré et un conseil d'interprétation. Ciblé DG et DAF qui veulent comprendre ce qu'ils lisent.

### FAQ (transverse, V1)
Questions courantes regroupées par catégorie. Format accordéon. Point d'entrée pour les utilisateurs qui ne savent pas dans quelle section chercher.

### Onboarding (transverse, V1)
Parcours séquentiels par rôle. Un nouvel opérateur suit les étapes dans l'ordre et arrive autonome en 10 minutes. Format checklist / étapes.

### Nouveautés (V1 allégé)
Les mises à jour produit accessibles aux clients. Pas un changelog technique — un résumé en langage client ("Vous pouvez maintenant exporter les livraisons en Excel", "Le Portail Propriétaire est disponible").

---

## Hiérarchie du contenu

```
Section (Transport, Rôles...)
  └── Catégorie (Pages, Guides, Cas particuliers...)
        └── Article (une question = un article)
```

Un article est l'unité atomique de contenu. Il a :
- Un titre (= la question ou l'action)
- Un chapeau (résumé en 1-2 phrases)
- Un corps (étapes, explication, exemple)
- Des callouts (Astuce / Attention / Exemple)
- Des liens vers articles connexes

---

## Organisation du contenu dans le code

```
src/data/
  transport/
    pages.ts          ← 10 pages, chacune { name, see, why, read }
    guides.ts         ← 10 guides, chacun { title, objectif, prerequis, etapes, resultat, erreurs }
    cycle.ts          ← 6 étapes du cycle rotation
    casParticuliers.ts ← N cas { titre, contexte, regle, exemple }
  roles.ts            ← 5 rôles { id, nom, peutFaire, nePeutPasFaire, exemple }
  indicateurs.ts      ← 7 indicateurs { nom, definition, formule, exemple, conseil }
  faq.ts              ← N questions { question, reponse, categorie }
  profils.ts          ← 10 profils { id, nom, modules, parcoursRecommande, actionsTupiques, erreurs, indicateurs, exports }
  onboarding.ts       ← 4 parcours { role, etapes[] }
  nouveautes.ts       ← N items { date, titre, description, categorie }
```

Voir `08-profils.md` pour les interfaces TypeScript complètes et les données de chaque profil.

**Règle absolue** : zéro contenu en dur dans les composants JSX. Tout passe par `src/data/`. Les composants n'ont aucune connaissance du domaine métier.

---

## Navigation entre contenus

### Liens contextuels obligatoires
- Chaque guide → lien vers la page correspondante ("En savoir plus sur la page Livraisons")
- Chaque indicateur → lien vers le guide d'export ou la page qui l'affiche
- Chaque rôle → lien vers les guides qu'il peut effectuer
- En bas de chaque article → section "Articles connexes" (2-3 liens max)

### Fil d'Ariane
Toujours visible en haut de chaque article :
```
Accueil > Transport > Guides > Créer une rotation
```

### Navigation précédent / suivant
Dans les guides et le cycle rotation : boutons Précédent / Suivant pour parcourir séquentiellement.

---

## Métadonnées par article (pour la recherche et le filtrage)

```typescript
interface Article {
  id: string
  titre: string
  chapeau: string
  section: 'transport' | 'roles' | 'indicateurs' | 'faq' | 'onboarding' | 'nouveautes'
  categorie: string
  tags: string[]
  difficulte?: 'debutant' | 'intermediaire' | 'avance'
  roles?: Array<'org_admin' | 'operator' | 'finance' | 'viewer' | 'owner'>
  derniereMiseAJour: string  // ISO date
}
```
