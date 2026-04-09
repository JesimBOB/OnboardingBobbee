# OnboardingBobbee

Mini service web d'onboarding BOBBEE pense pour accueillir les nouveaux arrivants et centraliser les ressources essentielles des premiers jours.

## Contexte

Le projet vise a proposer un portail d'onboarding simple, visuel et utile, accessible rapidement par les nouveaux entrants :

- developpeurs
- QA
- PO
- PM
- managers

L'objectif est de permettre a chacun de :

- comprendre BOBBEE, sa mission et son histoire
- se reperer dans l'organisation
- installer son poste
- retrouver rapidement les bons liens et outils

## Vision Produit

### V1

Une premiere version orientee demo, rapide a livrer et credible en presentation :

- une page d'accueil unique
- une video d'introduction centrale
- quatre tuiles principales :
  - BOBBEE
  - Organigramme
  - Installation du poste
  - Liens utiles
- une page "Liens utiles" avec recherche et filtres simples
- un assistant conversationnel limite aux liens utiles
- un hebergement statique sur AWS S3

### V2

- ecran d'administration
- gestion des contenus sans passer par Git
- backend leger pour les donnees
- evolution du chatbot

### V3

- parcours par role
- cartographie des competences
- assistant enrichi texte + vocal
- analytics d'usage

## Stack Cible

- Frontend : Next.js + TypeScript
- UI : Tailwind CSS
- Donnees V1 : fichiers JSON dans le repo
- Hebergement : AWS S3, puis CloudFront

## Perimetre V1

Inclus :

- experience d'accueil simple et chaleureuse
- acces rapide aux ressources utiles
- recherche et filtrage des liens
- chatbot limite a un corpus maitrise

Exclu volontairement :

- authentification
- base de donnees
- administration avancee
- synchronisation automatique avec Confluence
- personnalisation utilisateur
- experience vocale

## Structure Actuelle Du Repo

```text
OnboardingBobbee/
|-- docs/
|   `-- cadrage-onboarding-bobbee.md
|-- app/
|-- public/
|-- data/
`-- README.md
```

## Role Des Dossiers

- `docs/` : documentation projet et cadrage
- `app/` : future application Next.js avec App Router
- `public/` : assets statiques
- `data/` : donnees JSON, notamment les liens utiles

## Etat Actuel

Le repo contient aujourd'hui la structure de base et la documentation de cadrage.

Ce qui est deja pret :

- arborescence initiale du projet
- document de cadrage produit et technique
- espaces prevus pour l'application, les assets et les donnees

Ce qui reste a faire en priorite :

1. initialiser l'application Next.js
2. ajouter Tailwind CSS
3. creer la page d'accueil V1
4. integrer les donnees de liens utiles dans `data/`
5. construire la page "Liens utiles"
6. brancher un premier assistant conversationnel

## Donnees

La V1 s'appuie sur des fichiers JSON stockes dans le repo.

Exemple de structure attendue pour un lien utile :

```json
[
  {
    "id": "lien-001",
    "categorie": "Discovery et analyse",
    "type": "Documentation metier",
    "qui": "Tous",
    "quoi": "API V1 - Analyse Fonctionnelle",
    "url": "https://...",
    "source": "Atlassian"
  }
]
```

Ces donnees serviront a :

- afficher les liens utiles
- filtrer par categorie ou type
- alimenter la recherche
- fournir un contexte borne au chatbot

## Assistant Conversationnel

Le chatbot prevu en V1 doit rester simple :

- il repond uniquement a partir des liens utiles
- il ne lit pas directement Confluence
- il ne repose pas sur un RAG complexe

Le comportement attendu :

1. l'utilisateur pose une question
2. le systeme identifie les liens les plus pertinents
3. le modele reformule une reponse courte et utile

## Hebergement Cible

- AWS S3 pour la premiere mise en ligne
- CloudFront dans un second temps

L'objectif est de privilegier une mise en ligne simple, rapide et stable pour la demo.

## Documentation

- [Cadrage produit](./docs/cadrage-onboarding-bobbee.md)

## Prochaines Etapes

1. initialiser le squelette Next.js + Tailwind
2. construire la home page
3. creer la page BOBBEE
4. creer la page Liens utiles
5. importer les donnees de base
6. preparer le premier deploiement AWS

## Statut

Projet en cadrage et en preparation technique.
