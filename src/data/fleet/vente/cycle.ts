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
    titre: 'Achat SONAP',
    description:
      'Tout commence par une commande de carburant auprès de la SONAP. Vous ouvrez un dossier de commande qui rassemble la proforma, l’engagement (paiement ou garantie bancaire) et le volume demandé. Tant que la SONAP n’a pas attribué le volume, rien n’entre en stock.',
    action: 'Stock > Commandes SONAP',
    statut: 'Dossier ouvert',
  },
  {
    numero: 2,
    titre: 'Réception et stock',
    description:
      'Le volume attribué est réceptionné et entre physiquement dans vos cuves. Les sommiers enregistrent les approvisionnements et les retraits au jour le jour, les mouvements en gardent le journal, et la réconciliation compare le stock théorique au stock réellement compté.',
    action: 'Stock > Sommiers, Mouvements, Réconciliation',
    statut: 'Stock disponible',
  },
  {
    numero: 3,
    titre: 'Vente',
    description:
      'Vous enregistrez une vente à une station ou à un industriel. Le prix n’est pas libre : il est résolu automatiquement à partir de la structure des prix officielle en vigueur pour le produit, le régime et la date. Vous renseignez le transport (propre ou tiers) et les charges éventuelles.',
    action: 'Nouvelle Vente',
    statut: 'Vente enregistrée',
  },
  {
    numero: 4,
    titre: 'Marge visible immédiatement',
    description:
      'La marge nette s’affiche dès la saisie, sans attendre la facture : marge distributeur et péréquation, moins le transport, les charges et la ristourne éventuelle. Tous les éléments réglementaires du calcul sont figés sur la vente — un changement de barème futur ne modifiera jamais une vente déjà enregistrée.',
    action: 'Calcul automatique visible à la saisie',
    statut: 'Vente enregistrée',
  },
  {
    numero: 5,
    titre: 'Facturation',
    description:
      'Depuis l’activité distribution, vous générez la facture de la vente. Un numéro définitif est attribué, le PDF se télécharge et la vente passe en "Émise". À partir de ce moment, la vente n’est plus modifiable : pour corriger une erreur, il faut l’annuler et la ressaisir.',
    action: 'Activité Distribution > Générer la facture',
    statut: 'Émise',
  },
  {
    numero: 6,
    titre: 'Encaissement',
    description:
      'Quand le client règle, vous enregistrez l’encaissement sur la vente concernée : date et référence du règlement. La vente passe en "Payée". Le suivi se fait toujours vente par vente.',
    action: 'Activité Distribution > Encaissement reçu',
    statut: 'Payée',
  },
  {
    numero: 7,
    titre: 'Obligations réglementaires',
    description:
      'Chaque vente alimente vos positions vis-à-vis de l’État et des fonds : TVA, péréquation, fonds de réserve, promotion gaz. Les balances vous disent ce que vous avez collecté, ce que vous avez déjà reversé et ce qui reste dû.',
    action: 'Balances',
    statut: 'Suivi continu',
  },
  {
    numero: 8,
    titre: 'Charges et cautions',
    description:
      'En parallèle du cycle des ventes, vous suivez vos charges d’exploitation mensuelles (loyer, salaires, électricité…) et la consommation de vos cautions douanières. Le consommé et le disponible d’une caution sont toujours calculés à partir des opérations, jamais saisis à la main.',
    action: 'Charges d’exploitation · Cautions douanières',
    statut: 'Suivi continu',
  },
  {
    numero: 9,
    titre: 'Pilotage',
    description:
      'La vue d’ensemble et le cashflow consolident tout : marge nette, CA facturé, créances clients, position TVA, performance par client et par produit. C’est le tableau de bord du dirigeant et de la finance.',
    action: 'Vue d’ensemble · Cashflow',
    statut: 'Mise à jour automatique',
  },
]
