import { describe, expect, it } from "vitest";
import type { UsefulLink } from "@/types";
import {
  filterLinks,
  getFilterOptions,
  getUniqueFieldValues,
  normalizeString,
  searchAndFilterLinks,
  searchLinks,
  sortLinks
} from "./links";

const mockLinks: UsefulLink[] = [
  {
    id: "link-001",
    categorie: "Decouverte",
    type: "Documentation",
    qui: "Tous",
    quoi: "Vision produit BOBBEE",
    url: "https://example.com/vision-produit",
    source: "Confluence",
    publicOrder: 1
  },
  {
    id: "link-002",
    categorie: "Decouverte",
    type: "Documentation",
    qui: "Tous",
    quoi: "Lexique des equipes",
    url: "https://example.com/lexique",
    source: "Notion",
    publicOrder: 2
  },
  {
    id: "link-003",
    categorie: "Operations",
    type: "Outil",
    qui: "Tous",
    quoi: "Portail RH",
    url: "https://example.com/portail-rh",
    source: "Workday"
  },
  {
    id: "link-004",
    categorie: "Tech",
    type: "Repository",
    qui: "Devs",
    quoi: "Monorepo principal",
    url: "https://example.com/monorepo",
    source: "GitHub"
  }
];

describe("normalizeString", () => {
  it("normalise la casse, les accents et les espaces", () => {
    expect(normalizeString(" Vision Produit BOBBEE ")).toBe("vision produit bobbee");
    expect(normalizeString("Equipes")).toBe("equipes");
  });
});

describe("searchLinks", () => {
  it("cherche dans les champs utiles", () => {
    expect(searchLinks(mockLinks, "vision")).toHaveLength(1);
    expect(searchLinks(mockLinks, "confluence")).toHaveLength(1);
    expect(searchLinks(mockLinks, "Tech")).toHaveLength(1);
    expect(searchLinks(mockLinks, "Devs")).toHaveLength(1);
  });

  it("retourne tous les liens si la requete est vide", () => {
    expect(searchLinks(mockLinks, "")).toHaveLength(mockLinks.length);
  });
});

describe("filterLinks", () => {
  it("applique les filtres avec une logique AND", () => {
    expect(
      filterLinks(mockLinks, {
        categories: ["Decouverte"],
        types: ["Documentation"]
      })
    ).toHaveLength(2);

    expect(
      filterLinks(mockLinks, {
        audiences: ["Devs"]
      })
    ).toHaveLength(1);
  });
});

describe("sortLinks", () => {
  it("trie d'abord par ordre public puis par titre", () => {
    const sortedLinks = sortLinks(mockLinks);

    expect(sortedLinks[0].id).toBe("link-001");
    expect(sortedLinks[1].id).toBe("link-002");
    expect(sortedLinks[2].quoi).toBe("Monorepo principal");
    expect(sortedLinks[3].quoi).toBe("Portail RH");
  });
});

describe("searchAndFilterLinks", () => {
  it("combine recherche, filtres et tri", () => {
    const results = searchAndFilterLinks(mockLinks, {
      query: "repository",
      audiences: ["Devs"]
    });

    expect(results).toHaveLength(1);
    expect(results[0].id).toBe("link-004");
  });
});

describe("filter options helpers", () => {
  it("retourne les valeurs uniques triées", () => {
    expect(getUniqueFieldValues(mockLinks, "categorie")).toEqual([
      "Decouverte",
      "Operations",
      "Tech"
    ]);

    expect(getFilterOptions(mockLinks)).toEqual({
      categories: ["Decouverte", "Operations", "Tech"],
      types: ["Documentation", "Outil", "Repository"],
      audiences: ["Devs", "Tous"],
      sources: ["Confluence", "GitHub", "Notion", "Workday"]
    });
  });
});
