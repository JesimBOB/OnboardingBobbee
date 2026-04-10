import type { ChatLink, UsefulLink } from "@/types";

export function extractLinkNumbers(text: string): number[] {
  const matches = text.match(/\[(\d+)\]/g);

  if (!matches) {
    return [];
  }

  return Array.from(
    new Set(
      matches
        .map((match) => parseInt(match.replace(/[\[\]]/g, ""), 10))
        .filter((number) => !Number.isNaN(number))
    )
  );
}

export function selectChatLinks(
  links: UsefulLink[],
  numbers: number[]
): ChatLink[] {
  return numbers
    .map((number) => {
      const link = links[number - 1];

      if (!link) {
        return null;
      }

      return {
        id: link.id,
        quoi: link.quoi,
        source: link.source,
        url: link.url
      };
    })
    .filter((link): link is ChatLink => link !== null);
}

export function cleanChatAnswer(text: string): string {
  return text
    .replace(/\s*\[\d+\]\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
