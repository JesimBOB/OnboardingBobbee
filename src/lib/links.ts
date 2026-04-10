import type { UsefulLink } from "@/types";

/**
 * Normalise une chaîne de caractères pour la recherche et les comparaisons
 * - Convertit en minuscules
 * - Supprime les accents
 * - Supprime les espaces en début/fin
 */
export function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Supprime les accents
    .trim();
}

/**
 * Effectue une recherche plein texte sur un tableau de liens utiles
 * Cherche dans: quoi (titre), source
 * Retourne les liens qui correspondent à la requête
 */
export function searchLinks(
  links: UsefulLink[],
  query: string
): UsefulLink[] {
  if (!query || query.trim() === "") {
    return links;
  }

  const normalizedQuery = normalizeString(query);

  return links.filter((link) => {
    const searchableFields = [link.quoi, link.source];
    return searchableFields.some((field) =>
      normalizeString(field).includes(normalizedQuery)
    );
  });
}

/**
 * Type pour les filtres applicables
 */
export type LinkFilters = {
  categories?: string[];
  types?: string[];
  audiences?: string[];
  sources?: string[];
};

/**
 * Filtre un tableau de liens selon les critères fournis (logique AND)
 * Tous les filtres fournis doivent correspondre
 */
export function filterLinks(
  links: UsefulLink[],
  filters: LinkFilters
): UsefulLink[] {
  const {
    categories = [],
    types = [],
    audiences = [],
    sources = []
  } = filters;

  return links.filter((link) => {
    const matchesCategory = categories.length === 0 || categories.includes(link.categorie);
    const matchesType = types.length === 0 || types.includes(link.type);
    const matchesAudience = audiences.length === 0 || audiences.includes(link.qui);
    const matchesSource = sources.length === 0 || sources.includes(link.source);

    return matchesCategory && matchesType && matchesAudience && matchesSource;
  });
}

/**
 * Trie un tableau de liens
 * Critères de tri:
 * 1. publicOrder (croissant) si défini
 * 2. Titre (ordre alphabétique) normalisé
 */
export function sortLinks(links: UsefulLink[]): UsefulLink[] {
  return [...links].sort((a, b) => {
    // Trier par publicOrder d'abord
    const aOrder = a.publicOrder ?? Number.MAX_SAFE_INTEGER;
    const bOrder = b.publicOrder ?? Number.MAX_SAFE_INTEGER;

    if (aOrder !== bOrder) {
      return aOrder - bOrder;
    }

    // Si publicOrder est identique, trier alphabétiquement par titre
    const aTitle = normalizeString(a.quoi);
    const bTitle = normalizeString(b.quoi);

    return aTitle.localeCompare(bTitle, "fr");
  });
}

/**
 * Type pour les options de recherche et filtrage combinées
 */
export type SearchAndFilterOptions = LinkFilters & {
  query?: string;
};

/**
 * Applique recherche, filtrage et tri sur un tableau de liens
 * Retourne les résultats ordonnés
 */
export function searchAndFilterLinks(
  links: UsefulLink[],
  options: SearchAndFilterOptions = {}
): UsefulLink[] {
  const { query, ...filters } = options;

  // Applique la recherche
  const searchResults = searchLinks(links, query || "");

  // Applique les filtres
  const filteredResults = filterLinks(searchResults, filters);

  // Applique le tri
  const sortedResults = sortLinks(filteredResults);

  return sortedResults;
}

/**
 * Extrait les valeurs uniques d'un champ pour utiliser dans les filtres
 * Utile pour générer les options de filtre
 */
export function getUniqueFieldValues(
  links: UsefulLink[],
  field: keyof Pick<UsefulLink, "categorie" | "type" | "qui" | "source">
): string[] {
  const values = new Set(links.map((link) => link[field]));
  return Array.from(values).sort();
}

/**
 * Extrait toutes les options de filtre disponibles
 * Utilisé pour peupler les sélecteurs de filtre
 */
export function getFilterOptions(links: UsefulLink[]) {
  return {
    categories: getUniqueFieldValues(links, "categorie"),
    types: getUniqueFieldValues(links, "type"),
    audiences: getUniqueFieldValues(links, "qui"),
    sources: getUniqueFieldValues(links, "source")
  };
}
