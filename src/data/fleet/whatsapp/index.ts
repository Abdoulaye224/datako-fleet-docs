export interface WhatsAppFlux {
  id: string
  titre: string
  profil: 'conducteur' | 'chef-exploitation' | 'dg' | 'proprietaire'
  description: string
  quand: string
  messageType: 'notification' | 'validation' | 'alerte' | 'resume'
  exempleMessage: string
  activation: string
  href: string
}

export const WHATSAPP_FLUX: WhatsAppFlux[] = [
  {
    id: 'affectation-rotation-conducteur',
    titre: 'Le conducteur reçoit l’affectation de sa rotation',
    profil: 'conducteur',
    description: 'Un message informe le conducteur qu’une nouvelle rotation ou tournée lui a été assignée avec les informations essentielles pour partir.',
    quand: 'Quand une rotation ou tournée est créée et affectée à un conducteur dans Fleet Manager.',
    messageType: 'notification',
    exempleMessage: 'Datakö Fleet : nouvelle affectation. Départ 07:30, camion RC-2451-A, chargement Matoto, livraison Sonfonia. Produit : eau minérale. Merci de confirmer la prise en charge.',
    activation: 'Dans Paramètres > Notifications > WhatsApp, activez les alertes conducteurs et vérifiez le numéro WhatsApp du conducteur.',
    href: '/whatsapp/affectation-rotation-conducteur',
  },
  {
    id: 'confirmation-depart-conducteur',
    titre: 'Le conducteur confirme son départ',
    profil: 'conducteur',
    description: 'Le conducteur envoie son heure de départ et une photo de chargement ou du véhicule prêt à sortir.',
    quand: 'Quand le conducteur répond au message d’affectation ou ouvre le lien de confirmation reçu sur WhatsApp.',
    messageType: 'validation',
    exempleMessage: 'Départ confirmé à 07:42. Photo du chargement reçue pour la tournée #TV-0629-04. Bonne route.',
    activation: 'Dans Paramètres > WhatsApp > Flux terrain, activez la confirmation de départ et autorisez les réponses conducteurs.',
    href: '/whatsapp/confirmation-depart-conducteur',
  },
  {
    id: 'confirmation-livraison-conducteur',
    titre: 'Le conducteur confirme la livraison',
    profil: 'conducteur',
    description: 'Le conducteur valide la remise au client avec heure d’arrivée, photo ou preuve de réception.',
    quand: 'Quand le conducteur marque la livraison comme effectuée depuis le lien WhatsApp ou répond avec la preuve demandée.',
    messageType: 'validation',
    exempleMessage: 'Livraison confirmée à 11:18 chez Pharmacie Lambandji. Quantité livrée : 120 cartons. Preuve reçue, merci.',
    activation: 'Dans Paramètres > Notifications > WhatsApp, activez “Confirmation de livraison” pour les tournées et exigez une preuve si nécessaire.',
    href: '/whatsapp/confirmation-livraison-conducteur',
  },
  {
    id: 'alerte-anomalie-chef-exploitation',
    titre: 'Le chef d’exploitation reçoit une alerte anomalie',
    profil: 'chef-exploitation',
    description: 'Une alerte est envoyée si une livraison n’est toujours pas confirmée dans le délai attendu ou si une étape terrain est bloquée.',
    quand: 'Quand une tournée dépasse le délai paramétré sans confirmation de livraison ou sans mise à jour conducteur.',
    messageType: 'alerte',
    exempleMessage: 'Alerte Datakö Fleet : la tournée TV-0629-04 n’a pas été confirmée 4 heures après le départ. Conducteur : Ibrahima, zone : Coyah. Merci de vérifier.',
    activation: 'Dans Paramètres > Notifications > Règles d’alerte, définissez le délai maximal sans confirmation puis activez l’envoi WhatsApp au chef d’exploitation.',
    href: '/whatsapp/alerte-anomalie-chef-exploitation',
  },
  {
    id: 'resume-journalier-dg',
    titre: 'Le DG reçoit le résumé journalier',
    profil: 'dg',
    description: 'Le dirigeant reçoit une synthèse courte des opérations du jour : volume, chiffre d’affaires et incidents à surveiller.',
    quand: 'Chaque soir à l’heure définie dans les paramètres de résumé exécutif.',
    messageType: 'resume',
    exempleMessage: 'Résumé du 29/06 : 14 rotations, 9 livraisons vente, CA estimé 428 000 000 GNF, 2 retards, 1 incident stock. Ouvrir le dashboard pour le détail.',
    activation: 'Dans Paramètres > Notifications > Résumés, activez “Résumé DG” et choisissez l’heure d’envoi quotidienne.',
    href: '/whatsapp/resume-journalier-dg',
  },
  {
    id: 'notification-rotation-proprietaire',
    titre: 'Le propriétaire reçoit la notification de rotation de son véhicule',
    profil: 'proprietaire',
    description: 'Le propriétaire d’un véhicule géré est informé qu’une nouvelle rotation a été lancée avec son camion.',
    quand: 'Quand un véhicule géré appartenant à un propriétaire externe est affecté à une nouvelle rotation.',
    messageType: 'notification',
    exempleMessage: 'Information propriétaire : votre véhicule RC-1987-B est engagé sur la rotation Conakry → Kindia du 29/06. Le détail sera visible dans votre portail après validation.',
    activation: 'Dans Paramètres > Acteurs > Propriétaires, activez les notifications WhatsApp et renseignez le numéro du propriétaire.',
    href: '/whatsapp/notification-rotation-proprietaire',
  },
]
