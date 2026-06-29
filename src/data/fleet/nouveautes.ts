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
