export interface PortailSousSection {
  titre: string
  points: string[]
}

export interface PortailSection {
  id: string
  titre: string
  description: string
  quoi: string[]
  comment: string
  prerequis: string[]
  astuce?: string
  /** Détail structuré pour les sections denses (ex : le contenu du panneau détail d'une rotation). */
  sousSections?: PortailSousSection[]
  href: string
}

export const PORTAIL_SECTIONS: PortailSection[] = [
  {
    id: 'connexion-portail',
    titre: 'Connexion au portail',
    description: 'Le point d’entrée du propriétaire pour consulter ses véhicules gérés, ses gains et ses bilans périodiques.',
    quoi: [
      'Se connecter avec ses identifiants reçus par l’administrateur',
      'Accéder à l’espace web dédié depuis une URL sécurisée',
      'Retrouver rapidement les documents récents et les notifications',
    ],
    comment: 'Ouvrez l’URL du Portail Propriétaire depuis votre navigateur, saisissez votre téléphone ou email puis votre mot de passe temporaire ou permanent.',
    prerequis: ['Avoir un compte propriétaire créé par l’administrateur', 'Disposer de l’URL du portail et d’identifiants valides'],
    astuce: 'Lors de la première connexion, changez le mot de passe et enregistrez le portail dans vos favoris sur téléphone.',
    href: '/portail-proprietaire/connexion-portail',
  },
  {
    id: 'tableau-bord-proprietaire',
    titre: 'Tableau de bord',
    description: 'La vue synthétique de tous vos véhicules gérés : rotations, chiffre d’affaires, résultat d’exploitation et votre part, sur la période sélectionnée.',
    quoi: [
      '5 indicateurs clés en un coup d’œil : nombre de véhicules, rotations, CA Transport, Résultat d’exploitation et Votre part (mis en avant visuellement)',
      'Une carte par véhicule avec un badge Propre, Géré ou Partenaire selon son statut',
      'Un filtre par immatriculation et par statut : Rentable, À surveiller (résultat négatif), Inactif (aucune rotation sur la période)',
      'Le détail des charges fixes de chaque véhicule (assurance, vignette…) en dépliant "Détail des charges fixes" sur sa carte',
      'Une alerte automatique si un ou plusieurs véhicules affichent un résultat négatif sur la période',
    ],
    comment: 'Après connexion, le tableau de bord affiche automatiquement les véhicules rattachés à votre compte. Utilisez le sélecteur de période en haut de l’application pour changer la fenêtre observée : tous les indicateurs et cartes se recalculent automatiquement.',
    prerequis: ['Être connecté au portail', 'Avoir au moins un véhicule géré associé à son profil propriétaire'],
    astuce: 'Consultez le tableau de bord en fin de semaine pour vérifier que toutes les rotations prévues ont bien été validées. Le bouton "Bilans & Détail" sur chaque carte véhicule vous amène directement à la page Mes véhicules & Bilans.',
    href: '/portail-proprietaire/tableau-bord-proprietaire',
  },
  {
    id: 'mes-vehicules-bilans',
    titre: 'Mes véhicules & Bilans',
    description: 'Le détail financier complet de chaque véhicule sur la période, et les bilans exportables pour archivage ou partage.',
    quoi: [
      'Pour chaque véhicule : CA Transport, charges, résultat d’exploitation, part propriétaire et commissions prélevées',
      'La distinction entre camion propre (100% de la marge revient à l’organisation) et camion géré (résiduel propriétaire selon les règles de répartition configurées pour ce véhicule)',
      'Le téléchargement du bilan au format PDF',
      'L’export du bilan au format Excel',
      'L’envoi du bilan par email directement depuis le portail',
    ],
    comment: 'Depuis le menu "Mes véhicules & Bilans", chaque véhicule est présenté avec ses totaux sur la période sélectionnée en haut de l’application. Cliquez sur "Bilan PDF" pour générer le document, "Excel" pour exporter les données brutes, ou l’icône email pour l’envoyer directement.',
    prerequis: ['Être connecté au portail', 'Les rotations de la période doivent être validées dans Fleet Manager'],
    astuce: 'La part propriétaire ("Votre part") est calculée selon les règles définies par l’équipe Datakö pour votre véhicule : pourcentage sur CA, pourcentage sur marge, montant fixe par rotation ou mensuel. Le montant affiché est déjà le résiduel après que l’organisation a prélevé ses commissions — téléchargez le PDF après chaque clôture mensuelle pour conserver une copie indépendante.',
    href: '/portail-proprietaire/mes-vehicules-bilans',
  },
  {
    id: 'historique-rotations',
    titre: 'Historique rotations',
    description: 'La liste de toutes les rotations livrées de vos véhicules, avec un détail complet accessible en un clic : volumes, décomposition financière, coûts de la livraison, trajet et chronologie.',
    quoi: [
      'La liste triable et filtrable (par véhicule ou recherche texte) de toutes vos rotations livrées',
      'Le détail complet d’une rotation en cliquant sur sa ligne, dans un panneau latéral',
      'La transparence totale sur les coûts variables déduits de chaque livraison',
      'La visibilité sur les corrections effectuées a posteriori par l’administrateur',
    ],
    comment: 'Cliquez sur une ligne de la liste pour ouvrir le détail de la rotation. Le panneau qui s’ouvre est organisé en plusieurs blocs, du plus général au plus précis.',
    sousSections: [
      {
        titre: '1. Volumes',
        points: ['Volume chargé, volume livré, et volume manquant si un écart a été constaté à la livraison.'],
      },
      {
        titre: '2. Financier',
        points: [
          'CA Transport et tarif appliqué par litre pour cette rotation précise.',
          'Charges de la rotation, résultat, et votre part sur cette rotation.',
        ],
      },
      {
        titre: '3. Coûts de la livraison',
        points: [
          'Détail transparent des 3 postes de coûts variables : ⛽ Carburant, 👨‍✈️ Prime chauffeur, 🛣️ Péages.',
          'Chaque poste indique sa provenance : "Paramètre de route" (le carburant précise en plus le trajet utilisé pour le calcul).',
          'Le Total des coûts variables (en rouge) et la Marge de la livraison (vert si positive, rouge si négative) — c’est le même bloc que celui utilisé côté administrateur, pour garantir une cohérence parfaite entre les deux vues.',
        ],
      },
      {
        titre: '4. Badge "🔄 Coûts recalculés"',
        points: [
          'Si un administrateur a corrigé les coûts de cette livraison après avoir détecté une erreur de paramétrage sur la route, un badge apparaît sur le bloc des coûts.',
          'Cliquez sur le badge pour voir la date du recalcul, la source ("Backoffice") et le motif s’il a été renseigné.',
        ],
      },
      {
        titre: '5. Trajet',
        points: ['Dépôt de départ → destination, et le site de livraison précis s’il diffère de la destination indiquée.'],
      },
      {
        titre: '6. Détails opérationnels',
        points: ['Conducteur, numéro de bon de livraison (BL), numéro de rotation, numéro de tournée client et note éventuelle.'],
      },
      {
        titre: '7. Historique',
        points: [
          'Une chronologie à points colorés : rotation créée → chargement effectué → livraison validée → facture générée → paiement enregistré.',
          'Si un recalcul de coûts a eu lieu, un événement "🔧 Coûts variables recalculés" apparaît avec le détail avant → après (carburant, prime, péages) et l’impact sur votre part.',
        ],
      },
    ],
    prerequis: ['Être connecté au portail', 'Au moins une rotation de vos véhicules doit être livrée sur la période'],
    astuce: 'Si vous constatez un badge "Coûts recalculés" inhabituel ou un montant qui vous semble incorrect, contactez l’administrateur de votre organisation : le motif du recalcul est visible directement dans le détail de la rotation, pas besoin de le redemander.',
    href: '/portail-proprietaire/historique-rotations',
  },
  {
    id: 'charges-maintenances',
    titre: 'Charges & Maintenances',
    description: 'Le détail exhaustif de toutes les charges imputées à vos véhicules sur la période : charges de rotation, maintenances et charges fixes.',
    quoi: [
      'A. Charges de rotation : carburant, primes chauffeur et péages, agrégés par type sur la période',
      'B. Maintenances : chaque intervention avec sa date, son type, le garage et son coût',
      'C. Charges fixes véhicule : assurance, vignette, visite technique… proratisées au nombre de mois couverts par la période',
      'Un résumé consolidé en haut de page : Total charges, Charges rotation, Maintenances, Charges fixes',
    ],
    comment: 'Depuis le menu "Charges & Maintenances", consultez les 3 tableaux (A, B, C). Le sélecteur de période en haut de l’application détermine la fenêtre observée pour les trois.',
    prerequis: ['Être connecté au portail', 'Avoir au moins un véhicule géré associé à son profil propriétaire'],
    astuce: 'Cette page répond à la question "qu’est-ce qui a été déduit avant que je reçoive ma part ?" — c’est le détail exhaustif derrière le montant "Charges" affiché sur le Tableau de bord et dans les Bilans.',
    href: '/portail-proprietaire/charges-maintenances',
  },
]
