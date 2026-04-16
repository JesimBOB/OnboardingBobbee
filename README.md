# Onboarding BOBBEE

Portail d'onboarding BOBBEE construit avec Next.js 14, TypeScript et Tailwind CSS. La V1 est preparee pour un deploiement statique, avec un build exportable adapte a une publication sur une infrastructure AWS de type S3/CloudFront.

## Lancer le projet en local

### Prerequis

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Demarrage

```bash
npm run dev
```

Application locale disponible sur `http://localhost:3000`.

## Build production

```bash
npm run build
```

Le build de production genere une version statique dans le dossier `out/`. Le projet est configure avec `output: "export"` dans `next.config.mjs`, ce qui convient a un hebergement statique.

## Tests et verification

Verifier les points suivants avant de deployer :

```bash
npm run lint
npm run test
npx tsc --noEmit
npm run build
```

Ces commandes permettent de valider le lint, les tests, le typage TypeScript et la generation du build de production.

## Documentation

- Documentation du projet : [docs/](docs/)
- Assistant conversationnel : [docs/CHAT-ASSISTANT.md](docs/CHAT-ASSISTANT.md)
