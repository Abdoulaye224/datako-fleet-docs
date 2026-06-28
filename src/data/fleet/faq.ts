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
]
