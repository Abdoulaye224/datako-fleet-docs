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
    id: 'marge-nette-marketeur',
    nom: 'Marge nette',
    definition:
      'Ce qui vous reste réellement sur une vente, une fois tous les flux pris en compte : la marge distributeur fixée par le barème officiel, la péréquation transport encaissée, la compensation de l’État, moins le transport réellement payé, les charges de la vente et la ristourne accordée au client.',
    formule:
      'Marge distributeur + Péréquation encaissée + Compensation État − Transport réellement payé + Marge station − Charges de la vente − Ristourne',
    exemple:
      'Vente de 20 000 L d’essence, marge distributeur 555 GNF/L, péréquation 1 000 GNF/L, tarif officiel de la route 1 200 GNF/L, transport tiers négocié à 1 050 GNF/L : 11 100 000 + 20 000 000 + 4 000 000 − 21 000 000 = 14 100 000 GNF de marge.',
    conseil:
      'Sur une vente marketeur, la marge ne dépend pas du prix de vente : il est imposé par la structure des prix officielle. Vos seuls vrais leviers sont le coût de transport négocié, vos charges et les ristournes que vous accordez.',
    href: '/vente/indicateurs/marge-nette-marketeur',
  },
  {
    id: 'ca-facture',
    nom: 'CA facturé',
    definition:
      'Le montant total des ventes pour lesquelles une facture a été générée sur la période. Une vente enregistrée mais pas encore facturée n’y figure pas.',
    formule: 'Somme des montants facturés des ventes de la période',
    exemple:
      'Sur le mois, 12 ventes facturées pour un total de 2 340 000 000 GNF. Trois autres ventes livrées mais non facturées n’apparaissent pas encore.',
    conseil:
      'Un écart durable entre votre volume distribué et votre CA facturé signale des ventes oubliées à la facturation. Le filtre "Sans facture" de l’activité distribution vous les liste immédiatement.',
    href: '/vente/indicateurs/ca-facture',
  },
  {
    id: 'marge-marketeur',
    nom: 'Marge marketeur',
    definition:
      'La part de votre marge qui provient de votre activité de marketeur : achat à la SONAP puis revente aux stations et aux industriels, transport inclus.',
    exemple:
      'Sur le mois, 180 000 000 GNF de marge marketeur sur 420 000 L distribués, soit environ 430 GNF par litre.',
    conseil:
      'Comparez-la toujours à votre marge par litre théorique. Un écart important vient presque toujours du transport réellement payé ou de charges saisies en retard.',
    href: '/vente/indicateurs/marge-marketeur',
  },
  {
    id: 'marge-reseau',
    nom: 'Marge réseau',
    definition:
      'La marge dégagée par vos propres points de vente, quand votre organisation exploite ses stations en plus de son activité de distribution en gros.',
    exemple:
      'Une station propre écoule 38 000 L sur le mois et dégage 22 800 000 GNF de marge réseau.',
    conseil:
      'La marge réseau ne se lit jamais seule : rapprochez-la des charges d’exploitation de la station. Une station qui vend beaucoup peut rester déficitaire une fois ses charges affectées.',
    href: '/vente/indicateurs/marge-reseau',
  },
  {
    id: 'volume-distribue',
    nom: 'Volume distribué',
    definition:
      'Le nombre total de litres vendus sur la période, tous produits et tous régimes confondus. C’est la mesure physique de votre activité, indépendante des prix.',
    formule: 'Somme des volumes des ventes de la période',
    exemple: '420 000 L distribués sur le mois, dont 260 000 L de gasoil et 160 000 L d’essence.',
    conseil:
      'C’est l’indicateur le moins manipulable de tous : il ne dépend ni des barèmes, ni du moment de la facturation. Utilisez-le comme référence quand un chiffre financier vous paraît anormal.',
    href: '/vente/indicateurs/volume-distribue',
  },
  {
    id: 'position-tva',
    nom: 'Position TVA',
    definition:
      'Ce que vous devez encore reverser à l’État au titre de la TVA, ou ce que l’État vous doit. Elle compare la TVA collectée sur vos ventes à la TVA que vous avez déjà acquittée en douane et à celle que vous avez déjà reversée.',
    formule: 'TVA collectée − TVA acquittée en douane − TVA déjà reversée',
    exemple:
      'TVA collectée 84 000 000 GNF, TVA payée en douane 61 000 000 GNF, déjà reversée 12 000 000 GNF : il reste 11 000 000 GNF à reverser.',
    conseil:
      'La position n’est jamais ramenée à zéro artificiellement. Si elle devient négative, cela signifie que vous avez payé plus de TVA en douane que vous n’en avez collecté : c’est une créance sur l’État, pas une erreur.',
    href: '/vente/indicateurs/position-tva',
  },
  {
    id: 'creances-clients',
    nom: 'Créances clients',
    definition:
      'Le total des ventes facturées mais dont le règlement n’a pas encore été enregistré. C’est de l’argent qui vous est dû.',
    formule: 'Somme des ventes facturées − ventes déjà encaissées',
    exemple: 'Sur 2 340 000 000 GNF facturés, 1 890 000 000 GNF ont été réglés : il reste 450 000 000 GNF de créances.',
    conseil:
      'Cet indicateur donne un total global. Pour savoir précisément quelles ventes sont impayées, ouvrez l’activité distribution et repérez les ventes restées au statut "Émise" — il n’existe pas de tableau de recouvrement par client.',
    href: '/vente/indicateurs/creances-clients',
  },
  {
    id: 'perequation',
    nom: 'Péréquation',
    definition:
      'Le mécanisme national qui égalise le coût du transport de carburant sur tout le territoire. Vous encaissez la péréquation sur chaque vente, et vous vous retrouvez soit en créance sur l’État, soit en dette envers lui, selon la route empruntée.',
    formule: 'Position par litre = Tarif officiel de la route − Taux national de péréquation',
    exemple:
      'Route Conakry–Boffa : tarif officiel 1 200 GNF/L, péréquation nationale 1 000 GNF/L. Sur 20 000 L, l’État vous doit 4 000 000 GNF.',
    conseil:
      'Le signe dépend uniquement de la route, jamais du fait que vous transportiez vous-même ou non : une route longue crée une créance, une route courte un solde à reverser. En transport tiers, la péréquation revient au transporteur ; en transport propre, vous la conservez.',
    href: '/vente/indicateurs/perequation',
  },
]
