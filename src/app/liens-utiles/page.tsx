"use client";

import Link from "next/link";
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

function BeeBadge() {
  return (
    <svg viewBox="0 0 96 96" className="h-11 w-11 text-hive-ink" fill="none" aria-hidden="true">
      <ellipse cx="31" cy="30" rx="13" ry="11" fill="rgba(255,255,255,0.72)" />
      <ellipse cx="61" cy="30" rx="13" ry="11" fill="rgba(255,255,255,0.72)" />
      <ellipse cx="48" cy="52" rx="22" ry="19" fill="#F6C54F" />
      <path d="M29 50c7-6 31-6 38 0" stroke="#352719" strokeWidth="5" strokeLinecap="round" />
      <path d="M27 58c7-6 35-6 42 0" stroke="#352719" strokeWidth="5" strokeLinecap="round" />
      <circle cx="40" cy="47" r="2.5" fill="#352719" />
      <circle cx="56" cy="47" r="2.5" fill="#352719" />
      <path d="M41 58c3.2 3 10.8 3 14 0" stroke="#352719" strokeWidth="4" strokeLinecap="round" />
      <path d="M39 33l-5-10" stroke="#352719" strokeWidth="4" strokeLinecap="round" />
      <path d="M57 33l5-10" stroke="#352719" strokeWidth="4" strokeLinecap="round" />
      <circle cx="33" cy="21" r="4" fill="#352719" />
      <circle cx="63" cy="21" r="4" fill="#352719" />
    </svg>
  );
}

function formatRoleSummary(selectedRoles: UsefulLinksRoleFilter[]): string {
  if (selectedRoles.includes("all")) {
    return "Tous les profils";
  }

  return selectedRoles
    .map((role) => roleOptions.find((option) => option.id === role)?.label ?? role)
    .join(" + ");
}

export default function UsefulLinksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<UsefulLinksRoleFilter[]>(["all"]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(
    () => getUniqueFieldValuesInOrder(usefulLinks, "categorie"),
    []
  );

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
      <section className={`${styles.heroCard} animate-fade-up-soft`}>
        <div className={styles.heroText}>
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
              Retour a l&apos;accueil
            </Link>
          </div>

          <p className="eyebrow mt-4">Ruche a ressources</p>
          <h1 className="mt-4 text-hive-ink">Liens utiles</h1>
          <p className={styles.heroHint}>
            Une interface vive pour choisir, puis une liste nette pour ouvrir les bonnes
            ressources sans perdre le fil.
          </p>

          <div className={styles.heroMeta}>
            <span className={styles.heroMetaPill}>{categories.length} rubriques a explorer</span>
            <span className={styles.heroMetaPill}>{usefulLinks.length} ressources conservees</span>
            <span className={styles.heroMetaPill}>Filtrage instantane cote client</span>
          </div>
        </div>

        <div className={styles.heroBee} aria-hidden="true">
          <BeeBadge />
        </div>
      </section>

      <section
        className={`${styles.hiveSection} animate-fade-up-soft`}
        aria-labelledby="useful-links-hive-heading"
      >
        <div className={styles.hiveBgOne} aria-hidden="true" />
        <div className={styles.hiveBgTwo} aria-hidden="true" />
        <div className={styles.hiveGlow} aria-hidden="true" />

        <div className={styles.hiveHeader}>
          <div>
            <p className="eyebrow">Ruche interactive</p>
            <h2 id="useful-links-hive-heading" className="mt-4 text-hive-ink">
              Filtrer la recolte
            </h2>
            <p className={styles.hiveLead}>
              Activez un profil, choisissez une rubrique, puis ouvrez les liens en dessous.
              La logique met a jour les resultats tout de suite, sans changer l&apos;ordre des
              ressources existantes.
            </p>
          </div>

          <div className={styles.hiveStat}>
            <span className={styles.hiveStatValue}>{filteredLinks.length}</span>
            <span>liens visibles maintenant</span>
          </div>
        </div>

        <div className={styles.filterColumns}>
          <section className={styles.filterBlock} aria-labelledby="role-filters-heading">
            <div className={styles.filterHeading}>
              <div>
                <h3 id="role-filters-heading" className="text-hive-ink">
                  Profils
                </h3>
                <p className={styles.filterHint}>
                  Multi-selection OR. Le mode Tous reste le point de depart.
                </p>
              </div>
            </div>

            <div className={styles.roleGrid}>
              {roleOptions.map((role) => {
                const isActive = selectedRoles.includes(role.id);

                return (
                  <button
                    key={role.id}
                    type="button"
                    className={`${styles.roleButton} ${role.id === "all" ? styles.roleButtonAll : ""}`}
                    aria-pressed={isActive}
                    onClick={() => toggleRole(role.id)}
                  >
                    <span className={`${styles.roleSurface} ${isActive ? styles.roleActive : ""}`}>
                      <span className={styles.roleLabel}>{role.label}</span>
                      <span className={styles.roleDetail}>{role.detail}</span>
                      <span className={styles.roleState}>
                        <span className={styles.activeIcon}>{isActive ? "OK" : "+"}</span>
                        {isActive ? "Actif" : "Filtrer"}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className={styles.filterBlock} aria-labelledby="category-filters-heading">
            <div className={styles.filterHeading}>
              <div>
                <h3 id="category-filters-heading" className="text-hive-ink">
                  Rubriques
                </h3>
                <p className={styles.filterHint}>
                  Une rubrique a la fois. Recliquez sur l&apos;alveole active pour revenir a
                  toute la ruche.
                </p>
              </div>
            </div>

            <div className={styles.categoryGrid}>
              {categories.map((category) => {
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
                      <span className={`${styles.categorySurface} ${isActive ? styles.categoryActive : ""}`}>
                        <span className={styles.categoryName}>{category}</span>
                        <span className={styles.categoryCount}>
                          {isActive ? "Active | " : ""}
                          {count} lien{count > 1 ? "s" : ""}
                        </span>
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <div className={styles.toolbar}>
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

          <div className={styles.toolbarMeta}>
            <span className={styles.metaPill}>Profils : {roleSummary}</span>
            <span className={styles.metaPill}>Rubrique : {categorySummary}</span>
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
            <h2 id="results-heading" className="mt-4 text-hive-ink">
              Liens a ouvrir
            </h2>
            <p className={styles.resultsLead}>
              {searchQuery.trim()
                ? `Resultats pour "${searchQuery}" avec ${roleSummary} et ${categorySummary}.`
                : `Profils actifs : ${roleSummary}. Rubrique : ${categorySummary}.`}
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
