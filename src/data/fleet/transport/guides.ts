export interface Guide {
  id: string
  title: string
  objectif: string
  prerequis: string[]
  etapes: string[]
  resultat: string
  erreurs: string[]
  precedent?: { href: string; titre: string }
  suivant?: { href: string; titre: string }
  articlesConnexes?: Array<{ href: string; titre: string; section: string }>
  exempleConcret?: string
  avantApres?: { titre?: string; lignes: Array<{ ligne: string; avant: string; apres: string }> }
  impacts?: string[]
  attention?: string[]
}

export const guides: Guide[] = [
  {
    id: 'ajouter-camion',
    title: 'Ajouter un camion',
    objectif: "Enregistrer un nouveau véhicule dans la flotte pour pouvoir l'utiliser dans les rotations.",
    prerequis: ['Avoir le rôle Administrateur', "Connaître l'immatriculation et la capacité du véhicule"],
    etapes: [
      'Allez dans la section Flotte depuis le menu principal.',
      'Cliquez sur le bouton "+ Ajouter un véhicule" en haut à droite.',
      "Renseignez l'immatriculation, la capacité en litres et le type de véhicule.",
      'Indiquez si le véhicule est "Propre" (appartient à l\'organisation) ou "Géré" (propriétaire externe).',
      'Si géré, sélectionnez ou créez le propriétaire et renseignez le pourcentage de répartition.',
      'Ajoutez les documents obligatoires : assurance, vignette, visite technique.',
      'Cliquez sur "Enregistrer".',
    ],
    resultat: 'Le camion apparaît dans la liste de la Flotte et dans le menu déroulant du formulaire Nouvelle Rotation.',
    erreurs: [
      'Si le camion n\'apparaît pas dans Nouvelle Rotation, vérifiez que son statut est "Actif".',
      'Un camion sans assurance valide affichera un badge rouge dans le formulaire.',
    ],
    suivant: { href: '/transport/guides/configurer-repartition-acteurs', titre: 'Configurer la répartition pour un véhicule géré' },
  },
  {
    id: 'configurer-repartition-acteurs',
    title: 'Configurer la répartition pour un véhicule géré',
    objectif:
      "Définir comment les revenus d'un véhicule géré se partagent entre votre organisation et son propriétaire, avant que les rotations ne s'accumulent.",
    prerequis: [
      'Avoir le rôle Administrateur',
      'Le véhicule doit déjà exister dans la Flotte, marqué comme "Géré"',
      'Savoir qui est le propriétaire bénéficiaire',
    ],
    etapes: [
      'Allez dans Configuration, onglet Acteurs.',
      'Ouvrez le formulaire de nouvelle règle de répartition.',
      'Choisissez l\'acteur bénéficiaire dans la liste — ou créez-le sur place avec "+ Nouvel acteur" si le propriétaire n\'existe pas encore.',
      'Choisissez le type de règle : "Commission (%)" pour un pourcentage, "Résiduel" pour attribuer tout ce qui reste.',
      'Si vous avez choisi Commission, saisissez le pourcentage du chiffre d\'affaires brut.',
      'Choisissez le périmètre : "Véhicules spécifiques" en cochant le camion concerné, ou "Tous les véhicules gérés" si la règle vaut pour l\'ensemble.',
      'Enregistrez.',
    ],
    resultat:
      "La règle apparaît dans la page Répartition acteurs et s'applique aux prochaines rotations du véhicule. Elle alimente aussi le profit par camion, le cashflow, les gains et la ligne \"Commission exploitant\" ou \"Résiduel\" du bilan propriétaire PDF.",
    erreurs: [
      'Le pourcentage doit être supérieur à 0 et ne pas dépasser 100.',
      "Le total des commissions de votre organisation ne peut pas dépasser 100 % : si la nouvelle règle fait franchir ce seuil, l'enregistrement est refusé avec le total qui aurait été atteint.",
      'Si vous choisissez "Véhicules spécifiques" sans cocher aucun véhicule, la règle est refusée.',
      "Créer un second résiduel sur le même périmètre ne l'ajoute pas au premier : l'application demande confirmation, puis désactive l'ancien et transfère sa part au nouveau bénéficiaire.",
    ],
    attention: [
      "Tant qu'aucune règle n'existe, les revenus d'un véhicule géré reviennent intégralement à son propriétaire : la page Répartition acteurs affiche alors les montants sans rien répartir.",
      "La page Répartition acteurs ne fait qu'afficher le résultat. La règle se crée uniquement dans Configuration, onglet Acteurs.",
      "L'application indique qu'il n'y a qu'un seul résiduel par organisation. En pratique, c'est un seul résiduel actif à la fois sur un même périmètre.",
    ],
    precedent: { href: '/transport/guides/ajouter-camion', titre: 'Ajouter un camion' },
    suivant: { href: '/transport/guides/ajouter-charge-fixe', titre: 'Ajouter une charge fixe' },
    articlesConnexes: [
      { href: '/transport/pages/repartition-acteurs', titre: 'Répartition acteurs', section: 'Pages' },
      { href: '/transport/cas-particuliers/vehicule-propre-vs-gere', titre: 'Véhicule propre ou géré', section: 'Cas particuliers' },
      { href: '/indicateurs/part-proprietaire', titre: 'Part propriétaire', section: 'Indicateurs' },
    ],
  },
  {
    id: 'ajouter-charge-fixe',
    title: 'Ajouter une charge fixe',
    objectif: "Enregistrer une charge récurrente sur un véhicule (assurance, vignette, visite technique, patente) pour qu'elle soit prise en compte dans le calcul de profit.",
    prerequis: ['Avoir le rôle Administrateur'],
    etapes: [
      'Allez dans la section Flotte.',
      'Cliquez sur le véhicule concerné pour accéder à sa fiche.',
      'Ouvrez l\'onglet "Charges fixes".',
      'Cliquez sur "+ Ajouter une charge".',
      'Choisissez le type : Assurance, Vignette, Visite technique ou Patente.',
      'Saisissez le montant et la fréquence (mensuelle, annuelle).',
      'Indiquez les dates de début et de fin de validité.',
      'Enregistrez.',
    ],
    resultat: 'La charge est prise en compte dans le calcul de Profit par Camion et dans les indicateurs de Cashflow.',
    erreurs: [
      'Une charge sans date de fin sera comptabilisée indéfiniment. Vérifiez les dates.',
      "Les charges fixes s'accumulent même les mois sans rotation.",
    ],
    precedent: { href: '/transport/guides/configurer-repartition-acteurs', titre: 'Configurer la répartition pour un véhicule géré' },
    suivant: { href: '/transport/guides/ajouter-maintenance', titre: 'Ajouter une maintenance' },
    articlesConnexes: [
      { href: '/indicateurs/charges-fixes-vehicule', titre: 'Charges fixes véhicule', section: 'Indicateurs' },
    ],
  },
  {
    id: 'ajouter-maintenance',
    title: 'Ajouter une maintenance',
    objectif: "Enregistrer une dépense de maintenance sur un véhicule pour qu'elle apparaisse dans les coûts d'exploitation.",
    prerequis: ['Avoir le rôle Administrateur ou Opérateur'],
    etapes: [
      'Allez dans la section Flotte.',
      'Cliquez sur le véhicule concerné.',
      'Ouvrez l\'onglet "Maintenances".',
      'Cliquez sur "+ Ajouter une maintenance".',
      "Décrivez l'intervention et saisissez le montant.",
      'Indiquez la date.',
      'Enregistrez.',
    ],
    resultat: 'La maintenance est incluse dans les coûts d\'exploitation du véhicule sur la période concernée.',
    erreurs: ['La maintenance n\'apparaît dans les KPIs que sur la période correspondant à sa date.'],
    precedent: { href: '/transport/guides/ajouter-charge-fixe', titre: 'Ajouter une charge fixe' },
    suivant: { href: '/transport/guides/ajouter-client', titre: 'Ajouter un client' },
  },
  {
    id: 'ajouter-client',
    title: 'Ajouter un client',
    objectif: 'Créer un client pour pouvoir lui associer des rotations et suivre ses paiements.',
    prerequis: ['Avoir le rôle Administrateur ou Opérateur'],
    etapes: [
      'Allez dans la section Clients.',
      'Cliquez sur "+ Nouveau client".',
      "Renseignez le nom, le contact et l'adresse.",
      'Ajoutez un tarif contractuel si ce client bénéficie d\'un tarif différent du tarif national.',
      'Cliquez sur "Enregistrer".',
    ],
    resultat: 'Le client est disponible dans le menu déroulant du formulaire Nouvelle Rotation.',
    erreurs: ['Si le client n\'apparaît pas dans Nouvelle Rotation, rechargez la page.'],
    precedent: { href: '/transport/guides/ajouter-maintenance', titre: 'Ajouter une maintenance' },
    suivant: { href: '/transport/guides/creer-rotation', titre: 'Créer une rotation' },
  },
  {
    id: 'creer-rotation',
    title: 'Créer une rotation',
    objectif: 'Enregistrer un trajet de transport pour alimenter les tableaux de bord.',
    prerequis: ['Avoir le rôle Administrateur ou Opérateur', 'Le camion et le client doivent exister'],
    etapes: [
      'Allez dans "Nouvelle Rotation" depuis le menu principal ou le bouton CTA du Dashboard.',
      'Sélectionnez le camion. Les paramètres de route (carburant, prime, péage) se remplissent automatiquement.',
      'Choisissez le dépôt de chargement et la destination.',
      'Sélectionnez le produit (Gasoil, Essence, HFO) et saisissez le volume chargé en litres.',
      "Sélectionnez le client. Le tarif appliqué est la péréquation transport nationale, sauf si vous avez déclaré un tarif contractuel pour cette route ou pour ce client.",
      "Si vous accordez une remise à ce client, saisissez-la dans le champ \"Ristourne (GNF/L)\". Elle se déduit du tarif au litre : le CA net, la marge et le gain se recalculent immédiatement à l'écran. Laissez le champ vide s'il n'y a pas de remise.",
      'Sélectionnez le conducteur.',
      'Vérifiez le gain calculé automatiquement.',
      'Cliquez sur "Enregistrer la rotation".',
    ],
    resultat: 'La rotation apparaît dans la page Livraisons avec le statut "En cours". Elle est visible dans Gains une fois validée.',
    erreurs: [
      'Si le gain est négatif, la rotation coûte plus qu\'elle ne rapporte. Vérifiez le tarif et le volume.',
      'Si le camion n\'est pas disponible, vérifiez son statut dans Flotte.',
    ],
    precedent: { href: '/transport/guides/ajouter-client', titre: 'Ajouter un client' },
    suivant: { href: '/transport/guides/valider-livraison', titre: 'Valider une livraison' },
    articlesConnexes: [
      { href: '/transport/cycle', titre: "Cycle d'une rotation", section: 'Transport' },
      { href: '/transport/cas-particuliers/volume-livre-different', titre: 'Volume manquant', section: 'Cas particuliers' },
    ],
  },
  {
    id: 'valider-livraison',
    title: 'Valider une livraison',
    objectif: "Confirmer qu'une livraison a bien eu lieu pour qu'elle entre dans les indicateurs financiers.",
    prerequis: ['Avoir le rôle Administrateur ou Opérateur', 'La rotation doit être en statut "En cours"'],
    etapes: [
      'Allez dans la page Livraisons.',
      'Trouvez la rotation à valider (statut "En cours").',
      'Cliquez sur la ligne pour ouvrir le détail.',
      'Cliquez sur "Marquer comme livré".',
      'Saisissez le volume réellement livré (peut différer du volume chargé).',
      'Renseignez le numéro de bon de livraison (BL).',
      'Sélectionnez la date de livraison réelle.',
      'Ajoutez les pièces justificatives si disponibles.',
      'Confirmez.',
    ],
    resultat: 'La livraison passe au statut "Livré". Le CA et les gains sont maintenant intégrés dans tous les tableaux de bord.',
    erreurs: [
      'Une livraison non validée ne compte pas dans les Gains ni dans le Dashboard financier.',
      'Si le volume livré est inférieur au volume chargé, l\'écart est automatiquement comptabilisé comme "manquant".',
      'Si le client est soumis à la double validation, le bouton devient "Déclarer le déchargement" et la livraison ne se finalise pas tout de suite : elle attend la confirmation du destinataire.',
    ],
    precedent: { href: '/transport/guides/creer-rotation', titre: 'Créer une rotation' },
    suivant: { href: '/transport/guides/confirmer-paiement', titre: 'Confirmer un paiement' },
    articlesConnexes: [
      { href: '/transport/cas-particuliers/volume-livre-different', titre: 'Volume livré ≠ volume chargé', section: 'Cas particuliers' },
      { href: '/transport/guides/configurer-double-validation', titre: 'Activer la double validation pour un client', section: 'Guides' },
    ],
  },
  {
    id: 'confirmer-paiement',
    title: 'Confirmer un paiement',
    objectif: "Enregistrer qu'un client a payé sa facture pour mettre à jour le suivi des créances.",
    prerequis: ['Avoir le rôle Administrateur ou Finance', 'La livraison doit être validée (statut Livré)'],
    etapes: [
      'Allez dans la page Livraisons.',
      'Trouvez la livraison avec le badge paiement "En attente" ou "Impayé".',
      'Cliquez sur le badge de paiement.',
      'Sélectionnez "Payé" dans le menu.',
      'Confirmez.',
    ],
    resultat: 'Le badge passe au vert "Payé". La créance est soldée dans les indicateurs financiers.',
    erreurs: ["Si le badge n'est pas cliquable, vérifiez votre rôle : l'encaissement est réservé à l'Administrateur et au Finance."],
    attention: [
      "L'encaissement et la date de paiement sont réservés aux rôles Administrateur et Finance. L'Opérateur voit le badge de paiement mais ne peut pas le modifier : c'est volontaire, le suivi des règlements reste entre les mains de la personne qui gère la trésorerie.",
    ],
    precedent: { href: '/transport/guides/valider-livraison', titre: 'Valider une livraison' },
    suivant: { href: '/transport/guides/releve-client-pdf', titre: 'Générer un relevé client PDF' },
  },
  {
    id: 'releve-client-pdf',
    title: 'Générer un relevé client PDF',
    objectif: "Produire un document récapitulatif des livraisons et du solde d'un client sur une période.",
    prerequis: ['Avoir le rôle Administrateur ou Finance'],
    etapes: [
      'Allez dans la section Clients.',
      'Cliquez sur le client concerné.',
      'Ouvrez l\'onglet "Relevé".',
      'Choisissez la période (mois, trimestre, ou dates personnalisées).',
      'Cliquez sur "Télécharger PDF".',
    ],
    resultat: 'Un PDF est généré avec le logo Datakö, les livraisons de la période, les montants et le solde.',
    erreurs: ['Si le PDF est vide, vérifiez qu\'il y a des livraisons validées sur la période sélectionnée.'],
    precedent: { href: '/transport/guides/confirmer-paiement', titre: 'Confirmer un paiement' },
    suivant: { href: '/transport/guides/bilan-proprietaire-pdf', titre: 'Générer un bilan propriétaire PDF' },
  },
  {
    id: 'bilan-proprietaire-pdf',
    title: 'Générer un bilan propriétaire PDF',
    objectif: "Produire le bilan mensuel d'un propriétaire de véhicule géré pour lui communiquer sa part.",
    prerequis: ['Avoir le rôle Administrateur, ou être connecté en tant que Propriétaire'],
    etapes: [
      'Administrateur : allez dans Répartition Acteurs > sélectionnez le propriétaire > Bilan PDF.',
      'Propriétaire : connectez-vous au Portail Propriétaire, allez dans "Mes bilans" et téléchargez.',
      'Choisissez la période.',
      'Cliquez sur "Télécharger PDF".',
    ],
    resultat: 'Le propriétaire reçoit un PDF avec ses véhicules, les rotations effectuées et sa part de gain.',
    erreurs: ['Si le bilan affiche 0 GNF, vérifiez que les livraisons du mois sont bien validées.'],
    precedent: { href: '/transport/guides/releve-client-pdf', titre: 'Générer un relevé client PDF' },
    suivant: { href: '/transport/guides/exporter-excel', titre: 'Exporter les données Excel' },
    articlesConnexes: [
      { href: '/transport/guides/configurer-repartition-acteurs', titre: 'Configurer la répartition pour un véhicule géré', section: 'Guides' },
      { href: '/roles/owner', titre: 'Rôle Propriétaire', section: 'Rôles' },
      { href: '/indicateurs/part-proprietaire', titre: 'Part propriétaire', section: 'Indicateurs' },
    ],
  },
  {
    id: 'exporter-excel',
    title: 'Exporter les données Excel',
    objectif: 'Exporter un tableau de bord ou un historique en fichier Excel pour analyse ou archivage.',
    prerequis: ['Avoir le rôle Administrateur, Opérateur ou Finance'],
    etapes: [
      'Allez sur la page à exporter : Livraisons, Gains ou Historique Rotations.',
      'Sélectionnez la période souhaitée avec le filtre en haut à droite.',
      'Cliquez sur le bouton "Exporter" (icône téléchargement) en haut à droite.',
      'Le fichier Excel est téléchargé automatiquement.',
    ],
    resultat: 'Un fichier .xlsx est téléchargé avec toutes les colonnes de la période sélectionnée.',
    erreurs: ["Si le bouton Exporter n'est pas visible, vérifiez votre rôle (le Lecteur ne peut pas exporter)."],
    precedent: { href: '/transport/guides/bilan-proprietaire-pdf', titre: 'Générer un bilan propriétaire PDF' },
    suivant: { href: '/transport/guides/generer-facture-transport', titre: 'Générer une facture transport' },
  },
  {
    id: 'generer-facture-transport',
    title: 'Générer une facture transport',
    objectif: 'Créer une facture PDF multi-rotations pour un client, avec numéro auto-incrémenté, TVA optionnelle et délai de règlement.',
    prerequis: [
      'Avoir le rôle Administrateur ou Finance',
      'Au moins une livraison livrée et non encore facturée pour ce client',
    ],
    etapes: [
      'Allez dans la section Livraisons.',
      'Cliquez sur "Générer une facture" — le bouton est disponible en haut de la page ou sur la fiche du client concerné.',
      'La modale s\'ouvre : elle affiche toutes les rotations livrées et non encore facturées pour le client sélectionné.',
      'Filtrez si besoin par période (date début / fin) ou recherchez par numéro de BL, camion ou trajet.',
      'Sélectionnez les rotations à inclure dans la facture (cases à cocher). Utilisez "Tout sélectionner" pour cocher toutes les lignes d\'un coup.',
      'Choisissez si la TVA s\'applique (18% — oui / non).',
      'Définissez le délai de règlement : 15, 30, 45 ou 60 jours.',
      'Ajoutez un commentaire optionnel (ex : "Transport carburant — Juin 2026").',
      'Cliquez sur "Générer la facture".',
      'Le PDF se télécharge immédiatement et les rotations incluses sont automatiquement marquées "Facturée".',
    ],
    resultat: 'Un PDF de facture est généré avec le numéro FT-2026-001 (auto-incrémenté par organisation), l\'en-tête de l\'entreprise, le tableau des rotations, les montants HT/TVA/TTC, le délai de règlement et le commentaire. Les rotations facturées affichent désormais un badge "Facturée" dans la liste des livraisons.',
    erreurs: [
      'Si le bouton "Générer une facture" n\'est pas visible, vérifiez votre rôle : seuls l\'Administrateur et le Finance peuvent générer des factures. L\'Opérateur ne peut pas.',
      'Si des rotations n\'apparaissent pas dans la modale, elles sont soit déjà facturées (badge "Facturée"), soit pas encore livrées (statut "En cours").',
      'La TVA ne peut pas être modifiée une fois la facture générée. Vérifiez le paramètre avant de cliquer "Générer".',
      'Si le branding white-label est actif sur votre organisation, l\'en-tête du PDF affichera le logo et les couleurs de votre entreprise plutôt que l\'identité Datakö.',
    ],
    precedent: { href: '/transport/guides/exporter-excel', titre: 'Exporter les données Excel' },
    suivant: { href: '/transport/guides/configurer-double-validation', titre: 'Activer la double validation pour un client' },
    articlesConnexes: [
      { href: '/transport/pages/livraisons', titre: 'Page Livraisons', section: 'Transport' },
      { href: '/transport/guides/releve-client-pdf', titre: 'Générer un relevé client PDF', section: 'Guides' },
      { href: '/roles/finance', titre: 'Rôle Finance', section: 'Rôles' },
    ],
  },
  {
    id: 'configurer-double-validation',
    title: 'Activer la double validation pour un client',
    objectif:
      "Exiger qu'un client confirme lui-même la quantité reçue, pour disposer d'une preuve de réception indépendante du chauffeur en cas de litige.",
    prerequis: [
      'Avoir le rôle Administrateur',
      'Connaître le responsable de réception chez ce client : son nom, et son e-mail ou son numéro WhatsApp',
      "Avoir obtenu son accord pour être contacté à ce sujet",
    ],
    etapes: [
      'Ouvrez la fiche du client concerné.',
      'Repérez le bloc "Validation des livraisons".',
      'Dans "Mode de validation", choisissez "Opérateur et destinataire". Par défaut, tous les clients sont en "Opérateur uniquement".',
      'Renseignez le "Responsable de réception" : c\'est la personne qui réceptionne physiquement le carburant, pas votre contact de facturation.',
      'Indiquez son e-mail et/ou son numéro WhatsApp selon la façon dont vous souhaitez le prévenir.',
      'Dans "Comment le prévenir", choisissez le canal : E-mail (envoyé automatiquement), WhatsApp (le message est préparé, c\'est vous qui l\'envoyez), ou Les deux.',
      'Cochez "Le destinataire accepte d\'être contacté" : sans cette case, aucun message ne partira jamais, quel que soit le canal.',
      'Décidez enfin si vous autorisez une finalisation exceptionnelle : décochée, cette option rend la double validation stricte — plus personne ne pourra clore une livraison sans la réponse du destinataire.',
      'Enregistrez la fiche client.',
    ],
    resultat:
      'Le client porte la mention "Double validation" dans la liste des clients. Toutes ses prochaines livraisons attendront la confirmation de son destinataire avant d\'être finalisées. À chaque déclaration de déchargement, une fenêtre vous proposera le lien de confirmation accompagné d\'un QR code, que le destinataire présent sur place peut scanner sans attendre de message.',
    erreurs: [
      "La case de consentement n'est pas cochée : aucun message ne part, ni par e-mail ni par WhatsApp. C'est un refus volontaire, pas une panne.",
      "Le responsable de réception est confondu avec le contact de facturation : le lien part alors à la mauvaise personne, qui n'était pas sur le terrain au déchargement.",
      "La double validation stricte est activée sans que le destinataire soit réellement joignable : les livraisons de ce client resteront bloquées, personne ne pouvant les clore.",
    ],
    impacts: [
      'Aucune facture ni aucun chiffre d\'affaires n\'est reconnu tant que la livraison n\'est pas finalisée',
      'Les livraisons concernées restent visibles dans la page Livraisons, avec le badge "En attente de confirmation"',
      'Les clients déjà existants ne sont pas affectés : sans réglage explicite, ils restent en validation par l\'opérateur seul',
    ],
    attention: [
      "Ce réglage se décide client par client, dans sa fiche. Il n'existe pas de réglage global qui l'activerait pour tout le monde.",
      'Le mode choisi est figé sur chaque livraison au moment du déchargement : changer la politique du client ne modifie pas les livraisons déjà en cours.',
    ],
    precedent: { href: '/transport/guides/generer-facture-transport', titre: 'Générer une facture transport' },
    suivant: { href: '/transport/guides/traiter-ecart-destinataire', titre: 'Traiter un écart signalé par le destinataire' },
    articlesConnexes: [
      { href: '/transport/guides/valider-livraison', titre: 'Valider une livraison', section: 'Guides' },
      { href: '/confirmation-livraison', titre: 'Confirmer une livraison Datakö (vue destinataire)', section: 'Destinataire' },
      { href: '/roles/org_admin', titre: 'Rôle Administrateur', section: 'Rôles' },
    ],
  },
  {
    id: 'traiter-ecart-destinataire',
    title: 'Traiter un écart signalé par le destinataire',
    objectif:
      "Comprendre ce qui se passe quand le destinataire annonce une quantité différente de celle déclarée par votre exploitant, et clore la livraison correctement.",
    prerequis: [
      'Avoir le rôle Administrateur de votre organisation',
      'La livraison doit porter le badge "Écart signalé"',
    ],
    etapes: [
      'Ouvrez la page Livraisons et repérez la livraison portant le badge "Écart signalé".',
      'Ouvrez son détail : les deux quantités sont affichées côte à côte, celle déclarée par votre exploitant et celle déclarée par le destinataire.',
      'Contactez le destinataire ou votre chauffeur pour comprendre l\'origine de la différence : erreur de saisie, mesure après dépotage, incident réel pendant le transport.',
      'Une fois la vérité établie, cliquez sur "Trancher l\'écart et finaliser".',
      'Saisissez la quantité finalement retenue : elle peut être celle de l\'un, de l\'autre, ou une troisième valeur issue de votre arbitrage.',
      'Renseignez le motif et le commentaire — ils sont obligatoires.',
      'Confirmez : la livraison est finalisée et le chiffre d\'affaires est calculé sur la quantité retenue.',
    ],
    resultat:
      "La livraison est finalisée avec la mention \"Finalisée après résolution d'un écart\", et l'historique conserve les deux déclarations d'origine ainsi que votre décision.",
    erreurs: [
      "Croire que l'écart bloque définitivement la livraison : il ouvre une phase de discussion, pas un blocage. Seul un administrateur de votre organisation peut la trancher.",
      "Attendre que le destinataire \"corrige\" sa réponse : il ne le peut pas. Sa déclaration est définitive une fois envoyée, c'est votre arbitrage qui tranche.",
      "Redéclarer la quantité côté exploitant pour faire disparaître l'écart : cela n'efface pas la phase contradictoire, qui reste ouverte jusqu'à l'arbitrage.",
    ],
    exempleConcret:
      "Un camion part avec 36 000 L. Votre exploitant déclare 36 000 L livrés, le destinataire mesure 35 700 L après dépotage. L'écart de 300 L est signalé. Après vérification, vous retenez 35 700 L : la livraison est finalisée sur cette quantité et 300 L apparaissent alors en manquant.",
    avantApres: {
      titre: 'Livraison de 36 000 L chargés',
      lignes: [
        { ligne: 'Quantité livrée retenue', avant: 'non établie', apres: '35 700 L' },
        { ligne: 'Manquant', avant: 'non calculé', apres: '300 L' },
        { ligne: 'Écart de déclarations', avant: '300 L', apres: 'résolu' },
      ],
    },
    impacts: [
      'Le chiffre d\'affaires est calculé sur la quantité retenue, jamais sur le volume chargé',
      'Le manquant officiel n\'apparaît qu\'après la finalisation',
      'La facturation redevient possible une fois la livraison finalisée',
    ],
    attention: [
      "Un écart signalé n'est pas un manquant. L'écart oppose deux déclarations avant finalisation ; le manquant est le résultat officiel, calculé après, entre le volume chargé et le volume retenu.",
      "L'historique de la livraison est définitif : aucune étape déjà enregistrée ne peut être modifiée ni supprimée. C'est ce qui lui donne sa valeur en cas de litige.",
      "Si le destinataire ne répond jamais, l'option \"Finaliser sans réponse du destinataire\" n'est disponible que si la fiche de ce client l'autorise.",
    ],
    precedent: { href: '/transport/guides/configurer-double-validation', titre: 'Activer la double validation pour un client' },
    suivant: { href: '/transport/guides/suivre-confirmations-notifications', titre: 'Suivre les confirmations depuis la cloche de notifications' },
    articlesConnexes: [
      { href: '/transport/cas-particuliers/destinataire-sans-reponse', titre: 'Le destinataire ne répond pas', section: 'Cas particuliers' },
      { href: '/transport/cas-particuliers/volume-livre-different', titre: 'Volume livré ≠ volume chargé', section: 'Cas particuliers' },
      { href: '/confirmation-livraison', titre: 'Confirmer une livraison Datakö (vue destinataire)', section: 'Destinataire' },
    ],
  },
  {
    id: 'suivre-confirmations-notifications',
    title: 'Suivre les confirmations depuis la cloche de notifications',
    objectif:
      "Être prévenu dès qu'un destinataire confirme une livraison ou signale un écart, sans avoir à surveiller la page Livraisons.",
    prerequis: [
      'Avoir le rôle Administrateur ou Opérateur — la cloche est invisible pour les autres rôles',
      'Au moins un client configuré en double validation',
    ],
    etapes: [
      'Repérez la cloche en haut de l\'écran, à droite. Une pastille indique le nombre de notifications non lues.',
      'Cliquez dessus pour dérouler les notifications les plus récentes.',
      'Repérez la couleur : vert pour une livraison confirmée, rouge pour un écart de quantité signalé.',
      'Cliquez sur une notification pour ouvrir directement la livraison concernée.',
      'Vous pouvez aussi cliquer sur "Marquer comme lue" pour la traiter plus tard sans quitter votre écran.',
      "Pour faire disparaître un écart de la cloche, tranchez-le depuis la livraison : la lecture seule ne suffit pas.",
    ],
    resultat:
      "Vous êtes prévenu des réponses de vos destinataires sans surveiller la page Livraisons. La cloche ne garde que ce qui demande encore votre attention : une livraison confirmée sans écart disparaît de la liste dès que vous l'avez lue, tandis qu'un écart de quantité y reste tant qu'il n'a pas été tranché, même une fois lu. Tant qu'un écart n'a pas été ouvert, la cloche elle-même passe en rouge : c'est le signal qu'une décision est attendue. Ouvrir une livraison depuis la cloche marque automatiquement sa notification comme lue.",
    erreurs: [
      "Attendre une notification pour chaque étape : seuls deux événements sont notifiés, la confirmation du destinataire et l'écart de quantité. L'envoi du lien, la relance ou la finalisation ne le sont pas.",
      "Croire que la cloche remplace la page Livraisons : elle affiche les vingt notifications les plus récentes, pas l'ensemble de votre activité.",
      "S'étonner de ne rien voir sur des livraisons anciennes : seules les confirmations survenues après la mise en service alimentent la cloche.",
      "Chercher à retrouver une confirmation déjà lue dans la cloche : elle n'y est plus. L'historique complet reste dans le détail de la livraison, qui n'est jamais purgé.",
    ],
    attention: [
      "Les deux types de notification ne se comportent pas pareil : une confirmation conforme est une information, elle se retire dès sa lecture ; un écart de quantité est une action attendue, il reste affiché jusqu'à son arbitrage. La pastille rouge de la cloche, elle, ne signale que les écarts pas encore ouverts.",
      "La cloche est un pense-bête, pas un registre : les notifications résolues sont effacées définitivement après quelques jours. Le journal de la livraison, lui, conserve tout et fait foi en cas de litige.",
      'Chaque personne a ses propres notifications : les marquer comme lues n\'affecte pas vos collègues.',
      'Le compteur se met à jour tout seul, et se rafraîchit dès que vous revenez sur l\'onglet.',
      "La cloche ne concerne que les confirmations de destinataires. Les alertes d'activité (écart de volume, camion inactif, marge inhabituelle) passent par WhatsApp, pas par elle.",
    ],
    precedent: { href: '/transport/guides/traiter-ecart-destinataire', titre: 'Traiter un écart signalé par le destinataire' },
    suivant: { href: '/transport/guides/recalculer-couts-variables', titre: 'Recalculer les coûts variables' },
    articlesConnexes: [
      { href: '/transport/cas-particuliers/lien-confirmation-affiche-une-fois', titre: "La fenêtre du lien de confirmation n'apparaît qu'une fois", section: 'Cas particuliers' },
      { href: '/transport/cas-particuliers/destinataire-sans-reponse', titre: 'Le destinataire ne répond pas', section: 'Cas particuliers' },
      { href: '/confirmation-livraison', titre: 'Confirmer une livraison Datakö (vue destinataire)', section: 'Destinataire' },
    ],
  },
  {
    id: 'recalculer-couts-variables',
    title: 'Recalculer les coûts variables',
    objectif:
      "Corriger le carburant et la prime chauffeur déjà enregistrés sur des livraisons passées, après avoir détecté une erreur de paramétrage sur une route — sans réimporter tout l'historique.",
    prerequis: [
      'Avoir le rôle Administrateur',
      "Avoir déjà corrigé la route concernée dans Tarifs de transport (nouvelle consommation carburant ou nouvelle prime)",
    ],
    etapes: [
      "Corrigez d'abord la route concernée dans Tarifs de transport : mettez à jour la consommation carburant ou la prime chauffeur.",
      'Allez dans Paramètres → onglet Transport → Outils de maintenance.',
      'Ouvrez "Recalcul des coûts variables".',
      'Choisissez la période, le véhicule (ou "Tous les véhicules") et la route (ou "Toutes les routes") concernés par l\'erreur.',
      'Cliquez sur "Prévisualiser" — cette étape est obligatoire, aucune donnée n\'est modifiée à ce stade.',
      "Vérifiez l'aperçu : la liste des livraisons concernées, l'ancien montant et le nouveau montant pour le carburant et la prime, ainsi que l'impact sur la marge.",
      'Si tout est correct, cliquez sur "Confirmer le recalcul". C\'est uniquement à ce moment que les données sont mises à jour.',
    ],
    resultat:
      "Les livraisons du périmètre choisi sont mises à jour avec les coûts variables corrects. La marge, la répartition propriétaire, le Cashflow, le Profit par camion et les Gains par rotation reflètent la correction dès le prochain chargement de la page.",
    erreurs: [
      'Si l\'aperçu ne montre aucune livraison, vérifiez que la période, le véhicule ou la route sélectionnés correspondent bien aux rotations concernées.',
      "Si les montants de l'aperçu n'ont pas changé, la route n'a probablement pas encore été corrigée dans Tarifs de transport.",
    ],
    exempleConcret:
      "Sur la route Conakry → Kankan, la prime chauffeur avait été saisie à tort à 500 000 GNF au lieu de 150 000 GNF lors de l'onboarding. 3 rotations ont été enregistrées avec cette erreur. Après correction de la route (150 000 GNF) puis recalcul, les 3 rotations sont mises à jour et la marge du véhicule sur la page Profit par camion reflète immédiatement la correction.",
    avantApres: {
      titre: 'Route Conakry → Kankan — 3 rotations concernées',
      lignes: [
        { ligne: 'Prime chauffeur (par rotation)', avant: '500 000 GNF', apres: '150 000 GNF' },
        { ligne: 'Impact sur la marge (par rotation)', avant: '—', apres: '+350 000 GNF' },
      ],
    },
    impacts: [
      'CA transport : inchangé',
      'Coûts variables : mis à jour',
      'Marge : recalculée',
      'Répartition propriétaire (commissions + résiduel) : mise à jour automatiquement',
      'Cashflow, Profit par camion, Gains par rotation : mis à jour automatiquement dès le prochain chargement de la page, sans action supplémentaire',
      'Portail Propriétaire : le propriétaire du véhicule voit désormais un badge "🔄 Coûts recalculés" sur la livraison concernée, avec le détail avant → après et le motif si renseigné — le recalcul n\'est donc pas une correction silencieuse',
    ],
    attention: [
      "Corrigez toujours la route AVANT de lancer un recalcul — l'outil applique les paramètres de route ACTUELS, pas une valeur saisie dans l'outil lui-même.",
      "Vérifiez toujours l'aperçu avant de confirmer — l'action n'est pas réversible automatiquement (il faudrait relancer un recalcul en sens inverse).",
      'Outil réservé aux Administrateurs — ce n\'est pas un geste opérationnel quotidien.',
      "Ne modifie jamais le CA ni les livraisons futures — seulement les coûts variables des livraisons déjà enregistrées, sur le périmètre choisi.",
    ],
    precedent: { href: '/transport/guides/suivre-confirmations-notifications', titre: 'Suivre les confirmations depuis la cloche de notifications' },
    articlesConnexes: [
      { href: '/transport/cas-particuliers/charges-fixes-periode', titre: 'Charges fixes vs coûts variables', section: 'Cas particuliers' },
      { href: '/roles/org_admin', titre: 'Rôle Administrateur', section: 'Rôles' },
      { href: '/portail-proprietaire/historique-rotations', titre: 'Historique rotations (vue propriétaire)', section: 'Portail Propriétaire' },
    ],
  },
]
