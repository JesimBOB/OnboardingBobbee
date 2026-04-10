# Assistant BOBBEE

Documentation de l'assistant conversationnel du portail BOBBEE.

## Statut actuel

L'assistant est implemente dans le repo et la structure Next expose maintenant bien les entrypoints `/chat` et `/api/chat` pour le developpement ou un runtime serveur.

- En `pnpm dev`, `/chat` et `/api/chat` fonctionnent si `ANTHROPIC_API_KEY` est defini
- En `pnpm build`, le projet produit un dossier `out/` statique
- Avec `output: "export"`, `out/` contient `/chat` en mode desactive et ne contient pas `/api/chat`
- La navigation principale n'expose toujours pas la page `/chat`

## Fichiers concernes

- `app/chat/page.tsx`
- `app/api/chat/route.ts`
- `src/app/chat/page.tsx`
- `src/app/api/chat/route.ts`
- `src/components/ChatAssistant.tsx`
- `src/data/useful-links.raw.json`
- `src/data/useful-links.ts`
- `src/lib/chat/config.ts`
- `src/lib/chat/search.ts`
- `src/lib/chat/prompt.ts`
- `src/lib/chat/llm.ts`
- `src/lib/chat/parser.ts`
- `src/lib/links.ts`

## Flux actuel

1. La page `src/app/chat/page.tsx` affiche le composant `ChatAssistant`.
2. `src/components/ChatAssistant.tsx` envoie un `POST /api/chat`.
3. `src/app/api/chat/route.ts` valide la requete HTTP.
4. `src/lib/chat/search.ts` prefiltre les liens les plus pertinents.
5. `src/lib/chat/prompt.ts` construit le prompt systeme.
6. `src/lib/chat/llm.ts` appelle Anthropic.
7. `src/lib/chat/parser.ts` extrait les liens recommandes et nettoie le texte.
8. L'API renvoie `{ answer, links }`.

## Contrat de reponse

```json
{
  "answer": "Voici quelques ressources pour demarrer...",
  "links": [
    {
      "id": "link-001",
      "quoi": "Vision produit BOBBEE",
      "source": "Confluence",
      "url": "https://example.com/vision-produit"
    }
  ]
}
```

## Configuration locale

### Variables d'environnement

```dotenv
ANTHROPIC_API_KEY=your_api_key_here
NEXT_PUBLIC_CHAT_ENABLED=true
```

### Mise en route

```powershell
pnpm install
Copy-Item .env.local.example .env.local
pnpm dev
```

Puis ouvrez `http://localhost:3000/chat`.

## Decision d'architecture

### Decision actuelle pour la V1 demo

Conserver l'export statique :

- `next.config.mjs` garde `output: "export"`
- le chat reste une capacite prete pour le dev et un futur runtime serveur
- le build publiable actuel reste compatible avec un hebergement statique simple
- la page `/chat` reste non cassante car elle s'affiche en mode desactive par defaut

### Option A : site statique pur

- Conserver `output: "export"`
- Garder `/chat` en mode desactive dans la version statique
- Garder l'experience complete du chat pour le dev ou un runtime serveur

### Option B : site complet avec assistant

- Retirer `output: "export"`
- Deployer sur une plateforme capable d'executer les route handlers Next.js
- Conserver `/chat` comme fonctionnalite publiee

## Limites connues

- Le chat n'appelle pas `/api/chat` dans le build statique actuel
- Il n'y a pas encore de cache, de rate limit ni de persistance de conversation
- La navigation principale ne reference pas encore `/chat`

## Qualite

- `pnpm lint` verifie la base avec ESLint
- `pnpm test` execute les tests Vitest disponibles
- `src/lib/links.test.ts` couvre la recherche, le filtrage et le tri
