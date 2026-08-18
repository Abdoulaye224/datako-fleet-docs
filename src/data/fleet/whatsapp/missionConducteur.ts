// Contenu vérifié contre la production de Fleet Manager (origin/main, 18/08/2026).
// Chaque libellé cité entre guillemets est repris tel quel du produit.

export type MissionEtapeActeur = 'exploitant' | 'conducteur' | 'destinataire'

export interface MissionEtape {
  numero: number
  titre: string
  acteur: MissionEtapeActeur
  description: string
  details: string[]
  message?: string
  aRetenir?: string
}

export interface MissionStatut {
  libelle: string
  quand: string
  couleur: 'blue' | 'emerald' | 'amber' | 'red' | 'slate'
}

export interface MissionVigilance {
  titre: string
  description: string
}

export interface MissionDepannageCause {
  cause: string
  quoiFaire: string
}

export const MISSION_CONDUCTEUR_TITRE = 'Mission Conducteur WhatsApp'

export const MISSION_CONDUCTEUR_ACCROCHE =
  'Le conducteur devient un acteur du parcours, et non plus seulement un nom sur une rotation. Il est prévenu par WhatsApp dès qu’une mission lui est affectée, démarre lui-même sa mission, déclare la quantité déposée en fin de livraison et fait confirmer la réception par le destinataire.'

export const MISSION_CONDUCTEUR_POSITIONNEMENT = {
  titre: 'Une fonctionnalité premium, activée par Datakö',
  paragraphes: [
    'La Mission Conducteur est réservée au plan Business avec le module Transport. Elle n’est pas incluse dans l’offre de base.',
    'Son activation passe par Datakö : une organisation ne peut pas l’ouvrir seule depuis ses écrans de configuration. Si vous souhaitez en disposer, la demande se fait auprès de votre interlocuteur Datakö.',
  ],
}

export const MISSION_CONDUCTEUR_PREREQUIS = [
  'Votre organisation dispose de la Mission Conducteur, ouverte par Datakö.',
  'Le conducteur a un numéro WhatsApp rattaché à sa fiche, enregistré par Datakö.',
  'La rotation désigne un conducteur au moment de sa création.',
  'La rotation est complète : camion, client, produit, quantité chargée, dépôt de départ, destination et date de chargement.',
]

export const MISSION_CONDUCTEUR_ETAPES: MissionEtape[] = [
  {
    numero: 1,
    titre: 'L’exploitant affecte la mission',
    acteur: 'exploitant',
    description:
      'L’affectation ne demande aucune manipulation supplémentaire : elle se fait en désignant un conducteur au moment de créer la rotation. Le message part tout seul dans la foulée de l’enregistrement.',
    details: [
      'Le conducteur reçoit un message WhatsApp lui annonçant sa mission : son nom, le camion, le client, le produit, la quantité chargée en litres, le dépôt de départ, la destination et la date de chargement.',
      'Le message comporte un bouton « Démarrer ».',
      'Ce bouton reste valable 12 heures à compter de l’affectation.',
      'Un même conducteur peut être affecté sans risque de doublon : une seconde affectation sur la même rotation ne renvoie pas un second message.',
    ],
    aRetenir:
      'Si la rotation est incomplète ou si le conducteur n’a pas de numéro WhatsApp rattaché, aucun message ne part. Voir « Mon conducteur n’a rien reçu » plus bas.',
  },
  {
    numero: 2,
    titre: 'Le conducteur démarre sa mission',
    acteur: 'conducteur',
    description:
      'Le conducteur appuie sur « Démarrer ». Sa mission passe en cours et un bouton « Fin de mission » apparaît alors, et seulement alors.',
    details: [
      'Tant que la mission n’est pas démarrée, aucun bouton de fin de mission n’est proposé.',
      'Le conducteur peut aussi retrouver sa mission à tout moment en écrivant « menu » puis en choisissant « Mes missions ».',
      'Un conducteur ne peut avoir qu’une seule mission démarrée à la fois. S’il tente d’en démarrer une seconde, il lit : « Une autre mission est déjà démarrée. Contactez votre responsable logistique. »',
      'Passé les 12 heures, le bouton ne fonctionne plus : « Le délai de démarrage de cette mission est dépassé. Contactez votre responsable logistique. »',
    ],
    message:
      '✅ Mission démarrée.\n\nBonne route. À la fin du dépotage, déclarez la quantité remise au destinataire.',
  },
  {
    numero: 3,
    titre: 'Le conducteur déclare le dépotage',
    acteur: 'conducteur',
    description:
      'En fin de livraison, le conducteur appuie sur « Fin de mission » et saisit la quantité réellement déposée, en litres.',
    details: [
      'Le message lui rappelle la quantité chargée, mais la saisie reste entièrement libre : rien n’est prérempli, et le conducteur ne valide pas un chiffre proposé.',
      'La quantité doit être un nombre supérieur à 0, et ne peut pas dépasser la quantité chargée.',
      'Cette déclaration est enregistrée au nom du conducteur dans le journal de la livraison.',
    ],
    message:
      'Fin de mission / Dépotage\n\nIndiquez la quantité réellement déposée en litres.\nQuantité chargée : 36 000 L',
    aRetenir:
      'Cette déclaration ne clôture pas la livraison. Elle ouvre la confirmation du destinataire.',
  },
  {
    numero: 4,
    titre: 'Le destinataire confirme, QR à l’appui',
    acteur: 'destinataire',
    description:
      'Une fois le dépotage déclaré, le conducteur reçoit un lien. Ce lien affiche un QR code qu’il présente au réceptionnaire, sur son propre téléphone.',
    details: [
      'La page du conducteur affiche « Présentez ce QR au réceptionnaire. Il doit le scanner et confirmer lui-même la quantité reçue. »',
      'Le réceptionnaire scanne le QR et arrive sur la page « Confirmation de réception », sans compte ni installation.',
      'Il indique la quantité qu’il a réellement reçue, le nom de la personne qui confirme, et coche une attestation.',
      'C’est le destinataire qui confirme, jamais le conducteur à sa place.',
    ],
    message:
      '✅ Dépotage enregistré : 35 500 L.\n\nOuvrez cette page et présentez le QR au réceptionnaire :\nhttps://fleet.datako.app/presentation-confirmation…\n\nLe réceptionnaire doit scanner et confirmer lui-même la quantité reçue.',
    aRetenir:
      'Le QR n’est pas une authentification du destinataire. Il fournit une preuve opérationnelle et un historique horodaté des actions, pas une identification forte.',
  },
  {
    numero: 5,
    titre: 'L’exploitant suit la mission depuis les livraisons',
    acteur: 'exploitant',
    description:
      'L’état de la mission est visible depuis la page Livraisons, sur la ligne de la rotation comme dans son détail.',
    details: [
      'Un badge affiche l’état courant de la mission, à côté du statut de la livraison.',
      'Le détail de la livraison ouvre un bloc « Mission conducteur » indiquant quand le conducteur a été notifié et quelle est l’échéance de démarrage.',
      'La frise d’historique de la livraison retrace chaque étape : « Mission conducteur affectée », « Conducteur notifié », « Mission démarrée », « Mission en retard » le cas échéant, « Dépotage déclaré par le conducteur », « Mission conducteur terminée » ou « Mission conducteur annulée » avec son motif.',
      'Une mission peut être annulée avec un motif obligatoire, via « Annuler la mission conducteur ».',
    ],
  },
]

export const MISSION_CONDUCTEUR_STATUTS: MissionStatut[] = [
  {
    libelle: 'Mission affectée',
    quand: 'Le conducteur a reçu sa mission, il ne l’a pas encore démarrée.',
    couleur: 'slate',
  },
  {
    libelle: 'En retard',
    quand:
      'La mission n’a toujours pas été démarrée passé l’échéance de 12 heures. Ce signalement remplace l’affichage « Mission affectée ».',
    couleur: 'red',
  },
  {
    libelle: 'En route',
    quand: 'Le conducteur a appuyé sur « Démarrer ».',
    couleur: 'blue',
  },
  {
    libelle: 'Dépotage déclaré',
    quand: 'Le conducteur a saisi la quantité déposée. La réponse du destinataire est attendue.',
    couleur: 'amber',
  },
  {
    libelle: 'Terminée',
    quand:
      'Le destinataire a répondu — que sa quantité concorde ou qu’il signale un écart. La mission est close, la livraison ne l’est pas forcément.',
    couleur: 'emerald',
  },
  {
    libelle: 'Annulée',
    quand:
      'La mission a été annulée avec un motif, ou la livraison elle-même a été annulée — auquel cas la mission s’éteint automatiquement.',
    couleur: 'red',
  },
]

export const MISSION_CONDUCTEUR_VIGILANCE: MissionVigilance[] = [
  {
    titre: 'La déclaration du conducteur ne clôture pas la livraison',
    description:
      'Elle ouvre la confirmation du destinataire. La livraison ne devient « livrée » qu’au terme du mécanisme de validation existant : rien de ce parcours ne le remplace ni ne le contourne.',
  },
  {
    titre: 'Une mission terminée n’est pas une livraison livrée',
    description:
      'La mission passe en « Terminée » dès que le destinataire répond, y compris s’il signale un écart. Dans ce cas la conversation WhatsApp du conducteur se termine, mais la livraison reste en cours de traitement et attend un arbitrage de votre part.',
  },
  {
    titre: 'Le QR est proposé pour tous vos clients',
    description:
      'Le conducteur déclare son dépotage et présente le QR quel que soit le client. Ce qui change selon le client, c’est la portée de la réponse du destinataire : en double validation elle est opposable et peut finaliser la livraison ; sans double validation, elle vaut attestation de réception — elle est tracée et horodatée, mais ne clôture rien et la clôture reste l’acte de votre opérateur.',
  },
  {
    titre: 'Une mission dont le dépotage est déclaré ne peut plus être annulée seule',
    description:
      'À ce stade, l’annulation de la mission est refusée. Le produit vous l’indique : « Pour interrompre l’opération à ce stade, annulez la livraison afin d’éteindre aussi la déclaration et le lien destinataire. » Annuler la livraison éteint la mission en même temps que le lien remis au destinataire.',
  },
  {
    titre: 'Le QR n’est pas une authentification du destinataire',
    description:
      'Il donne accès au parcours de confirmation et laisse un historique horodaté des actions. Il ne vérifie pas l’identité de la personne qui scanne. Le nom saisi et l’attestation cochée sont des déclarations, pas une identification forte.',
  },
  {
    titre: 'Le conducteur n’est pas prévenu si sa mission est annulée',
    description:
      'Aucun message ne lui est envoyé au moment de l’annulation. Il l’apprend s’il tente d’agir : « Cette mission a été annulée par votre responsable logistique. Ne poursuivez pas cette livraison. » Prévenez-le directement.',
  },
  {
    titre: 'Une mission en retard est signalée, jamais annulée d’office',
    description:
      'Le retard est un signal à votre attention. La mission n’est ni clôturée ni annulée automatiquement : c’est à vous de décider quoi en faire.',
  },
]

export const MISSION_CONDUCTEUR_DEPANNAGE_TITRE = 'Mon conducteur n’a rien reçu'

export const MISSION_CONDUCTEUR_DEPANNAGE_INTRO =
  'C’est la question la plus fréquente. Dans la quasi-totalité des cas, le message n’a pas été envoyé — et non pas perdu. Fleet Manager vous le signale au moment de l’affectation, par un bandeau sur l’écran de la rotation : « La rotation est enregistrée, mais la mission WhatsApp du conducteur n’a pas pu être envoyée. » La rotation, elle, est bien enregistrée.'

export const MISSION_CONDUCTEUR_DEPANNAGE: MissionDepannageCause[] = [
  {
    cause: 'Une information manque sur la rotation',
    quoiFaire:
      'Le message d’affectation reprend le conducteur, le camion, le client, le produit, la quantité chargée, le dépôt de départ, la destination et la date de chargement. Si l’un de ces éléments est vide — ou si la quantité chargée est nulle — la mission n’est pas envoyée. Complétez la rotation, puis faites renvoyer la mission par votre administrateur.',
  },
  {
    cause: 'Le conducteur n’a pas de numéro WhatsApp rattaché',
    quoiFaire:
      'Le rattachement du numéro d’un conducteur ne se fait pas depuis vos écrans de configuration : il passe par Datakö. Transmettez le nom du conducteur et son numéro à votre interlocuteur Datakö. En attendant, la rotation se suit normalement par le parcours opérateur.',
  },
  {
    cause: 'Votre organisation ne dispose pas de la Mission Conducteur',
    quoiFaire:
      'La fonctionnalité relève du plan Business et son activation passe par Datakö. Sans elle, désigner un conducteur sur une rotation reste possible et utile — mais aucun message ne lui est envoyé.',
  },
  {
    cause: 'Le message est bien parti, mais le conducteur ne le voit pas',
    quoiFaire:
      'Vérifiez dans le détail de la livraison, bloc « Mission conducteur », la ligne « Conducteur notifié ». Si elle porte une date, le message a bien été émis vers son numéro : le problème est alors du côté du téléphone ou du numéro enregistré.',
  },
]

export const MISSION_CONDUCTEUR_HORS_PERIMETRE_TITRE = 'Ce que la Mission Conducteur ne fait pas'

export const MISSION_CONDUCTEUR_HORS_PERIMETRE = [
  'Aucune photo, aucun PDF, aucune vidéo, aucune signature manuscrite ne peut être transmis par le conducteur.',
  'Aucune position géographique n’est relevée ni transmise, à aucun moment du parcours.',
  'Aucune heure d’arrivée sur site n’est enregistrée, et le temps passé n’est pas décomposé entre trajet, attente et dépotage.',
  'Une mission en retard n’est ni annulée ni clôturée automatiquement : elle est signalée, rien de plus.',
  'Le conducteur n’est pas notifié lorsque sa mission est annulée.',
  'Aucun code à usage unique n’est envoyé au destinataire : la confirmation passe par le QR présenté par le conducteur.',
]
