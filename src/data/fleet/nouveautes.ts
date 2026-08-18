export type NouveauteTypeLivree = 'nouveau' | 'amelioration' | 'corrige' | 'deprecated'
export type NouveauteType = NouveauteTypeLivree | 'a_venir'

export interface NouveauteLien {
  href: string
  titre: string
}

interface NouveauteBase {
  id: string
  titre: string
  description: string
  module?: string
}

export interface NouveauteLivree extends NouveauteBase {
  type: NouveauteTypeLivree
  date: string
  mois: string
  liens?: NouveauteLien[]
}

export interface NouveauteAVenir extends NouveauteBase {
  type: 'a_venir'
}

export type Nouveaute = NouveauteLivree | NouveauteAVenir

export const NOUVEAUTES_A_VENIR: NouveauteAVenir[] = []

export const NOUVEAUTES: NouveauteLivree[] = [
  {
    id: 'mission-conducteur-whatsapp',
    date: '2026-08-18',
    mois: 'Août 2026',
    titre: 'Nouveau : le conducteur suit sa mission depuis WhatsApp',
    description: 'Le conducteur est désormais prévenu par WhatsApp dès qu\'une mission lui est affectée : camion, client, produit, quantité, départ, destination et date de chargement, avec un bouton « Démarrer » valable 12 heures. Une fois la mission démarrée, un bouton « Fin de mission » lui permet de déclarer la quantité réellement déposée — saisie libre, jamais préremplie — puis de présenter un QR au réceptionnaire, qui confirme lui-même la quantité reçue. Sa déclaration ne clôture pas la livraison : elle ouvre la confirmation du destinataire. Côté exploitation, l\'état de la mission est visible depuis les livraisons, une mission non démarrée à l\'échéance est signalée en retard, et une mission peut être annulée avec motif. Fonctionnalité premium réservée au plan Business avec le module Transport, activée par Datakö.',
    type: 'nouveau',
    module: 'Transport',
    liens: [
      { href: '/whatsapp/mission-conducteur', titre: 'Comprendre la Mission Conducteur WhatsApp' },
      { href: '/confirmation-livraison', titre: 'Ce que voit le destinataire' },
    ],
  },
  {
    id: 'confirmation-nom-attestation',
    date: '2026-08-18',
    mois: 'Août 2026',
    titre: 'Amélioration : le destinataire décline son nom et atteste sa réception',
    description: 'La page de confirmation de réception demande désormais, en plus de la quantité reçue, le nom de la personne qui confirme et une case d\'attestation. Ce changement vaut pour toutes les confirmations, y compris celles envoyées par vos opérateurs, sans rapport avec les missions conducteur. Une confirmation cesse d\'être rattachée à un lien anonyme : elle porte un nom. Ce sont des mentions déclaratives, elles ne vérifient pas l\'identité du réceptionnaire.',
    type: 'amelioration',
    module: 'Transport',
    liens: [
      { href: '/confirmation-livraison', titre: 'Ce que voit le destinataire' },
    ],
  },
  {
    id: 'notifications-retention',
    date: '2026-08-10',
    mois: 'Août 2026',
    titre: 'Amélioration : la cloche ne garde que ce qui attend une action',
    description: 'Le centre de notifications ne s\'accumule plus. Une livraison confirmée sans écart se retire de la liste dès que vous l\'avez lue ; un écart de quantité, lui, y reste tant qu\'il n\'a pas été tranché — le lire ne suffit plus à le faire disparaître. Les notifications résolues sont effacées après quelques jours, mais le journal de la livraison conserve tout et reste la référence en cas de litige.',
    type: 'amelioration',
    module: 'Transport',
    liens: [
      { href: '/transport/guides/suivre-confirmations-notifications', titre: 'Suivre les confirmations depuis la cloche' },
    ],
  },
  {
    id: 'qr-notifications-livraison',
    date: '2026-08-08',
    mois: 'Août 2026',
    titre: 'Nouveau : QR code de confirmation et cloche de notifications',
    description: 'Quand le destinataire est présent au déchargement, plus besoin d\'attendre un message : la fenêtre du lien de confirmation affiche aussi un QR code à faire scanner sur place. Ce n\'est pas un second circuit — c\'est le même lien à usage unique que celui envoyé par WhatsApp ou par e-mail, qui ouvre la même page. En parallèle, une cloche apparaît en haut de l\'écran pour les Administrateurs et les Opérateurs : elle signale deux événements seulement, la confirmation du destinataire en vert et l\'écart de quantité en rouge, et ouvre la livraison concernée en un clic.',
    type: 'nouveau',
    module: 'Transport',
    liens: [
      { href: '/transport/guides/configurer-double-validation', titre: 'Activer la double validation pour un client' },
      { href: '/transport/guides/suivre-confirmations-notifications', titre: 'Suivre les confirmations depuis la cloche' },
      { href: '/transport/cas-particuliers/lien-confirmation-affiche-une-fois', titre: 'Retrouver un lien de confirmation fermé trop tôt' },
    ],
  },
  {
    id: 'double-validation-livraison',
    date: '2026-08-08',
    mois: 'Août 2026',
    titre: 'Nouveau : confirmation de réception par le destinataire',
    description: 'Vous pouvez désormais demander au destinataire de confirmer lui-même la quantité reçue. Le réglage se fait client par client dans sa fiche, bloc "Validation des livraisons". Le destinataire reçoit un lien, sans compte ni installation, et déclare ce qu\'il a reçu ; si son chiffre diffère du vôtre, la livraison passe en écart signalé et attend un arbitrage. Par défaut, rien ne change : tous les clients restent en "Opérateur uniquement".',
    type: 'nouveau',
    module: 'Transport',
    liens: [
      { href: '/transport/guides/configurer-double-validation', titre: 'Activer la double validation pour un client' },
      { href: '/transport/guides/traiter-ecart-destinataire', titre: 'Traiter un écart signalé par le destinataire' },
      { href: '/confirmation-livraison', titre: 'Ce que voit le destinataire' },
    ],
  },
  {
    id: 'dossier-livraison-documents',
    date: '2026-08-08',
    mois: 'Août 2026',
    titre: 'Nouveau : dossier documentaire de la livraison',
    description: 'Chaque livraison peut porter jusqu\'à cinq pièces au format PDF : bon de livraison, bon de commande, facture, chèque, preuve de réception. Un indicateur "Dossier complet" ou "Dossier incomplet" signale les rotations dont le numéro de bon de livraison ou les pièces manquent, avec un filtre dédié et une colonne dans l\'export. Les fichiers volumineux sont optimisés automatiquement à l\'ajout.',
    type: 'nouveau',
    module: 'Transport',
    liens: [
      { href: '/transport/guides/valider-livraison', titre: 'Déclarer une livraison et joindre ses pièces' },
      { href: '/indicateurs/dossier-livraison-complet', titre: 'Comprendre l\'indicateur Dossier complet' },
    ],
  },
  {
    id: 'v2-facturation-transport',
    date: '2026-06-29',
    mois: 'Juin 2026',
    titre: 'Nouveau : Facturation transport PDF',
    description: 'Générez une facture PDF directement depuis la page Livraisons. Sélectionnez les rotations d\'un client, choisissez TVA et délai de règlement — le PDF se télécharge et les rotations sont marquées facturées (FT-2026-001).',
    type: 'nouveau',
    module: 'Transport',
    liens: [
      { href: '/transport/guides/generer-facture-transport', titre: 'Générer une facture de transport' },
    ],
  },
  {
    id: 'v2-white-label-branding',
    date: '2026-06-29',
    mois: 'Juin 2026',
    titre: 'Nouveau : Branding white-label',
    description: 'Les organisations avec la fonctionnalité White-Label voient Fleet Manager à leur image : logo, couleurs et nom dans la sidebar et dans tous les PDFs générés (factures, bilans propriétaires).',
    type: 'nouveau',
    module: 'Transport',
  },
  {
    id: 'v1-4-profit-camion',
    date: '2025-01-15',
    mois: 'Janvier 2025',
    titre: 'Nouveau : Page Profit par camion',
    description: 'Visualisez le profit réel de chaque véhicule de votre flotte — marge des rotations moins les charges fixes — avec classement automatique.',
    type: 'nouveau',
    module: 'Transport',
    liens: [
      { href: '/transport/pages/profit-camion', titre: 'Comprendre la page Profit par camion' },
    ],
  },
  {
    id: 'v1-4-simulations',
    date: '2025-01-15',
    mois: 'Janvier 2025',
    titre: 'Nouveau : Simulateur d\'investissement',
    description: 'Testez l\'impact d\'un nouveau camion, d\'un changement de tarif ou d\'une hausse de volume sur votre cashflow — sans modifier les données réelles.',
    type: 'nouveau',
    module: 'Transport',
    liens: [
      { href: '/transport/pages/simulations', titre: 'Comprendre la page Simulations' },
    ],
  },
  {
    id: 'v1-3-export-excel',
    date: '2024-12-20',
    mois: 'Décembre 2024',
    titre: 'Amélioration : Export Excel enrichi',
    description: 'L\'export Excel des Livraisons inclut désormais les colonnes Volume chargé, Volume livré, Manquant et Statut de paiement.',
    type: 'amelioration',
    module: 'Transport',
    liens: [
      { href: '/transport/guides/exporter-excel', titre: 'Exporter vos données vers Excel' },
    ],
  },
  {
    id: 'v1-3-releve-pdf',
    date: '2024-12-20',
    mois: 'Décembre 2024',
    titre: 'Nouveau : Relevé client PDF',
    description: 'Générez un relevé de compte client sur n\'importe quelle période — toutes les livraisons, statuts de paiement, total dû.',
    type: 'nouveau',
    module: 'Transport',
    liens: [
      { href: '/transport/guides/releve-client-pdf', titre: 'Générer le relevé PDF d\'un client' },
    ],
  },
  {
    id: 'v1-2-bilan-proprietaire',
    date: '2024-11-30',
    mois: 'Novembre 2024',
    titre: 'Nouveau : Bilan Propriétaire PDF',
    description: 'Les propriétaires de camions gérés peuvent maintenant télécharger leur bilan mensuel : rotations effectuées, gains bruts, part nette.',
    type: 'nouveau',
    module: 'Portail Propriétaire',
    liens: [
      { href: '/transport/guides/bilan-proprietaire-pdf', titre: 'Générer le bilan PDF d\'un propriétaire' },
    ],
  },
  {
    id: 'v1-2-cashflow',
    date: '2024-11-30',
    mois: 'Novembre 2024',
    titre: 'Nouveau : Page Cashflow',
    description: 'Trésorerie nette mensuelle avec déduction du crédit-bail. Visualisation de la tendance sur 6 mois.',
    type: 'nouveau',
    module: 'Transport',
    liens: [
      { href: '/transport/pages/cashflow', titre: 'Comprendre la page Cashflow' },
      { href: '/indicateurs/cashflow-net', titre: 'Comprendre l\'indicateur Cashflow net' },
    ],
  },
  {
    id: 'v1-1-manquant-fix',
    date: '2024-10-15',
    mois: 'Octobre 2024',
    titre: 'Correction : Calcul du manquant',
    description: 'Le manquant (différence volume chargé / livré) était parfois affiché négatif par erreur. Corrigé — le manquant est toujours un nombre positif.',
    type: 'corrige',
    module: 'Transport',
    liens: [
      { href: '/transport/cas-particuliers/volume-livre-different', titre: 'Volume livré différent du volume chargé' },
      { href: '/transport/cas-particuliers/ecart-vs-manquant', titre: 'Différence entre écart signalé et manquant' },
    ],
  },
  {
    id: 'v1-0-launch',
    date: '2024-10-01',
    mois: 'Octobre 2024',
    titre: 'Lancement de Datakö Fleet Manager',
    description: 'Première version de Fleet Manager déployée pour EGUITRA Group. Modules disponibles : Transport (rotations, livraisons, flotte, gains), Répartition acteurs.',
    type: 'nouveau',
    module: 'Transport',
    liens: [
      { href: '/onboarding', titre: 'Démarrer avec le parcours d\'onboarding' },
    ],
  },
]
