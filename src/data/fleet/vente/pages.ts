export interface AppPage {
  id: string
  name: string
  see: string
  why: string
  read: string
  href: string
  guideAssocie?: { href: string; titre: string }
  precedent?: { href: string; titre: string }
  suivant?: { href: string; titre: string }
  articlesConnexes?: Array<{ href: string; titre: string; section: string }>
}

export const appPages: AppPage[] = [
  {
    id: 'commandes',
    name: 'Commandes',
    see: 'La liste des bons de commande clients avec statut, montant, canal de vente et date de livraison prévue.',
    why: 'C’est le point de départ pour suivre ce qui a été vendu, ce qui reste à préparer et ce qui doit partir en tournée.',
    read: 'Surveillez en priorité les commandes “À préparer” et “En retard”. Une commande saisie tôt dans la journée aide l’équipe à mieux organiser les départs depuis Conakry.',
    href: '/vente/pages/commandes',
    guideAssocie: { href: '/vente/guides/creer-commande-client', titre: 'Créer une commande client' },
    suivant: { href: '/vente/pages/tournees', titre: 'Tournées' },
    articlesConnexes: [
      { href: '/vente/guides/creer-commande-client', titre: 'Créer une commande client', section: 'Guides Vente' },
      { href: '/vente/indicateurs/taux-livraison', titre: 'Taux de livraison', section: 'Indicateurs Vente' },
    ],
  },
  {
    id: 'tournees',
    name: 'Tournées',
    see: 'Le planning des tournées de livraison avec véhicules, livreurs, zones desservies et commandes regroupées.',
    why: 'Cette page permet d’optimiser les trajets, de limiter les retards et de confirmer que chaque commande est bien affectée à une tournée.',
    read: 'Regroupez les commandes par commune ou par axe routier (Matoto, Ratoma, Sonfonia, Coyah) pour réduire les kilomètres à vide et les frais de carburant.',
    href: '/vente/pages/tournees',
    guideAssocie: { href: '/vente/guides/planifier-tournee-livraison', titre: 'Planifier une tournée de livraison' },
    precedent: { href: '/vente/pages/commandes', titre: 'Commandes' },
    suivant: { href: '/vente/pages/facturation', titre: 'Facturation' },
    articlesConnexes: [
      { href: '/vente/guides/planifier-tournee-livraison', titre: 'Planifier une tournée de livraison', section: 'Guides Vente' },
      { href: '/whatsapp/affectation-rotation-conducteur', titre: 'Notification WhatsApp d’affectation', section: 'WhatsApp' },
    ],
  },
  {
    id: 'facturation',
    name: 'Facturation',
    see: 'Les factures générées après livraison, avec montant TTC, statut de paiement, échéance et client associé.',
    why: 'Elle aide l’équipe finance à transformer rapidement les livraisons validées en factures puis en encaissements.',
    read: 'Une facture non générée après la livraison retarde le recouvrement. Filtrez par “À facturer” chaque soir pour éviter les oublis.',
    href: '/vente/pages/facturation',
    guideAssocie: { href: '/vente/guides/facturer-client', titre: 'Facturer un client' },
    precedent: { href: '/vente/pages/tournees', titre: 'Tournées' },
    suivant: { href: '/vente/pages/clients-distribution', titre: 'Clients distribution' },
    articlesConnexes: [
      { href: '/vente/guides/facturer-client', titre: 'Facturer un client', section: 'Guides Vente' },
      { href: '/vente/indicateurs/ca-vente', titre: 'CA Vente', section: 'Indicateurs Vente' },
    ],
  },
  {
    id: 'clients-distribution',
    name: 'Clients distribution',
    see: 'La base clients avec contacts, zones desservies, historique d’achat, conditions tarifaires et niveau de recouvrement.',
    why: 'Vous identifiez vos meilleurs clients, les habitudes d’achat et les comptes qui nécessitent un suivi commercial ou financier.',
    read: 'Consultez l’historique avant d’accorder un délai de paiement ou une remise. Un gros volume avec des retards récurrents doit être revu avant la prochaine commande.',
    href: '/vente/pages/clients-distribution',
    guideAssocie: { href: '/vente/guides/appliquer-remise-promotion', titre: 'Appliquer une remise / promotion' },
    precedent: { href: '/vente/pages/facturation', titre: 'Facturation' },
    suivant: { href: '/vente/pages/rapport-vente', titre: 'Rapport vente' },
    articlesConnexes: [
      { href: '/vente/guides/appliquer-remise-promotion', titre: 'Appliquer une remise / promotion', section: 'Guides Vente' },
      { href: '/vente/indicateurs/panier-moyen-client', titre: 'Panier moyen client', section: 'Indicateurs Vente' },
    ],
  },
  {
    id: 'rapport-vente',
    name: 'Rapport vente',
    see: 'Le tableau de synthèse des ventes par période : chiffre d’affaires, volume vendu, marge brute et comparaison par client ou produit.',
    why: 'C’est la page de pilotage pour savoir si le module distribution gagne réellement de l’argent et quels segments performent le mieux.',
    read: 'Comparez les périodes semaine/mois pour distinguer une hausse durable d’un pic ponctuel lié à une forte commande de gaz ou d’eau minérale.',
    href: '/vente/pages/rapport-vente',
    guideAssocie: { href: '/vente/guides/exporter-rapport-vente', titre: 'Exporter le rapport de vente' },
    precedent: { href: '/vente/pages/clients-distribution', titre: 'Clients distribution' },
    suivant: { href: '/vente/pages/stocks', titre: 'Stocks' },
    articlesConnexes: [
      { href: '/vente/guides/exporter-rapport-vente', titre: 'Exporter le rapport de vente', section: 'Guides Vente' },
      { href: '/vente/indicateurs/marge-brute-vente', titre: 'Marge Brute Vente', section: 'Indicateurs Vente' },
    ],
  },
  {
    id: 'stocks',
    name: 'Stocks',
    see: 'Les niveaux de stock par produit, dépôt ou magasin avec seuil d’alerte, mouvements d’entrée et sorties vers les tournées.',
    why: 'Elle évite les ruptures au moment de préparer les livraisons et permet de vérifier que le stock physique correspond au stock système.',
    read: 'Surveillez surtout les produits à rotation rapide. Une baisse brutale du stock sans commande associée doit déclencher une vérification immédiate.',
    href: '/vente/pages/stocks',
    guideAssocie: { href: '/vente/guides/gerer-stock', titre: 'Gérer mon stock' },
    precedent: { href: '/vente/pages/rapport-vente', titre: 'Rapport vente' },
    suivant: { href: '/vente/pages/promotions', titre: 'Promotions' },
    articlesConnexes: [
      { href: '/vente/guides/planifier-tournee-livraison', titre: 'Planifier une tournée de livraison', section: 'Guides Vente' },
      { href: '/vente/indicateurs/volume-distribue', titre: 'Volume distribué', section: 'Indicateurs Vente' },
    ],
  },
  {
    id: 'promotions',
    name: 'Promotions',
    see: 'Les remises commerciales, tarifs spéciaux et opérations promotionnelles par client, produit ou période.',
    why: 'Cette page sécurise les conditions de vente accordées sur le terrain et évite les écarts entre le prix annoncé et le prix facturé.',
    read: 'Limitez les promotions dans le temps et mesurez leur impact sur la marge. Une remise utile doit augmenter le volume sans dégrader durablement le bénéfice.',
    href: '/vente/pages/promotions',
    guideAssocie: { href: '/vente/guides/appliquer-remise-promotion', titre: 'Appliquer une remise / promotion' },
    precedent: { href: '/vente/pages/stocks', titre: 'Stocks' },
    articlesConnexes: [
      { href: '/vente/guides/appliquer-remise-promotion', titre: 'Appliquer une remise / promotion', section: 'Guides Vente' },
      { href: '/vente/indicateurs/marge-brute-vente', titre: 'Marge Brute Vente', section: 'Indicateurs Vente' },
    ],
  },
]
