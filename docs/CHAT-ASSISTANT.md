# Assistant BOBBEE

Documentation de l'assistant conversationnel du portail BOBBEE.

## Statut actuel

L'assistant est bien implemente dans le repo, mais il n'est pas deploie dans l'export statique actuel.

- En `pnpm dev`, `/chat` et `/api/chat` fonctionnent si `ANTHROPIC_API_KEY` est defini
- En `pnpm build`, le projet sort un dossier `out/` statique
- Avec `output: "export"`, `out/` ne contient ni `/chat` ni `/api/chat`
- La navigation principale n'expose pas encore la page `/chat`

## Fichiers concernes

- `src/app/chat/page.tsx`
- `src/components/ChatAssistant.tsx`
- `src/app/api/chat/route.ts`
- `src/data/liens-utiles.json`
- `src/lib/links.ts`
- `src/lib/chat-examples.ts`

## Flux actuel

1. La page `src/app/chat/page.tsx` affiche le composant `ChatAssistant`.
2. `src/components/ChatAssistant.tsx` envoie un `POST /api/chat`.
3. `src/app/api/chat/route.ts` charge `src/data/liens-utiles.json`.
4. `searchAndFilterLinks()` prefiltre les liens les plus pertinents.
5. La route appelle Anthropic sur `https://api.anthropic.com/v1/messages`.
6. La reponse du modele contient du texte et des references de liens sous la forme `[1] [3]`.
7. L'API nettoie le texte, recompose les liens recommandes, puis renvoie `{ answer, links }`.

## Comportement documente

- La recherche locale normalise les accents et la casse via `normalizeString()`
- Le prefiltrage cherche aujourd'hui dans `quoi` et `source`
- Si aucun lien pertinent n'est trouve, l'API prend les 10 premiers liens comme contexte de secours
- Le prompt demande une reponse courte, chaleureuse et borne a 5 liens recommandes maximum
- Les numeros de liens sont retires de la reponse avant retour au client

## Configuration locale

### Variables d'environnement

```dotenv
ANTHROPIC_API_KEY=your_api_key_here
```

### Mise en route

```powershell
pnpm install
Copy-Item .env.local.example .env.local
pnpm dev
```

Puis ouvrez `http://localhost:3000/chat`.

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

## Limites connues

- L'assistant ne fait pas partie de l'export statique actuel
- Il n'y a pas encore de cache, de rate limit ni de persistance de conversation
- `src/lib/links.test.ts` sert de documentation executable, mais aucun script `test` n'est branche dans `package.json`
- Les liens de `src/data/liens-utiles.json` sont encore des exemples

## Choix de deploiement pour rendre le chat disponible en prod

### Option A: garder le site statique

Conservez `output: "export"` et deplacez `/api/chat` vers un backend separe. Le front peut alors rester heberge sur S3 / CloudFront.

### Option B: deployer une vraie application Next.js

Retirez l'export statique et deployez sur une plateforme capable d'executer les route handlers Next.js.

## Troubleshooting

### `ANTHROPIC_API_KEY` manquante

Ajoutez la variable dans `.env.local`, puis redemarrez `pnpm dev`.

### La page `/chat` ne sort pas dans `out/`

C'est attendu avec `output: "export"`. Il faut changer de strategie de deploiement si le chat doit etre accessible en production.

### La reponse ne contient pas de liens

Le modele peut choisir de ne rien recommander si le contexte ne suffit pas. Verifiez aussi les donnees de `src/data/liens-utiles.json`.
