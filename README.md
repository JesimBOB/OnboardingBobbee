# Onboarding BOBBEE

Portail d'onboarding BOBBEE construit avec Next.js 14, TypeScript et Tailwind CSS. Le projet contient une home page desktop-first avec video centrale et destinations illustrees, une page de presentation BOBBEE, un catalogue de liens utiles filtrable, et une implementation d'assistant conversationnel basee sur des ressources locales.

## Etat actuel

- Verification effectuee le 2026-04-12 avec `pnpm build`
- Pages exportees statiquement: `/`, `/bobbee`, `/liens-utiles`, `/chat` (desactive par defaut en production)
- Assistant implemente en code: `/chat` et `/api/chat`
- Decision V1 demo: conserver `output: "export"` pour le build publiable actuel
- Consequence: le dossier `out/` embarque `/chat` en mode desactive et n'embarque pas `/api/chat`
- Hero home actuel: fond blanc, video centrale, 4 destinations image-only, mise en page prioritairement pensee pour ecrans d'ordinateur
- Liens du hero home: Onboarding (Confluence), Installation du poste (Confluence), Histoire de BOBBEE (section interne), Organigramme (Klaxoon)

## Fonctionnalites disponibles

- Page d'accueil avec hero video central et 4 destinations illustrees cliquables
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
app/                    entrypoints Next minimaux et re-exports racine
src/app/                pages, layout et route API
src/components/         composants UI
src/data/               donnees de la home et adaptation des liens utiles
src/lib/                recherche, filtres et logique applicative
src/lib/chat/           logique chat isolee (search, prompt, llm, parser)
src/types/              types partages
public/images/          assets servis par Next
images/                 sources medias conservees dans le repo
docs/                   documentation projet
```

Alias TypeScript: `@/*` pointe vers `src/*`.

## Source de verite de la home

La home utilise maintenant les fichiers suivants :

- `src/components/HomeMediaShowcase.tsx` : composition du hero et logique video
- `src/components/HomeHeroDestinationCard.tsx` : rendu d'une destination image-only
- `src/components/HomeMediaShowcase.module.css` : layout desktop-first et responsive du hero
- `src/data/home-hero-destinations.ts` : destinations et liens de la home
- `src/types/home-hero.ts` : types associes au hero
- `src/data/site-content.json` : source de `videoSrc`

Le fichier `src/data/home-cards.json` n'est plus la source de verite de la home actuelle.

Les cartes du hero affichent des images avec legende cartoon et peuvent pointer soit vers des routes internes, soit vers des ressources externes.

## Source de verite des liens utiles

La source unique des liens utiles est maintenant structuree comme suit :

- `src/data/useful-links.raw.json` : donnees brutes importees
- `src/data/useful-links.ts` : adaptation vers le type `UsefulLink`
- `src/lib/links.ts` : recherche, filtres et tri reutilisables

Le projet n'utilise plus `src/data/liens-utiles.json`.

## Demarrage local

### Prerequis

- Node.js 18+
- pnpm de preference

### Installation

```powershell
pnpm install
Copy-Item .env.local.example .env.local
```

Renseignez `ANTHROPIC_API_KEY` et laissez `NEXT_PUBLIC_CHAT_ENABLED=true` dans `.env.local` si vous voulez tester le chat.

### Commandes

```powershell
pnpm dev
pnpm build
pnpm lint
pnpm test
```

- `pnpm dev` lance l'application locale avec les routes API
- `pnpm build` genere l'export statique dans `out/`
- `pnpm lint` verifie la base avec ESLint
- `pnpm test` execute les tests unitaires disponibles

## Variables d'environnement

```dotenv
ANTHROPIC_API_KEY=your_api_key_here
NEXT_PUBLIC_CHAT_ENABLED=true
```

`ANTHROPIC_API_KEY` est necessaire pour `/chat` en developpement ou dans un deploiement avec runtime serveur.

`NEXT_PUBLIC_CHAT_ENABLED` controle l'activation de l'UI chat :

- en developpement, le chat reste actif par defaut
- en build production, laissez la variable absente ou a `false` pour une version statique sans chat actif
- en runtime serveur, positionnez-la a `true` pour publier le chat

## Decision d'architecture

### Option retenue pour la V1 demo

Conserver `output: "export"` dans `next.config.mjs`.

Pourquoi :

- la demo publiable reste simple a heberger sur un stockage statique
- aucun changement UX majeur n'est introduit
- le chat reste isole et pret pour une bascule future vers un runtime serveur
- la page `/chat` peut rester publiee sans etre cassante car elle est desactivee proprement en statique

### Quand basculer en Option B

Retirez `output: "export"` quand le chat doit devenir une fonctionnalite publiee. Il faudra alors un hebergement capable d'executer les route handlers Next.js.

## Fichiers a modifier pour faire vivre le contenu

- `src/data/home-hero-destinations.ts`
- `src/data/bobbee.json`
- `src/data/site-content.json`
- `src/data/useful-links.raw.json`
- `public/images/`

Les utilitaires de recherche et de filtre sont centralises dans `src/lib/links.ts`.
Le layout du hero home se regle principalement dans `src/components/HomeMediaShowcase.module.css`.

## Tests et verification

- Le projet propose maintenant un socle de tests via Vitest
- `src/lib/links.test.ts` couvre la recherche, le filtrage et le tri
- Verification recente: `pnpm build` et `pnpm exec tsc --noEmit`

## Documentation

- [Assistant BOBBEE](docs/CHAT-ASSISTANT.md)
- [Cadrage produit](docs/cadrage-onboarding-bobbee.md)
