export type NouveauteType = 'nouveau' | 'amelioration' | 'corrige' | 'deprecated'

export interface Nouveaute {
  id: string
  date: string
  mois: string
  titre: string
  description: string
  type: NouveauteType
  module?: string
}

export const NOUVEAUTES: Nouveaute[] = [
  {
    id: 'notifications-retention',
    date: '2026-08-10',
    mois: 'Août 2026',
    titre: 'Amélioration : la cloche ne garde que ce qui attend une action',
    description: 'Le centre de notifications ne s\'accumule plus. Une livraison confirmée sans écart se retire de la liste dès que vous l\'avez lue ; un écart de quantité, lui, y reste tant qu\'il n\'a pas été tranché — le lire ne suffit plus à le faire disparaître. Les notifications résolues sont effacées après quelques jours, mais le journal de la livraison conserve tout et reste la référence en cas de litige.',
    type: 'amelioration',
    module: 'Transport',
  },
  {
    id: 'qr-notifications-livraison',
    date: '2026-08-08',
    mois: 'Août 2026',
    titre: 'Nouveau : QR code de confirmation et cloche de notifications',
    description: 'Quand le destinataire est présent au déchargement, plus besoin d\'attendre un message : la fenêtre du lien de confirmation affiche aussi un QR code à faire scanner sur place. Ce n\'est pas un second circuit — c\'est le même lien à usage unique que celui envoyé par WhatsApp ou par e-mail, qui ouvre la même page. En parallèle, une cloche apparaît en haut de l\'écran pour les Administrateurs et les Opérateurs : elle signale deux événements seulement, la confirmation du destinataire en vert et l\'écart de quantité en rouge, et ouvre la livraison concernée en un clic.',
    type: 'nouveau',
    module: 'Transport',
  },
  {
    id: 'double-validation-livraison',
    date: '2026-08-08',
    mois: 'Août 2026',
    titre: 'Nouveau : confirmation de réception par le destinataire',
    description: 'Vous pouvez désormais demander au destinataire de confirmer lui-même la quantité reçue. Le réglage se fait client par client dans sa fiche, bloc "Validation des livraisons". Le destinataire reçoit un lien, sans compte ni installation, et déclare ce qu\'il a reçu ; si son chiffre diffère du vôtre, la livraison passe en écart signalé et attend un arbitrage. Par défaut, rien ne change : tous les clients restent en "Opérateur uniquement".',
    type: 'nouveau',
    module: 'Transport',
  },
  {
    id: 'dossier-livraison-documents',
    date: '2026-08-08',
    mois: 'Août 2026',
    titre: 'Nouveau : dossier documentaire de la livraison',
    description: 'Chaque livraison peut porter jusqu\'à cinq pièces au format PDF : bon de livraison, bon de commande, facture, chèque, preuve de réception. Un indicateur "Dossier complet" ou "Dossier incomplet" signale les rotations dont le numéro de bon de livraison ou les pièces manquent, avec un filtre dédié et une colonne dans l\'export. Les fichiers volumineux sont optimisés automatiquement à l\'ajout.',
    type: 'nouveau',
    module: 'Transport',
  },
  {
    id: 'v2-facturation-transport',
    date: '2026-06-29',
    mois: 'Juin 2026',
    titre: 'Nouveau : Facturation transport PDF',
    description: 'Générez une facture PDF directement depuis la page Livraisons. Sélectionnez les rotations d\'un client, choisissez TVA et délai de règlement — le PDF se télécharge et les rotations sont marquées facturées (FT-2026-001).',
    type: 'nouveau',
    module: 'Transport',
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
  },
  {
    id: 'v1-4-simulations',
    date: '2025-01-15',
    mois: 'Janvier 2025',
    titre: 'Nouveau : Simulateur d\'investissement',
    description: 'Testez l\'impact d\'un nouveau camion, d\'un changement de tarif ou d\'une hausse de volume sur votre cashflow — sans modifier les données réelles.',
    type: 'nouveau',
    module: 'Transport',
  },
  {
    id: 'v1-3-export-excel',
    date: '2024-12-20',
    mois: 'Décembre 2024',
    titre: 'Amélioration : Export Excel enrichi',
    description: 'L\'export Excel des Livraisons inclut désormais les colonnes Volume chargé, Volume livré, Manquant et Statut de paiement.',
    type: 'amelioration',
    module: 'Transport',
  },
  {
    id: 'v1-3-releve-pdf',
    date: '2024-12-20',
    mois: 'Décembre 2024',
    titre: 'Nouveau : Relevé client PDF',
    description: 'Générez un relevé de compte client sur n\'importe quelle période — toutes les livraisons, statuts de paiement, total dû.',
    type: 'nouveau',
    module: 'Transport',
  },
  {
    id: 'v1-2-bilan-proprietaire',
    date: '2024-11-30',
    mois: 'Novembre 2024',
    titre: 'Nouveau : Bilan Propriétaire PDF',
    description: 'Les propriétaires de camions gérés peuvent maintenant télécharger leur bilan mensuel : rotations effectuées, gains bruts, part nette.',
    type: 'nouveau',
    module: 'Portail Propriétaire',
  },
  {
    id: 'v1-2-cashflow',
    date: '2024-11-30',
    mois: 'Novembre 2024',
    titre: 'Nouveau : Page Cashflow',
    description: 'Trésorerie nette mensuelle avec déduction du crédit-bail. Visualisation de la tendance sur 6 mois.',
    type: 'nouveau',
    module: 'Transport',
  },
  {
    id: 'v1-1-manquant-fix',
    date: '2024-10-15',
    mois: 'Octobre 2024',
    titre: 'Correction : Calcul du manquant',
    description: 'Le manquant (différence volume chargé / livré) était parfois affiché négatif par erreur. Corrigé — le manquant est toujours un nombre positif.',
    type: 'corrige',
    module: 'Transport',
  },
  {
    id: 'v1-0-launch',
    date: '2024-10-01',
    mois: 'Octobre 2024',
    titre: 'Lancement de Datakö Fleet Manager',
    description: 'Première version de Fleet Manager déployée pour EGUITRA Group. Modules disponibles : Transport (rotations, livraisons, flotte, gains), Répartition acteurs.',
    type: 'nouveau',
    module: 'Transport',
  },
]
