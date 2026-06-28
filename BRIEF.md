# Brief produit — Datakö Help Center

## Objectif

Réduire le besoin d'expliquer oralement la plateforme Fleet Manager à chaque client. Un lien partageable pendant les démos : "tout est documenté ici".

Cible : directeurs généraux, DAF, opérateurs, propriétaires de camions — pas des développeurs.

---

## Structure du site

### Navigation principale

```
Accueil
├── Transport          ← module principal
│   ├── Comprendre les pages
│   ├── Guides pas-à-pas
│   ├── Cycle d'une rotation
│   └── Cas particuliers
├── Les rôles          ← qui peut faire quoi
├── Comprendre les indicateurs
└── FAQ
```

V2 (plus tard, pas maintenant) : sections Vente/Distribution, WhatsApp, Portail Propriétaire.

---

## Section 1 — Accueil (`Home.tsx`)

Contenu :
- Phrase d'accroche : "Bienvenue dans le guide Datakö Fleet"
- Description courte : dashboard BI pour PME transport et distribution en Guinée
- 4 cartes de navigation vers les sections principales (Transport, Rôles, Indicateurs, FAQ)
- Note bas de page : "Vous utilisez Datakö Fleet ? Connectez-vous sur fleet.datako.app"

---

## Section 2 — Transport (`src/data/transport.ts`)

### 2a. Comprendre les pages

Chaque page = un objet `{ name, see, why, read }`. Reprendre et enrichir ce contenu :

```typescript
// Onglet Opérations
{ name: 'Vue d\'ensemble (Dashboard)',
  see: 'Le tableau de bord principal : chiffre d\'affaires, marge d\'exploitation, flotte active, nombre de livraisons et mensualité du crédit-bail.',
  why: 'En un coup d\'œil, vous savez si l\'activité est saine. C\'est votre point de départ chaque matin.',
  read: 'La marge d\'exploitation est le vrai indicateur de rentabilité. Si elle est au-dessus de 15%, l\'activité est performante. Les graphiques montrent la tendance mois par mois.' },

{ name: 'Nouvelle Rotation',
  see: 'Le formulaire pour enregistrer un trajet : camion, client, destination, volume transporté. Le gain est calculé automatiquement.',
  why: 'Chaque rotation enregistrée alimente tous les tableaux de bord. Sans saisie, pas de suivi.',
  read: 'Le gain affiché est votre part réelle après commissions. Si le gain est négatif, la rotation coûte plus qu\'elle ne rapporte.' },

{ name: 'Livraisons',
  see: 'L\'historique complet des livraisons avec statut de paiement (payé, en attente, impayé).',
  why: 'Suivre les impayés et vérifier que chaque rotation a bien été facturée et encaissée.',
  read: 'Cliquez sur le badge de paiement pour changer le statut. Les livraisons impayées impactent votre trésorerie réelle.' },

{ name: 'Flotte',
  see: 'La performance de chaque camion : CA généré, coûts d\'exploitation, marge.',
  why: 'Identifier les camions rentables et ceux qui coûtent de l\'argent.',
  read: 'Un camion "Rentable" (>5% de marge) rapporte. "Déficitaire" (<0%) : il faut analyser pourquoi (maintenance, peu de rotations, charges élevées).' },

{ name: 'Clients',
  see: 'Le classement des clients par CA, nombre de livraisons et impayés.',
  why: 'Connaître vos meilleurs clients et ceux qui posent un risque de recouvrement.',
  read: 'Un client avec beaucoup de CA mais beaucoup d\'impayés est un signal d\'alerte.' },

// Onglet Performance
{ name: 'Gains',
  see: 'Vos gains nets, rotation par rotation. Combien votre organisation a réellement gagné sur la période.',
  why: 'Savoir précisément ce qui entre dans la caisse, après commissions et répartitions.',
  read: 'Le gain par rotation tient compte des commissions versées aux partenaires. Un gain de 0 signifie que vous couvrez juste vos coûts.' },

{ name: 'Profit par camion',
  see: 'Le classement des véhicules par profit réel : marge des rotations moins les charges fixes.',
  why: 'Comparer objectivement chaque véhicule et décider où concentrer l\'activité.',
  read: 'Un camion peu actif peut quand même être déficitaire à cause de ses charges fixes (assurance, vignette). La période compte.' },

{ name: 'Cashflow',
  see: 'La trésorerie nette : CA moins toutes les charges, moins la mensualité de crédit-bail.',
  why: 'Comprendre si l\'activité génère vraiment du cash ou si elle s\'endette.',
  read: 'Le cashflow est en dessous de la marge d\'exploitation à cause du crédit-bail. C\'est normal et attendu.' },

// Onglet Investissement
{ name: 'Simulations',
  see: 'Un calculateur : si j\'ajoute un camion, si je change le tarif, si je fais plus de rotations — quel impact ?',
  why: 'Tester des scénarios avant de prendre une décision d\'investissement.',
  read: 'Les simulations ne modifient aucune donnée réelle. Testez librement.' },

// Onglet Acteurs
{ name: 'Répartition acteurs',
  see: 'La décomposition de chaque GNF gagné : qui reçoit quoi (organisation, propriétaires, partenaires).',
  why: 'Transparence totale sur la répartition des gains entre les parties prenantes.',
  read: 'Les pourcentages sont configurés dans Paramètres > Règles de répartition. Un propriétaire peut voir son propre espace via le Portail Propriétaire.' },
```

### 2b. Cycle d'une rotation

Afficher une timeline visuelle (composant `Timeline.tsx`) :

```
1. Création          → Saisie dans "Nouvelle Rotation" (camion, client, destination, volume)
2. Gain estimé       → Calcul automatique (CA prévisionnel - coûts)
3. En route          → La livraison est en cours, statut "en cours"
4. Validation        → Le dispatcheur valide la livraison (volume réel livré saisi)
5. Encaissement      → Le badge paiement passe à "Payé"
6. Impact dashboards → Dashboard, Gains, Profit par camion, Cashflow mis à jour automatiquement
7. Bilan propriétaire (si véhicule géré) → Part propriétaire calculée et disponible en PDF
```

### 2c. Guides pas-à-pas

Format pour chaque guide :
```typescript
interface Guide {
  title: string
  objectif: string
  prerequis: string[]
  etapes: string[]
  resultat: string
  erreurs: string[]
}
```

Guides à inclure :
1. **Ajouter un camion** — Flotte > + Ajouter un véhicule. Prérequis : rôle Admin. Résultat : le camion apparaît dans les rotations.
2. **Ajouter un client** — Clients > + Nouveau client. Résultat : disponible dans le formulaire Nouvelle Rotation.
3. **Créer une rotation** — Nouvelle Rotation > remplir le formulaire. Prérequis : camion + client existants. Résultat : apparaît dans Livraisons et Gains.
4. **Valider une livraison** — Livraisons > cliquer sur la rotation > "Marquer comme livré" > saisir volume livré. Résultat : le volume livré devient la référence financière.
5. **Confirmer un paiement** — Livraisons > badge paiement > cliquer pour passer à "Payé". Disponible pour Admin, Opérateur et Finance.
6. **Ajouter une charge fixe** — Flotte > sélectionner un véhicule > Charges fixes > + Ajouter. Types : assurance, vignette, visite technique, patente.
7. **Ajouter une maintenance** — Flotte > véhicule > Maintenances > + Ajouter.
8. **Générer un relevé client PDF** — Clients > sélectionner un client > Relevé > choisir la période > Télécharger PDF.
9. **Générer un bilan propriétaire PDF** — Portail Propriétaire (connexion propriétaire) ou Admin > Répartition acteurs > sélectionner propriétaire > Bilan PDF.
10. **Exporter les données Excel** — Disponible sur plusieurs pages (Livraisons, Gains, Historique rotations). Bouton "Exporter" en haut à droite.

### 2d. Cas particuliers

```typescript
interface CasParticulier {
  titre: string
  contexte: string
  regle: string
  exemple?: string
}
```

Cas à documenter :
1. **Véhicule propre vs géré** — Propre : appartient à l'organisation, 100% des gains restent. Géré : appartient à un propriétaire externe, une part lui revient selon les règles de répartition.
2. **Volume livré ≠ volume chargé** — Si le volume livré est inférieur au volume chargé, la différence est un "manquant". Le CA est calculé sur le volume livré. L'écart est visible dans le détail de la livraison.
3. **Livraison en cours sans date de livraison** — La rotation existe mais n'est pas encore validée. Elle n'apparaît pas dans les gains tant qu'elle n'est pas marquée "Livré".
4. **Charges fixes sur période de gestion** — Les charges fixes (assurance, vignette…) courent sur toute la période de gestion du véhicule, même les mois sans rotation.
5. **Annulation d'une rotation** — Une rotation annulée n'impacte plus les gains ni le cashflow. Elle reste visible dans l'historique avec le statut "Annulé".
6. **Crédit-bail** — La mensualité est déduite du cashflow chaque mois. Elle n'apparaît pas dans les charges d'exploitation mais impacte la trésorerie nette.

---

## Section 3 — Les rôles (`src/data/roles.ts`)

```typescript
interface Role {
  id: string
  nom: string
  emoji: string
  mission: string
  utilisateurs: string
  peutFaire: string[]
  nePeutPasFaire: string[]
  exemple: string
}
```

Données :

```typescript
[
  {
    id: 'org_admin',
    nom: 'Administrateur',
    emoji: '🏢',
    mission: 'Piloter et configurer l\'organisation.',
    utilisateurs: 'Directeur Général, DAF, manager de flotte.',
    peutFaire: [
      'Créer, modifier et supprimer des rotations',
      'Gérer les véhicules, clients, conducteurs',
      'Configurer les paramètres et règles de répartition',
      'Gérer les membres de l\'équipe',
      'Exporter PDF et Excel',
      'Générer les factures transport',
      'Accéder à toutes les pages',
    ],
    nePeutPasFaire: [
      'Accéder au Backoffice Datakö',
      'Activer les modules WhatsApp ou Assistant IA (réservé au plan)',
    ],
    exemple: 'Le DG configure les camions, ajoute les clients, suit les KPI chaque matin.',
  },
  {
    id: 'operator',
    nom: 'Opérateur',
    emoji: '🚛',
    mission: 'Saisir et valider les opérations quotidiennes.',
    utilisateurs: 'Chef d\'exploitation, dispatcher.',
    peutFaire: [
      'Créer des rotations',
      'Valider les livraisons',
      'Ajouter des maintenances',
      'Confirmer les paiements',
      'Exporter PDF et Excel',
    ],
    nePeutPasFaire: [
      'Supprimer des données',
      'Modifier les charges fixes ou la configuration',
      'Accéder à la page Configuration',
      'Gérer les membres de l\'équipe',
    ],
    exemple: 'Le chef d\'exploitation enregistre chaque rotation le matin et valide la livraison le soir.',
  },
  {
    id: 'finance',
    nom: 'Finance',
    emoji: '📊',
    mission: 'Consulter les données financières et produire les documents.',
    utilisateurs: 'DAF, comptable, contrôleur de gestion.',
    peutFaire: [
      'Consulter toutes les pages financières',
      'Confirmer les paiements',
      'Exporter PDF et Excel',
      'Générer les factures transport',
      'Consulter les relevés clients',
    ],
    nePeutPasFaire: [
      'Créer ou modifier des rotations',
      'Accéder à la Configuration',
      'Supprimer des données',
    ],
    exemple: 'La comptable consulte les livraisons impayées et génère les relevés clients en fin de mois.',
  },
  {
    id: 'viewer',
    nom: 'Observateur',
    emoji: '👁',
    mission: 'Observer sans modifier.',
    utilisateurs: 'Actionnaire, auditeur, partenaire banque.',
    peutFaire: [
      'Consulter tous les tableaux de bord',
      'Voir l\'historique des livraisons',
    ],
    nePeutPasFaire: [
      'Créer, modifier ou supprimer quoi que ce soit',
      'Exporter des documents',
      'Accéder à la Configuration',
    ],
    exemple: 'Un actionnaire suit les KPI mensuels sans intervenir dans les opérations.',
  },
  {
    id: 'owner',
    nom: 'Propriétaire',
    emoji: '🔑',
    mission: 'Consulter uniquement ses propres véhicules gérés.',
    utilisateurs: 'Propriétaire de camion qui confie son véhicule à l\'entreprise.',
    peutFaire: [
      'Consulter les rotations de ses véhicules',
      'Voir sa part de gain par rotation',
      'Accéder à son bilan financier',
      'Télécharger son bilan PDF',
    ],
    nePeutPasFaire: [
      'Voir les données des autres propriétaires',
      'Voir les données de l\'organisation',
      'Modifier quoi que ce soit',
    ],
    exemple: 'M. Mané se connecte et voit les 3 rotations de son camion ce mois-ci et sa part de 32M GNF.',
  },
]
```

---

## Section 4 — Comprendre les indicateurs (`src/data/indicateurs.ts`)

```typescript
interface Indicateur {
  nom: string
  definition: string
  formule?: string
  exemple: string
  conseil: string
}
```

Indicateurs à documenter :

```typescript
[
  { nom: 'CA Transport', definition: 'Le chiffre d\'affaires généré par les livraisons sur la période. C\'est le total des tarifs facturés aux clients.', formule: 'Σ (tarif/litre × volume livré) par livraison', exemple: '40 000 L × 1 200 GNF/L = 48 000 000 GNF', conseil: 'Le CA seul ne dit pas si l\'activité est rentable. Regardez toujours la marge.' },

  { nom: 'Marge Produit', definition: 'Ce qui reste après déduction du coût d\'achat du carburant au CA.', formule: 'CA Transport − Coût achat produit', exemple: '48M − 36M = 12M GNF', conseil: 'La marge produit est le point de départ. Si elle est négative, vous vendez à perte.' },

  { nom: 'Marge d\'Exploitation', definition: 'Ce qui reste après toutes les charges opérationnelles : carburant camion, maintenance, charges fixes.', formule: 'Marge Produit − Coûts exploitation (carburant + maintenance + charges fixes)', exemple: '12M − 4M = 8M GNF', conseil: 'La marge d\'exploitation est l\'indicateur clé de santé. Visez >15% du CA.' },

  { nom: 'Cashflow Net', definition: 'La trésorerie nette après paiement du crédit-bail.', formule: 'Marge d\'Exploitation − Mensualité crédit-bail', exemple: '8M − 52M/mois = ... (varie selon le mois)', conseil: 'Un cashflow négatif signifie que l\'activité ne couvre pas encore le crédit-bail. C\'est normal en début d\'activité.' },

  { nom: 'Gain par rotation', definition: 'Ce que l\'organisation gagne sur une seule livraison, après commissions.', exemple: 'Rotation Conakry → Siguiri : gain net 3 500 000 GNF', conseil: 'Un gain négatif sur une rotation ponctuelle peut arriver (panne, retard). L\'important est la tendance sur le mois.' },

  { nom: 'Part propriétaire', definition: 'La part du gain revenant au propriétaire du véhicule géré, calculée selon les règles de répartition configurées.', exemple: 'Camion géré : propriétaire reçoit 65% du gain net = 2 275 000 GNF', conseil: 'Configurez les règles de répartition dans Paramètres pour refléter les accords contractuels.' },

  { nom: 'Charges fixes véhicule', definition: 'Les charges qui courent indépendamment des rotations : assurance, vignette, visite technique, patente. Converties en équivalent mensuel.', exemple: 'Assurance 900 000 GNF/an → 75 000 GNF/mois × 6 mois = 450 000 GNF sur le semestre', conseil: 'Un camion inactif continue d\'accumuler ses charges fixes. C\'est pourquoi même un camion sans rotation peut être déficitaire.' },
]
```

---

## Section 5 — FAQ (`src/data/faq.ts`)

```typescript
interface FAQItem {
  question: string
  reponse: string
  categorie: 'operations' | 'finance' | 'technique' | 'roles'
}
```

Questions à inclure :

```typescript
[
  { categorie: 'operations', question: 'Pourquoi une rotation n\'apparaît pas dans les Gains ?', reponse: 'Une rotation doit être marquée "Livré" pour apparaître dans les Gains. Si elle est encore "En cours", elle est comptée dans les Livraisons mais pas encore dans les indicateurs financiers.' },

  { categorie: 'operations', question: 'Comment corriger une erreur sur une rotation déjà validée ?', reponse: 'Seul un Administrateur peut modifier une livraison validée. Allez dans Livraisons, cliquez sur la rotation, puis utilisez le bouton "Modifier". Toute modification est tracée avec la date et l\'auteur.' },

  { categorie: 'finance', question: 'Pourquoi le Cashflow est différent de la Marge d\'Exploitation ?', reponse: 'Le Cashflow déduit la mensualité du crédit-bail (prêt banque). La Marge d\'Exploitation ne la prend pas en compte. La différence = mensualité mensuelle.' },

  { categorie: 'finance', question: 'Pourquoi un camion rentable peut avoir un Cashflow négatif ?', reponse: 'Si la mensualité de crédit-bail est élevée par rapport à la marge générée, le cashflow peut être négatif même avec une marge positive. Vérifiez le nombre de rotations par mois.' },

  { categorie: 'finance', question: 'Comment savoir ce qu\'un propriétaire doit recevoir ?', reponse: 'Dans la section Répartition Acteurs, sélectionnez le propriétaire et la période. La part propriétaire est calculée automatiquement. Vous pouvez générer un Bilan PDF à lui envoyer.' },

  { categorie: 'operations', question: 'Comment voir si une livraison est payée ?', reponse: 'Dans la page Livraisons, chaque ligne affiche un badge de statut de paiement : "Payé" (vert), "En attente" (ambre), "Impayé" (rouge). Cliquez sur le badge pour changer le statut.' },

  { categorie: 'operations', question: 'Que faire si le volume livré est inférieur au volume chargé ?', reponse: 'Lors de la validation de la livraison, saisissez le volume réellement livré. La différence est automatiquement calculée comme "manquant". Le CA sera calculé sur le volume livré uniquement.' },

  { categorie: 'roles', question: 'Un Opérateur peut-il supprimer une rotation ?', reponse: 'Non. La suppression est réservée aux Administrateurs. Un Opérateur peut créer et valider des rotations, mais ne peut pas les supprimer.' },

  { categorie: 'technique', question: 'Comment exporter les données en Excel ?', reponse: 'Sur les pages Livraisons, Gains et Historique Rotations, un bouton "Exporter" est disponible en haut à droite. L\'export inclut toutes les colonnes de la période sélectionnée.' },

  { categorie: 'technique', question: 'Comment changer la période affichée sur tous les tableaux ?', reponse: 'Le sélecteur de période est en haut à droite de l\'application (lune/soleil à côté). Choisissez un mois, un trimestre ou une période personnalisée. Tous les tableaux se mettent à jour automatiquement.' },
]
```

---

## Composants UI

### `CalloutBlock.tsx`

3 variantes :
- **Astuce** (bleu) : `bg-blue-500/5 border border-blue-500/20 text-blue-300` — conseil de bonne pratique
- **Attention** (ambre) : `bg-amber-500/5 border border-amber-500/20 text-amber-300` — erreur fréquente à éviter
- **Exemple** (vert) : `bg-emerald-500/5 border border-emerald-500/20 text-emerald-300` — cas concret

### `Timeline.tsx`

Composant vertical avec étapes numérotées. Chaque étape : numéro + titre + description courte. Étapes passées = remplies, étapes futures = en pointillé.

### `Sidebar.tsx` (desktop)

- Sticky à gauche
- Liens ancrés vers chaque section
- Section active surlignée
- Masquée sur mobile (`hidden lg:block`)

### `MobileMenu.tsx`

- Bouton hamburger en haut
- Drawer ou accordéon avec les mêmes liens
- Visible uniquement mobile (`lg:hidden`)

### `SearchBar.tsx`

- Input texte
- Filtre client-side sur tout le contenu chargé (titre + contenu des sections)
- Résultats en liste déroulante avec lien vers la section

---

## Critères d'acceptation (V1)

- [ ] Scaffold Vite + React + TS + Tailwind opérationnel (`npm run dev` fonctionne)
- [ ] 4 sections créées : Accueil, Transport, Rôles, Indicateurs, FAQ
- [ ] Contenu des sections issu de `src/data/` (pas de JSX en dur)
- [ ] Timeline du cycle rotation visible et lisible
- [ ] Guides pas-à-pas lisibles (10 guides)
- [ ] Tous les rôles documentés (5 rôles)
- [ ] Tous les indicateurs documentés (7 indicateurs)
- [ ] FAQ avec 10 questions
- [ ] Blocs Astuce / Attention / Exemple présents
- [ ] Sidebar desktop sticky + menu mobile fonctionnel
- [ ] Recherche client-side opérationnelle
- [ ] Thème dark cohérent avec Fleet Manager
- [ ] `npx tsc --noEmit` passe sans erreur
- [ ] `npm run build` passe sans erreur

---

## Prochaines étapes après V1 (ne pas implémenter maintenant)

- Section Vente / Distribution
- Section WhatsApp (conducteur, DG, chef)
- Section Portail Propriétaire
- Deep-linking depuis Fleet Manager (`help.datako.app/transport/creer-rotation`)
- Lien "Voir le guide complet →" dans `HelpGuide.tsx` de Fleet Manager
- Déploiement Netlify sur `help.datako.app`
