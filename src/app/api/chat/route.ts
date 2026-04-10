import { NextRequest, NextResponse } from "next/server";
import { usefulLinks } from "@/data/useful-links";
import { callAnthropic } from "@/lib/chat/llm";
import { buildChatSystemPrompt } from "@/lib/chat/prompt";
import { cleanChatAnswer, extractLinkNumbers, selectChatLinks } from "@/lib/chat/parser";
import { getChatContextLinks } from "@/lib/chat/search";
import type { ChatRequest, ChatResponse } from "@/types";

class InvalidChatRequestError extends Error {}

async function readChatRequest(request: NextRequest): Promise<ChatRequest> {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    throw new InvalidChatRequestError("Corps JSON invalide");
  }

  if (!payload || typeof payload !== "object") {
    throw new InvalidChatRequestError("Message invalide");
  }

  const { message } = payload as Partial<ChatRequest>;

  if (typeof message !== "string" || message.trim() === "") {
    throw new InvalidChatRequestError("Message invalide");
  }

  return {
    message: message.trim()
  };
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await readChatRequest(request);
    const contextLinks = getChatContextLinks(usefulLinks, message);
    const systemPrompt = buildChatSystemPrompt(contextLinks);
    const llmResponse = await callAnthropic(message, systemPrompt);
    const linkNumbers = extractLinkNumbers(llmResponse);

    return NextResponse.json({
      answer: cleanChatAnswer(llmResponse),
      links: selectChatLinks(contextLinks, linkNumbers)
    } satisfies ChatResponse);
  } catch (error) {
    if (error instanceof InvalidChatRequestError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    console.error("Chat API error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erreur lors du traitement de la requete",
        answer:
          "Desole, je ne peux pas vous aider en ce moment. Essayez plus tard.",
        links: []
      },
      { status: 500 }
    );
  }
}
