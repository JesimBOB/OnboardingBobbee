# Assistant BOBBEE - Documentation

Assistant texte minimal pour le portail d'onboarding BOBBEE. Répond uniquement à partir des ressources locales disponibles.

## Architecture

```
┌─────────────────────────────────────────────────────┐
│ Frontend                                            │
├─────────────────────────────────────────────────────┤
│ ChatAssistant.tsx                                   │
│ - Interface utilisateur                             │
│ - Gestion des messages (user/assistant)             │
│ - Affichage des liens recommandés                   │
│ - POST /api/chat                                    │
└──────────────────┬──────────────────────────────────┘
                   │
                   │ Question utilisateur
                   ▼
┌─────────────────────────────────────────────────────┐
│ API Backend                                         │
├─────────────────────────────────────────────────────┤
│ /api/chat/route.ts                                  │
│ 1. Pre-filtre les liens (searchAndFilterLinks)      │
│ 2. Appelle Claude avec prompt strict                │
│ 3. Extrait les numéros de liens [1][3]             │
│ 4. Retourne JSON structuré {answer, links}          │
└──────────────────┬──────────────────────────────────┘
                   │
                   │ Liens contexte + Prompt
                   ▼
┌─────────────────────────────────────────────────────┐
│ Claude (Anthropic API)                              │
├─────────────────────────────────────────────────────┤
│ Système : Prompt strict contre hallucinations       │
│ - Répond UNIQUEMENT avec les liens fournis          │
│ - Max 5 liens par réponse                           │
│ - Ton chaleureux et concis                          │
│ - Cite les numéros [1][3][5]                        │
└─────────────────────────────────────────────────────┘
```

## Fichiers créés

### Frontend
- **`src/components/ChatAssistant.tsx`**
  - Composant React avec interface de chat
  - Gestion d'état des messages
  - Affichage des liens avec icônes
  - Indicateur de chargement

### Backend
- **`src/app/api/chat/route.ts`**
  - Route POST pour recevoir les questions
  - Pre-filtrage local des liens
  - Appel à Claude API
  - Extraction et structuration des résultats

### Utilitaires
- **`src/lib/links.ts`** (déjà existant)
  - `searchAndFilterLinks()` pour pré-filtrer
  - `normalizeString()` pour recherche robuste
  - Autres fonctions de filtrage réutilisables

### Configuration
- **`.env.local.example`**
  - Template pour variables d'environnement
  - Clé API Anthropic

### Documentation
- **`src/lib/chat-examples.ts`**
  - Exemples d'utilisation
  - Questions de test
  - Flux global

### Routes
- **`src/app/chat/page.tsx`**
  - Page dédiée au chat
  - Accessible via `/chat`

## Configuration

### 1. Obtenir une clé API Anthropic

1. Allez sur https://console.anthropic.com/account/keys
2. Créez une nouvelle clé API
3. Copiez-la

### 2. Configurer .env.local

```bash
# Copier le fichier template
cp .env.local.example .env.local

# Éditer .env.local et ajouter votre clé
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
```

### 3. Redémarrer le serveur

```bash
npm run dev
```

## Utilisation

### Option 1 : Page dédiée
Accédez à `http://localhost:3000/chat`

### Option 2 : Intégration dans un composant
```tsx
import { ChatAssistant } from "@/components/ChatAssistant";

export default function Page() {
  return <ChatAssistant />;
}
```

### Option 3 : Appel API direct
```typescript
const response = await fetch("/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: "Comment configurer mon poste ?" })
});

const { answer, links } = await response.json();
```

## Fonctionnalités

✅ **Pas d'hallucinations**
- Prompt système strict qui force Claude à utiliser uniquement les liens fournis
- Pre-filtrage automatique pour contextualiser la réponse

✅ **Interface amie**
- Messages user/assistant distincts
- Affichage des liens avec icônes
- Indicateur de chargement
- Gestion des erreurs gracieuse

✅ **Réponses structurées**
```json
{
  "answer": "Voici quelques ressources pour démarrer...",
  "links": [
    {
      "id": "link-001",
      "quoi": "Vision produit BOBBEE",
      "source": "Confluence",
      "url": "https://..."
    }
  ]
}
```

✅ **Scalable**
- Utilise les fonctions de `src/lib/links.ts`
- Facilement réutilisable dans d'autres routes API
- JSON local, pas de base de données externe

## Questions de test

```
"Bonjour"
"Comment accéder au monorepo ?"
"Je suis dev, j'ai besoin du guide d'installation"
"Où trouver la vision produit ?"
"Quel canal Slack pour démarrer ?"
```

## Sécurité

- La clé API Anthropic est lue depuis `.env.local` (env var côté serveur)
- Jamais exposée au client
- Validations sur les inputs
- Gestion des erreurs

## Limites et extension

### Actuellement
- Max 5 liens par réponse
- Pre-filtre sur 10 premiers liens pertinents
- Timeout court (5s recommandé)

### Améliorations futures
- Caching des réponses fréquentes
- Analytics sur les questions/réponses
- Fine-tuning du prompt
- Support multilingue
- Intégration avec des outils externes (Slack, etc.)

## Dépendances

- `next` ^14.2.0
- `react` ^18.2.0
- `react-dom` ^18.2.0
- Anthropic API (appel HTTP, pas de SDK npm requis)

## Troubleshooting

### "ANTHROPIC_API_KEY n'est pas configurée"
→ Vérifiez que `.env.local` existe et que la clé est définie

### La réponse ne contient pas de liens
→ Normal si Claude juge que les liens ne sont pas pertinents
→ Vérifiez les données dans `src/data/liens-utiles.json`

### Le chat ne répond pas
→ Vérifiez les logs du serveur (`npm run dev`)
→ Vérifiez votre quota/balance Anthropic sur la console

### Les liens ne s'ouvrent pas
→ Vérifiez les URLs dans `liens-utiles.json`
