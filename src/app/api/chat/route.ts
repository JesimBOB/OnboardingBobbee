import { NextRequest, NextResponse } from "next/server";
import usefulLinksData from "@/data/liens-utiles.json";
import { searchAndFilterLinks, normalizeString } from "@/lib/links";
import type { UsefulLink } from "@/types";

const usefulLinks = usefulLinksData as UsefulLink[];

/**
 * Types pour la réponse de l'API
 */
type ChatResponse = {
  answer: string;
  links: Array<{
    id: string;
    quoi: string;
    source: string;
    url: string;
  }>;
};

/**
 * Appelle l'API Claude avec un prompt strict
 */
async function callClaude(
  userMessage: string,
  contextLinks: UsefulLink[]
): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY n'est pas configurée");
  }

  // Formate les liens de contexte pour le LLM
  const linksContext = contextLinks
    .map(
      (link, index) =>
        `[${index + 1}] "${link.quoi}" (${link.type}, ${link.source}) - ${link.categorie}`
    )
    .join("\n");

  const systemPrompt = `Tu es BOBBEE, l'assistant d'onboarding bienveillant et concis.

Ta mission : Aider les nouveaux arrivants en répondant à leurs questions UNIQUEMENT à partir des ressources disponibles.

📋 RESSOURCES DISPONIBLES :
${linksContext}

RÈGLES STRICTES :
1. Réponds UNIQUEMENT en utilisant les ressources listées ci-dessus
2. Ne propose les liens que s'ils sont pertinents pour la question
3. Max 5 liens recommandés par réponse
4. Sois bref et accueillant (2-3 phrases max)
5. Si tu ne peux pas répondre avec les ressources disponibles, dis-le honnêtement
6. Utilise un ton chaleureux et rassurant
7. En fin de réponse, cite le numéro des liens recommandés entre crochets : [1] [3] etc.

Format de réponse : 
- Réponse courte et directe
- À la fin, liste les numéros des liens recommandés entre crochets : [1] [4]
- Le système extraira automatiquement les liens basés sur ces numéros`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json"
    },
    body: JSON.stringify({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 500,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: userMessage
        }
      ]
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Claude API error: ${error.error?.message || "Unknown error"}`);
  }

  const data = await response.json();
  return data.content[0].text;
}

/**
 * Extrait les numéros des liens mentionnés dans la réponse
 * Format : [1] [3] [5]
 */
function extractLinkNumbers(text: string): number[] {
  const matches = text.match(/\[(\d+)\]/g);
  if (!matches) return [];

  return matches
    .map((match) => parseInt(match.replace(/[\[\]]/g, ""), 10))
    .filter((num) => !isNaN(num));
}

/**
 * Récupère les liens basés sur leurs numéros dans la liste
 */
function getLinksFromNumbers(
  links: UsefulLink[],
  numbers: number[]
): ChatResponse["links"] {
  return numbers
    .map((num) => {
      const link = links[num - 1]; // Les numéros sont 1-basés
      if (!link) return null;

      return {
        id: link.id,
        quoi: link.quoi,
        source: link.source,
        url: link.url
      };
    })
    .filter((link): link is NonNullable<typeof link> => link !== null);
}

/**
 * Route POST pour le chat
 */
export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message invalide" },
        { status: 400 }
      );
    }

    // Pré-filtre les liens pertinents basés sur mots-clés
    const relevantLinks = searchAndFilterLinks(usefulLinks, {
      query: message
    });

    // Si aucun lien pertinent trouvé, utilise les 5 premiers
    const contextLinks =
      relevantLinks.length > 0 ? relevantLinks.slice(0, 10) : usefulLinks.slice(0, 10);

    // Appelle Claude
    const claudeResponse = await callClaude(message, contextLinks);

    // Extrait les numéros de liens mentionnés
    const linkNumbers = extractLinkNumbers(claudeResponse);

    // Récupère les liens correspondants
    const recommendedLinks = getLinksFromNumbers(contextLinks, linkNumbers);

    // Nettoie la réponse en supprimant les numéros de lien
    const cleanAnswer = claudeResponse
      .replace(/\s*\[\d+\]\s*/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    return NextResponse.json({
      answer: cleanAnswer,
      links: recommendedLinks
    } as ChatResponse);
  } catch (error) {
    console.error("Chat API error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erreur lors du traitement de la requête",
        answer:
          "Désolé, je ne peux pas vous aider en ce moment. Essayez plus tard !",
        links: []
      },
      { status: 500 }
    );
  }
}
