export type AccueilAccent = 'transport' | 'marketeur' | 'mixte'

export interface CarteMetier {
  id: AccueilAccent
  titre: string
  description: string
  points: string[]
  cta: string
  href: string
  icon: string
  accent: AccueilAccent
}

export interface EntreeSecondaire {
  titre: string
  description: string
  href: string
  icon: string
}

export interface EntreeLanding {
  titre: string
  description: string
  href: string
  icon: string
}

export const ACCUEIL_TITRE = 'Bienvenue dans le guide Datakö Fleet'

export const ACCUEIL_SOUS_TITRE =
  'Retrouvez les guides adaptés à votre activité et à votre utilisation de Datakö Fleet.'

export const ACCUEIL_QUESTION = 'Quelle activité utilisez-vous dans Datakö Fleet ?'

export const CARTES_METIER: CarteMetier[] = [
  {
    id: 'transport',
    accent: 'transport',
    titre: 'Transport',
    description:
      'Gérez votre flotte, vos rotations, vos livraisons, vos clients et suivez la rentabilité de votre activité.',
    points: ['Rotations et livraisons', 'Dossiers de livraison et validation', 'Rentabilité et performance'],
    cta: 'Accéder au guide Transport',
    href: '/transport',
    icon: 'truck',
  },
  {
    id: 'marketeur',
    accent: 'marketeur',
    titre: 'Marketeur',
    description:
      'Gérez vos achats SONAP, votre stock, vos ventes, vos encaissements et vos obligations réglementaires.',
    points: ['Achats SONAP et stock', 'Ventes et encaissements', 'Réglementaire et finances'],
    cta: 'Accéder au guide Marketeur',
    href: '/vente',
    icon: 'package',
  },
  {
    id: 'mixte',
    accent: 'mixte',
    titre: 'Transport & Marketeur',
    description: 'Pilotez ensemble vos opérations de distribution de carburant et le transport associé.',
    points: ['Flux complets de l’achat à la livraison', 'Vision globale de votre activité', 'Indicateurs consolidés'],
    cta: 'Voir mon parcours complet',
    href: '/parcours-complet',
    icon: 'combine',
  },
]

export const ACCUEIL_SECONDAIRE_TITRE = 'Besoin d’autre chose ?'

export const ENTREES_SECONDAIRES: EntreeSecondaire[] = [
  {
    titre: 'Mettre en route votre organisation',
    description: "Vous venez de recevoir vos accès : les 12 étapes jusqu'à votre première rotation",
    href: '/demarrage',
    icon: 'rocket',
  },
  {
    titre: 'Premiers pas',
    description: 'Découvrir Datakö Fleet et bien démarrer',
    href: '/onboarding',
    icon: 'clipboard',
  },
  {
    titre: 'Comprendre mon rôle',
    description: 'Accédez aux guides selon votre profil',
    href: '/profils',
    icon: 'user',
  },
  {
    titre: 'FAQ',
    description: 'Réponses aux questions fréquentes',
    href: '/faq',
    icon: 'help',
  },
  {
    titre: 'Nouveautés',
    description: 'Découvrez les dernières évolutions',
    href: '/nouveautes',
    icon: 'sparkles',
  },
]

export const ACCUEIL_NOTE =
  'Toutes les fonctionnalités décrites dans ce guide correspondent à la version actuelle de Datakö Fleet. Certaines options peuvent varier selon votre organisation et vos droits d’accès.'

export const LANDING_TRANSPORT: EntreeLanding[] = [
  {
    titre: 'Je débute',
    description: 'Le cycle d’une rotation, du chargement à l’encaissement : la colonne vertébrale du module.',
    href: '/transport/cycle',
    icon: 'rocket',
  },
  {
    titre: 'Gérer mes opérations',
    description: 'Créer une rotation, valider une livraison, faire confirmer la réception, tenir le dossier documentaire.',
    href: '/transport/guides',
    icon: 'clipboard',
  },
  {
    titre: 'Piloter mon activité',
    description: 'Chiffre d’affaires, marges, cashflow, profit par camion : comprendre chaque indicateur.',
    href: '/indicateurs',
    icon: 'chart',
  },
  {
    titre: 'Consulter les guides par page',
    description: 'Chaque écran du module expliqué, écran par écran, plus les cas particuliers.',
    href: '/transport/pages',
    icon: 'layout',
  },
]

export const LANDING_MARKETEUR: EntreeLanding[] = [
  {
    titre: 'Je débute',
    description: 'Le cycle Marketeur, de la commande SONAP au pilotage du résultat.',
    href: '/vente/cycle',
    icon: 'rocket',
  },
  {
    titre: 'Achats & Stock',
    description: 'Commandes SONAP, approvisionnements, sommiers, mouvements et réconciliation.',
    href: '/vente/guides/enregistrer-commande-sonap',
    icon: 'package',
  },
  {
    titre: 'Ventes & Encaissements',
    description: 'Enregistrer une vente, la facturer, suivre son règlement et vos créances clients.',
    href: '/vente/guides/enregistrer-vente-facturer',
    icon: 'clipboard',
  },
  {
    titre: 'Finance & Réglementaire',
    description: 'Marge, position TVA, péréquation, cautions et charges d’exploitation.',
    href: '/vente/indicateurs',
    icon: 'chart',
  },
]

export interface ParcoursCroise {
  titre: string
  description: string
  href: string
}

export const PARCOURS_COMPLET_TITRE = 'Transport & Marketeur'

export const PARCOURS_COMPLET_ACCROCHE =
  'Vous distribuez du carburant et vous transportez vous-même une partie des volumes. Il n’y a pas de troisième documentation à lire : vous suivez les deux parcours, en gardant en tête les points où ils se rejoignent.'

export const PARCOURS_COMPLET_COLONNES = {
  transport: 'Parcours Transport',
  marketeur: 'Parcours Marketeur',
}

export const PARCOURS_COMPLET_JONCTIONS_TITRE = 'Où les deux activités se rejoignent'

export const PARCOURS_COMPLET_JONCTIONS_ACCROCHE =
  'Ce sont les points qui provoquent le plus d’erreurs quand on exerce les deux métiers à la fois.'

export const PARCOURS_COMPLET_ROLE_RAPPEL =
  'Selon votre rôle dans l’entreprise, un parcours guidé plus précis existe, avec les erreurs fréquentes et les indicateurs à surveiller.'

export const PARCOURS_COMPLET_ROLE_LIEN = 'Choisir mon rôle'

export const PARCOURS_COMPLET_JONCTIONS: ParcoursCroise[] = [
  {
    titre: 'Transport propre ou transport tiers, sur chaque vente',
    description:
      'À l’enregistrement d’une vente, vous indiquez qui assure le transport. En transport propre, le tarif officiel entre dans la marge comme référence réglementaire, sans sortie de trésorerie : vos coûts réels de camion doivent alors être saisis comme charges, faute de quoi la marge est surestimée.',
    href: '/vente/indicateurs/marge-marketeur',
  },
  {
    titre: 'Une même livraison, deux lectures',
    description:
      'Côté Marketeur, la livraison est une sortie de stock et une vente à facturer. Côté Transport, c’est une rotation avec ses coûts variables et sa marge propre. Les deux vues portent sur le même camion mais ne répondent pas à la même question.',
    href: '/transport/cycle',
  },
  {
    titre: 'Péréquation : une créance liée à la route, pas au transporteur',
    description:
      'Le signe de votre solde de péréquation dépend uniquement de la distance de la route, jamais du fait que vous transportiez vous-même ou que vous fassiez appel à un tiers.',
    href: '/vente/indicateurs/perequation',
  },
  {
    titre: 'Confirmation de réception et dossier documentaire',
    description:
      'La confirmation par le destinataire et le dossier de pièces se pilotent depuis le module Transport, mais ils sécurisent aussi vos ventes : c’est la même livraison qui est contestée en cas de litige.',
    href: '/transport/guides/configurer-double-validation',
  },
  {
    titre: 'Deux jeux de charges à ne pas mélanger',
    description:
      'Les charges du module Transport concernent les véhicules. Les charges d’exploitation du module Marketeur concernent votre structure de distribution. Saisir les unes à la place des autres fausse les deux résultats.',
    href: '/indicateurs/charges-fixes-vehicule',
  },
]
