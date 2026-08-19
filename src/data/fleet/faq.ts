export type FAQCategorie = 'operations' | 'finance' | 'technique' | 'roles' | 'transport' | 'marketeur'

export interface FAQItem {
  id: string
  question: string
  reponse: string
  categorie: FAQCategorie
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'rotation-absente-gains',
    categorie: 'operations',
    question: 'Pourquoi une rotation n\'apparaît pas dans les Gains ?',
    reponse: 'Une rotation doit être marquée "Livré" pour apparaître dans les Gains. Si elle est encore "En cours", elle est comptée dans les Livraisons mais pas encore dans les indicateurs financiers.',
  },
  {
    id: 'corriger-rotation-validee',
    categorie: 'operations',
    question: 'Comment corriger une erreur sur une rotation déjà validée ?',
    reponse: 'Seul un Administrateur peut modifier une livraison validée. Allez dans Livraisons, cliquez sur la rotation, puis utilisez le bouton "Modifier". Toute modification est tracée avec la date et l\'auteur.',
  },
  {
    id: 'ou-deposer-documents-vehicule',
    categorie: 'operations',
    question: 'Où déposer les documents d\'un véhicule (assurance, carte grise, visite technique) ?',
    reponse: 'Pas dans le formulaire de création du véhicule : il ne contient aucun champ de document. Allez dans Flotte, cliquez sur la ligne du camion pour ouvrir sa fiche, puis sur l\'onglet "Documents" — c\'est le dernier de la barre, après Location, et il peut être hors écran : faites défiler les onglets vers la droite. Cliquez ensuite sur "Ajouter". Seuls les fichiers PDF de 10 Mo maximum sont acceptés.',
  },
  {
    id: 'rotation-camion-non-conforme',
    categorie: 'operations',
    question: 'Puis-je créer une rotation avec un camion dont les papiers sont expirés ?',
    reponse: 'Oui. L\'application n\'interdit rien : elle affiche une alerte listant les documents manquants ou expirés, et vous laisse continuer. Mais le fait de passer outre est enregistré et remonte dans les rapports de direction. Les quatre documents qui déclenchent cette alerte sont l\'assurance, la visite technique, la carte grise et le certificat de conformité.',
  },
  {
    id: 'cashflow-vs-marge',
    categorie: 'finance',
    question: 'Pourquoi le Cashflow est différent de la Marge d\'Exploitation ?',
    reponse: 'Le Cashflow déduit la mensualité du crédit-bail (prêt banque). La Marge d\'Exploitation ne la prend pas en compte. La différence = mensualité mensuelle.',
  },
  {
    id: 'camion-rentable-cashflow-negatif',
    categorie: 'finance',
    question: 'Pourquoi un camion rentable peut avoir un Cashflow négatif ?',
    reponse: 'Si la mensualité de crédit-bail est élevée par rapport à la marge générée, le cashflow peut être négatif même avec une marge positive. Vérifiez le nombre de rotations par mois.',
  },
  {
    id: 'part-proprietaire-calcul',
    categorie: 'finance',
    question: 'Comment savoir ce qu\'un propriétaire doit recevoir ?',
    reponse: 'Dans la section Répartition Acteurs, sélectionnez le propriétaire et la période. La part propriétaire est calculée automatiquement. Vous pouvez générer un Bilan PDF à lui envoyer.',
  },
  {
    id: 'badge-couts-recalcules',
    categorie: 'finance',
    question: 'C\'est quoi le badge "Coûts recalculés" que je vois sur une livraison ?',
    reponse: 'Ce badge signifie qu\'un administrateur a corrigé a posteriori le carburant, la prime chauffeur ou les péages de cette livraison, après avoir détecté une erreur de paramétrage sur la route. Cliquez sur le badge dans le détail de la rotation (Portail Propriétaire) pour voir la date, la source et le motif du recalcul.',
  },
  {
    id: 'carburant-deduit-vs-reel',
    categorie: 'finance',
    question: 'Pourquoi le carburant déduit ne correspond pas au plein réel du camion ?',
    reponse: 'Le montant déduit est une estimation calculée à partir du paramètre de consommation défini pour la route parcourue, pas le plein réel du camion. Si ce paramètre est mal configuré pour une route, signalez-le à l\'administrateur : il peut le corriger puis recalculer les livraisons concernées.',
  },
  {
    id: 'verifier-trajet-rotation',
    categorie: 'operations',
    question: 'Comment vérifier le trajet exact d\'une rotation ?',
    reponse: 'Ouvrez le détail de la rotation depuis "Historique rotations" dans le Portail Propriétaire. Le bloc "Trajet" affiche le dépôt de départ, la destination, et le site de livraison précis s\'il diffère de la destination.',
  },
  {
    id: 'part-changee-cloture',
    categorie: 'finance',
    question: 'Ma part a changé après la clôture du mois — pourquoi ?',
    reponse: 'Le montant peut évoluer si une rotation a été corrigée après coup (volume livré, coûts variables recalculés) ou si une règle de répartition a été modifiée. Ouvrez le détail de la rotation concernée dans "Historique rotations" : un badge ou un événement de l\'historique indique la correction et son impact.',
  },
  {
    id: 'contester-montant-proprietaire',
    categorie: 'roles',
    question: 'À qui je m\'adresse si je conteste un montant ?',
    reponse: 'Adressez-vous à l\'administrateur de votre organisation partenaire. Le détail complet de chaque rotation (volumes, coûts, trajet, historique) est visible dans votre Portail Propriétaire pour appuyer l\'échange.',
  },
  {
    id: 'statut-paiement',
    categorie: 'operations',
    question: 'Comment voir si une livraison est payée ?',
    reponse: 'Dans la page Livraisons, chaque ligne affiche un badge de statut de paiement : "Payé" (vert), "En attente" (ambre), "Impayé" (rouge). Cliquez sur le badge pour changer le statut.',
  },
  {
    id: 'volume-manquant',
    categorie: 'operations',
    question: 'Que faire si le volume livré est inférieur au volume chargé ?',
    reponse: 'Lors de la validation de la livraison, saisissez le volume réellement livré. La différence est automatiquement calculée comme "manquant". Le CA sera calculé sur le volume livré uniquement.',
  },
  {
    id: 'operateur-suppression',
    categorie: 'roles',
    question: 'Un Opérateur peut-il supprimer une rotation ?',
    reponse: 'Non. La suppression est réservée aux Administrateurs. Un Opérateur peut créer et valider des rotations, mais ne peut pas les supprimer.',
  },
  {
    id: 'export-excel',
    categorie: 'technique',
    question: 'Comment exporter les données en Excel ?',
    reponse: 'Sur les pages Livraisons, Gains et Historique Rotations, un bouton "Exporter" est disponible en haut à droite. L\'export inclut toutes les colonnes de la période sélectionnée.',
  },
  {
    id: 'changer-periode',
    categorie: 'technique',
    question: 'Comment changer la période affichée sur tous les tableaux ?',
    reponse: 'Le sélecteur de période est en haut à droite de l\'application (lune/soleil à côté). Choisissez un mois, un trimestre ou une période personnalisée. Tous les tableaux se mettent à jour automatiquement.',
  },
  {
    id: 'generer-facture-transport',
    categorie: 'finance',
    question: 'Comment générer une facture pour un client ?',
    reponse: 'Dans Livraisons, cliquez sur "Générer une facture" pour le client concerné. Sélectionnez les rotations livrées à inclure, choisissez si la TVA s\'applique (18%), définissez le délai de règlement, puis cliquez "Générer". Le PDF se télécharge immédiatement et les rotations sont marquées facturées. Seuls les rôles Administrateur et Finance peuvent générer des factures.',
  },
  {
    id: 'branding-entreprise',
    categorie: 'technique',
    question: 'Pourquoi l\'interface affiche le logo de mon entreprise et pas celui de Datakö ?',
    reponse: 'Votre organisation a activé le mode White-Label. Fleet Manager affiche votre identité visuelle (logo, couleurs, nom) à la place de l\'identité Datakö. Cela s\'applique aussi aux PDFs générés (factures, bilans). Cette fonctionnalité est configurée par l\'équipe Datakö selon votre abonnement.',
  },
  {
    id: 'recalcul-couts-variables-ca',
    categorie: 'finance',
    question: 'Le recalcul des coûts variables change-t-il le chiffre d\'affaires ?',
    reponse: 'Non. Le CA transport n\'est jamais modifié par ce recalcul. Seuls les coûts variables (carburant, prime chauffeur) des livraisons déjà enregistrées sont corrigés, ce qui met à jour la marge.',
  },
  {
    id: 'recalcul-couts-variables-qui',
    categorie: 'roles',
    question: 'Qui peut utiliser l\'outil de recalcul des coûts variables ?',
    reponse: 'Seuls les Administrateurs y ont accès, dans Paramètres → Transport → Outils de maintenance. Ce n\'est pas un geste opérationnel quotidien : il est réservé à la correction d\'erreurs de paramétrage détectées après coup.',
  },
  {
    id: 'recalcul-couts-variables-mauvaise-periode',
    categorie: 'finance',
    question: 'Que se passe-t-il si je me trompe de période ou de véhicule lors du recalcul ?',
    reponse: 'Rien n\'est modifié tant que vous n\'avez pas cliqué sur "Confirmer le recalcul". Utilisez l\'étape "Prévisualiser" pour vérifier la liste des livraisons concernées et les montants avant/après. Si le périmètre est incorrect, ajustez la période, le véhicule ou la route puis relancez une prévisualisation.',
  },
  {
    id: 'recalcul-couts-variables-automatique',
    categorie: 'finance',
    question: 'Pourquoi le recalcul n\'est-il pas automatique quand je corrige une route ?',
    reponse: 'Le carburant et la prime chauffeur sont volontairement figés au moment de l\'enregistrement de chaque rotation, comme une facture verrouillée. Corriger une route ne doit jamais réécrire silencieusement l\'historique déjà validé : le recalcul reste une action explicite et tracée, décidée par un Administrateur.',
  },
  {
    id: 'recalcul-couts-variables-tracabilite',
    categorie: 'finance',
    question: 'Comment savoir qu\'un recalcul a été appliqué sur une livraison ?',
    reponse: 'Ouvrez le détail de la livraison, onglet Historique : un événement "🔧 Coûts variables recalculés" indique la date, l\'utilisateur ayant lancé le recalcul et le détail avant → après pour les montants qui ont réellement changé. La section "Coûts de la livraison" du détail affiche aussi les valeurs à jour.',
  },

  // ─── Transport / Livraisons — double validation et dossier de livraison ───
  {
    id: 'livraison-reste-en-cours-apres-declaration',
    categorie: 'transport',
    question: 'Pourquoi une livraison reste-t-elle "en cours" après avoir déclaré la quantité livrée ?',
    reponse: 'Parce que ce client est soumis à la double validation. Votre déclaration enregistre ce que votre équipe a constaté, mais elle ne finalise rien : la livraison attend la confirmation du destinataire. Ce n\'est pas un blocage, c\'est le fonctionnement prévu. Tant qu\'elle n\'est pas finalisée, aucun chiffre d\'affaires n\'est reconnu et la facturation n\'est pas possible.',
  },
  {
    id: 'pourquoi-certaines-livraisons-a-confirmer',
    categorie: 'transport',
    question: 'Pourquoi certaines livraisons doivent-elles être confirmées par le destinataire, et pas d\'autres ?',
    reponse: 'Cela dépend uniquement du client. Le mode de validation se règle client par client, dans le bloc "Validation des livraisons" de sa fiche. Par défaut, tous les clients sont en "Opérateur uniquement" — la colonne Validation de la liste des clients les affiche alors "Standard" : la livraison est finalisée dès que votre opérateur la valide. Seuls les clients passés en "Opérateur et destinataire", signalés par un badge "Double validation", attendent la réponse du destinataire avant d\'être finalisés. Attention à ne pas confondre ce réglage avec le fait de solliciter le destinataire : si vous utilisez la Mission Conducteur, le conducteur présente un QR de réception chez tous vos clients. C\'est bien ce réglage, et lui seul, qui décide si la réponse obtenue conditionne la clôture.',
  },
  {
    id: 'qr-conducteur-client-standard',
    categorie: 'transport',
    question: 'Mon client n\'est pas en double validation : pourquoi le conducteur lui présente-t-il quand même un QR ?',
    reponse: 'Parce que le QR présenté par le conducteur au terme de sa mission existe chez tous vos clients, quel que soit leur mode de validation — c\'est un chemin distinct de la fenêtre de lien que votre opérateur voit au déchargement, elle réservée à la double validation. Ce qui change, c\'est la portée de la réponse recueillie. En "Opérateur et destinataire", elle est opposable et peut finaliser la livraison. En "Opérateur uniquement" — affiché "Standard" dans la liste des clients — elle vaut attestation de réception : elle est tracée et horodatée, elle prouve que quelqu\'un a bien réceptionné, mais elle ne clôture rien et n\'écrit aucun montant. Votre opérateur conserve exactement son parcours de validation habituel.',
  },
  {
    id: 'confirmation-standard-ne-cloture-pas',
    categorie: 'transport',
    question: 'Le destinataire a répondu, mais la livraison n\'est pas clôturée. Est-ce normal ?',
    reponse: 'Oui, si ce client est en "Opérateur uniquement" (affiché "Standard"). Sa réponse est enregistrée comme attestation de réception, avec sa date et son heure, et vous la retrouvez sur la livraison — mais elle ne finalise pas la livraison et ne déclenche ni chiffre d\'affaires ni facturation. La clôture reste l\'acte de votre opérateur, par le parcours normal. Même une quantité différente de la vôtre n\'y fait pas obstacle : elle est signalée, elle ne bloque pas. Si vous voulez que la réponse du destinataire conditionne la clôture, passez ce client en "Opérateur et destinataire" — le mode étant figé au moment du déchargement, le changement ne vaudra que pour les livraisons dont le déchargement n\'a pas encore été déclaré.',
  },
  {
    id: 'savoir-si-destinataire-a-confirme',
    categorie: 'transport',
    question: 'Comment savoir si le destinataire a confirmé la livraison ?',
    reponse: 'La livraison porte une mention de confirmation dans la liste et dans son détail : "En attente de confirmation" tant qu\'il n\'a pas répondu, puis "Confirmée par le destinataire". L\'historique de la livraison indique en plus quand le lien a été envoyé, quand il a été ouvert et quand la réponse est arrivée.',
  },
  {
    id: 'lien-confirmation-disparu',
    categorie: 'transport',
    question: 'J\'ai fermé la fenêtre du lien de confirmation, je ne le retrouve plus. Est-ce perdu ?',
    reponse: 'Non, et ce n\'est pas une anomalie : le lien ne s\'affiche qu\'une seule fois, volontairement, pour qu\'il ne puisse pas circuler à votre insu. Générez simplement un nouveau lien depuis le détail de la livraison — le précédent est annulé, le nouveau reste valable sept jours et ouvre la même page de confirmation.',
  },
  {
    id: 'qr-et-lien-difference',
    categorie: 'transport',
    question: 'Le QR code et le lien WhatsApp, est-ce la même chose ?',
    reponse: 'Oui. Le QR code contient exactement le même lien à usage unique que celui envoyé par WhatsApp ou par e-mail, et mène à la même page de confirmation. C\'est simplement une autre façon d\'y accéder, pratique quand le destinataire est présent au déchargement : il scanne et répond sur place, sans attendre un message. Utiliser le QR n\'annule pas le lien envoyé, et inversement — c\'est le même lien, donc la première réponse enregistrée clôt la demande. Attention à ne pas le confondre avec le QR que présente le conducteur après son dépotage : celui-là existe chez tous vos clients, alors que cette fenêtre-ci ne s\'ouvre que pour les clients en double validation.',
  },
  {
    id: 'notification-cloche-rouge',
    categorie: 'transport',
    question: 'Pourquoi la cloche de notifications est-elle passée en rouge ?',
    reponse: 'Parce qu\'un destinataire a signalé un écart de quantité et que vous n\'avez pas encore ouvert la notification correspondante. La cloche reste rouge tant que cet écart n\'a pas été lu : c\'est le signal qu\'une décision est attendue de votre part, pas une alerte technique. Une confirmation conforme, elle, n\'apparaît qu\'en vert.',
  },
  {
    id: 'pas-de-notification-cloche',
    categorie: 'transport',
    question: 'Je ne vois aucune cloche de notifications. Pourquoi ?',
    reponse: 'La cloche n\'est affichée qu\'aux Administrateurs et aux Opérateurs, car ce sont eux qui traitent les livraisons. Si vous avez l\'un de ces rôles et qu\'elle reste vide, c\'est simplement qu\'aucun destinataire n\'a encore répondu : elle ne se remplit que sur deux événements, la confirmation d\'une livraison et le signalement d\'un écart de quantité.',
  },
  {
    id: 'notification-disparue-cloche',
    categorie: 'transport',
    question: 'Une notification a disparu de la cloche. Est-ce que j\'ai perdu l\'information ?',
    reponse: 'Non. La cloche ne conserve que ce qui attend encore quelque chose de vous : une livraison confirmée sans écart se retire dès que vous l\'avez lue, et un écart de quantité se retire une fois qu\'il a été tranché. Rien n\'est perdu pour autant — le détail de chaque livraison conserve l\'historique complet, définitif, et c\'est lui qui fait foi en cas de litige. La cloche est un pense-bête, pas un registre.',
  },
  {
    id: 'ecart-reste-dans-cloche',
    categorie: 'transport',
    question: 'J\'ai lu la notification d\'écart, pourquoi reste-t-elle affichée ?',
    reponse: 'Parce qu\'un écart de quantité appelle une décision, pas seulement une lecture. Il reste donc dans la cloche tant qu\'un administrateur ne l\'a pas tranché depuis la livraison concernée. Ce que la lecture change, c\'est uniquement la couleur de la cloche : elle cesse d\'être rouge, mais la ligne, elle, demeure jusqu\'à l\'arbitrage.',
  },
  {
    id: 'que-signifie-ecart-signale',
    categorie: 'transport',
    question: 'Que signifie la mention "Écart signalé" ?',
    reponse: 'Elle indique que le destinataire a répondu, mais avec une quantité différente de celle déclarée par votre équipe. La livraison entre alors en discussion : elle reste en cours jusqu\'à ce qu\'un administrateur de votre organisation tranche. Le destinataire ne choisit pas d\'ouvrir un litige — c\'est la comparaison des deux chiffres qui produit automatiquement cette mention.',
  },
  {
    id: 'difference-manquant-ecart-signale',
    categorie: 'transport',
    question: 'Quelle différence entre un "manquant" et un "écart signalé" ?',
    reponse: 'Le manquant est la différence entre le volume chargé et le volume finalement livré. C\'est le résultat officiel, calculé après la finalisation, et c\'est lui qui alimente vos indicateurs et vos exports. L\'écart signalé oppose deux déclarations sur la même livraison, celle de votre équipe et celle du destinataire, avant toute finalisation. C\'est un désaccord temporaire qui disparaît dès qu\'il est tranché.',
  },
  {
    id: 'destinataire-declare-quantite-differente',
    categorie: 'transport',
    question: 'Que se passe-t-il si le destinataire déclare une quantité différente de celle annoncée ?',
    reponse: 'La livraison n\'est pas finalisée automatiquement : elle passe en écart signalé et attend un arbitrage. Un administrateur de votre organisation ouvre le détail, compare les deux quantités affichées côte à côte, vérifie auprès du terrain, puis utilise "Trancher l\'écart et finaliser" en saisissant la quantité retenue et le motif de sa décision.',
  },
  {
    id: 'destinataire-ne-repond-pas',
    categorie: 'transport',
    question: 'Que faire si le destinataire ne répond pas ?',
    reponse: 'Commencez par lui renvoyer un lien depuis le détail de la livraison : le précédent cesse alors de fonctionner. S\'il reste injoignable, un administrateur de votre organisation peut finaliser la livraison sans sa réponse, avec un motif obligatoire — à condition que la fiche de ce client l\'autorise.',
  },
  {
    id: 'finaliser-sans-reponse-destinataire',
    categorie: 'transport',
    question: 'Puis-je finaliser une livraison sans la réponse du destinataire ?',
    reponse: 'Cela dépend du client. Si sa fiche autorise une finalisation exceptionnelle, un administrateur de votre organisation peut le faire, avec un motif obligatoire ; la livraison porte alors la mention "Finalisée sans réponse du destinataire" et n\'est jamais présentée comme confirmée par le client. Si le client est en double validation stricte, l\'option n\'existe pas et la confirmation reste indispensable.',
  },
  {
    id: 'modifier-etape-validation-enregistree',
    categorie: 'transport',
    question: 'Pourquoi ne puis-je pas modifier ni annuler une étape de validation déjà enregistrée ?',
    reponse: 'L\'historique d\'une livraison est définitif par construction : chaque étape y est ajoutée, jamais réécrite ni effacée. C\'est précisément ce qui lui donne sa valeur en cas de litige plusieurs mois plus tard. Pour corriger une quantité, on ne réécrit pas le passé : on ajoute une décision d\'arbitrage, qui reste elle aussi tracée.',
  },
  {
    id: 'dossier-complet-incomplet',
    categorie: 'transport',
    question: 'Que signifient "Dossier complet" et "Dossier incomplet" sur une livraison ?',
    reponse: 'Cet indicateur ne concerne que les pièces du dossier, pas la validation de la livraison. Un dossier est complet quand le numéro de bon de livraison est renseigné et qu\'au moins un document est effectivement joint. Un numéro sans pièce jointe, ou une pièce jointe sans numéro, laisse le dossier incomplet. Un filtre dédié permet de lister les dossiers incomplets, et l\'information figure aussi dans l\'export.',
  },
  {
    id: 'documents-dossier-livraison',
    categorie: 'transport',
    question: 'Quels documents puis-je ajouter au dossier d\'une livraison ?',
    reponse: 'Vous pouvez joindre un bon de livraison, un bon de commande, une facture, un chèque, une preuve de réception ou un autre document de votre choix — dans ce dernier cas, son libellé devient obligatoire. Les pièces doivent être au format PDF, et une livraison accepte jusqu\'à cinq documents.',
  },
  {
    id: 'taille-document-modifiee',
    categorie: 'transport',
    question: 'Pourquoi la taille de mon document a-t-elle changé après l\'ajout ?',
    reponse: 'Les documents volumineux sont optimisés automatiquement à l\'ajout : le contenu reste identique, seul le poids du fichier diminue. Si l\'optimisation n\'apporte pas de gain réel, votre fichier d\'origine est conservé tel quel. Et si un document est trop lourd pour être conservé intégralement, Fleet Manager vous demande votre accord avant de poursuivre plutôt que de trancher à votre place — rien n\'est jamais envoyé ni perdu en silence.',
  },

  // ─── Marketeur ───
  {
    id: 'dossier-sonap-elements-manquants',
    categorie: 'marketeur',
    question: 'Pourquoi mon dossier de commande SONAP affiche-t-il encore des éléments manquants ?',
    reponse: 'Le dossier suit cinq jalons : la commande créée, l\'engagement sécurisé, le volume totalement attribué, la facture SONAP reçue et la possibilité de clore. Un jalon n\'est signalé que lorsqu\'il est attendu au stade où en est la commande : une commande récente ne déclenche donc aucune alerte. Si un élément reste signalé, c\'est qu\'il manque réellement au regard de l\'avancement du dossier — par exemple une date de dépôt de garantie non renseignée.',
  },
  {
    id: 'commande-appro-retrait',
    categorie: 'marketeur',
    question: 'Quelle différence entre une commande SONAP, un approvisionnement et un retrait de stock ?',
    reponse: 'La commande SONAP est le dossier d\'achat : ce que vous avez demandé, ce que la SONAP vous a attribué et ce que vous avez payé. L\'approvisionnement est l\'entrée physique du carburant dans une de vos cuves. Le retrait est une sortie de cuve : le plus souvent une vente, parfois une perte, un transfert ou une correction. Une commande peut alimenter plusieurs cuves, et une cuve reçoit du carburant de plusieurs commandes successives.',
  },
  {
    id: 'stock-theorique-different-physique',
    categorie: 'marketeur',
    question: 'Pourquoi mon stock théorique ne correspond-il pas au stock physique ?',
    reponse: 'Le carburant s\'évapore, se tasse et se mesure avec une marge d\'erreur : un petit écart régulier est normal. La réconciliation existe pour le mesurer plutôt que de le laisser fausser vos marges en silence. Pour corriger, enregistrez un mouvement de sortie ou d\'entrée avec un motif précis — le motif est obligatoire pour tout ce qui n\'est pas une vente. Un écart qui grossit de mois en mois, ou qui apparaît brutalement sur une seule cuve, est en revanche un signal à traiter sur le terrain.',
  },
  {
    id: 'vente-affecte-stock',
    categorie: 'marketeur',
    question: 'Comment une vente affecte-t-elle mon stock ?',
    reponse: 'Si vous rattachez la vente à une cuve au moment de la saisie, le volume vendu en est retiré automatiquement, et la vente et la sortie de stock sont enregistrées ensemble : soit les deux réussissent, soit aucune. Il ne faut donc jamais saisir la sortie une seconde fois à la main, sous peine de décompter le volume deux fois. Une vente peut aussi être enregistrée sans lien avec le stock si vous ne suivez pas vos cuves.',
  },
  {
    id: 'ou-retrouver-facture-vente',
    categorie: 'marketeur',
    question: 'Où retrouver la facture d\'une vente ?',
    reponse: 'Il n\'existe pas de page "Factures" séparée : tout se passe depuis l\'activité distribution. Ouvrez la vente concernée pour retrouver son numéro de facture et retélécharger le PDF. Le numéro est attribué définitivement à la génération et ne change plus.',
  },
  {
    id: 'enregistrer-reglement-vente',
    categorie: 'marketeur',
    question: 'Comment enregistrer le règlement d\'une vente ?',
    reponse: 'Ouvrez la vente facturée depuis l\'activité distribution et utilisez "Encaissement reçu". Saisissez la date du règlement et, si vous le souhaitez, une référence : numéro de virement, de chèque ou de bon de caisse. La vente passe alors au statut "Payée".',
  },
  {
    id: 'vente-non-reglee-alors-que-paye',
    categorie: 'marketeur',
    question: 'Pourquoi une vente apparaît-elle encore comme non réglée alors que le client a payé ?',
    reponse: 'Parce que l\'encaissement n\'est jamais automatique : Fleet Manager n\'est pas connecté à votre banque. Tant que personne n\'a enregistré le règlement via "Encaissement reçu", la vente reste au statut "Émise", même si l\'argent est bien arrivé sur votre compte.',
  },
  {
    id: 'voir-toutes-creances-clients',
    categorie: 'marketeur',
    question: 'Puis-je voir toutes mes créances clients dans une seule vue ?',
    reponse: 'Pas sous forme de tableau de recouvrement client par client : cette vue n\'existe pas. Vous disposez d\'un total global, l\'indicateur "Créances clients" de la vue d\'ensemble, et du détail vente par vente dans l\'activité distribution, où les ventes restées au statut "Émise" sont celles qui n\'ont pas encore été réglées. La fiche client, elle, affiche le chiffre d\'affaires facturé, pas le solde restant dû.',
  },
  {
    id: 'ca-marge-encaissement',
    categorie: 'marketeur',
    question: 'Quelle différence entre chiffre d\'affaires, marge et encaissement ?',
    reponse: 'Le chiffre d\'affaires est ce que vous avez facturé. La marge est ce qui vous reste une fois retirés le coût du carburant, le transport, vos charges et les ristournes accordées. L\'encaissement est l\'argent réellement arrivé sur votre compte. Les trois peuvent diverger fortement : un mois peut afficher un chiffre d\'affaires record, une marge faible et presque aucun encaissement.',
  },
  {
    id: 'lire-position-tva',
    categorie: 'marketeur',
    question: 'Comment lire ma position TVA ?',
    reponse: 'Elle compare la TVA collectée sur vos ventes à celle que vous avez déjà acquittée en douane et à celle que vous avez déjà reversée. Si le solde est positif, il vous reste à reverser ; s\'il est négatif, vous détenez une créance sur l\'État. Cette position est un cumul à date : changer la période affichée ne la remet pas à zéro, car une dette se reporte d\'un mois sur l\'autre.',
  },
  {
    id: 'pourquoi-tva-a-reverser',
    categorie: 'marketeur',
    question: 'Pourquoi Fleet Manager indique-t-il que j\'ai de la TVA à reverser ?',
    reponse: 'Parce qu\'une partie de ce que vous encaissez sur vos ventes ne vous appartient pas : vous la collectez pour l\'État. Tant que vous ne l\'avez pas reversée, elle apparaît comme due. C\'est aussi pourquoi votre trésorerie disponible ne doit jamais être lue sans regarder cette position en parallèle.',
  },
  {
    id: 'creance-perequation',
    categorie: 'marketeur',
    question: 'Que signifie une créance de péréquation, et pourquoi l\'État peut-il me devoir un montant ?',
    reponse: 'La péréquation égalise le coût du transport de carburant sur tout le territoire. Sur une route longue, le tarif officiel dépasse ce que la péréquation nationale couvre : la différence est une créance sur l\'État. Sur une route courte, c\'est l\'inverse et vous avez un solde à reverser. Le signe dépend uniquement de la route, jamais du fait que vous transportiez vous-même ou non.',
  },
  {
    id: 'calcul-perequation-tva',
    categorie: 'marketeur',
    question: 'Comment sont calculés les montants de péréquation et de TVA ?',
    reponse: 'Ils découlent des barèmes officiels applicables au produit, au régime et à la date de la vente. Ces éléments sont figés sur chaque vente au moment de son enregistrement : un changement de barème ultérieur ne modifie jamais une vente déjà saisie. Si un montant vous surprend, vérifiez d\'abord le régime et la date de la vente plutôt que le calcul lui-même.',
  },
  {
    id: 'a-quoi-sert-reconciliation',
    categorie: 'marketeur',
    question: 'À quoi sert la réconciliation du stock ?',
    reponse: 'Elle compare le stock calculé par Fleet Manager à ce que vous constatez physiquement dans vos cuves. Sans elle, les pertes normales et les erreurs de saisie se confondent et finissent par fausser vos marges sans que personne ne s\'en aperçoive. Avec elle, l\'écart devient un chiffre suivi, que vous pouvez expliquer.',
  },
  {
    id: 'caution-douaniere-montant-change',
    categorie: 'marketeur',
    question: 'À quoi sert une caution douanière, et pourquoi le montant disponible change-t-il sans action de ma part ?',
    reponse: 'La caution vous permet d\'enlever du carburant sans payer immédiatement les droits correspondants. Le consommé et le disponible ne se saisissent jamais : ils découlent de vos engagements en cours. Le disponible baisse donc dès qu\'un engagement est enregistré, et remonte dès qu\'il est régularisé. Si un montant vous surprend, cherchez l\'engagement qui l\'explique plutôt que de corriger le chiffre.',
  },
  {
    id: 'enregistrer-charges-exploitation',
    categorie: 'marketeur',
    question: 'Comment enregistrer mes charges d\'exploitation ?',
    reponse: 'Ouvrez la page Charges d\'exploitation et saisissez-les mois par mois, par catégorie : loyer, salaires, électricité, comptabilité, frais commerciaux et autres. Ces charges sont distinctes de celles du module transport. Sans elles, votre marge reste une marge brute et votre résultat mensuel n\'est pas exploitable.',
  },
  {
    id: 'performance-globale-marketeur',
    categorie: 'marketeur',
    question: 'Où voir la performance globale de mon activité de distribution ?',
    reponse: 'La vue d\'ensemble rassemble la marge nette, le chiffre d\'affaires facturé, le volume distribué, la position TVA, les créances clients et vos clients les plus rentables. Le cashflow complète cette lecture avec la trésorerie mois par mois : la marge dit si l\'activité est rentable, le cashflow dit si vous avez de quoi payer.',
  },
]
