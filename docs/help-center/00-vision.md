# 00 — Vision produit

## Pourquoi cette application existe

Datakö Fleet Manager est un produit vendu à des PME dont les utilisateurs n'ont pas de formation technique. Chaque nouvelle fonctionnalité, chaque rôle ajouté, chaque indicateur affiché doit être expliqué — souvent oralement, souvent plusieurs fois.

Le Help Center existe pour couper cette dépendance. Un lien qu'on partage en démo, une page qu'un DG envoie à son opérateur, une ressource que le support cite au téléphone. L'objectif : que chaque utilisateur trouve seul la réponse à "qu'est-ce que ça veut dire ?" ou "comment je fais ça ?".

Ce n'est pas un site marketing. Ce n'est pas une documentation technique. C'est un guide d'usage rédigé pour des professionnels de terrain qui utilisent une plateforme BI pour la première fois.

---

## Utilisateurs cibles

### Utilisateurs primaires — ceux qui utilisent Fleet Manager au quotidien

| Profil | Contexte | Ce qu'ils cherchent |
|---|---|---|
| **Directeur Général / DAF** | Suit les KPI chaque matin, prend des décisions sur données | Comprendre les indicateurs, interpréter les tendances, ne pas se tromper de chiffre |
| **Chef d'exploitation / Dispatcher** | Saisit les rotations, valide les livraisons | Guides pas-à-pas, "comment enregistrer un trajet", "comment confirmer un paiement" |
| **Comptable / Finance** | Réconcilie les données, génère les factures et relevés | Comprendre la logique de calcul, exporter les bons documents |
| **Propriétaire de camion** | Accède uniquement à son portail propriétaire | Comprendre sa part de gains, interpréter son bilan PDF |

### Utilisateurs secondaires — gravitent autour du produit

| Profil | Contexte | Ce qu'ils cherchent |
|---|---|---|
| **Équipe support Datakö** | Accompagne les clients en post-déploiement | Référence rapide à partager, base de connaissance pour répondre aux tickets |
| **Commerciaux Datakö** | Présentent le produit à de nouveaux prospects | Pages "ce que vous voyez" pour orienter la démo, section FAQ pour lever les objections |
| **Nouveaux membres d'équipe client** | Rejoignent une organisation déjà en production | Parcours d'onboarding structuré par rôle |
| **Agents IA (Copilot, assistants)** | Ingèrent la documentation pour répondre aux questions produit | Contenu structuré, terminologie cohérente, données lisibles par machine |

---

## Objectifs produit

### Objectif principal
Réduire à zéro le nombre de questions répétitives que le support Datakö reçoit sur les fonctionnalités documentées.

### Objectifs secondaires
1. **Accélérer l'onboarding** — un nouvel utilisateur comprend son rôle et ses actions en autonomie
2. **Renforcer la crédibilité produit** — un Help Center soigné rassure pendant la phase commerciale
3. **Servir de base de connaissance partagée** — support, commerciaux et IA accèdent au même référentiel
4. **Évoluer avec le produit** — structure modulaire pour ajouter facilement Vente, WhatsApp, Portail Propriétaire

---

## Philosophie

### "Terrain d'abord"
Le contenu est rédigé pour des professionnels de terrain : routiers, exploitants, directeurs de PME en Guinée. Pas de jargon informatique. Pas d'abstractions. Chaque explication part d'un cas concret ("votre camion rentre de Siguiri avec 38 000 litres").

### "Montrer, pas décrire"
Chaque concept a un exemple chiffré. Chaque guide a des étapes numérotées. Les indicateurs ont une formule + un exemple + un conseil d'interprétation.

### "Un article = une question résolue"
Pas d'articles encyclopédiques de 10 pages. Chaque page répond à une question précise. L'utilisateur arrive, lit, repart avec sa réponse.

### "La forme suit la fonction"
Le design reprend la charte Datakö (thème dark, bleu primaire) pour que l'utilisateur reconnaisse immédiatement l'écosystème. Pas de friction visuelle entre Fleet Manager et le Help Center.

### "Modulaire et durable"
Le contenu est stocké dans des fichiers TypeScript (`src/data/`) séparés de la présentation. Ajouter un module (Vente, WhatsApp) = ajouter un fichier de données et une page. Pas de refactoring.
