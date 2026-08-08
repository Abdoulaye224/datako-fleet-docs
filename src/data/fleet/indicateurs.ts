export interface Indicateur {
  id: string
  nom: string
  definition: string
  formule?: string
  exemple: string
  conseil: string
}

export const INDICATEURS: Indicateur[] = [
  {
    id: 'ca-transport',
    nom: 'CA Transport',
    definition: 'Le chiffre d\'affaires généré par les livraisons sur la période. C\'est le total des tarifs facturés aux clients.',
    formule: 'Σ (tarif/litre × volume livré) par livraison',
    exemple: '40 000 L × 1 200 GNF/L = 48 000 000 GNF',
    conseil: 'Le CA seul ne dit pas si l\'activité est rentable. Regardez toujours la marge.',
  },
  {
    id: 'marge-produit',
    nom: 'Marge Produit',
    definition: 'Ce qui reste après déduction du coût d\'achat du carburant au CA.',
    formule: 'CA Transport − Coût achat produit',
    exemple: '48M − 36M = 12M GNF',
    conseil: 'La marge produit est le point de départ. Si elle est négative, vous vendez à perte.',
  },
  {
    id: 'marge-exploitation',
    nom: 'Marge d\'Exploitation',
    definition: 'Ce qui reste après toutes les charges opérationnelles : carburant camion, maintenance, charges fixes.',
    formule: 'Marge Produit − Coûts exploitation (carburant + maintenance + charges fixes)',
    exemple: '12M − 4M = 8M GNF',
    conseil: 'La marge d\'exploitation est l\'indicateur clé de santé. Visez >15% du CA.',
  },
  {
    id: 'cashflow-net',
    nom: 'Cashflow Net',
    definition: 'La trésorerie nette après paiement du crédit-bail.',
    formule: 'Marge d\'Exploitation − Mensualité crédit-bail',
    exemple: '8M − 52M/mois = ... (varie selon le mois)',
    conseil: 'Un cashflow négatif signifie que l\'activité ne couvre pas encore le crédit-bail. C\'est normal en début d\'activité.',
  },
  {
    id: 'gain-par-rotation',
    nom: 'Gain par rotation',
    definition: 'Ce que l\'organisation gagne sur une seule livraison, après commissions.',
    exemple: 'Rotation Conakry → Siguiri : gain net 3 500 000 GNF',
    conseil: 'Un gain négatif sur une rotation ponctuelle peut arriver (panne, retard). L\'important est la tendance sur le mois.',
  },
  {
    id: 'part-proprietaire',
    nom: 'Part propriétaire',
    definition: 'La part du gain revenant au propriétaire du véhicule géré, calculée selon les règles de répartition configurées.',
    exemple: 'Camion géré : propriétaire reçoit 65% du gain net = 2 275 000 GNF',
    conseil: 'Configurez les règles de répartition dans Paramètres pour refléter les accords contractuels.',
  },
  {
    id: 'charges-fixes-vehicule',
    nom: 'Charges fixes véhicule',
    definition: 'Les charges qui courent indépendamment des rotations : assurance, vignette, visite technique, patente. Converties en équivalent mensuel.',
    exemple: 'Assurance 900 000 GNF/an → 75 000 GNF/mois × 6 mois = 450 000 GNF sur le semestre',
    conseil: 'Un camion inactif continue d\'accumuler ses charges fixes. C\'est pourquoi même un camion sans rotation peut être déficitaire.',
  },
  {
    id: 'couts-variables-rotation',
    nom: 'Coûts variables par rotation',
    definition: 'Le détail des coûts qui varient à chaque livraison, calculés à partir des paramètres de la route utilisée : carburant, prime chauffeur et péages.',
    formule: 'Carburant + Prime chauffeur + Péages = Total coûts variables ; Marge de la livraison = CA Transport − Total coûts variables',
    exemple: 'Route Conakry → Kankan : Carburant 850 000 GNF + Prime chauffeur 150 000 GNF + Péages 40 000 GNF = 1 040 000 GNF de coûts variables',
    conseil: 'Ce détail est visible aussi bien côté administrateur (page Livraisons) que côté propriétaire (Historique rotations du Portail Propriétaire), avec la mention "Paramètre de route" comme source de chaque montant. Si une route est mal paramétrée, ces montants sont faux sur toutes les rotations qui l\'utilisent jusqu\'à correction et recalcul.',
  },
  {
    id: 'dossier-livraison-complet',
    nom: 'Dossier de livraison complet',
    definition: 'La part de vos livraisons dont le dossier documentaire est en règle. Un dossier est complet quand le numéro de bon de livraison est renseigné et qu\'au moins une pièce est effectivement jointe. Cet indicateur ne dit rien de la validation de la livraison elle-même : une rotation finalisée et payée peut très bien avoir un dossier incomplet.',
    formule: 'Numéro de bon de livraison renseigné ET au moins un document joint = Complet',
    exemple: 'Une rotation avec le numéro BL-2026-114 mais aucune pièce jointe reste "Incomplet". Une rotation avec un bon de livraison scanné mais sans numéro saisi aussi.',
    conseil: 'C\'est ce chiffre qui détermine votre capacité à répondre à une contestation client plusieurs mois après la livraison. Utilisez le filtre "Dossier incomplet" de la page Livraisons pour rattraper les rotations concernées pendant que les documents papier sont encore retrouvables — pas au moment du litige. Les livraisons annulées ne portent jamais cet indicateur.',
  },
]
