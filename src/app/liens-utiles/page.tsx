"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import usefulLinksData from "@/data/liens-utiles.json";
import { LinkCard } from "@/components/LinkCard";
import { SearchBar } from "@/components/SearchBar";
import { FilterSelect } from "@/components/FilterSelect";
import {
  searchAndFilterLinks,
  getFilterOptions,
  normalizeString
} from "@/lib/links";
import type { UsefulLink } from "@/types";

const usefulLinks = usefulLinksData as UsefulLink[];
const filterOptions = getFilterOptions(usefulLinks);

export default function UsefulLinksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);

  // Utilise les fonctions réutilisables pour filtrer et trier
  const filteredLinks = useMemo(() => {
    return searchAndFilterLinks(usefulLinks, {
      query: searchQuery,
      categories: selectedCategories,
      types: selectedTypes,
      audiences: selectedAudiences,
      sources: selectedSources
    });
  }, [searchQuery, selectedCategories, selectedTypes, selectedAudiences, selectedSources]);

  // Vérifier s'il y a des filtres actifs
  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategories.length > 0 ||
    selectedTypes.length > 0 ||
    selectedAudiences.length > 0 ||
    selectedSources.length > 0;

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedTypes([]);
    setSelectedAudiences([]);
    setSelectedSources([]);
  };

  return (
    <div className="space-y-10 pb-12">
      {/* En-tête */}
      <section className="space-y-4">
        <div className="flex items-center justify-start">
          <Link href="/" className="btn-secondary gap-2">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Retour à l'accueil
          </Link>
        </div>
        <div>
          <p className="eyebrow">Boîte à outils</p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-hive-ink sm:text-5xl">
            Les liens utiles de la ruche
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-hive-ink/75">
            Retrouvez tous les liens, documentations et ressources pour progresser rapidement.
            Utilisez la recherche et les filtres pour trouver exactement ce dont vous avez besoin.
          </p>
        </div>
      </section>

      {/* Barre de recherche et filtres */}
      <section className="space-y-6">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        {/* Filtres */}
        <div className="grid gap-6 rounded-[1.75rem] border border-hive-line bg-white/65 p-6 sm:grid-cols-2 lg:grid-cols-5">
          <FilterSelect
            id="categories"
            label="Catégorie"
            options={filterOptions.categories}
            value={selectedCategories}
            onChange={setSelectedCategories}
          />
          <FilterSelect
            id="types"
            label="Type"
            options={filterOptions.types}
            value={selectedTypes}
            onChange={setSelectedTypes}
          />
          <FilterSelect
            id="audiences"
            label="Public"
            options={filterOptions.audiences}
            value={selectedAudiences}
            onChange={setSelectedAudiences}
          />
          <FilterSelect
            id="sources"
            label="Source"
            options={filterOptions.sources}
            value={selectedSources}
            onChange={setSelectedSources}
          />

          {/* Réinitialiser les filtres */}
          {hasActiveFilters && (
            <div className="flex items-end">
              <button
                onClick={resetFilters}
                className="btn-secondary w-full"
              >
                Réinitialiser
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Compteur de résultats */}
      <section className="flex items-center justify-between rounded-xl bg-honey-50/70 p-4">
        <p className="text-sm font-semibold text-hive-ink">
          <span className="font-display text-xl text-honey-700">
            {filteredLinks.length}
          </span>
          {" "}
          ressource{filteredLinks.length !== 1 ? "s" : ""} trouvée
          {filteredLinks.length !== 1 ? "s" : ""}
        </p>
        {hasActiveFilters && (
          <p className="text-xs text-hive-ink/65">Filtrées sur {usefulLinks.length} total</p>
        )}
      </section>

      {/* Résultats ou état vide */}
      {filteredLinks.length === 0 ? (
        <section className="panel space-y-6 p-8 text-center sm:p-12">
          <div className="mx-auto h-16 w-16 rounded-full bg-honey-50 flex items-center justify-center">
            <svg
              className="h-8 w-8 text-hive-ink/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="space-y-2">
            <h2 className="font-display text-2xl text-hive-ink">
              Aucun résultat trouvé
            </h2>
            <p className="text-sm text-hive-ink/75">
              Essayez d'ajuster votre recherche ou vos filtres.
            </p>
          </div>
          <button onClick={resetFilters} className="btn-primary mx-auto">
            Réinitialiser les filtres
          </button>
        </section>
      ) : (
        <section className="grid gap-4 lg:grid-cols-2">
          {filteredLinks.map((link) => (
            <LinkCard key={link.id} link={link} />
          ))}
        </section>
      )}
    </div>
  );
}

