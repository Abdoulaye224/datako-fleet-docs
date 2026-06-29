export interface Guide {
  id: string
  title: string
  objectif: string
  prerequis: string[]
  etapes: string[]
  resultat: string
  erreurs: string[]
  href: string
  precedent?: { href: string; titre: string }
  suivant?: { href: string; titre: string }
  articlesConnexes?: Array<{ href: string; titre: string; section: string }>
}

export const guides: Guide[] = [
  {
    id: 'creer-commande-client',
    title: 'Créer une commande client',
    objectif: 'Enregistrer un bon de commande pour préparer la livraison et réserver le stock nécessaire.',
    prerequis: ['Avoir le rôle Administrateur, Opérateur ou Commercial', 'Le client doit déjà exister dans la base distribution'],
    etapes: [
      'Allez dans Vente > Commandes.',
      'Cliquez sur "+ Nouvelle commande".',
      'Sélectionnez le client puis vérifiez son adresse de livraison et son contact WhatsApp.',
      'Ajoutez les produits commandés, les quantités et le tarif appliqué.',
      'Choisissez la date de livraison souhaitée par le client.',
      'Ajoutez une note si la livraison concerne une zone précise de Conakry ou une consigne d’accès.',
      'Cliquez sur "Enregistrer la commande".',
    ],
    resultat: 'La commande apparaît dans la liste avec le statut "À planifier" et peut être affectée à une tournée.',
    erreurs: [
      'Si le produit n’est pas disponible, vérifiez les niveaux dans Stocks avant de confirmer la commande.',
      'Un mauvais tarif client peut fausser la facture finale. Vérifiez la grille commerciale avant validation.',
    ],
    href: '/vente/guides/creer-commande-client',
    suivant: { href: '/vente/guides/planifier-tournee-livraison', titre: 'Planifier une tournée de livraison' },
    articlesConnexes: [
      { href: '/vente/pages/commandes', titre: 'Page Commandes', section: 'Pages Vente' },
      { href: '/vente/pages/clients-distribution', titre: 'Page Clients distribution', section: 'Pages Vente' },
    ],
  },
  {
    id: 'planifier-tournee-livraison',
    title: 'Planifier une tournée de livraison',
    objectif: 'Regrouper les commandes d’une zone et affecter un véhicule à la tournée du jour.',
    prerequis: ['Avoir le rôle Administrateur ou Chef d’exploitation', 'Au moins une commande doit être en statut "À planifier"'],
    etapes: [
      'Allez dans Vente > Tournées.',
      'Cliquez sur "+ Nouvelle tournée".',
      'Choisissez la date, le véhicule et le conducteur ou livreur.',
      'Sélectionnez les commandes à livrer sur la tournée.',
      'Vérifiez que le volume total tient dans la capacité du véhicule.',
      'Ordonnez les points de livraison en commençant par la zone la plus éloignée ou la plus contrainte.',
      'Confirmez la tournée.',
    ],
    resultat: 'La tournée est créée, les commandes passent en statut "Planifiée" et les équipes reçoivent leur affectation.',
    erreurs: [
      'Une tournée surchargée crée des retards ou une seconde sortie non prévue. Vérifiez toujours le volume total.',
      'Si un conducteur ne reçoit pas sa notification, contrôlez que son numéro WhatsApp est renseigné dans sa fiche.',
    ],
    href: '/vente/guides/planifier-tournee-livraison',
    precedent: { href: '/vente/guides/creer-commande-client', titre: 'Créer une commande client' },
    suivant: { href: '/vente/guides/valider-livraison-vente', titre: 'Valider une livraison vente' },
    articlesConnexes: [
      { href: '/vente/pages/tournees', titre: 'Page Tournées', section: 'Pages Vente' },
      { href: '/whatsapp/affectation-rotation-conducteur', titre: 'Flux WhatsApp d’affectation', section: 'WhatsApp' },
    ],
  },
  {
    id: 'valider-livraison-vente',
    title: 'Valider une livraison vente',
    objectif: 'Confirmer qu’une commande a bien été livrée pour mettre à jour le stock, le CA et le suivi client.',
    prerequis: ['Avoir le rôle Administrateur ou Opérateur', 'La tournée doit être en cours ou terminée sur le terrain'],
    etapes: [
      'Allez dans Vente > Tournées puis ouvrez la tournée concernée.',
      'Sélectionnez la commande livrée dans la liste des arrêts.',
      'Cliquez sur "Valider la livraison".',
      'Renseignez l’heure réelle de livraison et les quantités effectivement remises au client.',
      'Ajoutez une photo ou une preuve de réception si disponible.',
      'Confirmez si la livraison est complète ou partielle.',
    ],
    resultat: 'La commande passe au statut "Livrée", le stock est décrémenté et la commande devient disponible pour la facturation.',
    erreurs: [
      'Une livraison partielle non saisie correctement fausse la facture et le stock restant.',
      'Si la commande reste bloquée en statut "Planifiée", rechargez la tournée et vérifiez vos droits de modification.',
    ],
    href: '/vente/guides/valider-livraison-vente',
    precedent: { href: '/vente/guides/planifier-tournee-livraison', titre: 'Planifier une tournée de livraison' },
    suivant: { href: '/vente/guides/facturer-client', titre: 'Facturer un client' },
    articlesConnexes: [
      { href: '/vente/indicateurs/taux-livraison', titre: 'Taux de livraison', section: 'Indicateurs Vente' },
      { href: '/whatsapp/confirmation-livraison-conducteur', titre: 'Confirmation WhatsApp de livraison', section: 'WhatsApp' },
    ],
  },
  {
    id: 'facturer-client',
    title: 'Facturer un client',
    objectif: 'Générer une facture à partir d’une livraison validée pour lancer le cycle d’encaissement.',
    prerequis: ['Avoir le rôle Administrateur ou Finance', 'La commande doit être au statut "Livrée"'],
    etapes: [
      'Allez dans Vente > Facturation.',
      'Filtrez sur le statut "À facturer".',
      'Ouvrez la livraison ou la commande concernée.',
      'Vérifiez les lignes produits, quantités livrées et remises appliquées.',
      'Sélectionnez l’échéance de paiement selon l’accord client.',
      'Cliquez sur "Générer la facture" puis validez.',
    ],
    resultat: 'La facture est créée avec un numéro unique et le client apparaît en suivi de paiement.',
    erreurs: [
      'Si le montant ne correspond pas, contrôlez la remise et la quantité réellement livrée avant validation.',
      'Une facture générée en double doit être annulée rapidement pour éviter un mauvais suivi du CA.',
    ],
    href: '/vente/guides/facturer-client',
    precedent: { href: '/vente/guides/valider-livraison-vente', titre: 'Valider une livraison vente' },
    suivant: { href: '/vente/guides/appliquer-remise-promotion', titre: 'Appliquer une remise / promotion' },
    articlesConnexes: [
      { href: '/vente/pages/facturation', titre: 'Page Facturation', section: 'Pages Vente' },
      { href: '/vente/indicateurs/ca-vente', titre: 'CA Vente', section: 'Indicateurs Vente' },
    ],
  },
  {
    id: 'appliquer-remise-promotion',
    title: 'Appliquer une remise / promotion',
    objectif: 'Accorder un tarif spécial ou une remise contrôlée à un client ou sur une campagne limitée.',
    prerequis: ['Avoir le rôle Administrateur, Commercial ou DG', 'La règle de prix de base doit déjà exister'],
    etapes: [
      'Allez dans Vente > Promotions.',
      'Cliquez sur "+ Nouvelle promotion".',
      'Choisissez si la remise s’applique à un client, une catégorie de clients ou un produit.',
      'Définissez la valeur de la remise (montant fixe ou pourcentage).',
      'Indiquez la date de début et la date de fin.',
      'Ajoutez une justification commerciale puis enregistrez.',
    ],
    resultat: 'La remise s’applique automatiquement aux commandes concernées pendant la période définie.',
    erreurs: [
      'Une promotion sans date de fin peut continuer à réduire la marge au-delà de la campagne prévue.',
      'Si la remise ne s’applique pas, vérifiez que le client ou le produit correspond exactement à la règle créée.',
    ],
    href: '/vente/guides/appliquer-remise-promotion',
    precedent: { href: '/vente/guides/facturer-client', titre: 'Facturer un client' },
    suivant: { href: '/vente/guides/exporter-rapport-vente', titre: 'Exporter le rapport de vente' },
    articlesConnexes: [
      { href: '/vente/pages/promotions', titre: 'Page Promotions', section: 'Pages Vente' },
      { href: '/vente/indicateurs/marge-brute-vente', titre: 'Marge Brute Vente', section: 'Indicateurs Vente' },
    ],
  },
  {
    id: 'exporter-rapport-vente',
    title: 'Exporter le rapport de vente',
    objectif: 'Télécharger les performances commerciales pour analyse, partage ou archivage de fin de période.',
    prerequis: ['Avoir le rôle Administrateur, DG ou Finance', 'Des ventes doivent exister sur la période choisie'],
    etapes: [
      'Allez dans Vente > Rapport vente.',
      'Choisissez la période : jour, semaine, mois ou dates personnalisées.',
      'Appliquez si besoin un filtre par produit, zone ou client.',
      'Cliquez sur "Exporter".',
      'Sélectionnez le format disponible puis confirmez le téléchargement.',
    ],
    resultat: 'Le rapport est téléchargé avec le détail du CA, des volumes et des marges de la période sélectionnée.',
    erreurs: [
      'Un rapport vide signifie souvent que la période ou le filtre sélectionné ne contient aucune livraison validée.',
      'Avant de partager le fichier, vérifiez qu’il contient la bonne devise et les bons regroupements.',
    ],
    href: '/vente/guides/exporter-rapport-vente',
    precedent: { href: '/vente/guides/appliquer-remise-promotion', titre: 'Appliquer une remise / promotion' },
    articlesConnexes: [
      { href: '/vente/pages/rapport-vente', titre: 'Page Rapport vente', section: 'Pages Vente' },
      { href: '/vente/indicateurs/volume-distribue', titre: 'Volume distribué', section: 'Indicateurs Vente' },
    ],
  },
]
