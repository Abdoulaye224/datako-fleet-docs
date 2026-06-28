export interface OnboardingStep {
  titre: string
  description: string
  href: string
}

export interface OnboardingParcours {
  id: string
  roleId: string
  roleNom: string
  emoji: string
  objectif: string
  duree: string
  steps: OnboardingStep[]
}

export const ONBOARDING_PARCOURS: OnboardingParcours[] = [
  {
    id: 'admin',
    roleId: 'org_admin',
    roleNom: 'Administrateur',
    emoji: '🏢',
    objectif: 'Configurer Fleet Manager et enregistrer votre première rotation',
    duree: '15 min',
    steps: [
      { titre: 'Comprendre le cycle d\'une rotation', description: 'Avant de saisir, comprendre comment une rotation passe de "Créée" à "Payée".', href: '/transport/cycle' },
      { titre: 'Ajouter votre premier camion', description: 'Enregistrez un véhicule dans la flotte avec ses informations et son type (propre ou géré).', href: '/transport/guides/ajouter-un-camion' },
      { titre: 'Ajouter un client', description: 'Créez le profil d\'un client pour pouvoir lui attribuer des rotations.', href: '/transport/guides/ajouter-un-client' },
      { titre: 'Créer une rotation', description: 'Enregistrez votre première livraison : camion, client, destination, volume.', href: '/transport/guides/creer-une-rotation' },
      { titre: 'Valider la livraison', description: 'Saisissez le volume livré réel et marquez la livraison comme effectuée.', href: '/transport/guides/valider-une-livraison' },
      { titre: 'Lire le tableau de bord', description: 'Découvrez comment lire la marge d\'exploitation et le cashflow sur le Dashboard.', href: '/transport/pages/dashboard' },
    ],
  },
  {
    id: 'operateur',
    roleId: 'operator',
    roleNom: 'Opérateur',
    emoji: '🚛',
    objectif: 'Maîtriser la saisie et la validation des rotations au quotidien',
    duree: '10 min',
    steps: [
      { titre: 'Comprendre votre rôle', description: 'Découvrez ce que vous pouvez et ne pouvez pas faire en tant qu\'Opérateur.', href: '/roles/operateur' },
      { titre: 'Créer une rotation', description: 'Enregistrez le départ d\'un camion : camion, client, destination, volume chargé.', href: '/transport/guides/creer-une-rotation' },
      { titre: 'Valider une livraison', description: 'Saisissez le volume livré réel et validez la livraison.', href: '/transport/guides/valider-une-livraison' },
      { titre: 'Gérer un volume manquant', description: 'Que faire si le volume livré est inférieur au volume chargé.', href: '/transport/cas-particuliers/volume-manquant' },
      { titre: 'Confirmer un paiement', description: 'Marquer une livraison comme payée à réception des fonds.', href: '/transport/guides/confirmer-un-paiement' },
    ],
  },
  {
    id: 'finance',
    roleId: 'finance',
    roleNom: 'Finance',
    emoji: '📊',
    objectif: 'Maîtriser le suivi financier et la génération de documents',
    duree: '10 min',
    steps: [
      { titre: 'Comprendre les indicateurs clés', description: 'CA Transport, Marge d\'Exploitation, Cashflow — savoir lire les chiffres.', href: '/indicateurs' },
      { titre: 'Suivre les livraisons et paiements', description: 'Page Livraisons : statuts de paiement, impayés, confirmation.', href: '/transport/pages/livraisons' },
      { titre: 'Comprendre le cashflow', description: 'Différence entre Marge d\'Exploitation et Cashflow Net (crédit-bail).', href: '/indicateurs/cashflow-net' },
      { titre: 'Générer un relevé client PDF', description: 'Créer et télécharger un relevé pour un client sur une période.', href: '/transport/guides/generer-releve-client-pdf' },
      { titre: 'Exporter les données en Excel', description: 'Exporter les livraisons et gains pour le journal comptable.', href: '/transport/guides/exporter-excel' },
    ],
  },
  {
    id: 'proprietaire',
    roleId: 'owner',
    roleNom: 'Propriétaire',
    emoji: '🔑',
    objectif: 'Comprendre vos accès et consulter vos gains',
    duree: '5 min',
    steps: [
      { titre: 'Comprendre votre rôle Propriétaire', description: 'Ce que vous pouvez voir et les limites de votre accès.', href: '/roles/proprietaire' },
      { titre: 'Comment est calculée votre part', description: 'La formule de répartition et comment elle s\'applique à vos camions.', href: '/indicateurs/part-proprietaire' },
      { titre: 'Télécharger votre bilan PDF', description: 'Générer votre bilan mensuel pour archivage ou validation.', href: '/transport/guides/generer-bilan-proprietaire-pdf' },
    ],
  },
]
