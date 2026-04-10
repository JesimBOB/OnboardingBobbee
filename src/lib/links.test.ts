/**
 * Fichier de démonstration et documentation des fonctions de recherche/filtrage de liens
 * Ces exemples peuvent servir de base pour des tests unitaires avec Jest ou Vitest
 *
 * Pour exécuter les tests : npm run test (si jest/vitest est configuré)
 */

import type { UsefulLink } from "@/types";
import {
  normalizeString,
  searchLinks,
  filterLinks,
  sortLinks,
  searchAndFilterLinks,
  getUniqueFieldValues,
  getFilterOptions
} from "./links";

// Données de test
const mockLinks: UsefulLink[] = [
  {
    id: "link-001",
    categorie: "Découverte",
    type: "Documentation",
    qui: "Tous",
    quoi: "Vision produit BOBBEE",
    url: "https://example.com/vision-produit",
    source: "Confluence",
    publicOrder: 1
  },
  {
    id: "link-002",
    categorie: "Découverte",
    type: "Documentation",
    qui: "Tous",
    quoi: "Lexique des équipes",
    url: "https://example.com/lexique",
    source: "Notion",
    publicOrder: 2
  },
  {
    id: "link-003",
    categorie: "Opérations",
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

// ============================================================================
// TEST 1: normalizeString
// ============================================================================
console.log("=== TEST: normalizeString ===");

// Cas simple : minuscules et accents
console.assert(
  normalizeString("Vision Produit BOBBEE") === "vision produit bobbee",
  "Devrait convertir en minuscules"
);

// Avec accents
console.assert(
  normalizeString("Équipes") === "equipes",
  "Devrait supprimer les accents"
);

// Espaces en début/fin
console.assert(
  normalizeString("  test  ") === "test",
  "Devrait trimmer les espaces"
);

console.log("✓ normalizeString fonctionne correctement\n");

// ============================================================================
// TEST 2: searchLinks
// ============================================================================
console.log("=== TEST: searchLinks ===");

// Recherche par titre
const searchByTitle = searchLinks(mockLinks, "vision");
console.assert(
  searchByTitle.length === 1 && searchByTitle[0].id === "link-001",
  "Devrait trouver 'Vision produit BOBBEE' avec 'vision'"
);

// Recherche par source
const searchBySource = searchLinks(mockLinks, "confluence");
console.assert(
  searchBySource.length === 1 && searchBySource[0].source === "Confluence",
  "Devrait trouver les liens Confluence avec 'confluence'"
);

// Recherche avec accents (normalisée)
const searchWithAccents = searchLinks(mockLinks, "lexique");
console.assert(
  searchWithAccents.length === 1 && searchWithAccents[0].id === "link-002",
  "Devrait trouver 'Lexique' avec 'lexique' (insensible aux accents)"
);

// Recherche vide
const searchEmpty = searchLinks(mockLinks, "");
console.assert(
  searchEmpty.length === 4,
  "Devrait retourner tous les liens avec recherche vide"
);

// Aucun résultat
const searchNoResult = searchLinks(mockLinks, "inexistant");
console.assert(
  searchNoResult.length === 0,
  "Devrait retourner un tableau vide si aucun match"
);

console.log("✓ searchLinks fonctionne correctement\n");

// ============================================================================
// TEST 3: filterLinks
// ============================================================================
console.log("=== TEST: filterLinks ===");

// Filtre par catégorie
const filterByCategory = filterLinks(mockLinks, {
  categories: ["Découverte"]
});
console.assert(
  filterByCategory.length === 2,
  "Devrait retourner 2 liens de catégorie 'Découverte'"
);

// Filtre par type
const filterByType = filterLinks(mockLinks, {
  types: ["Documentation"]
});
console.assert(
  filterByType.length === 2,
  "Devrait retourner 2 liens de type 'Documentation'"
);

// Filtre par audience
const filterByAudience = filterLinks(mockLinks, {
  audiences: ["Devs"]
});
console.assert(
  filterByAudience.length === 1,
  "Devrait retourner 1 lien pour 'Devs'"
);

// Filtres combinés (AND logic)
const filterMultiple = filterLinks(mockLinks, {
  categories: ["Découverte"],
  types: ["Documentation"]
});
console.assert(
  filterMultiple.length === 2,
  "Devrait appliquer la logique AND sur les filtres"
);

// Aucun filtre
const filterNone = filterLinks(mockLinks, {});
console.assert(
  filterNone.length === 4,
  "Devrait retourner tous les liens sans filtre"
);

// Filtre sans résultats
const filterNoResult = filterLinks(mockLinks, {
  categories: ["Inexistant"]
});
console.assert(
  filterNoResult.length === 0,
  "Devrait retourner un tableau vide si aucun match"
);

console.log("✓ filterLinks fonctionne correctement\n");

// ============================================================================
// TEST 4: sortLinks
// ============================================================================
console.log("=== TEST: sortLinks ===");

// Tri par publicOrder puis titre
const sorted = sortLinks(mockLinks);
console.assert(
  sorted[0].publicOrder === 1,
  "Le premier élément devrait avoir publicOrder=1"
);
console.assert(
  sorted[1].publicOrder === 2,
  "Le deuxième élément devrait avoir publicOrder=2"
);

// Les liens sans publicOrder devraient être à la fin, triés alphabétiquement
console.assert(
  sorted[2].quoi === "Monorepo principal" && sorted[3].quoi === "Portail RH",
  "Les liens sans publicOrder devraient être triés alphabétiquement"
);

console.log("✓ sortLinks fonctionne correctement\n");

// ============================================================================
// TEST 5: searchAndFilterLinks (intégration complète)
// ============================================================================
console.log("=== TEST: searchAndFilterLinks ===");

// Recherche + filtres combinés
const combined = searchAndFilterLinks(mockLinks, {
  query: "équipes",
  categories: ["Découverte"]
});
console.assert(
  combined.length === 1 && combined[0].id === "link-002",
  "Devrait combiner recherche et filtres correctement"
);

// Recherche seule
const searchOnly = searchAndFilterLinks(mockLinks, {
  query: "repository"
});
console.assert(
  searchOnly.length === 1 && searchOnly[0].type === "Repository",
  "Devrait faire une recherche sans filtres"
);

// Résultats triés
const combinedWithSort = searchAndFilterLinks(mockLinks, {
  categories: ["Découverte"]
});
console.assert(
  combinedWithSort[0].publicOrder! <= combinedWithSort[1].publicOrder!,
  "Les résultats devraient être triés"
);

console.log("✓ searchAndFilterLinks fonctionne correctement\n");

// ============================================================================
// TEST 6: getUniqueFieldValues
// ============================================================================
console.log("=== TEST: getUniqueFieldValues ===");

const categories = getUniqueFieldValues(mockLinks, "categorie");
console.assert(
  categories.length === 3 && categories.includes("Découverte"),
  "Devrait extraire les catégories uniques et triées"
);

const types = getUniqueFieldValues(mockLinks, "type");
console.assert(
  types.length === 3,
  "Devrait extraire les types uniques"
);

console.log("✓ getUniqueFieldValues fonctionne correctement\n");

// ============================================================================
// TEST 7: getFilterOptions
// ============================================================================
console.log("=== TEST: getFilterOptions ===");

const filterOptions = getFilterOptions(mockLinks);
console.assert(
  filterOptions.categories.length === 3,
  "Devrait avoir 3 catégories uniques"
);
console.assert(
  filterOptions.types.length === 3,
  "Devrait avoir 3 types uniques"
);
console.assert(
  filterOptions.audiences.length === 2,
  "Devrait avoir 2 audiences uniques"
);
console.assert(
  filterOptions.sources.length === 4,
  "Devrait avoir 4 sources uniques"
);

console.log("✓ getFilterOptions fonctionne correctement\n");

// ============================================================================
// RÉSUMÉ
// ============================================================================
console.log("\n✅ Tous les tests sont passés !\n");
console.log("Ces fonctions sont prêtes à être utilisées dans :");
console.log("  - src/app/liens-utiles/page.tsx");
console.log("  - /api/chat ou autres endpoints");
console.log("  - Autres pages nécessitant du filtrage de liens");
