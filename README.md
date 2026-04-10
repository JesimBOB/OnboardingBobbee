# Onboarding BOBBEE

Portail d'onboarding BOBBEE construit avec Next.js 14, TypeScript et Tailwind CSS. Le repo contient aujourd'hui une home page visuelle, une page de presentation BOBBEE, un catalogue de liens utiles filtrable, et une premiere implementation d'assistant conversationnel basee sur des ressources locales.

## Etat actuel

- Verification effectuee le 2026-04-10 avec `pnpm build`
- Pages exportees statiquement: `/`, `/bobbee`, `/liens-utiles`
- Assistant implemente en code: `/chat` et `/api/chat`
- Point important: la configuration actuelle utilise `output: "export"` dans `next.config.mjs`, donc le dossier `out/` n'embarque pas `/chat` ni `/api/chat`

## Fonctionnalites disponibles

- Page d'accueil avec hero video, illustration et cartes d'acces rapide
- Page BOBBEE alimentee par des fichiers JSON
- Page `liens-utiles` avec recherche, filtres multiples et tri reutilisable
- Assistant qui prefiltre les liens locaux puis appelle Anthropic
- Export statique des pages compatibles S3 / CloudFront

## Stack

- Next.js 14 App Router
- React 18
- TypeScript strict
- Tailwind CSS 3
- Donnees locales en JSON
- Route handler Next.js pour l'assistant
- Anthropic Messages API avec le modele `claude-3-5-sonnet-20241022`

## Arborescence utile

```text
app/                    re-export minimal des entrypoints Next
src/app/                pages, layout et route API
src/components/         composants UI
src/data/               contenus JSON
src/lib/                recherche, filtres et exemples
src/types/              types partages
public/images/          assets servis par Next
images/                 sources medias conservees dans le repo
docs/                   documentation projet
```

Alias TypeScript: `@/*` pointe vers `src/*`.

## Demarrage local

### Prerequis

- Node.js 18+
- pnpm de preference

### Installation

```powershell
pnpm install
Copy-Item .env.local.example .env.local
```

Renseignez `ANTHROPIC_API_KEY` dans `.env.local` seulement si vous voulez tester le chat.

### Commandes

```powershell
pnpm dev
pnpm build
```

- `pnpm dev` lance l'application locale avec les routes API
- `pnpm build` genere l'export statique dans `out/`

## Variables d'environnement

```dotenv
ANTHROPIC_API_KEY=your_api_key_here
```

Cette cle est necessaire pour `/chat` en developpement ou dans un deploiement avec runtime serveur. Elle n'est pas utile pour les pages statiques seules.

## Deploiement: deux modes possibles

### 1. Site statique pur

Conservez `output: "export"` dans `next.config.mjs`. Ce mode convient a S3 / CloudFront, mais n'embarque pas `/chat` ni `/api/chat`.

### 2. Site complet avec assistant

Retirez l'export statique ou deplacez l'assistant vers un backend separe. Il faut alors un hebergement capable d'executer les route handlers Next.js.

## Fichiers a modifier pour faire vivre le contenu

- `src/data/home-cards.json`
- `src/data/bobbee.json`
- `src/data/site-content.json`
- `src/data/liens-utiles.json`
- `public/images/`

Les utilitaires de recherche et de filtre sont centralises dans `src/lib/links.ts`.

## Tests et verification

- Le projet n'a pas encore de script `test` dans `package.json`
- `src/lib/links.test.ts` sert de reference et d'exemples, pas de suite automatisee branchee au build
- Verification recente: `pnpm build`

## Documentation

- [Assistant BOBBEE](docs/CHAT-ASSISTANT.md)
- [Cadrage produit](docs/cadrage-onboarding-bobbee.md)
