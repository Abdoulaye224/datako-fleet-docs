export interface CycleEtape {
  numero: number
  titre: string
  description: string
  action: string
  statut: string
}

export const cycleEtapes: CycleEtape[] = [
  {
    numero: 1,
    titre: 'Création',
    description: 'Le dispatcheur remplit le formulaire "Nouvelle Rotation" : camion, client, destination, volume transporté.',
    action: 'Saisie dans "Nouvelle Rotation"',
    statut: 'En attente / En cours',
  },
  {
    numero: 2,
    titre: 'Gain estimé',
    description: 'Fleet Manager calcule automatiquement le gain prévisionnel : CA - coûts (carburant, prime, péage). Ce montant est visible avant l\'enregistrement.',
    action: 'Calcul automatique visible',
    statut: 'En cours',
  },
  {
    numero: 3,
    titre: 'En route',
    description: 'Le camion est parti. La livraison est en cours dans la page Livraisons. Elle n\'est pas encore comptée dans les indicateurs financiers.',
    action: 'Suivi dans Livraisons',
    statut: 'En cours',
  },
  {
    numero: 4,
    titre: 'Validation',
    description: 'Le dispatcheur déclare la fin du déchargement : volume réel livré, numéro de bon de livraison, date. Pour la plupart des clients, cette déclaration finalise immédiatement la livraison et le CA est calculé sur le volume livré réel. Pour les clients soumis à la double validation, elle ouvre une attente : le destinataire doit confirmer de son côté avant que la livraison ne soit finalisée.',
    action: 'Marquer comme Livré, ou Déclarer le déchargement',
    statut: 'Livré, ou En attente de confirmation',
  },
  {
    numero: 5,
    titre: 'Encaissement',
    description: 'Le badge de paiement est mis à jour. La trésorerie réelle est tracking : "Payé" (vert), "En attente" (ambre), "Impayé" (rouge).',
    action: 'Clic sur le badge paiement',
    statut: 'Livré',
  },
  {
    numero: 6,
    titre: 'Impact dashboards',
    description: 'Dashboard, Gains, Profit par camion, Cashflow sont mis à jour automatiquement. Si le véhicule est géré, la part propriétaire est calculée et disponible en PDF.',
    action: 'Mise à jour automatique',
    statut: 'Archivé',
  },
]
