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
    id: 'enregistrer-vente-facturer',
    title: 'Enregistrer une vente et la facturer',
    objectif:
      'Saisir une vente de carburant à une station ou à un industriel, vérifier la marge obtenue, puis générer la facture définitive du client.',
    prerequis: [
      'Avoir le rôle Administrateur ou Opérateur (la facturation est aussi ouverte au rôle Finance)',
      'Le client doit exister dans votre base clients distribution',
      'Si vous suivez votre stock, la cuve concernée doit contenir le volume vendu',
    ],
    etapes: [
      'Ouvrez Nouvelle Vente.',
      'Choisissez le produit puis le régime de vente. Le prix officiel applicable à la date du jour s’affiche automatiquement : il n’est pas négociable.',
      'Saisissez le volume en litres et sélectionnez le client.',
      'Si vous suivez votre stock, sélectionnez le sommier source : le volume vendu en sera retiré automatiquement.',
      'Renseignez le transport : mode propre ou tiers, puis la route. Le tarif officiel de la route se charge tout seul.',
      'En transport tiers, saisissez le coût réellement négocié avec le transporteur. En transport propre, laissez ce champ vide et saisissez plutôt vos coûts réels (carburant, prime chauffeur, péages) en charges additionnelles.',
      'Ajoutez les charges additionnelles et, le cas échéant, la ristourne accordée au client avec son motif.',
      'Vérifiez la marge affichée en direct et lisez les alertes éventuelles avant d’enregistrer.',
      'Enregistrez la vente.',
      'Pour facturer, ouvrez la vente depuis l’activité distribution et cliquez sur "Générer la facture". Renseignez le numéro de bon de commande du client s’il vous en a fourni un.',
      'Le numéro de facture définitif est attribué et le PDF se télécharge.',
    ],
    resultat:
      'La vente est enregistrée avec sa marge, le stock est décrémenté si vous l’avez rattachée à un sommier, et la facture passe au statut "Émise" avec un numéro définitif.',
    erreurs: [
      'Le prix affiché n’est pas celui attendu : vérifiez le régime de vente et la date. Le prix dépend du barème officiel en vigueur ce jour-là, pas de votre négociation commerciale.',
      'La marge paraît anormalement élevée en transport propre : vous n’avez sans doute pas saisi vos coûts réels en charges additionnelles. Le tarif officiel est une référence réglementaire, pas une sortie de trésorerie.',
      'Une fois la facture générée, la vente n’est plus modifiable, même par un administrateur. Pour corriger une erreur, il faut annuler la vente et la ressaisir — aucun avoir n’est généré automatiquement.',
      'La ristourne n’apparaît pas sur la facture PDF : c’est volontaire. Elle est déjà appliquée sur le prix hors taxes facturé et reste visible sur vos écrans internes.',
    ],
    href: '/vente/guides/enregistrer-vente-facturer',
    suivant: { href: '/vente/guides/suivre-vente-reglement', titre: 'Suivre une vente jusqu’à son règlement' },
    articlesConnexes: [
      { href: '/vente/pages/nouvelle-vente', titre: 'Page Nouvelle Vente', section: 'Pages Marketeur' },
      { href: '/vente/indicateurs/marge-nette-marketeur', titre: 'Marge nette', section: 'Indicateurs Marketeur' },
    ],
  },
  {
    id: 'suivre-vente-reglement',
    title: 'Suivre une vente jusqu’à son règlement',
    objectif:
      'Repérer les ventes non encore facturées, enregistrer les encaissements reçus et savoir à tout moment ce que vos clients vous doivent.',
    prerequis: [
      'Avoir le rôle Administrateur, Opérateur ou Finance',
      'Les ventes concernées doivent déjà être enregistrées',
    ],
    etapes: [
      'Ouvrez l’activité distribution.',
      'Activez le filtre "Sans facture" pour lister les ventes livrées mais pas encore facturées, puis facturez-les.',
      'Repérez ensuite les ventes au statut "Émise" : ce sont vos factures en attente de règlement.',
      'Quand un client règle, ouvrez la vente concernée et cliquez sur "Encaissement reçu".',
      'Saisissez la date d’encaissement et, si vous le souhaitez, une référence : numéro de virement, de chèque ou de bon de caisse.',
      'Confirmez : la vente passe au statut "Payée".',
      'Pour une vision globale, ouvrez la vue d’ensemble et lisez l’indicateur "Créances clients".',
    ],
    resultat:
      'Chaque vente réglée est marquée "Payée" avec sa date et sa référence de règlement, et le total de vos créances clients se met à jour.',
    erreurs: [
      'Il n’existe pas de tableau de recouvrement client par client : le suivi se fait vente par vente depuis l’activité distribution. La vue d’ensemble donne uniquement le total des créances.',
      'La fiche client affiche le chiffre d’affaires facturé, pas le solde restant dû. Ne l’utilisez pas comme un état des impayés.',
      'Un encaissement enregistré sur la mauvaise vente fausse à la fois vos créances et votre trésorerie. Vérifiez le numéro de facture avant de confirmer.',
    ],
    href: '/vente/guides/suivre-vente-reglement',
    precedent: { href: '/vente/guides/enregistrer-vente-facturer', titre: 'Enregistrer une vente et la facturer' },
    suivant: { href: '/vente/guides/enregistrer-commande-sonap', titre: 'Enregistrer une commande SONAP' },
    articlesConnexes: [
      { href: '/vente/pages/activite-distribution', titre: 'Page Activité Distribution', section: 'Pages Marketeur' },
      { href: '/vente/indicateurs/creances-clients', titre: 'Créances clients', section: 'Indicateurs Marketeur' },
    ],
  },
  {
    id: 'enregistrer-commande-sonap',
    title: 'Enregistrer une commande SONAP',
    objectif:
      'Ouvrir un dossier d’achat auprès de la SONAP, y rattacher l’engagement financier et suivre l’attribution du volume jusqu’à sa réception.',
    prerequis: [
      'Avoir le rôle Administrateur ou Opérateur',
      'Le module Stock doit être activé pour votre organisation',
      'Vos cuves doivent déjà être créées dans les sommiers',
    ],
    etapes: [
      'Ouvrez Stock puis l’onglet Commandes SONAP.',
      'Créez une nouvelle commande : référence, produit, volume commandé, prix unitaire et date.',
      'Si votre commande s’appuie sur une garantie bancaire, renseignez la banque, le montant, la référence et surtout la date de dépôt.',
      'Ajoutez la proforma reçue de la SONAP : référence, montant, volume et son statut de règlement.',
      'Une fois le volume attribué et mis à disposition, enregistrez l’approvisionnement en indiquant la cuve destinataire, le volume et la date. Un même volume peut être réparti sur plusieurs cuves.',
      'À réception de la facture définitive de la SONAP, ajoutez-la au dossier et joignez-y le document.',
      'Ouvrez l’onglet Résumé du dossier pour vérifier qu’aucun jalon n’est signalé comme manquant.',
    ],
    resultat:
      'Le dossier de commande retrace tout l’achat, de l’engagement à la réception physique, et le volume reçu est disponible à la vente dans vos cuves.',
    erreurs: [
      'La date de dépôt de la garantie n’est pas renseignée : l’engagement n’apparaîtra pas dans le suivi du dossier, même si la garantie existe réellement.',
      'Le volume attribué par la SONAP peut être inférieur au volume commandé. C’est normal : c’est une décision de la SONAP, pas une erreur de saisie.',
      'Rien ne vous empêche techniquement d’approvisionner une cuve avant d’avoir reçu la facture définitive. C’est toléré, mais l’ordre proforma puis approvisionnement puis facture reste le plus lisible en cas de contrôle.',
    ],
    href: '/vente/guides/enregistrer-commande-sonap',
    precedent: { href: '/vente/guides/suivre-vente-reglement', titre: 'Suivre une vente jusqu’à son règlement' },
    suivant: { href: '/vente/guides/saisir-mouvement-sommier', titre: 'Saisir un mouvement de sommier' },
    articlesConnexes: [
      { href: '/vente/pages/commandes-sonap', titre: 'Page Commandes SONAP', section: 'Pages Marketeur' },
      { href: '/faq', titre: 'Pourquoi ma commande SONAP est signalée comme incomplète ?', section: 'FAQ' },
    ],
  },
  {
    id: 'saisir-mouvement-sommier',
    title: 'Saisir un mouvement de sommier',
    objectif:
      'Tenir à jour le registre physique de vos cuves en enregistrant les entrées et les sorties qui ne proviennent pas d’une vente.',
    prerequis: [
      'Avoir le rôle Administrateur ou Opérateur',
      'La cuve concernée doit être créée et active',
    ],
    etapes: [
      'Ouvrez Stock puis l’onglet Sommiers.',
      'Sélectionnez la cuve concernée.',
      'Enregistrez le mouvement : entrée pour un approvisionnement, sortie pour un retrait.',
      'Indiquez le volume et la date réelle du mouvement, pas la date de saisie.',
      'Pour toute sortie qui n’est pas une vente — perte, transfert, correction — précisez le motif : il est obligatoire.',
      'Vérifiez le nouveau niveau de la cuve, puis retrouvez le mouvement dans l’onglet Mouvements.',
    ],
    resultat:
      'Le niveau de la cuve reflète la réalité du terrain et le mouvement est tracé avec son auteur, sa date et son motif.',
    erreurs: [
      'Les sorties liées aux ventes ne se saisissent pas ici : elles sont créées automatiquement quand vous rattachez une vente à une cuve. Les saisir manuellement décompte le volume deux fois.',
      'Saisir les mouvements en fin de mois plutôt qu’au fil de l’eau transforme chaque écart de réconciliation en enquête. Saisissez le jour même.',
      'Un motif vague du type "ajustement" rend l’écart inexploitable trois mois plus tard. Soyez précis : jaugeage, fuite constatée, transfert vers telle cuve.',
    ],
    href: '/vente/guides/saisir-mouvement-sommier',
    precedent: { href: '/vente/guides/enregistrer-commande-sonap', titre: 'Enregistrer une commande SONAP' },
    suivant: { href: '/vente/guides/lire-position-tva-perequation', titre: 'Lire la position TVA et la péréquation' },
    articlesConnexes: [
      { href: '/vente/pages/sommiers', titre: 'Page Sommiers', section: 'Pages Marketeur' },
      { href: '/vente/pages/reconciliation', titre: 'Page Réconciliation', section: 'Pages Marketeur' },
    ],
  },
  {
    id: 'lire-position-tva-perequation',
    title: 'Lire la position TVA et la péréquation',
    objectif:
      'Comprendre ce que vous devez encore reverser à l’État, ce qu’il vous doit, et pourquoi ces montants ne se remettent jamais à zéro.',
    prerequis: [
      'Avoir le rôle Administrateur, Finance ou Lecteur',
      'Des ventes doivent avoir été enregistrées sur la période',
    ],
    etapes: [
      'Ouvrez la page Balances pour la vue d’ensemble de vos positions réglementaires.',
      'Ouvrez la page Position TVA : comparez la TVA collectée sur vos ventes, la TVA déjà acquittée en douane et la TVA déjà reversée.',
      'Lisez le solde : positif, il reste à reverser ; négatif, vous détenez une créance sur l’État.',
      'Ouvrez la page Péréquation : pour chaque route, comparez le tarif officiel au taux national de péréquation.',
      'Vérifiez le traitement selon votre mode de transport : en transport propre vous conservez la péréquation, en transport tiers elle revient au transporteur.',
      'Consultez enfin les pages Fonds de réserve et Promotion gaz pour vos autres obligations.',
    ],
    resultat:
      'Vous savez précisément ce qui, dans votre trésorerie, ne vous appartient pas et devra être reversé.',
    erreurs: [
      'Une position négative n’est pas une erreur : elle signifie que vous avez payé plus de TVA en douane que vous n’en avez collecté. La position n’est jamais forcée à zéro.',
      'Ces positions sont des cumuls à date : changer la période affichée ne les remet pas à zéro, car une dette se reporte d’un mois sur l’autre.',
      'Confondre péréquation et droits de porte est l’erreur la plus fréquente. Les droits de porte ne sont pas un reversement et n’apparaissent pas dans ces balances.',
    ],
    href: '/vente/guides/lire-position-tva-perequation',
    precedent: { href: '/vente/guides/saisir-mouvement-sommier', titre: 'Saisir un mouvement de sommier' },
    suivant: { href: '/vente/guides/suivre-caution', titre: 'Suivre une caution douanière' },
    articlesConnexes: [
      { href: '/vente/pages/balances', titre: 'Page Balances', section: 'Pages Marketeur' },
      { href: '/vente/indicateurs/position-tva', titre: 'Position TVA', section: 'Indicateurs Marketeur' },
      { href: '/vente/indicateurs/perequation', titre: 'Péréquation', section: 'Indicateurs Marketeur' },
    ],
  },
  {
    id: 'suivre-caution',
    title: 'Suivre une caution douanière',
    objectif:
      'Enregistrer une caution bancaire, suivre sa consommation au fil de vos opérations et savoir quand elle approche de la saturation.',
    prerequis: [
      'Avoir le rôle Administrateur ou Finance',
      'Disposer des références de la caution émise par votre banque',
    ],
    etapes: [
      'Ouvrez la page Cautions douanières.',
      'Créez une nouvelle caution : nom, banque, montant garanti, date d’effet et date d’expiration.',
      'À chaque enlèvement effectué sous caution plutôt qu’en paiement comptant, enregistrez l’engagement correspondant avec son montant et sa référence.',
      'Consultez à tout moment le montant garanti, le consommé et le disponible de la caution.',
      'Quand les droits sont effectivement payés à la Douane, marquez l’engagement comme régularisé : le disponible remonte d’autant.',
      'Surveillez l’alerte "Disponible faible" qui vous prévient avant la saturation.',
    ],
    resultat:
      'Vous savez à tout moment quelle part de votre caution est immobilisée et combien il vous reste pour vos prochaines opérations.',
    erreurs: [
      'Le consommé et le disponible ne se saisissent jamais à la main : ils découlent de vos engagements. Si un montant vous surprend, cherchez l’engagement qui l’explique.',
      'Oublier de régulariser un engagement déjà payé bloque inutilement votre disponible et peut vous faire croire à tort que votre caution est saturée.',
      'La garantie bancaire d’une commande SONAP et la caution d’enlèvement sont deux choses distinctes : la première sécurise l’achat du produit, la seconde permet d’enlever sans payer les droits immédiatement.',
    ],
    href: '/vente/guides/suivre-caution',
    precedent: { href: '/vente/guides/lire-position-tva-perequation', titre: 'Lire la position TVA et la péréquation' },
    articlesConnexes: [
      { href: '/vente/pages/cautions', titre: 'Page Cautions douanières', section: 'Pages Marketeur' },
    ],
  },
]
