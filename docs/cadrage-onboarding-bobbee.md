# Onboarding BOBBEE - Cadrage produit

Ce document conserve l'intention produit du portail et la replace dans l'etat reel du repo.

## Etat du repo au 2026-04-14

### Livre

- Une home page visuelle et responsive
- Une page `BOBBEE`
- Une page `liens-utiles` avec recherche et filtres
- Des contenus alimentes par JSON local
- Un export statique genere dans `out/`

### Partiellement livre

- Un assistant conversationnel existe en code, mais il n'est pas inclus dans le deploiement statique actuel

### Encore a faire

- Definir la strategie de production pour l'assistant
- Remplacer les URLs et contenus d'exemple par des donnees reelles
- Ajouter une vraie suite de tests et une CI
- Prevoir une administration des contenus si le projet sort du mode demo

## Objectif produit

Construire un mini portail d'onboarding BOBBEE, simple et chaleureux, pour aider les nouveaux arrivants a:

- comprendre rapidement la mission et l'histoire de BOBBEE
- se reperer dans l'organisation
- retrouver les bons outils et documents
- gagner en autonomie des les premiers jours

## V1 cible

- Portail visuel en Next.js
- Page d'accueil avec carte illustree et acces rapides
- Page de presentation BOBBEE
- Page de liens utiles avec recherche et filtres
- Assistant borne aux ressources locales
- Hebergement simple et rapide pour la demo

## Version actuelle de la home

La home actuellement validee repose sur une logique volontairement simple :

- une grande illustration centrale `BOBBEE land`
- un fond blanc avec tres peu d'habillage additionnel
- une video integree dans l'image, lancee au clic et non bouclee
- cinq zones cliquables qui servent d'entrees directes vers les parcours utiles

Cette version assume une priorite forte sur la lisibilite immediate. La home ne cherche pas a tout raconter ; elle sert surtout de point d'entree visuel.

### Ce que cette version privilegie

- comprehension rapide du portail
- repere visuel unique et memorable
- acces directs vers les parcours les plus utiles
- faible charge cognitive au premier affichage

### Ce qui reste volontairement hors scope

- cartes additionnelles ou blocs de texte supplementaires
- moteur de configuration des hotspots
- refonte generique du comportement video
- refactorisation large de la home sans besoin fonctionnel immediat

## Contraintes assumees en V1

- Pas d'authentification
- Pas de base de donnees
- Pas d'admin back-office
- Donnees stockees dans le repo
- Complexite limitee pour privilegier la clarte et la vitesse de livraison

## Ecart important a garder en tete

Le repo est aujourd'hui configure pour un export statique via `next.config.mjs`. Ce choix est tres adapte a une mise en ligne simple sur S3 / CloudFront, mais il ne permet pas de publier tel quel l'assistant base sur `/api/chat`.

Deux trajectoires sont donc possibles:

1. garder le site statique et sortir l'assistant dans un backend dedie
2. deployer une application Next.js avec runtime serveur

## Directions V2 / V3

### V2

- contenus reels et maintenables
- vraie strategie de deploiement
- meilleure observabilite
- tests automatises
- eventuelle interface d'administration

### V3

- personnalisation par role
- recherche et assistant enrichis
- integrations internes
- analytics d'usage

## Intention UX

- ton rassurant
- hierarchy visuelle claire
- acces rapide aux premiers parcours utiles
- design coherent avec l'univers BOBBEE

## Principe directeur

Commencer simple, livrer une base propre, puis enrichir sans perdre la lisibilite du produit.
