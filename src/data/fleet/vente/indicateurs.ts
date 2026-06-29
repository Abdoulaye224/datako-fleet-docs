export interface Indicateur {
  id: string
  nom: string
  definition: string
  formule?: string
  exemple: string
  conseil: string
  href: string
}

export const INDICATEURS: Indicateur[] = [
  {
    id: 'ca-vente',
    nom: 'CA Vente',
    definition: 'Le chiffre d’affaires généré par les commandes distribution livrées et facturées sur la période.',
    formule: 'Σ (quantité livrée × prix de vente unitaire) sur la période',
    exemple: '320 bonbonnes d’eau et 18 tonnes de riz livrées = 186 500 000 GNF de CA sur le mois',
    conseil: 'Suivez le CA avec le volume distribué et la marge brute. Une hausse du CA avec trop de remises peut cacher une rentabilité faible.',
    href: '/vente/indicateurs/ca-vente',
  },
  {
    id: 'marge-brute-vente',
    nom: 'Marge Brute Vente',
    definition: 'La différence entre le chiffre d’affaires distribution et le coût d’achat des produits vendus.',
    formule: 'CA Vente − coût d’achat des produits distribués',
    exemple: '186 500 000 GNF de CA − 151 000 000 GNF de coût d’achat = 35 500 000 GNF',
    conseil: 'Une promotion doit être évaluée sur sa marge brute réelle. Un fort volume vendu n’est utile que si la marge reste positive et saine.',
    href: '/vente/indicateurs/marge-brute-vente',
  },
  {
    id: 'taux-livraison',
    nom: 'Taux de livraison',
    definition: 'Le pourcentage de commandes livrées à temps par rapport au nombre total de commandes planifiées.',
    formule: '(commandes livrées à temps ÷ commandes planifiées) × 100',
    exemple: '92 commandes livrées à temps sur 100 planifiées = 92 %',
    conseil: 'En dessous de 90 %, analysez les retards par zone, véhicule ou heure de départ. Le problème est souvent opérationnel avant d’être commercial.',
    href: '/vente/indicateurs/taux-livraison',
  },
  {
    id: 'panier-moyen-client',
    nom: 'Panier moyen client',
    definition: 'Le montant moyen facturé par commande ou par achat client sur la période.',
    formule: 'CA Vente ÷ nombre de commandes facturées',
    exemple: '186 500 000 GNF ÷ 74 commandes = 2 520 270 GNF par commande en moyenne',
    conseil: 'Un panier moyen en baisse peut signaler des commandes plus petites ou des remises trop fortes. Comparez-le par segment client.',
    href: '/vente/indicateurs/panier-moyen-client',
  },
  {
    id: 'volume-distribue',
    nom: 'Volume distribué',
    definition: 'Le total des quantités de produits distribuées sur la période, exprimées dans l’unité métier adaptée (tonnes, m³, cartons, bonbonnes).',
    formule: 'Σ quantités livrées par produit sur la période',
    exemple: '64 tonnes de gaz conditionné et 1 150 bonbonnes d’eau distribuées sur le mois',
    conseil: 'Suivez le volume par produit et par zone. Une forte hausse de volume sans progression de marge peut indiquer un mauvais positionnement tarifaire.',
    href: '/vente/indicateurs/volume-distribue',
  },
]
