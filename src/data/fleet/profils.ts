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

export interface Profil {
  id: string
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
    id: 'transporteur',
    nom: 'Transporteur',
    emoji: '🚛',
    sousTitre: 'Entreprise de transport de marchandises',
    description: 'Vous gérez une flotte de camions et effectuez des livraisons pour des clients. Vous utilisez Fleet Manager pour suivre vos rotations, vos gains et la performance de votre flotte.',
    modules: ['transport'],
    rolesFleetManager: ['org_admin', 'operator'],
    color: '#3B82F6',
    parcoursRecommande: [
      { href: '/transport/cycle', label: 'Comprendre le cycle d\'une rotation', priorite: 'critique' },
      { href: '/transport/guides/creer-une-rotation', label: 'Créer une rotation', priorite: 'critique' },
      { href: '/transport/guides/valider-une-livraison', label: 'Valider une livraison', priorite: 'critique' },
      { href: '/transport/pages/dashboard', label: 'Lire le tableau de bord', priorite: 'critique' },
      { href: '/transport/pages/gains', label: 'Comprendre les gains', priorite: 'importante' },
      { href: '/transport/pages/flotte', label: 'Suivre la performance de la flotte', priorite: 'importante' },
      { href: '/transport/pages/profit-par-camion', label: 'Profit par camion', priorite: 'importante' },
      { href: '/transport/guides/ajouter-une-charge-fixe', label: 'Ajouter les charges fixes', priorite: 'importante' },
      { href: '/transport/pages/cashflow', label: 'Comprendre le cashflow', priorite: 'utile' },
      { href: '/transport/cas-particuliers/vehicule-gere-vs-propre', label: 'Véhicule propre vs géré', priorite: 'utile' },
    ],
    actionsTupiques: [
      { titre: 'Enregistrer une livraison Conakry → Siguiri', guide: '/transport/guides/creer-une-rotation' },
      { titre: 'Valider que les 38 000 litres ont bien été livrés', guide: '/transport/guides/valider-une-livraison' },
      { titre: 'Vérifier la rentabilité de chaque camion ce mois', guide: '/transport/pages/profit-par-camion' },
    ],
    erreursFréquentes: [
      {
        situation: 'Saisir le volume chargé au lieu du volume livré lors de la validation',
        consequence: 'Le CA est surestimé, les gains sont faux',
        solution: 'Toujours saisir le volume réellement livré à destination. Si inférieur, c\'est un manquant.',
        articleLie: '/transport/cas-particuliers/volume-manquant',
      },
      {
        situation: 'Ne pas enregistrer les charges fixes du camion',
        consequence: 'Le profit affiché est surévalué — les charges ne sont pas déduites',
        solution: 'Ajouter assurance, vignette, visite technique dans Flotte > Charges fixes.',
        articleLie: '/transport/guides/ajouter-une-charge-fixe',
      },
      {
        situation: 'Marquer une livraison "Payé" avant encaissement réel',
        consequence: 'Le cashflow paraît sain alors qu\'il y a des impayés',
        solution: 'Ne confirmer le paiement qu\'à réception effective des fonds.',
      },
    ],
    indicateurs: [
      { nom: 'Gain par rotation', pourquoi: 'Savoir si chaque trajet est rentable', href: '/indicateurs/gain-par-rotation' },
      { nom: 'Marge d\'exploitation', pourquoi: 'Santé globale de l\'activité transport', href: '/indicateurs/marge-exploitation' },
      { nom: 'Profit par camion', pourquoi: 'Identifier les véhicules déficitaires', href: '/indicateurs/profit-par-camion' },
      { nom: 'Cashflow net', pourquoi: 'Trésorerie réelle après crédit-bail', href: '/indicateurs/cashflow-net' },
    ],
    exports: [
      { nom: 'Export Excel des livraisons', quand: 'En fin de mois pour la comptabilité', comment: 'Livraisons > Exporter' },
      { nom: 'Relevé client PDF', quand: 'Pour facturer ou relancer un client', comment: 'Clients > sélectionner > Relevé' },
      { nom: 'Bilan propriétaire PDF', quand: 'Pour reverser la part des camions gérés', comment: 'Répartition Acteurs > Propriétaire > Bilan PDF' },
    ],
  },
  {
    id: 'marketeur',
    nom: 'Marketeur / Distribution',
    emoji: '🏪',
    sousTitre: 'Société de distribution de produits pétroliers',
    description: 'Vous achetez des produits à SONAP et les revendez à vos clients (stations-service, industriels). Fleet Manager suit vos stocks, ventes, factures et encaissements.',
    modules: ['vente'],
    rolesFleetManager: ['org_admin', 'operator', 'finance'],
    color: '#10B981',
    parcoursRecommande: [
      { href: '/vente/pages/dashboard-vente', label: 'Tableau de bord Distribution', priorite: 'critique' },
      { href: '/vente/pages/stock', label: 'Comprendre le stock (chambres, navires)', priorite: 'critique' },
      { href: '/vente/guides/enregistrer-une-vente', label: 'Enregistrer une vente', priorite: 'critique' },
      { href: '/vente/guides/facturer-un-client', label: 'Facturer un client', priorite: 'critique' },
      { href: '/vente/pages/encaissements', label: 'Suivre les encaissements', priorite: 'importante' },
      { href: '/vente/pages/perequation', label: 'Comprendre la péréquation', priorite: 'importante' },
      { href: '/vente/guides/commande-sonap', label: 'Enregistrer une commande SONAP', priorite: 'importante' },
      { href: '/vente/pages/clients-vente', label: 'Gérer les clients Distribution', priorite: 'utile' },
    ],
    actionsTupiques: [
      { titre: 'Enregistrer la réception d\'un navire SONAP', guide: '/vente/guides/commande-sonap' },
      { titre: 'Facturer un client pour sa commande de Gasoil', guide: '/vente/guides/facturer-un-client' },
      { titre: 'Suivre le solde de stock par produit et par chambre', guide: '/vente/pages/stock' },
    ],
    erreursFréquentes: [
      {
        situation: 'Confondre CA facturé et CA encaissé',
        consequence: 'Surestimation de la trésorerie disponible',
        solution: 'Distinguer "Facturé" (droit) et "Encaissé" (trésorerie réelle). Seul l\'encaissé compte pour le cashflow.',
      },
      {
        situation: 'Ne pas renseigner les paiements SONAP au moment du versement',
        consequence: 'Les charges de stock sont sous-évaluées',
        solution: 'Enregistrer chaque paiement SONAP à la date effective de décaissement.',
      },
    ],
    indicateurs: [
      { nom: 'CA Distribution (facturé vs encaissé)', pourquoi: 'Différencier le chiffre d\'affaires réel de la facturation', href: '/indicateurs/ca-distribution' },
      { nom: 'Marge par produit', pourquoi: 'Rentabilité par type de carburant', href: '/indicateurs/marge-produit-distribution' },
      { nom: 'Stock disponible', pourquoi: 'Ne jamais se retrouver en rupture', href: '/indicateurs/stock' },
      { nom: 'Encours clients', pourquoi: 'Impayés et délais de règlement', href: '/indicateurs/encours-clients' },
    ],
    exports: [
      { nom: 'Factures PDF', quand: 'À envoyer au client après chaque commande', comment: 'Vente > Factures > Télécharger PDF' },
      { nom: 'Relevé client Distribution', quand: 'Réconciliation mensuelle avec le client', comment: 'Clients > Relevé Distribution' },
      { nom: 'Export Excel encaissements', quand: 'Pour le rapprochement bancaire', comment: 'Encaissements > Exporter' },
    ],
  },
  {
    id: 'mixte',
    nom: 'Transport + Distribution',
    emoji: '🚛',
    sousTitre: 'Activité combinée transport et distribution',
    description: 'Votre organisation fait à la fois du transport pour compte d\'autrui et de la distribution de produits. Fleet Manager couvre les deux modules en parallèle.',
    modules: ['transport', 'vente'],
    rolesFleetManager: ['org_admin'],
    color: '#8B5CF6',
    parcoursRecommande: [
      { href: '/transport/cycle', label: 'Cycle d\'une rotation transport', priorite: 'critique' },
      { href: '/vente/pages/dashboard-vente', label: 'Dashboard Distribution', priorite: 'critique' },
      { href: '/transport/pages/dashboard', label: 'Dashboard Transport', priorite: 'critique' },
      { href: '/transport/guides/creer-une-rotation', label: 'Créer une rotation', priorite: 'critique' },
      { href: '/vente/guides/enregistrer-une-vente', label: 'Enregistrer une vente', priorite: 'critique' },
      { href: '/indicateurs/marge-exploitation', label: 'Lire la marge d\'exploitation', priorite: 'importante' },
      { href: '/indicateurs/cashflow-net', label: 'Comprendre le cashflow consolidé', priorite: 'importante' },
    ],
    actionsTupiques: [
      { titre: 'Suivre les performances des deux activités en parallèle', guide: '/transport/pages/dashboard' },
      { titre: 'Comprendre comment les deux modules impactent le cashflow global', guide: '/indicateurs/cashflow-net' },
      { titre: 'Gérer les camions utilisés à la fois pour transport et distribution', guide: '/transport/cas-particuliers/vehicule-gere-vs-propre' },
    ],
    erreursFréquentes: [
      {
        situation: 'Additionner manuellement les chiffres Transport et Distribution',
        consequence: 'Double comptage possible, erreurs de calcul',
        solution: 'Le Dashboard consolidé agrège automatiquement les deux modules. Ne pas recalculer.',
      },
    ],
    indicateurs: [
      { nom: 'CA consolidé', pourquoi: 'Vue globale des deux activités', href: '/indicateurs/ca-transport' },
      { nom: 'Cashflow consolidé', pourquoi: 'Trésorerie réelle toutes activités', href: '/indicateurs/cashflow-net' },
      { nom: 'Marge par activité', pourquoi: 'Comparer la rentabilité Transport vs Distribution', href: '/indicateurs/marge-exploitation' },
    ],
    exports: [
      { nom: 'Export consolidé Excel', quand: 'Reporting mensuel direction', comment: 'Dashboard > Exporter' },
    ],
  },
  {
    id: 'proprietaire',
    nom: 'Propriétaire de flotte',
    emoji: '🔑',
    sousTitre: 'Propriétaire de camions gérés par une entreprise partenaire',
    description: 'Vous avez confié vos camions à une entreprise qui les opère. Fleet Manager vous donne une visibilité sur leurs performances et vos gains sans accès aux données de l\'entreprise.',
    modules: ['proprietaire'],
    rolesFleetManager: ['owner'],
    color: '#F59E0B',
    parcoursRecommande: [
      { href: '/roles/proprietaire', label: 'Comprendre votre rôle et vos accès', priorite: 'critique' },
      { href: '/indicateurs/part-proprietaire', label: 'Comment est calculée ma part', priorite: 'importante' },
      { href: '/transport/guides/generer-bilan-proprietaire-pdf', label: 'Télécharger mon bilan PDF', priorite: 'utile' },
    ],
    actionsTupiques: [
      { titre: 'Vérifier les rotations effectuées ce mois par mes camions', guide: '/roles/proprietaire' },
      { titre: 'Calculer ma part de gains sur le mois', guide: '/indicateurs/part-proprietaire' },
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
    ],
    indicateurs: [
      { nom: 'Part propriétaire par rotation', pourquoi: 'Ce que vous gagnez sur chaque trajet', href: '/indicateurs/part-proprietaire' },
      { nom: 'Charges fixes de mes véhicules', pourquoi: 'Ce qui est déduit avant votre part', href: '/indicateurs/charges-fixes-vehicule' },
    ],
    exports: [
      { nom: 'Bilan propriétaire PDF', quand: 'Chaque mois pour archivage ou signature', comment: 'Mon Bilan > Télécharger PDF' },
    ],
  },
  {
    id: 'dg',
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
    ],
    actionsTupiques: [
      { titre: 'Faire le point KPI du lundi matin en 5 minutes', guide: '/transport/pages/dashboard' },
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
    ],
    exports: [
      { nom: 'Dashboard PDF (snapshot KPI)', quand: 'Réunion conseil, rapport mensuel', comment: 'Dashboard > Imprimer / Exporter PDF' },
      { nom: 'Factures transport PDF', quand: 'Pièces justificatives clients', comment: 'Livraisons > Générer une facture > PDF' },
      { nom: 'Export Excel complet', quand: 'Audit, reporting investisseurs', comment: 'Gains > Exporter' },
    ],
  },
  {
    id: 'comptable',
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
      { href: '/roles/finance', label: 'Votre rôle Finance dans l\'application', priorite: 'utile' },
    ],
    actionsTupiques: [
      { titre: 'Rapprocher les paiements reçus avec les livraisons', guide: '/transport/pages/livraisons' },
      { titre: 'Générer les relevés clients de fin de mois', guide: '/transport/guides/generer-releve-client-pdf' },
      { titre: 'Exporter toutes les livraisons en Excel pour le journal comptable', guide: '/transport/guides/exporter-excel' },
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
    ],
    actionsTupiques: [
      { titre: 'Analyser la capacité de remboursement du crédit-bail', guide: '/transport/pages/cashflow' },
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
    ],
    exports: [
      { nom: 'Export Excel Cashflow', quand: 'Rapport mensuel banque', comment: 'Cashflow > Exporter' },
      { nom: 'Export Excel Gains', quand: 'Analyse de rentabilité', comment: 'Gains > Exporter' },
      { nom: 'Bilan propriétaires PDF', quand: 'Justificatifs de reversement', comment: 'Répartition Acteurs > Bilan PDF' },
    ],
  },
  {
    id: 'operateur',
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
      { href: '/transport/pages/livraisons', label: 'Page Livraisons — vue d\'ensemble', priorite: 'importante' },
      { href: '/transport/guides/ajouter-une-maintenance', label: 'Signaler une maintenance', priorite: 'utile' },
    ],
    actionsTupiques: [
      { titre: 'Enregistrer le départ du camion le matin', guide: '/transport/guides/creer-une-rotation' },
      { titre: 'Saisir le volume livré à l\'arrivée et valider', guide: '/transport/guides/valider-une-livraison' },
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
