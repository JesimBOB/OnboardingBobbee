import { searchAndFilterLinks } from "@/lib/links";
import type { UsefulLink } from "@/types";

const DEFAULT_CONTEXT_LINK_LIMIT = 10;

export function getChatContextLinks(
  links: UsefulLink[],
  message: string,
  limit = DEFAULT_CONTEXT_LINK_LIMIT
): UsefulLink[] {
  const relevantLinks = searchAndFilterLinks(links, {
    query: message
  });

  if (relevantLinks.length === 0) {
    return links.slice(0, limit);
  }

  return relevantLinks.slice(0, limit);
}
