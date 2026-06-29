export interface PortailSection {
  id: string
  titre: string
  description: string
  quoi: string[]
  comment: string
  prerequis: string[]
  astuce?: string
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
    titre: 'Tableau de bord propriétaire',
    description: 'La vue synthétique de l’activité des véhicules du propriétaire : rotations, gains estimés et statut des périodes en cours.',
    quoi: [
      'Voir les rotations de mes véhicules sur la période',
      'Suivre les gains estimés avant clôture',
      'Identifier les véhicules inactifs ou en maintenance',
    ],
    comment: 'Après connexion, l’accueil du portail affiche automatiquement les véhicules rattachés à votre compte et leur activité récente.',
    prerequis: ['Être connecté au portail', 'Avoir au moins un véhicule géré associé à son profil propriétaire'],
    astuce: 'Consultez le tableau de bord en fin de semaine pour vérifier que toutes les rotations prévues ont bien été validées.',
    href: '/portail-proprietaire/tableau-bord-proprietaire',
  },
  {
    id: 'bilan-mensuel',
    titre: 'Bilan mensuel',
    description: 'Le récapitulatif mensuel qui calcule la part propriétaire à partir des rotations validées et des règles de répartition configurées pour chaque véhicule.',
    quoi: [
      'Voir le total des rotations du mois et les montants bruts générés',
      'Comprendre comment la part propriétaire est calculée (après déductions)',
      'Distinguer camion propre (marge 100% org) et camion géré (résiduel propriétaire)',
    ],
    comment: 'Depuis le menu "Mes bilans", sélectionnez le mois voulu. Le bilan affiche : CA brut → déductions (carburant, péage, maintenance, charges fixes) → marge nette → application des règles de répartition → part propriétaire nette.',
    prerequis: ['Être connecté au portail', 'Les rotations du mois doivent être validées dans Fleet Manager'],
    astuce: 'La part propriétaire est calculée selon les règles définies par l\'équipe Datakö pour votre véhicule : pourcentage sur CA, pourcentage sur marge, montant fixe par rotation ou mensuel. Ce que vous voyez dans le bilan est le montant résiduel après que l\'organisation a prélevé ses commissions.',
    href: '/portail-proprietaire/bilan-mensuel',
  },
  {
    id: 'export-pdf-bilan',
    titre: 'Export PDF bilan',
    description: 'La fonctionnalité pour générer et télécharger le bilan mensuel au format PDF depuis le portail.',
    quoi: [
      'Télécharger un PDF officiel du bilan',
      'Partager le document avec un comptable ou un associé',
      'Archiver les périodes déjà clôturées',
    ],
    comment: 'Ouvrez un bilan mensuel puis cliquez sur “Télécharger PDF” pour générer le document avec les rotations, les montants et la part propriétaire.',
    prerequis: ['Être connecté au portail', 'Le bilan de la période doit être disponible'],
    astuce: 'Téléchargez le PDF après chaque clôture mensuelle pour conserver une copie indépendante.',
    href: '/portail-proprietaire/export-pdf-bilan',
  },
  {
    id: 'historique-periodes',
    titre: 'Historique',
    description: 'Les archives des périodes passées pour retrouver les anciens bilans, comparer les mois et suivre la régularité du véhicule.',
    quoi: [
      'Consulter les bilans des mois précédents',
      'Comparer plusieurs périodes de gains',
      'Retrouver les documents déjà générés',
    ],
    comment: 'Dans le menu “Historique”, filtrez par année ou par véhicule pour afficher les périodes archivées et ouvrir chaque détail.',
    prerequis: ['Être connecté au portail', 'Des bilans antérieurs doivent exister'],
    href: '/portail-proprietaire/historique-periodes',
  },
]
