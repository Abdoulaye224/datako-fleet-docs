export type WhatsAppBlocId = 'pilotage' | 'actions-terrain' | 'validation-client' | 'notifications'

export type WhatsAppDisponibilite = 'disponible' | 'a-venir'

export type WhatsAppAccent = 'blue' | 'emerald' | 'amber' | 'purple'

export interface WhatsAppBlocLien {
  texte: string
  label: string
  href: string
}

export interface WhatsAppBloc {
  id: WhatsAppBlocId
  titre: string
  sousTitre: string
  pourQui: string
  icon: string
  accent: WhatsAppAccent
  lien?: WhatsAppBlocLien
}

export interface WhatsAppFlux {
  id: string
  bloc: WhatsAppBlocId
  titre: string
  acteur: string
  description: string
  etapes: string[]
  resultat?: string
  exempleMessage?: string
  acces: string
  disponibilite: WhatsAppDisponibilite
  href?: string
}

export const WHATSAPP_TITRE = 'WhatsApp avec Datakö Fleet'

export const WHATSAPP_ACCROCHE =
  'Consultez vos opérations, effectuez certaines actions terrain et échangez avec vos destinataires directement via WhatsApp.'

export const WHATSAPP_PRINCIPE = [
  'Vos équipes écrivent au numéro WhatsApp de Datakö Fleet et reçoivent un menu.',
  'On répond en choisissant dans une liste ou en appuyant sur un bouton, pas en rédigeant des phrases.',
  'Chaque personne voit un menu différent selon son rôle : ce qu’un conducteur peut faire n’est pas ce qu’un directeur peut consulter.',
]

export const WHATSAPP_BLOCS: WhatsAppBloc[] = [
  {
    id: 'pilotage',
    titre: 'Pilotage',
    sousTitre: 'Consulter ses chiffres sans ouvrir l’application',
    pourQui: 'Directeur général, responsable financier, chef d’exploitation',
    icon: 'chart',
    accent: 'purple',
  },
  {
    id: 'actions-terrain',
    titre: 'Actions terrain',
    sousTitre: 'Enregistrer et confirmer depuis le terrain',
    pourQui: 'Conducteur, chef d’exploitation, opérateur de vente',
    icon: 'zap',
    accent: 'blue',
    lien: {
      texte: 'La Mission Conducteur va plus loin : le conducteur est prévenu de son affectation, démarre sa mission et fait confirmer la réception par le destinataire.',
      label: 'Voir la Mission Conducteur',
      href: '/whatsapp/mission-conducteur',
    },
  },
  {
    id: 'validation-client',
    titre: 'Validation client',
    sousTitre: 'Faire confirmer une livraison par le destinataire',
    pourQui: 'Le destinataire de la marchandise, sans compte Datakö',
    icon: 'check',
    accent: 'emerald',
    lien: {
      texte: 'Le destinataire dispose de son propre guide, sans compte ni installation.',
      label: 'Voir le guide destinataire',
      href: '/confirmation-livraison',
    },
  },
  {
    id: 'notifications',
    titre: 'Notifications automatiques',
    sousTitre: 'Être prévenu sans rien demander',
    pourQui: 'Directeur général et chef d’exploitation',
    icon: 'bell',
    accent: 'amber',
  },
]

export const WHATSAPP_FLUX: WhatsAppFlux[] = [
  // ── Pilotage ───────────────────────────────────────────────────────────────
  {
    id: 'menu-direction-transport',
    bloc: 'pilotage',
    titre: 'Consulter l’activité transport',
    acteur: 'Directeur général',
    description:
      'Le menu du directeur donne accès aux chiffres du transport et à l’état de la flotte, sans ouvrir l’application.',
    etapes: [
      'Écrire « menu » au numéro WhatsApp de Datakö Fleet.',
      'Choisir dans la liste : Gains du jour, Gains semaine, Top camions, Statut flotte ou Livraisons.',
      'Lire la réponse, puis revenir au menu avec le bouton « Menu ».',
    ],
    resultat:
      'Les chiffres affichés sont ceux de l’application, calculés au moment de la demande.',
    acces: 'Rôle Directeur général enregistré dans Configuration → WhatsApp.',
    disponibilite: 'disponible',
  },
  {
    id: 'menu-livraisons',
    bloc: 'pilotage',
    titre: 'Suivre les livraisons par statut',
    acteur: 'Directeur général, chef d’exploitation',
    description:
      'L’entrée « Livraisons » affiche d’abord un résumé chiffré, puis permet d’ouvrir le détail statut par statut.',
    etapes: [
      'Depuis le menu, choisir « Livraisons ».',
      'Choisir le statut à consulter : En cours, Livrées, Retardées ou Annulées.',
      'Utiliser « Voir plus » si la liste dépasse un écran.',
    ],
    resultat:
      '« En cours » couvre les 7 derniers jours, « Livrées » la journée en cours, et « Retardées » les rotations en cours depuis plus de 7 jours.',
    exempleMessage:
      '📦 Livraisons — Transguinée\n\n📊 Résumé\n\n🔄 En cours (7 derniers jours) : 6\n✅ Livrées aujourd’hui : 3\n⚠️ Retardées (>7 jours) : 1\n❌ Annulées : 0',
    acces: 'Directeur général et chef d’exploitation.',
    disponibilite: 'disponible',
  },
  {
    id: 'menu-marketeur-direction',
    bloc: 'pilotage',
    titre: 'Consulter l’activité Marketeur',
    acteur: 'Directeur général, responsable financier',
    description:
      'Pour une organisation Marketeur, le menu de direction porte sur les ventes et les balances réglementaires plutôt que sur la flotte.',
    etapes: [
      'Écrire « menu » au numéro WhatsApp de Datakö Fleet.',
      'Choisir : Ventes du jour, Performance semaine, Alertes hors tarif ou Péréquation État.',
      'Revenir au menu pour enchaîner sur une autre consultation.',
    ],
    resultat:
      '« Alertes hors tarif » liste les ventes conclues en dehors du barème SONAP. « Péréquation État » donne l’état des créances et des reversements.',
    acces:
      'Réservé aux organisations dont l’activité est uniquement Marketeur — voir la limite signalée en bas de page.',
    disponibilite: 'disponible',
  },
  {
    id: 'questions-libres',
    bloc: 'pilotage',
    titre: 'Poser une question en langage naturel',
    acteur: 'Directeur général',
    description:
      'Au lieu de passer par le menu, le directeur peut écrire sa question directement et recevoir une réponse construite à partir de ses données.',
    etapes: [
      'Écrire la question dans la conversation, par exemple « quel camion est le moins rentable ce mois ? ».',
      'Lire la réponse.',
    ],
    resultat:
      'Sans l’offre Business, la question reçoit un message expliquant que cette analyse n’est pas incluse — le menu, lui, reste utilisable.',
    acces: 'Rôle Directeur général, avec l’offre Business.',
    disponibilite: 'disponible',
  },

  // ── Actions terrain ────────────────────────────────────────────────────────
  {
    id: 'mission-conducteur',
    bloc: 'actions-terrain',
    titre: 'Suivre une mission de bout en bout',
    acteur: 'Conducteur',
    description:
      'Le conducteur est prévenu par WhatsApp dès qu’une mission lui est affectée. Il la démarre, déclare la quantité déposée en fin de livraison, puis présente un QR au réceptionnaire pour que celui-ci confirme lui-même la réception.',
    etapes: [
      'Recevoir le message d’affectation et appuyer sur « Démarrer », dans les 12 heures.',
      'À l’arrivée, appuyer sur « Fin de mission » et saisir la quantité réellement déposée en litres.',
      'Ouvrir le lien reçu et présenter le QR au réceptionnaire, qui confirme lui-même la quantité reçue.',
    ],
    resultat:
      'La déclaration du conducteur ne clôture pas la livraison : elle ouvre la confirmation du destinataire. L’exploitant suit l’état de la mission depuis la page Livraisons.',
    acces:
      'Fonctionnalité premium, réservée au plan Business avec le module Transport. Son activation passe par Datakö.',
    disponibilite: 'disponible',
    href: '/whatsapp/mission-conducteur',
  },
  {
    id: 'conducteur-missions',
    bloc: 'actions-terrain',
    titre: 'Consulter ses missions en cours',
    acteur: 'Conducteur',
    description:
      'Le conducteur retrouve les livraisons qui lui sont affectées, avec la destination et le volume chargé.',
    etapes: [
      'Écrire « menu » au numéro WhatsApp de Datakö Fleet.',
      'Choisir « Mes missions ».',
    ],
    resultat:
      'Seules les livraisons en cours affectées à son numéro apparaissent, les 10 plus récentes.',
    exempleMessage:
      '📦 Vos missions en cours\n\n🔄 En cours (2)\n\n1. TV-0629-04 — RC-2451-A\n📍 Kindia\n⛽ Gasoil — 30 000 L\n\n2. TV-0630-01 — RC-1987-B\n📍 Kankan\n⛽ Essence — 25 000 L',
    acces: 'Rôle Conducteur, ouvert par Datakö avec l’offre Business.',
    disponibilite: 'disponible',
  },
  {
    id: 'conducteur-valider',
    bloc: 'actions-terrain',
    titre: 'Confirmer une livraison arrivée',
    acteur: 'Conducteur',
    description:
      'Le conducteur signale qu’il est arrivé à destination. Il choisit la livraison dans une liste puis appuie sur un bouton — il n’a jamais à taper de texte.',
    etapes: [
      'Depuis le menu, choisir « Valider une livraison ».',
      'Sélectionner la livraison concernée dans la liste proposée.',
      'Appuyer sur « Confirmer » (ou « Annuler » pour revenir en arrière).',
    ],
    resultat:
      'La livraison affiche le badge « 🟡 Confirmé » dans l’application, avec l’heure. C’est une confirmation terrain : elle ne remplace pas le déchargement ni la validation par l’exploitation. Les chefs d’exploitation reçoivent le message dans la foulée.',
    exempleMessage:
      '✅ Livraison confirmée.\n\n🚛 TV-0629-04 — RC-2451-A\n📍 Kindia\n⛽ Gasoil — 30 000 L\n📅 08/08/2026 — 11:18',
    acces: 'Rôle Conducteur. Une livraison déjà confirmée ne peut pas l’être une seconde fois.',
    disponibilite: 'disponible',
  },
  {
    id: 'conducteur-probleme',
    bloc: 'actions-terrain',
    titre: 'Signaler un problème sur la route',
    acteur: 'Conducteur',
    description:
      'En cas d’empêchement, le conducteur choisit un motif dans une liste fermée. Cela évite les messages libres que personne ne traite.',
    etapes: [
      'Depuis le menu, choisir « Signaler un problème ».',
      'Sélectionner la livraison concernée.',
      'Choisir le motif : incident camion, client absent, route bloquée, livraison reportée ou autre.',
    ],
    resultat:
      'La livraison affiche « ⚠️ Problème signalé » avec le motif et l’heure. Les chefs d’exploitation sont prévenus immédiatement.',
    acces: 'Rôle Conducteur. Un seul signalement par livraison.',
    disponibilite: 'disponible',
  },
  {
    id: 'nouvelle-rotation',
    bloc: 'actions-terrain',
    titre: 'Enregistrer une nouvelle rotation',
    acteur: 'Chef d’exploitation, directeur général',
    description:
      'Une rotation peut être créée entièrement depuis WhatsApp, par une suite de questions à choix. Le récapitulatif financier est affiché avant l’enregistrement.',
    etapes: [
      'Depuis le menu, choisir « Nouvelle rotation ».',
      'Choisir le camion, le dépôt, la destination et le produit dans les listes proposées.',
      'Saisir le volume chargé.',
      'Affecter un conducteur, ou passer cette étape.',
      'Vérifier le récapitulatif et confirmer.',
    ],
    resultat:
      'La rotation apparaît dans l’application comme si elle avait été saisie à l’écran. « Reprendre la dernière » réutilise la route précédente pour aller plus vite.',
    acces: 'Chef d’exploitation et directeur général.',
    disponibilite: 'disponible',
  },
  {
    id: 'valider-annuler-livraison',
    bloc: 'actions-terrain',
    titre: 'Valider ou annuler une livraison',
    acteur: 'Chef d’exploitation, directeur général',
    description:
      'Depuis l’entrée « Livraisons », l’exploitation peut marquer une livraison comme livrée ou l’annuler sans passer par l’application.',
    etapes: [
      'Depuis le menu, choisir « Livraisons ».',
      'Choisir « Valider une livraison » ou « Annuler une livraison ».',
      'Sélectionner la livraison, puis confirmer.',
    ],
    acces: 'Chef d’exploitation et directeur général.',
    disponibilite: 'disponible',
  },
  {
    id: 'nouvelle-vente',
    bloc: 'actions-terrain',
    titre: 'Enregistrer une vente',
    acteur: 'Opérateur de vente',
    description:
      'L’opérateur enregistre une transaction par une suite de questions guidées, avec le prix officiel proposé par défaut.',
    etapes: [
      'Depuis le menu, choisir « Nouvelle vente ».',
      'Choisir le produit : Gasoil, Essence ou HFO.',
      'Choisir la route dans les favoris, ou en saisir une autre.',
      'Indiquer si le transport est assuré par un tiers ou par vos camions.',
      'Saisir le volume.',
      'Accepter le tarif SONAP affiché, ou saisir un autre prix.',
      'Renseigner le client, ou passer cette étape.',
      'Vérifier le récapitulatif et confirmer.',
    ],
    resultat:
      'Si le prix saisi s’écarte du barème SONAP, une confirmation supplémentaire est demandée et la vente ressort ensuite dans les alertes hors tarif.',
    acces:
      'Rôle Opérateur de vente, ouvert par Datakö. Le menu « Tarif SONAP » permet aussi de consulter le barème sans rien enregistrer.',
    disponibilite: 'disponible',
  },

  // ── Validation client ──────────────────────────────────────────────────────
  {
    id: 'confirmation-destinataire',
    bloc: 'validation-client',
    titre: 'Faire confirmer la quantité par le destinataire',
    acteur: 'Le destinataire de la marchandise',
    description:
      'Lorsque la double validation est activée pour un client, la personne qui réceptionne confirme elle-même la quantité reçue, depuis un lien reçu par message. Elle n’a pas besoin d’un compte Datakö.',
    etapes: [
      'L’opérateur déclare la quantité déchargée dans l’application.',
      'Le destinataire reçoit un lien — automatiquement par e-mail, et par WhatsApp si l’opérateur envoie le message pré-rempli.',
      'Il ouvre le lien, saisit la quantité qu’il a réellement reçue et valide.',
      'Si les deux quantités concordent, la livraison est finalisée automatiquement. Sinon, un écart est signalé à l’exploitation.',
    ],
    resultat:
      'Le lien est valable 7 jours et ne fonctionne qu’une fois : une réponse envoyée ne peut plus être modifiée.',
    acces:
      'Se règle client par client, dans la fiche client, section « Validation des livraisons ».',
    disponibilite: 'disponible',
  },

  // ── Notifications automatiques ─────────────────────────────────────────────
  {
    id: 'resume-journalier',
    bloc: 'notifications',
    titre: 'Résumé du jour',
    acteur: 'Directeur général, chef d’exploitation',
    description:
      'Un récapitulatif de la journée est envoyé chaque soir : nombre de rotations, gains, camions actifs et paiements en attente.',
    etapes: [],
    resultat:
      'Aucun résumé n’est envoyé les jours sans rotation — c’est normal, ce n’est pas une panne.',
    exempleMessage:
      '📊 Résumé du jour — Transguinée\n08/08/2026\n\n✅ 6 rotations effectuées\n💰 Gains du jour : 18.4M GNF\n🚛 Camions actifs : 9/12\n⚠️ 2 paiements en attente',
    acces: 'Envoyé à tous les directeurs et chefs d’exploitation enregistrés.',
    disponibilite: 'disponible',
  },
  {
    id: 'alerte-volume',
    bloc: 'notifications',
    titre: 'Écart de volume détecté',
    acteur: 'Directeur général, chef d’exploitation',
    description:
      'Dès qu’une livraison du jour affiche un volume livré inférieur au volume chargé, l’écart est signalé avec le manquant en litres et en pourcentage.',
    etapes: [],
    exempleMessage:
      '⚠️ Écart volume détecté\n\nRotation du 08/08/2026 · RC-2451-A\nChargé : 30 000 L · Livré : 29 400 L\nManquant : 600 L (2.00%)',
    acces: 'Envoyé aux directeurs et chefs d’exploitation.',
    disponibilite: 'disponible',
  },
  {
    id: 'alerte-camion-inactif',
    bloc: 'notifications',
    titre: 'Camion déclaré actif mais sans rotation',
    acteur: 'Directeur général',
    description:
      'Un camion au statut actif qui n’a effectué aucune rotation depuis plusieurs jours est signalé, pour vérifier s’il est réellement disponible.',
    etapes: [],
    exempleMessage:
      '💤 Camion inactif — 7 jours\n\nRC-1987-B n’a effectué aucune rotation depuis le 25/07/2026.\nStatut déclaré : Actif.\n\nPensez à vérifier sa disponibilité.',
    acces: 'Envoyé aux directeurs. Le délai est de 7 jours par défaut.',
    disponibilite: 'disponible',
  },
  {
    id: 'alerte-marge',
    bloc: 'notifications',
    titre: 'Marge inhabituelle sur une route',
    acteur: 'Directeur général',
    description:
      'La marge d’une rotation est comparée à la moyenne des 30 derniers jours sur la même destination. Un écart important déclenche une alerte.',
    etapes: [],
    resultat:
      'C’est une invitation à vérifier les coûts saisis, pas un constat de perte.',
    exempleMessage:
      '⚠️ Alerte marge\n\nRotation du 08/08/2026 · RC-2451-A → Kankan\nMarge nette : 1.2M GNF\nMarge habituelle sur cette route : 3.5M GNF\n\nÉcart inhabituel — vérifier les coûts saisis.',
    acces: 'Envoyé aux directeurs. Le seuil est de 30 % d’écart par défaut.',
    disponibilite: 'disponible',
  },
  {
    id: 'alerte-maintenance',
    bloc: 'notifications',
    titre: 'Camion en maintenance',
    acteur: 'Directeur général, chef d’exploitation',
    description:
      'Un rappel est envoyé pour les camions dont le statut est « en maintenance », afin que le statut soit remis à jour dès le retour du véhicule.',
    etapes: [],
    acces: 'Envoyé aux directeurs et chefs d’exploitation.',
    disponibilite: 'disponible',
  },
  {
    id: 'alerte-paiement',
    bloc: 'notifications',
    titre: 'Paiement en attente',
    acteur: 'Directeur général',
    description:
      'Une rotation dont le règlement reste en attente au-delà du délai prévu est signalée, avec sa date et sa destination.',
    etapes: [],
    acces: 'Envoyé aux directeurs. Le délai est de 5 jours par défaut.',
    disponibilite: 'disponible',
  },
  {
    id: 'bilan-proprietaire-whatsapp',
    bloc: 'notifications',
    titre: 'Envoyer le bilan d’un propriétaire par WhatsApp',
    acteur: 'Propriétaire de véhicule',
    description:
      'L’envoi du bilan mensuel d’un propriétaire par WhatsApp est prévu mais n’est pas encore actif.',
    etapes: [],
    resultat:
      'Aujourd’hui, ce bilan s’envoie par e-mail depuis la page Profit par camion, en pièce jointe PDF. Les propriétaires ne reçoivent aucun message WhatsApp automatique.',
    acces: 'Non disponible pour le moment.',
    disponibilite: 'a-venir',
  },
]

export const WHATSAPP_PREREQUIS_TITRE = 'Avant de commencer'

export const WHATSAPP_LIMITES_TITRE = 'Ce que WhatsApp ne fait pas'

export interface WhatsAppPrerequis {
  titre: string
  description: string
}

export const WHATSAPP_PREREQUIS: WhatsAppPrerequis[] = [
  {
    titre: 'Le numéro doit être enregistré',
    description:
      'Un numéro inconnu reçoit « Numéro non autorisé » et rien d’autre. C’est le principal motif de « le bot ne me répond pas ».',
  },
  {
    titre: 'Directeurs et chefs d’exploitation s’ajoutent seuls',
    description:
      'Dans Configuration → WhatsApp, un administrateur ajoute un directeur général ou un chef d’exploitation, avec son numéro et son prénom.',
  },
  {
    titre: 'Conducteurs et opérateurs de vente passent par Datakö',
    description:
      'Ces deux rôles ne s’ajoutent pas depuis l’application : ils sont ouverts par Datakö, selon l’offre souscrite et les activités de l’organisation.',
  },
  {
    titre: 'C’est l’équipe qui écrit en premier',
    description:
      'Chacun démarre la conversation en écrivant « menu ». Un message d’invitation peut être envoyé depuis Configuration → WhatsApp pour lancer l’échange.',
  },
]

export interface WhatsAppLimite {
  titre: string
  description: string
}

export const WHATSAPP_LIMITES: WhatsAppLimite[] = [
  {
    titre: 'Le menu Marketeur ne s’affiche pas si vous faites aussi du transport',
    description:
      'Les menus de vente sont réservés aux organisations dont l’activité est uniquement Marketeur. Une organisation qui exerce les deux activités voit les menus transport sur WhatsApp, et gère ses ventes dans l’application.',
  },
  {
    titre: 'Les seuils d’alerte ne se règlent pas dans l’application',
    description:
      'Les délais et pourcentages qui déclenchent les alertes automatiques sont définis avec Datakö. Pour les ajuster, passez par le support.',
  },
  {
    titre: 'Le conducteur agit sur ses missions, il ne pilote pas',
    description:
      'Un conducteur ne peut ni créer de rotation, ni consulter de chiffres. Son menu se limite à ses missions, au démarrage et à la fin de mission, à la confirmation d’arrivée et au signalement d’un problème.',
  },
  {
    titre: 'Les badges conducteur n’apparaissent que si le module est actif',
    description:
      'Les mentions « Confirmé » et « Problème signalé » ne s’affichent dans la page Livraisons que pour les organisations dont l’accès conducteur est ouvert.',
  },
]
