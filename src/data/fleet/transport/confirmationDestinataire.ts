export interface ConfirmationEtape {
  titre: string
  description: string
}

export interface ConfirmationQuestion {
  question: string
  reponse: string
}

export interface GuideConfirmationDestinataire {
  titre: string
  accroche: string
  pourquoiCeMessage: string
  cequonVousDemande: string
  etapes: ConfirmationEtape[]
  aRetenir: string[]
  questions: ConfirmationQuestion[]
}

export const GUIDE_CONFIRMATION_DESTINATAIRE: GuideConfirmationDestinataire = {
  titre: 'Confirmer une livraison Datakö',
  accroche:
    'Vous avez reçu un message vous demandant de confirmer une livraison de carburant. Voici en quelques lignes de quoi il s’agit et ce que vous avez à faire.',
  pourquoiCeMessage:
    'L’entreprise qui vous a livré utilise Datakö Fleet Manager pour suivre ses livraisons. Elle a choisi de vous demander votre propre confirmation de ce que vous avez reçu, en plus de la déclaration de son équipe. Cela permet, en cas de désaccord plus tard, de disposer d’une trace datée et indiscutable de votre côté comme du sien. Vous n’avez été contacté que parce que vous avez été désigné comme responsable de la réception et que vous avez accepté d’être joint à ce sujet.',
  cequonVousDemande:
    'Une seule chose : indiquer la quantité que vous avez réellement reçue, après dépotage. Ce n’est pas une simple recopie du bon de livraison — c’est votre propre mesure qui est attendue, et c’est précisément ce qui donne sa valeur à votre confirmation.',
  etapes: [
    {
      titre: 'Ouvrez le lien reçu',
      description:
        'Le lien vous parvient par e-mail ou par WhatsApp. Il ouvre une page intitulée « Confirmation de réception », au nom du transporteur qui vous a livré.',
    },
    {
      titre: 'Vérifiez les informations de la livraison',
      description:
        'La page rappelle qui a livré et pour quelle entreprise, le produit, la destination, le camion, le numéro de bon de livraison et la quantité déclarée par l’équipe du transporteur.',
    },
    {
      titre: 'Saisissez la quantité réellement reçue',
      description:
        'Renseignez le champ « Quantité réellement reçue ». Il n’est jamais pré-rempli, volontairement : c’est votre mesure qui est demandée. Si votre chiffre correspond exactement à celui annoncé, un bouton « J’ai reçu exactement… » vous évite de le retaper.',
    },
    {
      titre: 'Ajoutez un commentaire si nécessaire',
      description:
        'Le commentaire est facultatif. Il devient utile si votre quantité diffère de celle annoncée : expliquez brièvement pourquoi, cela évitera des échanges plus tard.',
    },
    {
      titre: 'Confirmez la réception',
      description:
        'Cliquez sur « Confirmer la réception ». Le message « Merci, votre réception est enregistrée. » vous indique que c’est terminé. Votre confirmation est horodatée et conservée comme preuve de réception.',
    },
  ],
  aRetenir: [
    'Vous n’avez aucun compte à créer et rien à installer.',
    'Si votre chiffre diffère de celui annoncé, la page vous le signale avant l’envoi — vous pouvez donc corriger une faute de frappe avant qu’elle ne devienne un désaccord.',
    'Une quantité différente n’est pas un problème en soi : elle ouvre simplement une vérification entre vous et le transporteur.',
    'Votre réponse est définitive une fois envoyée.',
    'Le lien est valable sept jours et ne fonctionne qu’une seule fois.',
  ],
  questions: [
    {
      question: 'Pourquoi ai-je reçu cette demande de confirmation ?',
      reponse:
        'Parce que l’entreprise qui vous a livré a choisi de faire confirmer ses livraisons par leur destinataire, et que vous avez été désigné comme responsable de la réception. Ce n’est ni un message publicitaire, ni une demande de paiement.',
    },
    {
      question: 'Ai-je besoin d’un compte pour confirmer ?',
      reponse:
        'Non. Le lien que vous avez reçu suffit. Vous n’avez rien à créer, rien à installer et aucun mot de passe à retenir.',
    },
    {
      question: 'Quelle quantité dois-je indiquer ?',
      reponse:
        'Celle que vous avez réellement reçue, mesurée après dépotage. Pas celle inscrite sur le bon de livraison, ni celle annoncée par le chauffeur : c’est votre propre constat qui est demandé.',
    },
    {
      question: 'Que se passe-t-il si ma quantité est différente de celle annoncée ?',
      reponse:
        'La page vous signale l’écart avant l’envoi, pour que vous puissiez vérifier votre saisie. Si vous confirmez malgré tout, la livraison n’est pas finalisée automatiquement : le transporteur est alerté et vous recontactera pour comprendre la différence. Vous pouvez expliquer l’écart dans le commentaire.',
    },
    {
      question: 'Puis-je modifier ma réponse après l’avoir envoyée ?',
      reponse:
        'Non. Une fois envoyée, votre confirmation est définitive et le lien ne peut plus être réutilisé. Si vous vous êtes trompé, contactez directement l’entreprise qui vous a livré : elle peut en tenir compte avant de clore la livraison.',
    },
    {
      question: 'Mon lien de confirmation expire-t-il ?',
      reponse:
        'Oui, au bout de sept jours. Passé ce délai, la page vous indique que le lien a expiré et vous invite à contacter votre transporteur, qui peut vous en envoyer un nouveau. Le lien précédent cesse alors de fonctionner.',
    },
    {
      question: 'La page m’indique que la livraison a été annulée ou déjà confirmée. Pourquoi ?',
      reponse:
        'Soit la livraison a été annulée entre-temps par le transporteur, soit la confirmation a déjà été enregistrée avec ce lien. Dans les deux cas, il n’y a plus rien à faire de votre côté : contactez le transporteur si cela vous surprend.',
    },
    {
      question: 'La page me dit qu’il y a eu trop de tentatives.',
      reponse:
        'Le lien limite le nombre d’ouvertures rapprochées, par sécurité. Attendez quelques minutes et réessayez : rien n’est perdu.',
    },
  ],
}
