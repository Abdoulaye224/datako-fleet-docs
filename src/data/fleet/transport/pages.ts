export interface AppPage {
  id: string
  name: string
  onglet: string
  see: string
  why: string
  read: string
}

export const appPages: AppPage[] = [
  {
    id: 'dashboard',
    name: 'Vue d\'ensemble (Dashboard)',
    onglet: 'Opérations',
    see: 'Le tableau de bord principal : chiffre d\'affaires, marge d\'exploitation, flotte active, nombre de livraisons et mensualité du crédit-bail.',
    why: 'En un coup d\'œil, vous savez si l\'activité est saine. C\'est votre point de départ chaque matin.',
    read: 'La marge d\'exploitation est le vrai indicateur de rentabilité. Si elle est au-dessus de 15%, l\'activité est performante. Les graphiques montrent la tendance mois par mois.',
  },
  {
    id: 'nouvelle-rotation',
    name: 'Nouvelle Rotation',
    onglet: 'Opérations',
    see: 'Le formulaire pour enregistrer un trajet : camion, client, destination, volume transporté. Le gain est calculé automatiquement.',
    why: 'Chaque rotation enregistrée alimente tous les tableaux de bord. Sans saisie, pas de suivi.',
    read: 'Le gain affiché est votre part réelle après commissions. Si le gain est négatif, la rotation coûte plus qu\'elle ne rapporte.',
  },
  {
    id: 'livraisons',
    name: 'Livraisons',
    onglet: 'Opérations',
    see: 'L\'historique complet des livraisons avec statut de paiement (payé, en attente, impayé).',
    why: 'Suivre les impayés et vérifier que chaque rotation a bien été facturée et encaissée.',
    read: 'Cliquez sur le badge de paiement pour changer le statut. Les livraisons impayées impactent votre trésorerie réelle.',
  },
  {
    id: 'flotte',
    name: 'Flotte',
    onglet: 'Opérations',
    see: 'La performance de chaque camion : CA généré, coûts d\'exploitation, marge.',
    why: 'Identifier les camions rentables et ceux qui coûtent de l\'argent.',
    read: 'Un camion "Rentable" (>5% de marge) rapporte. "Déficitaire" (<0%) : il faut analyser pourquoi (maintenance, peu de rotations, charges élevées).',
  },
  {
    id: 'clients',
    name: 'Clients',
    onglet: 'Opérations',
    see: 'Le classement des clients par CA, nombre de livraisons et impayés.',
    why: 'Connaître vos meilleurs clients et ceux qui posent un risque de recouvrement.',
    read: 'Un client avec beaucoup de CA mais beaucoup d\'impayés est un signal d\'alerte.',
  },
  {
    id: 'gains',
    name: 'Gains',
    onglet: 'Performance',
    see: 'Vos gains nets, rotation par rotation. Combien votre organisation a réellement gagné sur la période.',
    why: 'Savoir précisément ce qui entre dans la caisse, après commissions et répartitions.',
    read: 'Le gain par rotation tient compte des commissions versées aux partenaires. Un gain de 0 signifie que vous couvrez juste vos coûts.',
  },
  {
    id: 'profit-camion',
    name: 'Profit par camion',
    onglet: 'Performance',
    see: 'Le classement des véhicules par profit réel : marge des rotations moins les charges fixes.',
    why: 'Comparer objectivement chaque véhicule et décider où concentrer l\'activité.',
    read: 'Un camion peu actif peut quand même être déficitaire à cause de ses charges fixes (assurance, vignette). La période compte.',
  },
  {
    id: 'cashflow',
    name: 'Cashflow',
    onglet: 'Performance',
    see: 'La trésorerie nette : CA moins toutes les charges, moins la mensualité de crédit-bail.',
    why: 'Comprendre si l\'activité génère vraiment du cash ou si elle s\'endette.',
    read: 'Le cashflow est en dessous de la marge d\'exploitation à cause du crédit-bail. C\'est normal et attendu.',
  },
  {
    id: 'simulations',
    name: 'Simulations',
    onglet: 'Investissement',
    see: 'Un calculateur : si j\'ajoute un camion, si je change le tarif, si je fais plus de rotations — quel impact ?',
    why: 'Tester des scénarios avant de prendre une décision d\'investissement.',
    read: 'Les simulations ne modifient aucune donnée réelle. Testez librement.',
  },
  {
    id: 'repartition-acteurs',
    name: 'Répartition acteurs',
    onglet: 'Acteurs',
    see: 'La décomposition de chaque GNF gagné : qui reçoit quoi (organisation, propriétaires, partenaires).',
    why: 'Transparence totale sur la répartition des gains entre les parties prenantes.',
    read: 'Les pourcentages sont configurés dans Paramètres > Règles de répartition. Un propriétaire peut voir son propre espace via le Portail Propriétaire.',
  },
]
