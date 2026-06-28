export interface Role {
  id: string
  nom: string
  emoji: string
  mission: string
  utilisateurs: string
  peutFaire: string[]
  nePeutPasFaire: string[]
  exemple: string
}

export const ROLES: Role[] = [
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
