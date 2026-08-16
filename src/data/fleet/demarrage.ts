export type GroupeDemarrage = 'rotation' | 'chiffres'

export interface LienEtape {
  titre: string
  href: string
}

export interface EtapeDemarrage {
  id: string
  numero: number
  groupe: GroupeDemarrage
  titre: string
  /** Ce que c'est, en une phrase, en langage métier */
  ceQueCest: string
  /** La page de l'application, sous son nom exact affiché à l'écran */
  ou: string
  /** Le rôle qui peut le faire */
  qui: string
  /** De quoi cette étape dépend, et ce qu'elle débloque */
  pourquoiMaintenant: string
  /** Le symptôme concret que l'utilisateur verra s'il saute l'étape */
  siOnSaute: string
  /** Précisions de saisie : champs obligatoires, valeurs attendues */
  details?: string[]
  /** Point de vigilance affiché en encadré */
  attention?: string
  /** Renvoi vers un guide pas-à-pas existant */
  pourAllerPlusLoin?: LienEtape
}

export const DEMARRAGE_TITRE = 'Mettre en route votre organisation'

export const DEMARRAGE_ACCROCHE =
  "Vous venez de recevoir vos accès et votre organisation est vide. Cette page vous emmène de l'écran d'accueil à votre première rotation correctement calculée, dans l'ordre où les étapes dépendent les unes des autres."

export const DEMARRAGE_PROMESSE =
  "Vous pouvez enregistrer votre première rotation sans avoir tout rempli : trois étapes suffisent. Mais vos indicateurs — marge, rentabilité par camion, part propriétaire — ne seront complets qu'une fois les étapes suivantes faites. Rien ne vous bloquera pour vous le signaler : les chiffres s'afficheront quand même, simplement faux."

export const AVANT_DE_COMMENCER_TITRE = 'Avant de commencer — activez votre compte'

export const AVANT_DE_COMMENCER_ACCROCHE =
  "Cette activation n'est pas une étape de paramétrage : elle a déjà eu lieu en grande partie sans vous."

export const CE_QUE_DATAKO_A_FAIT_TITRE = 'Ce que Datakö a fait pour vous'

export const CE_QUE_DATAKO_A_FAIT: string[] = [
  'Créé votre organisation.',
  'Activé votre formule et les modules qui correspondent à votre activité.',
  'Créé votre compte administrateur et vous a envoyé votre invitation par e-mail.',
]

export const CE_QUE_VOUS_FAITES_TITRE = 'Ce que vous faites maintenant'

export const CE_QUE_VOUS_FAITES: string[] = [
  "Ouvrez l'e-mail d'invitation et créez votre mot de passe.",
  'Connectez-vous à Fleet Manager avec cette adresse e-mail.',
  'Suivez les douze étapes ci-dessous, de haut en bas.',
]

export const AVANT_DE_COMMENCER_NOTE =
  "Vous n'avez pas besoin d'un compte préexistant : l'invitation crée votre accès. Votre formule et vos modules, en revanche, ne se modifient pas depuis l'application — pour en changer, contactez Datakö."

export interface GroupeInfo {
  id: GroupeDemarrage
  titre: string
  accroche: string
}

export const GROUPES_DEMARRAGE: GroupeInfo[] = [
  {
    id: 'rotation',
    titre: "Ce qu'il faut pour enregistrer une rotation",
    accroche:
      "Tant que ces trois étapes ne sont pas faites, l'application vous empêchera d'enregistrer quoi que ce soit. Ce sont les seules qui bloquent.",
  },
  {
    id: 'chiffres',
    titre: "Ce qu'il faut pour que vos chiffres soient justes",
    accroche:
      "Aucune de ces étapes ne vous empêchera de travailler. Chacune, en revanche, rend un chiffre précis inexact tant qu'elle n'est pas faite — le détail est indiqué sur chaque étape.",
  },
]

export const ETAPES_DEMARRAGE: EtapeDemarrage[] = [
  {
    id: 'compte-entreprise',
    numero: 1,
    groupe: 'rotation',
    titre: 'Vérifier votre compte et votre entreprise',
    ceQueCest:
      "Votre nom et celui de votre entreprise, tels qu'ils apparaîtront ensuite sur vos documents et vos exports.",
    ou: 'Configuration → onglet Entreprise → sous-onglets « Mon compte » et « Général »',
    qui: 'Administrateur',
    pourquoiMaintenant:
      "Rien d'autre n'en dépend techniquement, mais le nom de votre entreprise est repris partout ensuite : autant le corriger avant d'éditer votre premier relevé client.",
    siOnSaute:
      "Vos relevés, factures et bilans propriétaire sortent au nom enregistré à la création de votre organisation, qui n'est pas forcément votre raison sociale exacte.",
    details: [
      'Le sous-onglet « Mon compte » contient votre nom complet et votre adresse e-mail.',
      "Le sous-onglet « Général » contient le nom de l'entreprise.",
      "Votre adresse e-mail ne se modifie pas depuis cet écran : c'est celle de votre invitation.",
    ],
  },
  {
    id: 'parametres-transport',
    numero: 2,
    groupe: 'rotation',
    titre: 'Vérifier le prix du carburant et votre préfixe de rotation',
    ceQueCest:
      "Le prix au litre qui sert à calculer le coût carburant de chacune de vos rotations, et le préfixe qui numérote vos rotations.",
    ou: 'Configuration → onglet Entreprise → sous-onglet « Transport »',
    qui: 'Administrateur',
    pourquoiMaintenant:
      "C'est la première chose à regarder, avant même d'enregistrer un camion : sans prix carburant applicable, aucune rotation ne peut être enregistrée, quel que soit le reste de votre configuration.",
    siOnSaute:
      "Au moment de créer votre première rotation, le bouton d'enregistrement reste désactivé, sous le message « Prix carburant non configuré » puis « Enregistrement bloqué ». Vous aurez tout configuré pour rien.",
    details: [
      "Le prix du carburant s'affiche en lecture seule : vous ne le saisissez pas, il est repris de la structure des prix publiée pour le carburant de votre véhicule.",
      'Le préfixe de rotation accepte 5 caractères, en majuscules. Exemple : TR, qui produira TR-2026-0001.',
      "Le « Client par défaut » se règle sur ce même écran, mais seulement une fois vos clients créés — voir l'étape 6.",
    ],
    attention:
      "Vous ne pouvez pas modifier ce prix, ni poser une dérogation depuis l'application. Si aucune valeur ne s'affiche, ou si la valeur affichée vous semble fausse, contactez Datakö — ne cherchez pas l'écran de saisie, il n'existe pas.",
  },
  {
    id: 'flotte',
    numero: 3,
    groupe: 'rotation',
    titre: 'Enregistrer votre flotte',
    ceQueCest: 'Vos camions, avec leur capacité et leur mode de détention.',
    ou: 'Flotte',
    qui: 'Administrateur ou Opérateur',
    pourquoiMaintenant:
      "Un camion au statut actif est le dernier élément obligatoire pour créer une rotation. C'est aussi le socle des étapes 9 et 11 : les charges fixes et les conducteurs se rattachent à un véhicule existant.",
    siOnSaute:
      "L'écran « Nouvelle Rotation » ne vous propose aucun camion — la liste ne contient que les véhicules au statut actif.",
    details: [
      "L'immatriculation et la capacité en litres sont obligatoires. La capacité doit être supérieure à zéro : elle sert à calculer votre taux de remplissage.",
      'Un véhicule « Propre » vous appartient : la totalité de la marge reste dans votre organisation.',
      "Un véhicule « Géré » appartient à un tiers : une part de la marge lui revient. Son propriétaire et sa date de début de gestion sont alors obligatoires.",
      "En enregistrant un véhicule géré avec son propriétaire, une règle de répartition résiduelle est créée automatiquement pour cet acteur sur ce véhicule.",
    ],
    attention:
      "Si votre camion est géré, son propriétaire doit déjà exister comme acteur : le formulaire ne permet que de le sélectionner, pas de le créer. Faites l'étape 4 d'abord pour ces véhicules-là.",
    pourAllerPlusLoin: { titre: 'Ajouter un camion', href: '/transport/guides/ajouter-camion' },
  },
  {
    id: 'acteurs',
    numero: 4,
    groupe: 'chiffres',
    titre: 'Déclarer vos acteurs',
    ceQueCest:
      'Les personnes et les sociétés qui touchent une part de vos revenus : propriétaires de camions gérés, exploitants, partenaires, banques, investisseurs.',
    ou: 'Configuration → onglet Acteurs',
    qui: 'Administrateur',
    pourquoiMaintenant:
      "C'est le préalable de l'étape 5, et le préalable immédiat de tout véhicule géré enregistré à l'étape 3.",
    siOnSaute:
      "Aucune part ne peut être attribuée à personne : l'intégralité de la marge s'affiche comme revenant à votre organisation, y compris sur des camions qui ne vous appartiennent pas. Le bilan que vous remettez au propriétaire est alors inexploitable.",
    details: [
      'Un acteur porte un type : Organisation, Propriétaire, Exploitant, Banque, Investisseur, Partenaire ou Conducteur.',
      "Ne déclarez comme acteur que ce qui donne lieu à un partage de revenus — un client ne s'enregistre pas ici, mais à l'étape 6.",
    ],
    pourAllerPlusLoin: {
      titre: 'Configurer la répartition entre acteurs',
      href: '/transport/guides/configurer-repartition-acteurs',
    },
  },
  {
    id: 'repartition',
    numero: 5,
    groupe: 'chiffres',
    titre: 'Vérifier vos règles de répartition',
    ceQueCest:
      "La façon dont la marge d'un camion se partage entre votre organisation et vos acteurs : commissions d'abord, puis le résiduel, c'est-à-dire tout ce qui reste.",
    ou: 'Configuration → onglet Acteurs',
    qui: 'Administrateur',
    pourquoiMaintenant:
      "Cette étape est une vérification, pas une saisie : pour chaque véhicule géré enregistré avec son propriétaire, la règle résiduelle a déjà été créée à l'étape 3. Vous n'ajoutez ici que vos commissions.",
    siOnSaute:
      "La part du propriétaire n'est pas explicitement attribuée : votre organisation reçoit par défaut la marge d'exploitation diminuée des commissions. Le montant affiché ressemble à un résultat, mais il ne reflète aucun accord.",
    details: [
      'Une commission peut être un pourcentage, un montant fixe mensuel ou un montant fixe par rotation.',
      "Le résiduel est le solde : il se calcule après application de toutes les autres règles.",
      "Une règle peut viser un camion précis, ou l'ensemble de vos camions propres, ou l'ensemble de vos camions gérés.",
    ],
    attention:
      "L'écran indique qu'il n'y a « qu'un seul résiduel par organisation ». C'est imprécis : l'unicité porte sur un périmètre. Vous pouvez avoir un résiduel par camion, ou un résiduel pour vos camions propres et un autre pour vos camions gérés.",
    pourAllerPlusLoin: {
      titre: 'Configurer la répartition entre acteurs',
      href: '/transport/guides/configurer-repartition-acteurs',
    },
  },
  {
    id: 'clients',
    numero: 6,
    groupe: 'chiffres',
    titre: 'Créer vos clients',
    ceQueCest: 'Les donneurs d\'ordre pour lesquels vous transportez, et que vous facturez.',
    ou: 'Clients, puis Configuration → onglet Entreprise → sous-onglet « Transport » pour le client par défaut',
    qui: 'Administrateur ou Opérateur',
    pourquoiMaintenant:
      "Avant l'étape 8 : un tarif négocié propre à un client ne peut être enregistré qu'une fois ce client créé.",
    siOnSaute:
      "Vous pouvez enregistrer une rotation sans client, mais elle ne pourra jamais être rattachée à un relevé client ni facturée, et aucun tarif négocié ne s'appliquera : c'est le tarif national qui servira au calcul de votre chiffre d'affaires.",
    details: [
      'Seul le nom du client est obligatoire.',
      "Une fois vos clients créés, désignez votre client principal comme « Client par défaut » : il sera présélectionné à chaque nouvelle rotation, et restera modifiable.",
    ],
    pourAllerPlusLoin: { titre: 'Ajouter un client', href: '/transport/guides/ajouter-client' },
  },
  {
    id: 'routes',
    numero: 7,
    groupe: 'chiffres',
    titre: 'Renseigner vos routes',
    ceQueCest:
      "Les charges variables de chaque trajet dépôt → destination que vous exploitez : la distance, la consommation de carburant, la prime du chauffeur et le péage. Ce sont les coûts qui n'existent que parce que le camion prend la route — ils changent avec le trajet, pas avec le mois.",
    ou: 'Configuration → onglet Routes',
    qui: 'Administrateur ou Opérateur',
    pourquoiMaintenant:
      "Dès la première rotation, ces valeurs déterminent le coût carburant retenu. Une route corrigée après coup oblige à relancer un recalcul sur les rotations déjà enregistrées.",
    siOnSaute:
      "Le calcul retombe sur les valeurs générales de votre organisation : votre coût carburant, donc votre marge, est estimé au lieu d'être calculé sur la consommation réelle de vos camions sur ce trajet.",
    details: [
      "C'est ici, et nulle part ailleurs, que se définissent les charges variables liées au trajet. Les charges fixes du camion se saisissent à l'étape 9, celles de la structure à l'étape 10.",
      'La distance vous est proposée automatiquement à la sélection de la destination — vous pouvez la corriger.',
      'La consommation se renseigne route par route, jamais globalement : une même destination ne se parcourt pas au même coût selon vos camions.',
      'Ces quatre valeurs sont reprises automatiquement à la création de la rotation, dès que le trajet est sélectionné.',
    ],
    attention:
      "Les dépôts et destinations proposés proviennent du référentiel Datakö. Si une destination vous manque, contactez le support.",
    pourAllerPlusLoin: {
      titre: 'Recalculer les coûts variables',
      href: '/transport/guides/recalculer-couts-variables',
    },
  },
  {
    id: 'tarifs',
    numero: 8,
    groupe: 'chiffres',
    titre: 'Poser vos tarifs contractuels — seulement si besoin',
    ceQueCest:
      "Le prix au litre transporté que vous facturez, quand il diffère de la péréquation transport nationale.",
    ou: 'Configuration → onglet Tarifs de transport',
    qui: 'Administrateur ou Opérateur',
    pourquoiMaintenant:
      "Cette étape peut rester vide. Par défaut, le système applique la péréquation transport nationale à chaque rotation : c'est le cas de la plupart des organisations, et le calcul est juste sans que vous saisissiez quoi que ce soit.",
    siOnSaute:
      "Rien ne casse : c'est la péréquation nationale qui s'applique. Votre chiffre d'affaires n'est faux que dans un cas — vous facturez réellement un autre prix que la péréquation sur une distance donnée, et vous ne l'avez pas déclaré ici.",
    details: [
      "Ne créez un tarif contractuel que si votre prix diffère de la péréquation sur une distance donnée, et qu'il s'applique à tous vos clients sur ce trajet.",
      "S'il ne s'agit que d'une remise accordée à un client précis, ne créez pas de tarif : saisissez une ristourne au moment de créer la rotation. Elle se déduit du tarif facturé, rotation par rotation, et se lit ensuite sur la livraison.",
      "Trois niveaux existent, du plus fort au plus faible : le tarif négocié avec un client précis, puis votre tarif général pour la route, puis la péréquation nationale.",
      'La péréquation transport nationale ne se modifie pas : elle vous est fournie.',
    ],
    attention:
      "Le tarif retenu est figé sur la rotation au moment de l'enregistrement. Le corriger ensuite ne met pas à jour les rotations déjà enregistrées.",
    pourAllerPlusLoin: {
      titre: 'Créer une rotation',
      href: '/transport/guides/creer-rotation',
    },
  },
  {
    id: 'charges-vehicules',
    numero: 9,
    groupe: 'chiffres',
    titre: 'Saisir les charges fixes de vos véhicules',
    ceQueCest:
      "Les coûts récurrents attachés à un camion précis : assurance, vignette, visite technique, patente, GPS.",
    ou: 'Flotte, dans la fiche de chaque véhicule',
    qui: 'Administrateur ou Opérateur',
    pourquoiMaintenant: "Après l'étape 3 : ces charges se rattachent à un véhicule existant.",
    siOnSaute:
      "Ces coûts manquent au calcul : la marge de chaque camion est surestimée. Rien ne signale l'absence — le chiffre s'affiche normalement, simplement trop beau.",
    details: [
      'Une charge fixe est proratisée sur la période affichée : un camion à l\'arrêt continue de coûter.',
      "Sur un véhicule géré, les charges sont bornées à la période de gestion.",
    ],
    pourAllerPlusLoin: {
      titre: 'Ajouter une charge fixe',
      href: '/transport/guides/ajouter-charge-fixe',
    },
  },
  {
    id: 'charges-organisation',
    numero: 10,
    groupe: 'chiffres',
    titre: 'Saisir les charges de votre organisation',
    ceQueCest:
      "Les coûts qui ne se rattachent à aucun camion en particulier : salaires, HSE, formation, assurance, administratif.",
    ou: 'Configuration → onglet Charges fixes',
    qui: 'Administrateur ou Finance',
    pourquoiMaintenant:
      "Après l'étape 3 également : ces charges sont réparties en quote-part entre vos camions, il faut donc qu'ils existent.",
    siOnSaute:
      "Les pages « Profit par camion » et la fiche de chaque véhicule surestiment la rentabilité, puisqu'aucune quote-part de structure n'est imputée. Votre Cashflow, lui, reste juste : il utilise les montants bruts.",
    details: [
      'Chaque charge porte un périmètre : tous les camions, les camions propres uniquement, ou les camions gérés uniquement.',
      "C'est ce périmètre qui détermine entre quels véhicules le montant est réparti.",
    ],
    pourAllerPlusLoin: { titre: 'Profit par camion', href: '/transport/pages/profit-camion' },
  },
  {
    id: 'conducteurs',
    numero: 11,
    groupe: 'chiffres',
    titre: 'Enregistrer vos conducteurs',
    ceQueCest: 'Les chauffeurs qui prendront la route, avec leur nom et leur téléphone.',
    ou: 'Configuration → onglet Conducteurs',
    qui: 'Administrateur ou Opérateur',
    pourquoiMaintenant:
      "Après l'étape 3, pour pouvoir désigner le conducteur habituel de chaque camion et gagner du temps à chaque saisie.",
    siOnSaute:
      "Le conducteur n'est pas obligatoire sur une rotation, mais celle-ci ne garde alors aucune trace de qui conduisait : vous ne pourrez rattacher ni un écart de volume, ni une prime à un chauffeur.",
    details: [
      'Seul le nom complet est obligatoire.',
      "Un conducteur habituel rattaché à un camion est proposé automatiquement à la saisie de la rotation, et reste modifiable.",
      "Le conducteur retenu est figé sur la rotation au moment de l'enregistrement.",
    ],
  },
  {
    id: 'equipe',
    numero: 12,
    groupe: 'chiffres',
    titre: 'Inviter votre équipe',
    ceQueCest:
      'Les personnes qui utiliseront Fleet Manager avec vous, chacune avec le rôle qui correspond à son travail.',
    ou: 'Configuration → onglet Équipe',
    qui: 'Administrateur',
    pourquoiMaintenant:
      "En dernier, pour que vos collaborateurs arrivent sur une organisation déjà configurée. Rien ne vous empêche de le faire plus tôt si vous voulez déléguer une partie de la saisie.",
    siOnSaute:
      "Tout repose sur votre seul compte : personne d'autre ne peut saisir une rotation ni valider une livraison en votre absence.",
    details: [
      "L'invitation se fait par adresse e-mail. Le destinataire n'a pas besoin d'avoir déjà un compte : il en reçoit un, avec un lien pour créer son mot de passe.",
      'Le rôle attribué détermine ce que la personne pourra faire : Administrateur, Opérateur, Finance ou Lecteur.',
      'Le nombre de membres est plafonné par votre formule.',
    ],
    pourAllerPlusLoin: { titre: 'Les rôles et leurs permissions', href: '/roles' },
  },
]

export const PREMIERE_ROTATION_TITRE = 'Votre première rotation'

export const PREMIERE_ROTATION_ACCROCHE =
  "Votre organisation est en route. La suite n'est plus du paramétrage : c'est votre métier au quotidien — créer la rotation, valider la livraison, encaisser. Ce cycle est décrit en détail sur sa propre page, avec ce qui se passe à chaque changement de statut."

export const PREMIERE_ROTATION_LIENS: LienEtape[] = [
  { titre: "Le cycle d'une rotation, étape par étape", href: '/transport/cycle' },
  { titre: 'Créer une rotation', href: '/transport/guides/creer-rotation' },
  { titre: 'Valider une livraison', href: '/transport/guides/valider-livraison' },
  { titre: 'Confirmer un paiement', href: '/transport/guides/confirmer-paiement' },
]

export const CHECKLIST_TITRE = 'Récapitulatif'

export const CHECKLIST_ACCROCHE =
  'À cocher de haut en bas. Les trois premières lignes conditionnent votre première rotation, les suivantes la justesse de vos chiffres.'

export const DEMARRAGE_CHECKLIST: string[] = [
  'Mot de passe créé et connexion réussie',
  "Nom de l'entreprise vérifié",
  'Prix du carburant affiché avec une valeur',
  'Préfixe de numérotation posé',
  'Camions enregistrés, avec leur capacité',
  'Propriétaires et partenaires déclarés comme acteurs',
  'Règles de répartition vérifiées sur chaque camion géré',
  'Clients créés et client par défaut désigné',
  'Routes renseignées avec leur distance et leur consommation',
  'Tarifs contractuels posés pour vos clients négociés',
  'Charges fixes saisies sur chaque camion',
  "Charges de l'organisation saisies avec leur périmètre",
  'Conducteurs enregistrés',
  'Équipe invitée avec les bons rôles',
]

export const VERIFICATIONS_TITRE = 'Comment savoir que tout est bon'

export const VERIFICATIONS_ACCROCHE =
  "Quatre vérifications que vous faites vous-même, dans l'application, sans rien demander à personne."

export interface VerificationFinale {
  titre: string
  comment: string
}

export const VERIFICATIONS_FINALES: VerificationFinale[] = [
  {
    titre: 'Une rotation peut être enregistrée',
    comment:
      "Ouvrez « Nouvelle Rotation ». Un camion, un dépôt et une destination doivent vous être proposés, et aucun message rouge ne doit apparaître sous le bouton d'enregistrement. Si « Enregistrement bloqué » s'affiche, reprenez l'étape 2.",
  },
  {
    titre: 'Le gain estimé apparaît avant de valider',
    comment:
      "Toujours dans « Nouvelle Rotation », choisissez un camion, une destination et un volume : le gain prévisionnel doit s'afficher avant que vous n'enregistriez. S'il paraît anormalement élevé, vos routes ou vos charges manquent.",
  },
  {
    titre: 'Vos camions portent bien leurs coûts',
    comment:
      "Après votre première rotation, ouvrez « Profit par camion ». Chaque camion doit afficher ses charges fixes et sa quote-part de charges d'organisation, pas seulement du chiffre d'affaires.",
  },
  {
    titre: 'La part propriétaire est calculée',
    comment:
      "Si vous exploitez des camions gérés, ouvrez « Répartition acteurs » : la part revenant à chaque propriétaire doit être chiffrée et porter son nom. Si tout revient à votre organisation, reprenez les étapes 4 et 5.",
  },
]

export const DEMARRAGE_NOTE_ACTIVITE =
  "Cette mise en route couvre l'activité Transport. Si vous exploitez aussi la distribution, votre configuration Distribution se fait à part, une fois ce parcours terminé."

/** Renvoi affiché depuis /onboarding, qui propose des parcours de lecture et non une mise en route. */
export const DEMARRAGE_RENVOI = {
  titre: 'Votre organisation vient tout juste d\'être ouverte ?',
  description:
    "Les parcours ci-dessous indiquent quoi lire selon votre rôle. Si votre organisation est encore vide, commencez plutôt par la mise en route : les douze étapes de configuration, dans l'ordre, jusqu'à votre première rotation.",
  cta: 'Mettre en route votre organisation',
  href: '/demarrage',
}
