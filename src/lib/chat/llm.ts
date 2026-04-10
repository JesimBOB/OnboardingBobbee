const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const ANTHROPIC_MODEL = "claude-3-5-sonnet-20241022";

type AnthropicTextBlock = {
  text?: string;
};

type AnthropicResponse = {
  content?: AnthropicTextBlock[];
};

type AnthropicErrorResponse = {
  error?: {
    message?: string;
  };
};

async function getAnthropicErrorMessage(response: Response): Promise<string> {
  try {
    const error = (await response.json()) as AnthropicErrorResponse;
    return error.error?.message || response.statusText || "Unknown error";
  } catch {
    return response.statusText || "Unknown error";
  }
}

export async function callAnthropic(
  userMessage: string,
  systemPrompt: string
): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY n'est pas configuree");
  }

  const response = await fetch(ANTHROPIC_API_URL, {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json"
    },
    body: JSON.stringify({
      model: ANTHROPIC_MODEL,
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
    const errorMessage = await getAnthropicErrorMessage(response);
    throw new Error(`Claude API error: ${errorMessage}`);
  }

  const data = (await response.json()) as AnthropicResponse;
  const answer = data.content?.[0]?.text?.trim();

  if (!answer) {
    throw new Error("Claude API error: Empty response");
  }

  return answer;
}
