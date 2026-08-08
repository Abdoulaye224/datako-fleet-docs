export interface ProfilArticle {
  href: string
  label: string
  priorite: 'critique' | 'importante' | 'utile'
}

export interface ProfilAction {
  titre: string
  guide: string
}

export interface ProfilErreur {
  situation: string
  consequence: string
  solution: string
  articleLie?: string
}

export interface ProfilIndicateur {
  nom: string
  pourquoi: string
  href: string
}

export interface ProfilExport {
  nom: string
  quand: string
  comment: string
}

export type ProfilCategorie = 'direction' | 'operations' | 'acces' | 'interne'

export interface ProfilCategorieMeta {
  id: ProfilCategorie
  label: string
  description: string
}

export const PROFIL_CATEGORIES: ProfilCategorieMeta[] = [
  {
    id: 'direction',
    label: 'Direction & Finance',
    description: 'Vous pilotez les chiffres : rentabilité, trésorerie, facturation, obligations réglementaires.',
  },
  {
    id: 'operations',
    label: 'Opérations',
    description: 'Vous êtes sur le terrain : rotations, livraisons, stock, flotte et disponibilité des véhicules.',
  },
  {
    id: 'acces',
    label: 'Accès spécifiques',
    description: 'Vous êtes extérieur à l’équipe qui utilise Datakö Fleet au quotidien, avec un accès limité à ce qui vous concerne.',
  },
]

export interface Profil {
  id: string
  categorie: ProfilCategorie
  phrase: string
  nom: string
  emoji: string
  sousTitre: string
  description: string
  modules: Array<'transport' | 'vente' | 'proprietaire' | 'backoffice'>
  parcoursRecommande: ProfilArticle[]
  actionsTupiques: ProfilAction[]
  erreursFréquentes: ProfilErreur[]
  indicateurs: ProfilIndicateur[]
  exports: ProfilExport[]
  rolesFleetManager: string[]
  color: string
}

export const PROFILS: Profil[] = [
  {
    id: 'proprietaire',
    categorie: 'acces',
    phrase: 'Vous avez confié vos camions à une entreprise qui les opère : suivez leurs rotations et votre part, sans accéder au reste de son activité.',
    nom: 'Propriétaire de flotte',
    emoji: '🔑',
    sousTitre: 'Propriétaire de camions gérés par une entreprise partenaire',
    description: 'Vous avez confié vos camions à une entreprise qui les opère. Fleet Manager vous donne une visibilité sur leurs performances et vos gains sans accès aux données de l\'entreprise.',
    modules: ['transport', 'proprietaire'],
    rolesFleetManager: ['owner'],
    color: '#F59E0B',
    parcoursRecommande: [
      { href: '/roles/proprietaire', label: 'Comprendre votre rôle et vos accès', priorite: 'critique' },
      { href: '/indicateurs/part-proprietaire', label: 'Comment est calculée ma part', priorite: 'importante' },
      { href: '/portail-proprietaire/historique-rotations', label: 'Comprendre le détail d\'une rotation (volumes, coûts, trajet, historique)', priorite: 'importante' },
      { href: '/transport/guides/generer-bilan-proprietaire-pdf', label: 'Télécharger mon bilan PDF', priorite: 'utile' },
      { href: '/transport/guides/recalculer-couts-variables', label: 'Comprendre le badge "Coûts recalculés" sur une livraison', priorite: 'utile' },
    ],
    actionsTupiques: [
      { titre: 'Vérifier les rotations effectuées ce mois par mes camions', guide: '/roles/proprietaire' },
      { titre: 'Calculer ma part de gains sur le mois', guide: '/indicateurs/part-proprietaire' },
      { titre: 'Vérifier le détail des coûts d\'une livraison précise', guide: '/portail-proprietaire/historique-rotations' },
      { titre: 'Télécharger mon bilan PDF pour validation', guide: '/transport/guides/generer-bilan-proprietaire-pdf' },
    ],
    erreursFréquentes: [
      {
        situation: 'S\'attendre à voir les données de toute l\'entreprise',
        consequence: 'Frustration — les données des autres propriétaires et de l\'organisation ne sont pas visibles',
        solution: 'Le Portail Propriétaire est isolé par conception. Vous voyez uniquement vos véhicules.',
      },
      {
        situation: 'Contester un gain sans comprendre le calcul',
        consequence: 'Incompréhension avec l\'entreprise partenaire',
        solution: 'Lire "Comment est calculée ma part" pour comprendre la formule. Le gestionnaire peut vous fournir le détail.',
        articleLie: '/indicateurs/part-proprietaire',
      },
      {
        situation: 'Ne pas comprendre pourquoi le carburant déduit sur une rotation a changé après coup',
        consequence: 'Sentiment d\'un montant incohérent ou non expliqué',
        solution: 'Ouvrez le détail de la rotation dans "Historique rotations" : le badge "🔄 Coûts recalculés" indique la date, la source et le motif de la correction.',
        articleLie: '/portail-proprietaire/historique-rotations',
      },
    ],
    indicateurs: [
      { nom: 'Part propriétaire par rotation', pourquoi: 'Ce que vous gagnez sur chaque trajet', href: '/indicateurs/part-proprietaire' },
      { nom: 'Charges fixes de mes véhicules', pourquoi: 'Ce qui est déduit avant votre part', href: '/indicateurs/charges-fixes-vehicule' },
      { nom: 'Coûts variables par rotation', pourquoi: 'Le détail carburant / prime / péages déduit sur chaque livraison', href: '/indicateurs/couts-variables-rotation' },
    ],
    exports: [
      { nom: 'Bilan propriétaire PDF', quand: 'Chaque mois pour archivage ou signature', comment: 'Mon Bilan > Télécharger PDF' },
    ],
  },
  {
    id: 'dg',
    categorie: 'direction',
    phrase: 'Vous pilotez l’entreprise et avez besoin de chiffres fiables : rentabilité, trésorerie, clients à risque, performance de chaque activité.',
    nom: 'DG / Direction générale',
    emoji: '🏢',
    sousTitre: 'Direction générale, vision globale et décisions stratégiques',
    description: 'Vous pilotez l\'entreprise. Vous avez besoin de chiffres fiables pour prendre des décisions : performance globale, rentabilité, trésorerie, clients problématiques.',
    modules: ['transport', 'vente'],
    rolesFleetManager: ['org_admin'],
    color: '#EF4444',
    parcoursRecommande: [
      { href: '/transport/pages/dashboard', label: 'Lire le tableau de bord principal', priorite: 'critique' },
      { href: '/indicateurs/marge-exploitation', label: 'Comprendre la marge d\'exploitation', priorite: 'critique' },
      { href: '/indicateurs/cashflow-net', label: 'Comprendre le cashflow net', priorite: 'critique' },
      { href: '/transport/pages/clients', label: 'Surveiller les impayés clients', priorite: 'critique' },
      { href: '/transport/pages/flotte', label: 'Performance globale de la flotte', priorite: 'importante' },
      { href: '/transport/pages/profit-par-camion', label: 'Profit par véhicule', priorite: 'importante' },
      { href: '/transport/pages/simulations', label: 'Simuler des scénarios d\'investissement', priorite: 'utile' },
      { href: '/transport/pages/repartition-acteurs', label: 'Répartition des gains entre acteurs', priorite: 'utile' },
      { href: '/transport/guides/generer-facture-transport', label: 'Générer une facture transport client', priorite: 'utile' },
      { href: '/vente/pages/vue-ensemble', label: 'Lire la vue d\'ensemble Marketeur', priorite: 'critique' },
      { href: '/vente/indicateurs/marge-nette-marketeur', label: 'Comprendre la marge nette de la distribution', priorite: 'critique' },
      { href: '/vente/pages/cashflow', label: 'Cashflow Marketeur — trésorerie de la distribution', priorite: 'critique' },
      { href: '/vente/indicateurs/creances-clients', label: 'Surveiller les créances clients de la distribution', priorite: 'importante' },
      { href: '/vente/cycle', label: 'Le cycle Marketeur, de l\'achat SONAP au résultat', priorite: 'importante' },
      { href: '/vente/indicateurs/position-tva', label: 'Ce que vous devez encore reverser à l\'État', priorite: 'importante' },
      { href: '/transport/guides/recalculer-couts-variables', label: 'Recalculer les coûts variables après une erreur de paramétrage', priorite: 'utile' },
    ],
    actionsTupiques: [
      { titre: 'Faire le point KPI du lundi matin en 5 minutes', guide: '/transport/pages/dashboard' },
      { titre: 'Comparer la rentabilité du transport et de la distribution', guide: '/vente/pages/vue-ensemble' },
      { titre: 'Identifier les camions qui coûtent de l\'argent', guide: '/transport/pages/profit-par-camion' },
      { titre: 'Simuler l\'impact d\'un nouveau camion sur le cashflow', guide: '/transport/pages/simulations' },
    ],
    erreursFréquentes: [
      {
        situation: 'Confondre CA Transport et Marge d\'exploitation',
        consequence: 'Surestimation de la rentabilité réelle',
        solution: 'Le CA est le chiffre d\'affaires brut. La marge d\'exploitation est ce qui reste après les coûts. Toujours regarder la marge.',
        articleLie: '/indicateurs/marge-exploitation',
      },
      {
        situation: 'Prendre des décisions sur le mois en cours incomplet',
        consequence: 'Les chiffres partiels sont trompeurs',
        solution: 'Utiliser le sélecteur de période pour comparer des mois complets. Ne pas décider sur M en cours avant la mi-mois.',
      },
    ],
    indicateurs: [
      { nom: 'Marge d\'exploitation', pourquoi: 'KPI #1 de santé de l\'activité', href: '/indicateurs/marge-exploitation' },
      { nom: 'Cashflow net', pourquoi: 'Trésorerie réelle après crédit-bail', href: '/indicateurs/cashflow-net' },
      { nom: 'CA Transport', pourquoi: 'Volume d\'activité global', href: '/indicateurs/ca-transport' },
      { nom: 'Impayés clients', pourquoi: 'Risque de recouvrement', href: '/transport/pages/clients' },
      { nom: 'Profit par camion', pourquoi: 'Rentabilité granulaire', href: '/indicateurs/profit-par-camion' },
      { nom: 'Marge nette Marketeur', pourquoi: 'Rentabilité réelle de la distribution, charges comprises', href: '/vente/indicateurs/marge-nette-marketeur' },
      { nom: 'Position TVA', pourquoi: 'Ce que la trésorerie affichée ne vous appartient pas encore', href: '/vente/indicateurs/position-tva' },
    ],
    exports: [
      { nom: 'Dashboard PDF (snapshot KPI)', quand: 'Réunion conseil, rapport mensuel', comment: 'Dashboard > Imprimer / Exporter PDF' },
      { nom: 'Factures transport PDF', quand: 'Pièces justificatives clients', comment: 'Livraisons > Générer une facture > PDF' },
      { nom: 'Export Excel complet', quand: 'Audit, reporting investisseurs', comment: 'Gains > Exporter' },
    ],
  },
  {
    id: 'comptable',
    categorie: 'direction',
    phrase: 'Vous rapprochez Datakö Fleet de votre comptabilité : paiements, factures, encaissements, relevés et exports.',
    nom: 'Comptable',
    emoji: '📋',
    sousTitre: 'Comptabilité, rapprochement et archivage des pièces justificatives',
    description: 'Vous réconciliez les données Fleet Manager avec la comptabilité. Votre priorité : les paiements, les factures, les relevés et les exports.',
    modules: ['transport', 'vente'],
    rolesFleetManager: ['finance'],
    color: '#06B6D4',
    parcoursRecommande: [
      { href: '/transport/pages/livraisons', label: 'Page Livraisons — suivi des paiements', priorite: 'critique' },
      { href: '/transport/guides/confirmer-un-paiement', label: 'Confirmer un paiement', priorite: 'critique' },
      { href: '/transport/guides/generer-facture-transport', label: 'Générer une facture transport PDF', priorite: 'critique' },
      { href: '/transport/guides/generer-releve-client-pdf', label: 'Générer un relevé client PDF', priorite: 'critique' },
      { href: '/transport/guides/exporter-excel', label: 'Exporter les données en Excel', priorite: 'critique' },
      { href: '/transport/cas-particuliers/charges-fixes-periode', label: 'Charges fixes sur période de gestion', priorite: 'importante' },
      { href: '/indicateurs/cashflow-net', label: 'Comprendre le cashflow', priorite: 'importante' },
      { href: '/vente/guides/enregistrer-vente-facturer', label: 'Enregistrer une vente et générer sa facture', priorite: 'critique' },
      { href: '/vente/guides/suivre-vente-reglement', label: 'Enregistrer l\'encaissement d\'une vente', priorite: 'critique' },
      { href: '/vente/pages/activite-distribution', label: 'Activité distribution — suivi des factures et des règlements', priorite: 'critique' },
      { href: '/vente/indicateurs/creances-clients', label: 'Retrouver ce qui reste dû par vos clients', priorite: 'importante' },
      { href: '/vente/pages/charges-exploitation', label: 'Saisir les charges d\'exploitation de la distribution', priorite: 'importante' },
      { href: '/roles/finance', label: 'Votre rôle Finance dans l\'application', priorite: 'utile' },
    ],
    actionsTupiques: [
      { titre: 'Rapprocher les paiements reçus avec les livraisons', guide: '/transport/pages/livraisons' },
      { titre: 'Générer les relevés clients de fin de mois', guide: '/transport/guides/generer-releve-client-pdf' },
      { titre: 'Exporter toutes les livraisons en Excel pour le journal comptable', guide: '/transport/guides/exporter-excel' },
      { titre: 'Pointer les ventes restées au statut « Émise » en fin de mois', guide: '/vente/guides/suivre-vente-reglement' },
    ],
    erreursFréquentes: [
      {
        situation: 'Modifier les données de rotation pour corriger une erreur comptable',
        consequence: 'Le rôle Finance ne permet pas les modifications — action impossible',
        solution: 'Demander à un Administrateur de corriger. Le Finance peut uniquement consulter et confirmer les paiements.',
      },
      {
        situation: 'Exporter les données sans sélectionner la bonne période',
        consequence: 'Export incomplet ou couvrant trop de mois',
        solution: 'Toujours définir la période avec le sélecteur avant d\'exporter.',
      },
    ],
    indicateurs: [
      { nom: 'Livraisons impayées', pourquoi: 'Créances à recouvrer', href: '/transport/pages/livraisons' },
      { nom: 'CA encaissé vs facturé', pourquoi: 'Différence trésorerie / facturation', href: '/indicateurs/ca-transport' },
      { nom: 'Charges fixes par véhicule', pourquoi: 'Vérifier l\'exhaustivité des charges', href: '/indicateurs/charges-fixes-vehicule' },
      { nom: 'Créances clients', pourquoi: 'Ventes facturées mais pas encore encaissées', href: '/vente/indicateurs/creances-clients' },
      { nom: 'CA facturé', pourquoi: 'Base du journal des ventes de la distribution', href: '/vente/indicateurs/ca-facture' },
    ],
    exports: [
      { nom: 'Export Excel livraisons', quand: 'Journal des ventes mensuel', comment: 'Livraisons > Exporter' },
      { nom: 'Relevés clients PDF', quand: 'Envoi mensuel aux clients + archivage', comment: 'Clients > Relevé > PDF' },
      { nom: 'Export Excel gains', quand: 'Rapprochement gains/paiements', comment: 'Gains > Exporter' },
      { nom: 'Factures transport PDF', quand: 'Pièces justificatives clients, archivage comptable', comment: 'Livraisons > Générer une facture > PDF' },
    ],
  },
  {
    id: 'daf',
    categorie: 'direction',
    phrase: 'Vous analysez la performance financière au-delà de la saisie : marges, cashflow, positions réglementaires et capacité de remboursement.',
    nom: 'DAF / Finance',
    emoji: '📊',
    sousTitre: 'Direction Administrative et Financière, analyse et pilotage financier',
    description: 'Vous pilotez la performance financière. Au-delà de la comptabilité, vous analysez les tendances, la rentabilité et la capacité de remboursement du crédit-bail.',
    modules: ['transport', 'vente'],
    rolesFleetManager: ['org_admin', 'finance'],
    color: '#F97316',
    parcoursRecommande: [
      { href: '/indicateurs/cashflow-net', label: 'Cashflow net — priorité absolue', priorite: 'critique' },
      { href: '/indicateurs/marge-exploitation', label: 'Marge d\'exploitation', priorite: 'critique' },
      { href: '/transport/pages/cashflow', label: 'Page Cashflow — vue complète', priorite: 'critique' },
      { href: '/transport/pages/simulations', label: 'Simulations financières', priorite: 'critique' },
      { href: '/transport/pages/profit-par-camion', label: 'Profit par camion — granularité', priorite: 'importante' },
      { href: '/transport/pages/clients', label: 'Clients — encours et impayés', priorite: 'importante' },
      { href: '/indicateurs/ca-transport', label: 'CA Transport — structure', priorite: 'utile' },
      { href: '/transport/pages/repartition-acteurs', label: 'Répartition des gains', priorite: 'utile' },
      { href: '/vente/pages/balances', label: 'Balances réglementaires — TVA, péréquation, fonds', priorite: 'critique' },
      { href: '/vente/indicateurs/position-tva', label: 'Position TVA — ce qu\'il reste à reverser', priorite: 'critique' },
      { href: '/vente/indicateurs/perequation', label: 'Péréquation — créance ou dette selon la route', priorite: 'critique' },
      { href: '/vente/indicateurs/marge-marketeur', label: 'Comment se construit la marge sur une vente', priorite: 'importante' },
      { href: '/vente/pages/cautions', label: 'Cautions douanières — engagements et disponible', priorite: 'importante' },
      { href: '/vente/guides/lire-position-tva-perequation', label: 'Lire vos positions réglementaires sans se tromper', priorite: 'importante' },
      { href: '/transport/guides/recalculer-couts-variables', label: 'Recalculer les coûts variables après une erreur de paramétrage', priorite: 'utile' },
    ],
    actionsTupiques: [
      { titre: 'Analyser la capacité de remboursement du crédit-bail', guide: '/transport/pages/cashflow' },
      { titre: 'Vérifier ce qui reste à reverser à l\'État avant d\'engager la trésorerie', guide: '/vente/guides/lire-position-tva-perequation' },
      { titre: 'Simuler l\'impact d\'une variation de tarif ou de volume', guide: '/transport/pages/simulations' },
      { titre: 'Identifier les clients à risque par niveau d\'impayé', guide: '/transport/pages/clients' },
    ],
    erreursFréquentes: [
      {
        situation: 'Analyser le cashflow sans tenir compte de la mensualité crédit-bail',
        consequence: 'Vision optimiste déconnectée de la trésorerie réelle',
        solution: 'Toujours partir du Cashflow Net (après crédit-bail), pas de la Marge d\'Exploitation.',
        articleLie: '/indicateurs/cashflow-net',
      },
    ],
    indicateurs: [
      { nom: 'Cashflow net', pourquoi: 'Capacité de remboursement et trésorerie', href: '/indicateurs/cashflow-net' },
      { nom: 'Marge d\'exploitation (%)', pourquoi: 'Rentabilité structurelle', href: '/indicateurs/marge-exploitation' },
      { nom: 'Gain par rotation', pourquoi: 'Rentabilité unitaire', href: '/indicateurs/gain-par-rotation' },
      { nom: 'Part propriétaire', pourquoi: 'Charge de répartition sur les véhicules gérés', href: '/indicateurs/part-proprietaire' },
      { nom: 'Marge nette Marketeur', pourquoi: 'Rentabilité de la distribution après charges', href: '/vente/indicateurs/marge-nette-marketeur' },
      { nom: 'Position TVA', pourquoi: 'Dette ou créance réglementaire à provisionner', href: '/vente/indicateurs/position-tva' },
      { nom: 'Péréquation', pourquoi: 'Créance sur l\'État selon les routes desservies', href: '/vente/indicateurs/perequation' },
    ],
    exports: [
      { nom: 'Export Excel Cashflow', quand: 'Rapport mensuel banque', comment: 'Cashflow > Exporter' },
      { nom: 'Export Excel Gains', quand: 'Analyse de rentabilité', comment: 'Gains > Exporter' },
      { nom: 'Bilan propriétaires PDF', quand: 'Justificatifs de reversement', comment: 'Répartition Acteurs > Bilan PDF' },
    ],
  },
  {
    id: 'operateur',
    categorie: 'operations',
    phrase: 'Vous êtes en première ligne : chaque rotation que vous enregistrez alimente tous les tableaux de bord de l’entreprise.',
    nom: 'Opérateur',
    emoji: '🔧',
    sousTitre: 'Chef d\'exploitation, dispatcher — opérations terrain quotidiennes',
    description: 'Vous êtes en première ligne. Chaque rotation que vous enregistrez alimente tous les tableaux de bord. Votre rôle est critique pour la qualité des données.',
    modules: ['transport'],
    rolesFleetManager: ['operator'],
    color: '#84CC16',
    parcoursRecommande: [
      { href: '/roles/operateur', label: 'Comprendre votre rôle et vos droits', priorite: 'critique' },
      { href: '/transport/guides/creer-une-rotation', label: 'Créer une rotation — guide complet', priorite: 'critique' },
      { href: '/transport/guides/valider-une-livraison', label: 'Valider une livraison', priorite: 'critique' },
      { href: '/transport/guides/confirmer-un-paiement', label: 'Confirmer un paiement', priorite: 'critique' },
      { href: '/transport/cas-particuliers/volume-manquant', label: 'Que faire si le volume livré est inférieur', priorite: 'critique' },
      { href: '/transport/cas-particuliers/ecart-vs-manquant', label: 'Écart signalé ou manquant : ne pas confondre', priorite: 'critique' },
      { href: '/transport/cas-particuliers/destinataire-sans-reponse', label: 'Le destinataire ne répond pas', priorite: 'importante' },
      { href: '/transport/pages/livraisons', label: 'Page Livraisons — vue d\'ensemble', priorite: 'importante' },
      { href: '/transport/cas-particuliers/dossier-livraison-complet', label: 'Compléter le dossier documentaire d\'une livraison', priorite: 'importante' },
      { href: '/confirmation-livraison', label: 'Ce que voit le destinataire quand il reçoit le lien', priorite: 'utile' },
      { href: '/transport/guides/ajouter-une-maintenance', label: 'Signaler une maintenance', priorite: 'utile' },
    ],
    actionsTupiques: [
      { titre: 'Enregistrer le départ du camion le matin', guide: '/transport/guides/creer-une-rotation' },
      { titre: 'Saisir le volume livré à l\'arrivée et valider', guide: '/transport/guides/valider-une-livraison' },
      { titre: 'Envoyer au destinataire le lien de confirmation de réception', guide: '/transport/guides/valider-une-livraison' },
      { titre: 'Joindre le bon de livraison scanné au dossier de la rotation', guide: '/transport/cas-particuliers/dossier-livraison-complet' },
      { titre: 'Gérer un volume manquant (différence chargé / livré)', guide: '/transport/cas-particuliers/volume-manquant' },
    ],
    erreursFréquentes: [
      {
        situation: 'Oublier de saisir le volume livré (laisser le statut "En cours")',
        consequence: 'La rotation n\'apparaît pas dans les Gains. Le DG voit des chiffres incomplets.',
        solution: 'Valider chaque livraison dans la journée. Ne pas laisser de livraisons "En cours" le soir.',
      },
      {
        situation: 'Créer une rotation sans sélectionner le bon client',
        consequence: 'Mauvaise imputation du CA client',
        solution: 'Vérifier le client et la destination avant de soumettre. Correction possible uniquement par un Admin après.',
      },
      {
        situation: 'Essayer de supprimer une rotation incorrecte',
        consequence: 'Action impossible — l\'Opérateur n\'a pas ce droit',
        solution: 'Contacter l\'Administrateur pour la suppression. Expliquer l\'erreur et la rotation concernée.',
      },
      {
        situation: 'Essayer de générer une facture client',
        consequence: 'Bouton "Générer une facture" non visible pour l\'Opérateur',
        solution: 'La facturation est réservée aux rôles Administrateur, Directeur et Finance. Les rotations facturées sont signalées par un badge "Facturée" dans la liste — l\'Opérateur peut les voir mais pas les créer.',
      },
      {
        situation: 'Croire qu\'une livraison est bloquée parce qu\'elle reste "en cours" après la déclaration du volume',
        consequence: 'Perte de temps à chercher un dysfonctionnement, ou tentatives répétées de validation',
        solution: 'Sur un client en double validation, votre déclaration ne finalise pas la livraison : elle attend la réponse du destinataire. C\'est le fonctionnement prévu, pas une anomalie.',
        articleLie: '/transport/guides/configurer-double-validation',
      },
      {
        situation: 'Vouloir clore soi-même une livraison dont le destinataire ne répond pas',
        consequence: 'L\'option n\'apparaît pas : elle est réservée à un administrateur de votre organisation, et seulement si la fiche du client l\'autorise',
        solution: 'Renvoyer d\'abord un lien au destinataire, puis solliciter un administrateur si le silence persiste.',
        articleLie: '/transport/cas-particuliers/destinataire-sans-reponse',
      },
    ],
    indicateurs: [
      { nom: 'Livraisons du jour', pourquoi: 'Suivi temps réel de l\'activité', href: '/transport/pages/livraisons' },
      { nom: 'Livraisons impayées', pourquoi: 'Alertes paiements à relancer', href: '/transport/pages/livraisons' },
    ],
    exports: [
      { nom: 'Export Excel livraisons', quand: 'Compte-rendu quotidien/hebdomadaire', comment: 'Livraisons > Exporter' },
    ],
  },
  {
    id: 'logistique',
    categorie: 'operations',
    phrase: 'Vous gérez la disponibilité et l’état de la flotte : véhicules opérationnels, bien documentés et rentabilisés.',
    nom: 'Responsable logistique',
    emoji: '📦',
    sousTitre: 'Gestion de la flotte, maintenances, optimisation des rotations',
    description: 'Vous gérez la disponibilité et l\'état de la flotte. Votre priorité : que les camions soient opérationnels, bien documentés et rentabilisés.',
    modules: ['transport'],
    rolesFleetManager: ['org_admin', 'operator'],
    color: '#A78BFA',
    parcoursRecommande: [
      { href: '/transport/pages/flotte', label: 'Page Flotte — vue d\'ensemble des véhicules', priorite: 'critique' },
      { href: '/transport/guides/ajouter-un-camion', label: 'Ajouter un camion', priorite: 'critique' },
      { href: '/transport/guides/ajouter-une-charge-fixe', label: 'Ajouter les charges fixes', priorite: 'critique' },
      { href: '/transport/guides/ajouter-une-maintenance', label: 'Enregistrer une maintenance', priorite: 'critique' },
      { href: '/transport/cas-particuliers/vehicule-gere-vs-propre', label: 'Véhicule propre vs géré', priorite: 'importante' },
      { href: '/transport/pages/profit-par-camion', label: 'Profit par camion — performance', priorite: 'importante' },
      { href: '/indicateurs/charges-fixes-vehicule', label: 'Comprendre les charges fixes', priorite: 'importante' },
      { href: '/transport/cas-particuliers/charges-fixes-periode', label: 'Charges sur période de gestion', priorite: 'utile' },
    ],
    actionsTupiques: [
      { titre: 'Configurer un nouveau camion dans Fleet Manager', guide: '/transport/guides/ajouter-un-camion' },
      { titre: 'Enregistrer l\'assurance annuelle et la répartir sur l\'année', guide: '/transport/guides/ajouter-une-charge-fixe' },
      { titre: 'Suivre les interventions mécaniques et leur coût', guide: '/transport/guides/ajouter-une-maintenance' },
    ],
    erreursFréquentes: [
      {
        situation: 'Oublier de renseigner la date de début de gestion d\'un camion',
        consequence: 'Les charges fixes sont mal calculées (période incorrecte)',
        solution: 'Toujours renseigner "Géré depuis" lors de l\'ajout d\'un camion géré.',
      },
      {
        situation: 'Entrer les charges en montant mensuel au lieu du montant total',
        consequence: 'Les charges annuelles sont sous-évaluées d\'un facteur 12',
        solution: 'Toujours entrer le montant total de la charge + la période de référence (mensuel / annuel / unique).',
        articleLie: '/indicateurs/charges-fixes-vehicule',
      },
    ],
    indicateurs: [
      { nom: 'Charges fixes par véhicule', pourquoi: 'Coût plancher à couvrir par les rotations', href: '/indicateurs/charges-fixes-vehicule' },
      { nom: 'Profit par camion', pourquoi: 'ROI de chaque véhicule dans la flotte', href: '/indicateurs/profit-par-camion' },
      { nom: 'Maintenances sur la période', pourquoi: 'Coûts de réparation et tendances', href: '/transport/pages/flotte' },
    ],
    exports: [
      { nom: 'Fiche camion PDF', quand: 'Dossier véhicule, contrôle technique', comment: 'Flotte > véhicule > Fiche PDF' },
      { nom: 'Export maintenances Excel', quand: 'Suivi coûts de réparation', comment: 'Flotte > Maintenances > Exporter' },
    ],
  },
  {
    id: 'super-admin',
    categorie: 'interne',
    phrase: 'Profil interne Datakö : administration multi-organisations, support et paramétrage avancé.',
    nom: 'Super Admin Datakö',
    emoji: '⚡',
    sousTitre: 'Équipe interne Datakö — gestion multi-tenant et déploiements',
    description: 'Vous gérez la plateforme en tant qu\'équipe Datakö. Vous créez des organisations, activez des modules, configurez le white-label et déployez les migrations.',
    modules: ['transport', 'vente', 'proprietaire', 'backoffice'],
    rolesFleetManager: ['super_admin'],
    color: '#EC4899',
    parcoursRecommande: [
      { href: '/backoffice/creer-une-organisation', label: 'Créer une organisation cliente', priorite: 'critique' },
      { href: '/backoffice/activer-modules', label: 'Activer les modules d\'une organisation', priorite: 'critique' },
      { href: '/backoffice/white-label', label: 'Configurer le branding white-label', priorite: 'critique' },
      { href: '/backoffice/gestion-membres', label: 'Gérer les membres d\'une organisation', priorite: 'importante' },
      { href: '/backoffice/plans-modules', label: 'Mapping plans → modules', priorite: 'importante' },
      { href: '/indicateurs/marge-exploitation', label: 'Comprendre les KPI pour accompagner les clients', priorite: 'utile' },
    ],
    actionsTupiques: [
      { titre: 'Onboarder un nouveau client (org + membres + modules + données seed)', guide: '/backoffice/creer-une-organisation' },
      { titre: 'Activer le module WhatsApp pour une organisation', guide: '/backoffice/activer-modules' },
      { titre: 'Configurer le white-label pour DC Energy', guide: '/backoffice/white-label' },
    ],
    erreursFréquentes: [
      {
        situation: 'Activer un module plan-gated manuellement',
        consequence: 'Le module s\'affiche mais les contrôles de plan peuvent le bloquer',
        solution: 'Les modules WhatsApp et Assistant IA sont plan-gated. Les activer uniquement via le champ plan de l\'organisation.',
      },
      {
        situation: 'Conditionner le comportement sur org.slug plutôt que sur les feature flags',
        consequence: 'Code fragile, rompt à chaque renommage d\'organisation',
        solution: 'Toujours passer par les feature flags (white_label, etc.), jamais sur org.slug.',
      },
    ],
    indicateurs: [
      { nom: 'Organisations actives', pourquoi: 'Santé de la base clients', href: '/backoffice/tableau-de-bord' },
      { nom: 'Modules activés par org', pourquoi: 'Revenue et engagement', href: '/backoffice/plans-modules' },
    ],
    exports: [
      { nom: 'Scripts SQL de seed', quand: 'Onboarding d\'un nouveau client', comment: 'Outil Streamlit interne → SQL Editor Supabase' },
    ],
  },
]
