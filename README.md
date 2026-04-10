# Portail d'Onboarding BOBBEE

Un portail web moderne et responsif pour accueillir les nouveaux arrivants chez BOBBEE. Découvrez rapidement la mission, trouvez les ressources essentielles et installez votre poste en quelques clics.

---

## 📋 Table des matières

- [Objectif du projet](#objectif-du-projet)
- [Périmètre V1](#périmètre-v1)
- [Stack technique](#stack-technique)
- [Structure du repo](#structure-du-repo)
- [Lancement local](#lancement-local)
- [Variables d'environnement](#variables-denvironnement)
- [Build](#build)
- [Déploiement](#déploiement)
- [Roadmap](#roadmap)

---

## 🎯 Objectif du projet

Le portail d'onboarding BOBBEE est un service web qui permet aux nouveaux arrivants de :

✅ **Comprendre rapidement** la mission et l'histoire de BOBBEE  
✅ **Se repérer** dans l'organisation et les équipes  
✅ **Accéder facilement** aux ressources essentielles (docs, outils, liens)  
✅ **Configurer son poste** via des guides clairs  
✅ **Dialoguer** avec un assistant basé sur les contenus locaux  

**Stack target** : Next.js + TypeScript + Tailwind CSS  
**Hébergement** : AWS S3 + CloudFront  
**Audience** : Nouveaux arrivants (devs, QA, PO, PM, managers)

---

## 🧭 Périmètre V1

### Pages

| Page | Description | État |
|------|-------------|-------|
| `/` | Accueil avec vidéo hero, 4 cartes principales et points rassurance | ✅ |
| `/bobbee` | Qui est BOBBEE ? Histoire, mission, contexte | ✅ |
| `/liens-utiles` | Catalogue de ressources avec recherche et filtres | ✅ |
| `/chat` | Assistant conversationnel basé sur les liens locaux | ✅ |

### Fonctionnalités

- **Interface responsive** : Mobile, tablette, desktop
- **Recherche et filtres** : Par catégorie, type, public, source
- **Assistant texte** : Répond uniquement à partir des ressources existantes
- **Données locales** : JSON structurés, pas de base de données
- **Design cohérent** : Palette BOBBEE (miel/ruche), typographie premium

### Points non couverts en V1

- 🔲 Administration (gestion des contenus)
- 🔲 Authentification utilisateur
- 🔲 Analytics avancées
- 🔲 Multilingue
- 🔲 PWA / Mode hors ligne

---

## 🛠 Stack technique

### Frontend

| Package | Version | Usage |
|---------|---------|-------|
| **Next.js** | ^14.2.0 | Framework React + SSR |
| **React** | ^18.2.0 | UI library |
| **TypeScript** | ^5.4.5 | Type safety |
| **Tailwind CSS** | ^3.4.3 | Styling utility-first |
| **Fonts** | Google Fonts | Fraunces (display) + Manrope (body) |

### Backend

- **Next.js API Routes** (`/api/chat`) pour l'assistant
- **Anthropic API** (Claude 3.5 Sonnet) pour le LLM
- Pas de base de données (données JSON locales)

### DevOps

- **Node.js** : 18+ requis
- **npm/pnpm** : Gestionnaire de paquets
- **AWS S3** : Hébergement statique
- **AWS CloudFront** : CDN et caching

### Outils

```json
{
  "autoprefixer": "^10.4.19",  // CSS prefixes
  "postcss": "^8.4.38",        // CSS processing
  "next-env.d.ts": "TypeScript types pour Next.js"
}
```

---

## 📁 Structure du repo

```
OnboardingBobbee/
├── .env.local.example          # Template des variables d'environnement
├── .gitignore                   # Fichiers ignorés par Git
├── next.config.mjs              # Config Next.js
├── tailwind.config.ts           # Config Tailwind
├── tsconfig.json                # Config TypeScript
├── package.json                 # Dépendances
│
├── public/                      # Assets statiques
│   └── (images, icônes)
│
├── src/
│   ├── app/                     # Pages et routes
│   │   ├── layout.tsx           # Layout racine
│   │   ├── page.tsx             # Accueil (/)
│   │   ├── globals.css          # Styles globaux
│   │   ├── bobbee/
│   │   │   └── page.tsx         # Page BOBBEE (/bobbee)
│   │   ├── liens-utiles/
│   │   │   └── page.tsx         # Pages liens (/liens-utiles)
│   │   ├── chat/
│   │   │   └── page.tsx         # Page chat (/chat)
│   │   └── api/
│   │       └── chat/
│   │           └── route.ts     # API endpoint (/api/chat)
│   │
│   ├── components/              # Composants React réutilisables
│   │   ├── ChatAssistant.tsx    # Interface du chat
│   │   ├── HomeCard.tsx         # Cartes d'accueil
│   │   ├── HeroVideo.tsx        # Section vidéo hero
│   │   ├── LinkCard.tsx         # Carte de ressource
│   │   ├── SearchBar.tsx        # Barre de recherche
│   │   ├── FilterSelect.tsx     # Sélecteurs de filtre
│   │   ├── Footer.tsx           # Pied de page
│   │   ├── OnboardingIllustration.tsx    # Illustration accueil
│   │
│   ├── data/                    # Données JSON
│   │   ├── home-cards.json      # Cartes accueil
│   │   ├── liens-utiles.json    # Ressources
│   │   ├── site-content.json    # Contenu BOBBEE
│   │
│   ├── lib/                     # Utilitaires réutilisables
│   │   ├── links.ts             # Fonctions filtrage/recherche
│   │   ├── links.test.ts        # Tests et exemples
│   │   └── chat-examples.ts     # Doc assistant
│   │
│   └── types/                   # Types TypeScript
│       └── index.ts             # Types partagés
│
├── docs/                        # Documentation
│   ├── cadrage-onboarding-bobbee.md     # Spec produit
│   └── CHAT-ASSISTANT.md                # Doc assistant
│
└── out/                         # Build output (généré)
```

---

## 🚀 Lancement local

### Prérequis

- **Node.js** 18+ (vérifiez avec `node --version`)
- **npm** ou **pnpm** (cf. `pnpm-lock.yaml`)

### Installation

```bash
# Cloner le repo
git clone <repo-url>
cd OnboardingBobbee

# Installer les dépendances
pnpm install
# ou : npm install
```

### Développement

```bash
# Lancer le serveur de dev (http://localhost:3000)
pnpm dev
# ou : npm run dev
```

Le serveur se relance automatiquement à chaque modification de fichier.

### Accès aux pages

- **Accueil** : http://localhost:3000
- **À propos BOBBEE** : http://localhost:3000/bobbee
- **Liens utiles** : http://localhost:3000/liens-utiles
- **Assistant chat** : http://localhost:3000/chat

---

## 🔐 Variables d'environnement

### Configuration requise

Créez un fichier `.env.local` à la racine du projet :

```bash
# Anthropic API Key (pour l'assistant)
# Obtenez votre clé sur : https://console.anthropic.com/account/keys
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
```

#### Fichier `.env.local.example`

Le projet inclut un template :

```bash
cp .env.local.example .env.local
# Éditez .env.local avec vos vraies clés
```

### Variables optionnelles

```bash
# Optionnel : remplacer les URLs d'exemple
# BASE_URL=http://localhost:3000
# API_TIMEOUT=5000
```

⚠️ **Ne commitez jamais `.env.local`** (ajouté à `.gitignore`)

---

## 🏗 Build

### Build de production

```bash
# Générer la version optimisée
pnpm build
# ou : npm run build
```

L'output se trouve dans `./out` (export statique) ou `.next` (SSR).

### Vérifier la build

```bash
# Lancer la build localement
pnpm build

# Servir les fichiers produits
pnpm start
```

Accédez à http://localhost:3000 pour vérifier que tout fonctionne correctement.

### Checklist de build

- ✅ Pas d'erreurs TypeScript
- ✅ Pas de warnings de build
- ✅ Tous les chemins d'import résolvent
- ✅ Variables d'environnement configurées
- ✅ Tests de fumée sur les pages principales

---

## 📦 Déploiement

### Amazon AWS S3 + CloudFront

#### 1. Préparation

```bash
# Build en static export (requiert output: "export" dans next.config.mjs)
pnpm build
```

#### 2. Upload vers S3

```bash
# Installation de la CLI AWS (si nécessaire)
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Configurer les credentials
aws configure
# Entrez votre AWS Access Key ID et Secret Access Key

# Upload des fichiers
aws s3 sync ./out s3://bobbee-onboarding/ --delete --cache-control "max-age=31536000,immutable"

# Invalider le cache CloudFront (optionnel)
aws cloudfront create-invalidation --distribution-id E1234ABCD --paths "/*"
```

#### 3. Configuration GitHub Actions (automatisé)

```yaml
# .github/workflows/deploy.yml
name: Deploy to S3
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install && npm run build
      - uses: configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: eu-west-1
      - run: aws s3 sync ./out s3://bobbee-onboarding/ --delete
```

#### 4. Domaine personnalisé

```bash
# Via Route 53 : créer un enregistrement CNAME
bobbee-onboarding.company.com CNAME xxxx.cloudfront.net
```

### Environnements recommandés

| Env | URL | S3 Bucket | AutoDeploy |
|-----|-----|-----------|-----------|
| **Staging** | staging.bobbee.internal | `bobbee-staging` | Oui (branche develop) |
| **Production** | onboarding.bobbee.com | `bobbee-prod` | Oui (branche main) |

### Rollback

```bash
# Restaurer la version précédente depuis S3 versioning
aws s3api list-object-versions --bucket bobbee-prod | grep VersionId
aws s3api copy-object --bucket bobbee-prod --copy-source bobbee-prod/index.html?versionId=xxx --key index.html
```

---

## 🗺 Roadmap

### V1 (Actuellement) ✅

- [x] Accueil avec vidéo et 4 cartes
- [x] Page BOBBEE (histoire, mission, contexte)
- [x] Catalogue de ressources avec recherche/filtres
- [x] Assistant conversationnel basé sur les liens
- [x] Design premium et responsive
- [x] Déploiement AWS S3

### V2 (Prochaines semaines)

- **Admin panel** : Interface de gestion des contenus
  - CRUD des liens utiles
  - Gestion des catégories
  - Upload de vidéos
  - Modification des textes sans Git
  
- **Amélioration UX**
  - Historique de recherche
  - Favoris/bookmarks
  - Partage de liens
  
- **Analytics**
  - Tracking des page views
  - Recherches les plus populaires
  - Taux de clic sur les ressources

- **SEO**
  - Sitemap
  - Meta descriptions
  - Open Graph

### V3 (Long terme)

- **Multilingue** (FR/EN/ES)
- **PWA** : Mode hors ligne avec Service Workers
- **Authentification SSO** : Intégration Okta/Azure AD
- **Personalisation** : Contenu adapté au rôle (dev vs PM, etc.)
- **Intégrations** : Slack, Zapier
- **Mobile app** : React Native / Flutter
- **Webhooks** : Sync avec Notion, Confluence
- **A/B Testing** : Variantes de pages

---

## 📖 Documentation supplémentaire

- **[CHAT-ASSISTANT.md](docs/CHAT-ASSISTANT.md)** - Configuration et utilisation de l'assistant
- **[cadrage-onboarding-bobbee.md](docs/cadrage-onboarding-bobbee.md)** - Spec produit détaillée

---

## 🤝 Contribution

### Ajouter une ressource

1. Éditez `src/data/liens-utiles.json`
2. Ajoutez une entrée avec : `id`, `categorie`, `type`, `qui`, `quoi`, `url`, `source`
3. Testez sur http://localhost:3000/liens-utiles
4. Committez et poussez

Exemple :

```json
{
  "id": "link-007",
  "categorie": "Tech",
  "type": "Documentation",
  "qui": "Tous",
  "quoi": "Guide API REST",
  "url": "https://api.bobbee.com/docs",
  "source": "Postman"
}
```

### Ajouter une page

1. Créez `src/app/my-page/page.tsx`
2. Importez les composants dans `src/components/`
3. Utilisez `src/lib/links.ts` pour les filtres
4. Testez sur http://localhost:3000/my-page
5. Mettez à jour la nav dans `src/app/layout.tsx`

---

## ❓ FAQ

**Q: Comment changer les couleurs ?**  
A: Éditez `tailwind.config.ts` et `src/app/globals.css`

**Q: Puis-je ajouter une vraie vidéo ?**  
A: Oui, modifiez `videoSrc` dans `src/data/site-content.json` ou passez-le au composant `<HeroVideo />`

**Q: Comment intégrer une base de données ?**  
A: Créez une endpoint API (`/api/links`) et remplacez les imports JSON par des `fetch()`

**Q: Le chatbot ne répond pas correctement ?**  
A: Vérifiez :
- La clé API Anthropic dans `.env.local`
- Les données dans `src/data/liens-utiles.json`
- Les logs du serveur (`npm run dev`)

**Q: Comment tester l'assistant localement ?**  
A: Voir [docs/CHAT-ASSISTANT.md](docs/CHAT-ASSISTANT.md)

---

## 📞 Support

Pour toute question ou problème :

- **Issues GitHub** : Créez une issue détaillée
- **Documentation** : Consultez `docs/`
- **Slack** : #onboarding-tech
- **Responsable** : [À remplir]

---

## 📄 License

Propriétaire - BOBBEE SAS

---

**Dernière maj** : Avril 2026  
**Version** : 0.1.0 (V1)

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
