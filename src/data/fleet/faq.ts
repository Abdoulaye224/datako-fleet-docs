export type FAQCategorie = 'operations' | 'finance' | 'technique' | 'roles'

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
    reponse: 'Dans Livraisons, cliquez sur "Générer une facture" pour le client concerné. Sélectionnez les rotations livrées à inclure, choisissez si la TVA s\'applique (18%), définissez le délai de règlement, puis cliquez "Générer". Le PDF se télécharge immédiatement et les rotations sont marquées facturées. Seuls les rôles Administrateur, Directeur et Finance peuvent générer des factures.',
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
]
