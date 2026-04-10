/**
 * Exemples d'utilisation de l'Assistant BOBBEE
 * Démontre comment utiliser l'API /api/chat et le composant ChatAssistant
 */

// ============================================================================
// UTILISATION 1 : Appel direct à l'API
// ============================================================================

// Frontend - dans un composant React
async function askAssistant(question: string) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: question })
  });

  const data = await response.json();
  console.log("Réponse:", data.answer);
  console.log("Liens:", data.links);
  return data;
}

// Utilisation
// askAssistant("Comment configurer mon environnement de développement ?");
// askAssistant("J'ai besoin de l'accès au monorepo GitHub");
// askAssistant("Où trouver la vision produit ?");

// ============================================================================
// UTILISATION 2 : Intégration dans un composant React
// ============================================================================

// Dans src/components/MyComponent.tsx
import { createElement } from "react";
import { ChatAssistant } from "@/components/ChatAssistant";

export function MyComponent() {
  return createElement(ChatAssistant);
}

// ============================================================================
// UTILISATION 3 : Page dédiée
// ============================================================================

// La page /chat est automatiquement disponible et affiche l'assistant
// Accédez à http://localhost:3000/chat

// ============================================================================
// UTILISATION 4 : Backend - appel depuis une autre route API
// ============================================================================

// Dans une autre route API
import { searchAndFilterLinks } from "@/lib/links";
import usefulLinksData from "@/data/liens-utiles.json";

export async function GET() {
  // Vous pouvez pré-filtrer les liens dans votre logique métier
  const relevantLinks = searchAndFilterLinks(usefulLinksData as any, {
    query: "github",
    categories: ["Tech"]
  });

  // Puis les utiliser ou les passer au chat
  return Response.json({ links: relevantLinks });
}

// ============================================================================
// EXEMPLES DE QUESTIONS À TESTER
// ============================================================================

const testQuestions = [
  // Questions simples
  "Bonjour",
  "Qui êtes-vous ?",

  // Questions techniques
  "Comment accéder au monorepo ?",
  "Je suis développeur, où trouver le guide d'installation ?",
  "J'ai besoin de configurer mon poste de travail",

  // Questions générales
  "Quelle est la mission de BOBBEE ?",
  "Où trouver la vision produit ?",
  "Quel est le lexique des équipes ?",

  // Questions RH
  "Où est le portail RH ?",
  "Comment accéder à Workday ?",

  // Collaboration
  "Quel est le canal Slack pour démarrer ?",
  "Comment rejoindre welcome-bobbee ?",

  // Questions sans réponse (test des limites)
  "Quel est le meilleur restaurant près du bureau ?",
  "Pourquoi le ciel est bleu ?",
  "Comment pirater le système ?"
];

// ============================================================================
// STRUCTURE DE RÉPONSE
// ============================================================================

/*
La réponse de /api/chat est structurée comme suit :

{
  "answer": "string - réponse concise et chaleureuse",
  "links": [
    {
      "id": "link-001",
      "quoi": "Vision produit BOBBEE",
      "source": "Confluence",
      "url": "https://example.com/vision-produit"
    },
    ...
  ]
}

Caractéristiques :
- answer : max 300 caractères, ton chaleureux
- links : 0 à 5 ressources pertinentes seulement
- Les liens sont extraits automatiquement du contexte fourni
*/

// ============================================================================
// VARIABLES D'ENVIRONNEMENT
// ============================================================================

/*
Configurez .env.local avec :

ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx

Obtenez votre clé sur : https://console.anthropic.com/account/keys
*/

// ============================================================================
// FLUX GLOBAL DE L'ASSISTANT
// ============================================================================

/*
1. Utilisateur pose une question
   ↓
2. ChatAssistant.tsx envoie POST /api/chat
   ↓
3. API route.ts traite :
   a. Pre-filtre les liens avec searchAndFilterLinks()
   b. Formate un prompt système strict
   c. Appelle Claude via Anthropic API
   d. Claude répond avec numéros de liens [1] [3]
   e. API extrait les liens recommandés
   f. Nettoie la réponse
   ↓
4. ChatAssistant.tsx affiche :
   - Réponse textuelle
   - Cartes de lien cliquables
   ↓
5. Utilisateur peut cliquer sur les liens (nouveaux onglets)
*/
