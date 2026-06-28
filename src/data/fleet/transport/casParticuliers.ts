export interface CasParticulier {
  id: string
  titre: string
  contexte: string
  regle: string
  exemple?: string
}

export const casParticuliers: CasParticulier[] = [
  {
    id: 'vehicule-propre-vs-gere',
    titre: 'Véhicule propre vs véhicule géré',
    contexte: 'Votre flotte peut contenir deux types de véhicules : les véhicules qui vous appartiennent et ceux qui appartiennent à des propriétaires externes.',
    regle: 'Véhicule propre : 100% des gains restent dans l\'organisation. Véhicule géré : une part revient au propriétaire selon les règles de répartition configurées dans Paramètres.',
    exemple: 'Un camion géré à 65% propriétaire : sur 5 000 000 GNF de gain, le propriétaire reçoit 3 250 000 GNF.',
  },
  {
    id: 'volume-livre-different',
    titre: 'Volume livré ≠ volume chargé',
    contexte: 'Il arrive que le volume effectivement livré soit inférieur au volume initialement chargé, suite à des pertes en transit, des retours ou des ajustements.',
    regle: 'Le CA est toujours calculé sur le volume livré. La différence (manquant) est visible dans le détail de la livraison. Ne modifiez pas manuellement le volume chargé.',
    exemple: 'Chargé : 30 000 L. Livré : 29 800 L. Manquant : 200 L. Le CA est calculé sur 29 800 L uniquement.',
  },
  {
    id: 'livraison-en-cours-sans-date',
    titre: 'Livraison en cours sans date de livraison',
    contexte: 'Une rotation en statut "En cours" n\'a pas encore de date de livraison. Elle est visible dans Livraisons mais absente des indicateurs financiers.',
    regle: 'Les livraisons non validées (en cours, en attente) ne comptent pas dans les Gains, le Dashboard financier ni le Profit par camion. Seules les livraisons "Livré" sont intégrées.',
    exemple: 'Si vous avez 10 rotations ce mois et 8 sont validées, seules 8 apparaissent dans vos KPI.',
  },
  {
    id: 'charges-fixes-periode',
    titre: 'Charges fixes sur période de gestion',
    contexte: 'Les charges fixes (assurance, vignette, visite technique, patente) sont des coûts récurrents indépendants du nombre de rotations.',
    regle: 'Les charges fixes sont proratisées sur la période affichée dans les filtres. Un camion inactif continue d\'accumuler ses charges fixes, ce qui peut le rendre déficitaire même sans rotation.',
    exemple: 'Assurance annuelle : 1 200 000 GNF → 100 000 GNF/mois. Sur 3 mois sans rotation : 300 000 GNF de charges sans CA.',
  },
  {
    id: 'annulation-rotation',
    titre: 'Annulation d\'une rotation',
    contexte: 'Une rotation peut être annulée avant ou après son départ. Une rotation annulée reste dans l\'historique pour la traçabilité.',
    regle: 'Une rotation annulée n\'impacte plus les Gains ni le Cashflow. Elle reste visible dans Livraisons avec le statut "Annulé" et le motif d\'annulation.',
    exemple: 'Un client annule sa commande après le départ du camion. L\'opérateur annule la rotation avec le motif "Annulation client". Le camion revient à vide — aucun CA comptabilisé.',
  },
  {
    id: 'credit-bail',
    titre: 'Crédit-bail et cashflow',
    contexte: 'Si votre flotte a été financée par un crédit-bail (prêt bancaire), la mensualité est déduite chaque mois dans le calcul du Cashflow.',
    regle: 'La mensualité du crédit-bail n\'apparaît pas dans les Charges d\'exploitation mais est déduite directement du Cashflow. C\'est pourquoi le Cashflow est toujours inférieur à la Marge d\'Exploitation.',
    exemple: 'Marge d\'exploitation : 15 000 000 GNF. Mensualité crédit-bail : 8 000 000 GNF. Cashflow net : 7 000 000 GNF.',
  },
]
