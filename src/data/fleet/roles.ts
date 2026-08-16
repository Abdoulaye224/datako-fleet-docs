export interface Role {
  id: string
  nom: string
  emoji: string
  mission: string
  utilisateurs: string
  /** Résumé destiné à l'administrateur qui doit choisir un rôle */
  aQuiLAttribuer: string
  /** Ce que le rôle peut voir */
  peutConsulter: string[]
  /** Ce que le rôle peut créer, modifier ou piloter */
  peutGerer: string[]
  /** Les limites principales, telles qu'elles se constatent à l'écran */
  restrictions: string[]
  exemple: string
}

export const ROLES_INTRO =
  "Chaque collaborateur reçoit un rôle au moment où vous l'invitez. Ce rôle détermine les pages auxquelles il accède, les informations qu'il voit et les actions qu'il peut réaliser. Vous pouvez le modifier à tout moment depuis Configuration → Équipe."

export const ROLES_CONSEIL =
  "Attribuez le rôle le plus restreint qui permet à la personne de faire son travail. Un rôle trop large expose des informations financières sensibles ; un rôle trop étroit vous vaudra des demandes d'assistance quotidiennes."

export const ROLES: Role[] = [
  {
    id: 'org_admin',
    nom: 'Administrateur',
    emoji: '🏢',
    mission: "Piloter l'entreprise et configurer son espace Fleet.",
    utilisateurs: "Dirigeant, responsable de flotte, directeur d'exploitation.",
    aQuiLAttribuer:
      "À la personne responsable de l'espace de votre entreprise. C'est l'accès le plus complet : réservez-le à un petit nombre de personnes.",
    peutConsulter: [
      "Toute l'exploitation : rotations, livraisons, flotte, clients",
      'Toutes les données financières : Gains, Profit par camion, Cashflow',
      'Simulation Transport et Répartition des acteurs',
      'Les acteurs et les propriétaires de véhicules',
      "Les charges de l'organisation",
    ],
    peutGerer: [
      'Les rotations et les livraisons, de la création à la suppression',
      'La flotte, les maintenances et les charges véhicule',
      'Les clients, y compris le blocage et la suppression',
      'La facturation et les encaissements',
      "Les charges de l'organisation",
      'La répartition des acteurs et les règles de commission',
      "L'équipe : inviter des collaborateurs et leur attribuer un rôle",
      "Les paramètres et la configuration de l'entreprise",
    ],
    restrictions: [
      "Aucune restriction dans l'espace de votre entreprise",
      "Réservez ce rôle à une ou deux personnes : il donne accès aux données financières les plus sensibles",
    ],
    exemple:
      "Le dirigeant configure la flotte et les clients au démarrage, invite son équipe, puis suit chaque matin sa marge et son Cashflow.",
  },
  {
    id: 'operator',
    nom: 'Opérateur',
    emoji: '🚛',
    mission: "Faire tourner l'exploitation au quotidien.",
    utilisateurs: "Chef d'exploitation, dispatcher, responsable logistique.",
    aQuiLAttribuer:
      "Aux personnes qui saisissent les rotations et suivent les livraisons. C'est le rôle du terrain : il travaille sur l'exploitation, pas sur l'argent qui rentre.",
    peutConsulter: [
      "Le tableau de bord, avec les indicateurs nécessaires au suivi de l'exploitation",
      "Les livraisons, avec leur chiffre d'affaires, leurs coûts et leur marge",
      'Les Gains et le Profit par camion',
      'La flotte : véhicules, maintenances, documents, conformité, charges véhicule',
      'Les clients',
      "Les charges de l'organisation, en lecture seule",
      'Les commissions, là où elles apparaissent dans ses écrans',
    ],
    peutGerer: [
      'Créer et suivre les rotations',
      'Le déroulement opérationnel des livraisons',
      'La flotte et les maintenances',
      'Les charges véhicule : les créer et les modifier',
      'Les clients au quotidien',
      'Générer les relevés clients',
    ],
    restrictions: [
      'Ne voit pas le Cash net réel sur le tableau de bord',
      "N'accède ni au Cashflow, ni à Simulation Transport, ni à Répartition acteurs, ni aux Acteurs / propriétaires",
      'Ne peut pas supprimer une livraison',
      "Ne gère ni l'encaissement ni la date de paiement d'une livraison",
      'Ne peut pas générer de facture',
      'Ne peut pas bloquer, restreindre ni supprimer un client',
      "Ne peut pas saisir, modifier ni supprimer les charges de l'organisation",
      'Ne peut pas supprimer une charge véhicule',
      'Ne peut pas modifier les règles de commission et de répartition',
    ],
    exemple:
      "Le chef d'exploitation enregistre les rotations le matin, valide les livraisons le soir et édite le relevé d'un client — mais c'est la comptable qui pointera les règlements.",
  },
  {
    id: 'finance',
    nom: 'Finance',
    emoji: '📊',
    mission: 'Suivre les règlements et la santé financière.',
    utilisateurs: 'Comptable, responsable administratif et financier, contrôleur de gestion.',
    aQuiLAttribuer:
      "Aux personnes chargées du suivi financier et des règlements. Elles voient l'argent sans intervenir sur l'exploitation.",
    peutConsulter: [
      'Les livraisons et leurs informations financières',
      'Les clients',
      'Les Gains et le Profit par camion',
      'Le Cashflow',
      "Les charges de l'organisation",
    ],
    peutGerer: [
      "Le statut d'encaissement d'une livraison",
      'La date de paiement et les notes de règlement',
      'La génération et le téléchargement des factures',
      "Les charges de l'organisation : les créer, les modifier et les supprimer",
    ],
    restrictions: [
      'Ne crée pas de rotation',
      "Ne modifie pas les quantités ni les données métier d'une livraison",
      'Ne change pas le véhicule ni le conducteur affecté',
      "Ne gère pas l'équipe",
      "Ne modifie pas les paramètres généraux de l'entreprise",
    ],
    exemple:
      "La comptable pointe les virements reçus, met à jour les statuts de paiement, édite les factures du mois et saisit les charges de structure.",
  },
  {
    id: 'viewer',
    nom: 'Lecteur',
    emoji: '👁',
    mission: "Observer l'activité sans jamais la modifier.",
    utilisateurs: "Associé, auditeur, partenaire extérieur à qui vous ouvrez une fenêtre sur l'activité.",
    aQuiLAttribuer:
      "Aux personnes qui doivent suivre l'activité sans y toucher. Ce n'est pas un accès en lecture à l'intégralité de Fleet : c'est un rôle d'observation de l'exploitation.",
    peutConsulter: ["Les informations opérationnelles des pages qui lui sont ouvertes"],
    peutGerer: ['Rien : le Lecteur ne crée, ne modifie et ne supprime aucune donnée'],
    restrictions: [
      "N'accède pas au Cashflow",
      "N'accède ni aux Gains ni au Profit par camion",
      "N'accède pas à Simulation Transport",
      "N'accède pas à Répartition acteurs",
      'Ne gère ni la facturation ni les encaissements',
      "Ne modifie ni les paramètres ni l'équipe",
    ],
    exemple:
      "Un associé suit le rythme des livraisons du mois, sans voir la trésorerie ni la rentabilité de chaque camion.",
  },
  {
    id: 'owner',
    nom: 'Propriétaire',
    emoji: '🔑',
    mission: 'Suivre ses propres véhicules confiés à votre entreprise.',
    utilisateurs: "Propriétaire d'un camion que votre entreprise exploite pour son compte.",
    aQuiLAttribuer:
      "Aux propriétaires extérieurs dont vous gérez les véhicules. Ils disposent d'un espace dédié, séparé de celui de votre entreprise.",
    peutConsulter: [
      'Les véhicules qui lui sont rattachés',
      'Les rotations effectuées par ces véhicules',
      'Les charges et les résultats de son périmètre',
      "L'historique et les documents disponibles dans son portail",
      'Ses bilans',
    ],
    peutGerer: ['Rien dans votre espace : son portail est un espace de consultation'],
    restrictions: [
      "N'accède pas aux données générales de votre entreprise",
      'Ne voit pas les véhicules des autres propriétaires',
      'Son périmètre se limite aux véhicules qui lui sont explicitement rattachés',
    ],
    exemple:
      "M. Mané ouvre son portail, retrouve les rotations de son camion sur le mois et télécharge son bilan — sans rien voir du reste de votre activité.",
  },
]

export interface RoleRecapLigne {
  roleId: string
  role: string
  emoji: string
  consulter: string
  gerer: string
  restrictions: string
}

export const ROLES_RECAP_TITRE = 'Tableau récapitulatif'

export const ROLES_RECAP_ACCROCHE =
  "À lire de gauche à droite pour choisir un rôle d'un coup d'œil. Le détail complet figure sur la fiche de chaque rôle."

export const ROLES_RECAP: RoleRecapLigne[] = [
  {
    roleId: 'org_admin',
    role: 'Administrateur',
    emoji: '🏢',
    consulter: "Toute l'exploitation et toutes les données financières, Cashflow compris",
    gerer: 'Exploitation, facturation, encaissements, charges, répartition, équipe et paramètres',
    restrictions: "Aucune restriction dans l'espace de votre entreprise",
  },
  {
    roleId: 'operator',
    role: 'Opérateur',
    emoji: '🚛',
    consulter:
      "L'exploitation, la marge des livraisons, les Gains, le Profit par camion, les charges de l'organisation en lecture",
    gerer: 'Rotations, livraisons, flotte, maintenances, charges véhicule, clients, relevés clients',
    restrictions:
      'Ni Cashflow, ni Cash net réel, ni Simulation, ni Répartition acteurs ; ni encaissement, ni facture, ni suppression',
  },
  {
    roleId: 'finance',
    role: 'Finance',
    emoji: '📊',
    consulter: "Livraisons, clients, Gains, Profit par camion, Cashflow, charges de l'organisation",
    gerer: "Encaissements, dates de paiement, factures, charges de l'organisation",
    restrictions: "Pas de saisie opérationnelle, pas de gestion d'équipe, pas de paramètres généraux",
  },
  {
    roleId: 'viewer',
    role: 'Lecteur',
    emoji: '👁',
    consulter: 'Les informations opérationnelles qui lui sont ouvertes',
    gerer: 'Rien',
    restrictions: 'Ni Cashflow, ni Gains, ni Profit par camion, ni Simulation, ni Répartition acteurs',
  },
  {
    roleId: 'owner',
    role: 'Propriétaire',
    emoji: '🔑',
    consulter: 'Son seul périmètre : ses véhicules, ses rotations, ses charges, ses bilans',
    gerer: 'Rien : son portail est un espace de consultation',
    restrictions: 'Aucun accès aux données de votre entreprise ni aux autres propriétaires',
  },
]

export interface PermissionLigne {
  action: string
  admin: boolean
  operator: boolean
  finance: boolean
  viewer: boolean
  owner: boolean
}

export const MATRICE_TITRE = 'Qui peut faire quoi'

export const MATRICE_ACCROCHE =
  "Les gestes du quotidien, rôle par rôle. Le Propriétaire n'y figure que pour son propre portail : il n'intervient jamais dans l'espace de votre entreprise."

export const MATRICE_PERMISSIONS: PermissionLigne[] = [
  { action: 'Créer une rotation', admin: true, operator: true, finance: false, viewer: false, owner: false },
  { action: 'Valider une livraison', admin: true, operator: true, finance: false, viewer: false, owner: false },
  { action: 'Supprimer une livraison', admin: true, operator: false, finance: false, viewer: false, owner: false },
  {
    action: "Enregistrer un encaissement ou une date de paiement",
    admin: true,
    operator: false,
    finance: true,
    viewer: false,
    owner: false,
  },
  { action: 'Générer une facture', admin: true, operator: false, finance: true, viewer: false, owner: false },
  { action: 'Générer un relevé client', admin: true, operator: true, finance: true, viewer: false, owner: false },
  { action: 'Gérer la flotte et les maintenances', admin: true, operator: true, finance: false, viewer: false, owner: false },
  {
    action: "Saisir les charges de l'organisation",
    admin: true,
    operator: false,
    finance: true,
    viewer: false,
    owner: false,
  },
  {
    action: 'Modifier les règles de répartition',
    admin: true,
    operator: false,
    finance: false,
    viewer: false,
    owner: false,
  },
  { action: 'Consulter le Cashflow', admin: true, operator: false, finance: true, viewer: false, owner: false },
  {
    action: 'Consulter les Gains et le Profit par camion',
    admin: true,
    operator: true,
    finance: true,
    viewer: false,
    owner: false,
  },
  { action: "Gérer l'équipe et les paramètres", admin: true, operator: false, finance: false, viewer: false, owner: false },
  {
    action: 'Consulter ses propres véhicules et bilans',
    admin: false,
    operator: false,
    finance: false,
    viewer: false,
    owner: true,
  },
]

export interface ActionReservee {
  action: string
  roles: string
  ou: string
}

export const ACTIONS_RESERVEES_TITRE = 'Les actions réservées'

export const ACTIONS_RESERVEES_ACCROCHE =
  "Les gestes qui reviennent le plus souvent en question. Si un bouton n'apparaît pas à l'écran d'un collaborateur, c'est presque toujours l'une de ces lignes qui l'explique."

export const ACTIONS_RESERVEES: ActionReservee[] = [
  { action: 'Créer une rotation', roles: 'Administrateur, Opérateur', ou: 'Nouvelle Rotation' },
  { action: 'Valider une livraison', roles: 'Administrateur, Opérateur', ou: 'Livraisons' },
  { action: 'Supprimer une livraison', roles: 'Administrateur', ou: 'Livraisons' },
  {
    action: "Enregistrer un encaissement ou une date de paiement",
    roles: 'Administrateur, Finance',
    ou: 'Livraisons',
  },
  { action: 'Générer une facture', roles: 'Administrateur, Finance', ou: 'Livraisons' },
  { action: 'Générer un relevé client', roles: 'Administrateur, Opérateur, Finance', ou: 'Clients' },
  { action: 'Bloquer ou supprimer un client', roles: 'Administrateur', ou: 'Clients' },
  { action: 'Créer ou modifier une charge véhicule', roles: 'Administrateur, Opérateur', ou: 'Flotte' },
  { action: 'Supprimer une charge véhicule', roles: 'Administrateur', ou: 'Flotte' },
  {
    action: "Saisir ou modifier les charges de l'organisation",
    roles: 'Administrateur, Finance',
    ou: 'Configuration → Charges fixes',
  },
  {
    action: 'Modifier les règles de commission et de répartition',
    roles: 'Administrateur',
    ou: 'Configuration → Acteurs',
  },
  { action: 'Inviter un collaborateur et lui attribuer un rôle', roles: 'Administrateur', ou: 'Configuration → Équipe' },
  {
    action: "Modifier les paramètres de l'entreprise",
    roles: 'Administrateur',
    ou: 'Configuration → Entreprise',
  },
]
