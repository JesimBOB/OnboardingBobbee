"use client";

import { useEffect, useMemo, useState } from "react";

import { LinkCard } from "@/components/LinkCard";
import { usefulLinks } from "@/data/useful-links";
import {
  filterLinksForHive,
  getUniqueFieldValuesInOrder,
  searchAndFilterLinks,
  type UsefulLinksRoleFilter
} from "@/lib/links";

import styles from "./page.module.css";

const roleOptions: Array<{
  id: UsefulLinksRoleFilter;
  label: string;
  detail: string;
}> = [
  {
    id: "all",
    label: "Tous",
    detail: "Toute la ruche, sans restriction de poste."
  },
  {
    id: "dev",
    label: "Developpeur",
    detail: "Ressources dev, plus tout ce qui est commun."
  },
  {
    id: "qa",
    label: "QA",
    detail: "Ressources QA, plus tout ce qui est commun."
  }
];

function formatRoleSummary(selectedRoles: UsefulLinksRoleFilter[]): string {
  if (selectedRoles.includes("all")) {
    return "Tous les profils";
  }

  return selectedRoles
    .map((role) => roleOptions.find((option) => option.id === role)?.label ?? role)
    .join(" + ");
}

function getCategoryLabel(category: string): string {
  if (category === "Architecture & doc technique") {
    return "Doc technique";
  }

  if (category === "Dev & bonnes pratiques") {
    return "Bonnes pratiques";
  }

  if (category === "MÃ©tier & analyse") {
    return "MÃ©tier";
  }

  if (category === "Outils & collaboration") {
    return "Outils & media";
  }

  if (category === "Onboarding & organisation") {
    return "Onboarding organisation";
  }

  return category === "DevOps / Production" ? "DevOps" : category;
}

export default function UsefulLinksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<UsefulLinksRoleFilter[]>(["all"]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(
    () => getUniqueFieldValuesInOrder(usefulLinks, "categorie"),
    []
  );

  const categoryRows = useMemo(() => {
    if (categories.length === 10) {
      return [categories.slice(0, 3), categories.slice(3, 7), categories.slice(7, 10)];
    }

    const rows: string[][] = [];

    for (let index = 0; index < categories.length; index += 3) {
      rows.push(categories.slice(index, index + 3));
    }

    return rows;
  }, [categories]);

  const linksMatchingRoles = useMemo(
    () => filterLinksForHive(usefulLinks, { roles: selectedRoles }),
    [selectedRoles]
  );

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();

    for (const category of categories) {
      counts.set(category, 0);
    }

    for (const link of linksMatchingRoles) {
      counts.set(link.categorie, (counts.get(link.categorie) ?? 0) + 1);
    }

    return counts;
  }, [categories, linksMatchingRoles]);

  useEffect(() => {
    if (!selectedCategory) {
      return;
    }

    if ((categoryCounts.get(selectedCategory) ?? 0) === 0) {
      setSelectedCategory(null);
    }
  }, [categoryCounts, selectedCategory]);

  const filteredLinks = useMemo(() => {
    const hiveFilteredLinks = filterLinksForHive(usefulLinks, {
      roles: selectedRoles,
      category: selectedCategory
    });

    return searchAndFilterLinks(hiveFilteredLinks, {
      query: searchQuery
    });
  }, [searchQuery, selectedRoles, selectedCategory]);

  const hasCustomRoleSelection = !selectedRoles.includes("all");
  const hasActiveFilters =
    searchQuery.trim() !== "" || hasCustomRoleSelection || selectedCategory !== null;

  const roleSummary = formatRoleSummary(selectedRoles);
  const categorySummary = selectedCategory ?? "Toutes les rubriques";
  const categoryDisplaySummary = getCategoryLabel(categorySummary);

  const toggleRole = (role: UsefulLinksRoleFilter) => {
    setSelectedRoles((currentRoles) => {
      if (role === "all") {
        return ["all"];
      }

      const rolesWithoutAll = currentRoles.filter((currentRole) => currentRole !== "all");

      if (rolesWithoutAll.includes(role)) {
        const nextRoles = rolesWithoutAll.filter((currentRole) => currentRole !== role);
        return nextRoles.length > 0 ? nextRoles : ["all"];
      }

      return [...rolesWithoutAll, role];
    });
  };

  const toggleCategory = (category: string) => {
    setSelectedCategory((currentCategory) =>
      currentCategory === category ? null : category
    );
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedRoles(["all"]);
    setSelectedCategory(null);
  };

  return (
    <div className={`container-page ${styles.pageShell}`}>
      <h1 className="sr-only">Liens utiles</h1>

      <section
        className={`${styles.hiveSection} animate-fade-up-soft`}
        aria-labelledby="useful-links-hive-heading"
      >
        <div className={styles.hiveBgOne} aria-hidden="true" />
        <div className={styles.hiveBgTwo} aria-hidden="true" />
        <div className={styles.hiveGlow} aria-hidden="true" />
        <div className={styles.hiveAccent} aria-hidden="true" />

        <div className={styles.hiveHeader}>
          <h2
            id="useful-links-hive-heading"
            className={`text-hive-ink ${styles.hiveTitle}`}
          >
            Liens utiles
          </h2>
          <p className={styles.hiveLead}>
            Sélectionnez un document dans la barre de recherche ci-dessous ou filtrez par profil/rubrique.
          </p>
        </div>

        <div className={`${styles.heroSearchWrap} animate-fade-up-soft`}>
          <label className={styles.searchField}>
            <span className="sr-only">Rechercher dans les liens utiles</span>
            <svg
              className={styles.searchIcon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Rechercher un titre, une source ou un type..."
              className={styles.searchInput}
            />
          </label>
        </div>

        <section className={styles.profileTray} aria-labelledby="role-filters-heading">
          <div className={styles.trayHeading}>
            <h3 id="role-filters-heading" className={`text-hive-ink ${styles.trayTitle}`}>
              Profils
            </h3>
          </div>

          <div className={styles.roleGrid}>
            {roleOptions.map((role) => {
              const isActive = selectedRoles.includes(role.id);
              const chipLabel = role.id === "dev" ? "Dev" : role.label;

              return (
                <button
                  key={role.id}
                  type="button"
                  className={`${styles.roleChip} !min-w-[120px] ${isActive ? styles.roleChipActive : ""}`}
                  aria-pressed={isActive}
                  aria-label={`${chipLabel}. ${role.detail}`}
                  onClick={() => toggleRole(role.id)}
                >
                  {chipLabel}
                </button>
              );
            })}
          </div>
        </section>

        <section className={styles.categoryZone} aria-labelledby="category-filters-heading">
          <div className={styles.trayHeading}>
            <h3 id="category-filters-heading" className={`text-hive-ink ${styles.trayTitle}`}>
              Rubriques
            </h3>
            <p className={styles.filterHint}>
              Une rubrique à la fois. Cliquez sur une alvéole pour l’activer ou la désactiver.
            </p>
          </div>

          <div className={styles.categoryHive}>
            {categoryRows.map((row, rowIndex) => (
              <div
                key={`row-${rowIndex}`}
                className={styles.categoryRow}
                data-columns={row.length}
              >
                {row.map((category) => {
                  const count = categoryCounts.get(category) ?? 0;
                  const isActive = selectedCategory === category;
                  const isDisabled = count === 0;

                  return (
                    <div key={category} className={styles.categoryWrap}>
                      <button
                        type="button"
                        className={`${styles.categoryButton} ${isDisabled ? styles.categoryDisabled : ""}`}
                        aria-pressed={isActive}
                        disabled={isDisabled}
                        onClick={() => toggleCategory(category)}
                      >
                        <span
                          className={`${styles.categorySurface} ${isActive ? styles.categoryActive : ""}`}
                        >
                          <span className={styles.categoryName}>{getCategoryLabel(category)}</span>
                          <span className={styles.categoryCount}>
                            {count} lien{count > 1 ? "s" : ""}
                          </span>
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </section>

        <div className={styles.toolbar}>
          <div className={styles.toolbarMeta}>
            <span className={styles.metaPill}>Profils : {roleSummary}</span>
            <span className={styles.metaPill}>Rubrique : {categoryDisplaySummary}</span>
          </div>

          {hasActiveFilters ? (
            <button type="button" onClick={resetFilters} className={styles.resetButton}>
              Effacer les filtres
            </button>
          ) : (
            <div className={styles.metaPill}>Recherche optionnelle</div>
          )}
        </div>

        <p className="sr-only" aria-live="polite">
          {filteredLinks.length} liens affiches. Profils : {roleSummary}. Rubrique :
          {" "}
          {categorySummary}.
        </p>
      </section>

      <section className={styles.resultsSection} aria-labelledby="results-heading">
        <div className={styles.resultsHeader}>
          <div>
            <p className="eyebrow">Zone d&apos;ouverture</p>
            <h2 id="results-heading" className={`mt-4 text-hive-ink ${styles.resultsTitle}`}>
              Liens a ouvrir
            </h2>
            <p className={styles.resultsLead}>
              {searchQuery.trim()
                ? `Resultats pour "${searchQuery}" avec ${roleSummary} et ${categoryDisplaySummary}.`
                : `Profils actifs : ${roleSummary}. Rubrique : ${categoryDisplaySummary}.`}
            </p>
          </div>

          <div className={styles.resultsCounter} aria-live="polite">
            <strong>{filteredLinks.length}</strong>
            <span>
              ressource{filteredLinks.length > 1 ? "s" : ""} sur {usefulLinks.length}
            </span>
          </div>
        </div>

        {filteredLinks.length === 0 ? (
          <section className={styles.emptyState}>
            <div className={styles.emptyIcon} aria-hidden="true">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M9.172 16.172a4 4 0 0 1 5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
                />
              </svg>
            </div>
            <h3 className="text-hive-ink">Aucune ressource pour cette combinaison</h3>
            <p className="mt-3 text-sm leading-7 text-hive-ink/75">
              Essayez une autre alveole, ou relancez une recherche plus large.
            </p>
            <button type="button" onClick={resetFilters} className="btn-primary mt-6">
              Revenir a toute la ruche
            </button>
          </section>
        ) : (
          <div className={`${styles.resultsGrid} lg:grid-cols-2`}>
            {filteredLinks.map((link) => (
              <LinkCard key={link.id} link={link} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

