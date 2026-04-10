import type { UsefulLink } from "@/types";

type LinkCardProps = {
  link: UsefulLink;
};

export function LinkCard({ link }: LinkCardProps) {
  return (
    <article className="panel group flex flex-col overflow-hidden p-7 sm:p-8 transition-all duration-250 hover:shadow-card-hover">
      {/* Métadonnées */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-block rounded-full border border-honey-300/50 bg-honey-50/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-honey-700">
          {link.type}
        </span>
        <span className="inline-block rounded-full border border-honey-300/40 bg-honey-25/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-hive-ink/70">
          {link.categorie}
        </span>
      </div>

      {/* Titre */}
      <h3 className="mt-5 font-display text-lg leading-snug text-hive-ink group-hover:text-honey-700 transition-colors duration-250">
        {link.quoi}
      </h3>

      {/* Infos supplémentaires */}
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-hive-ink/65">
        <span className="flex items-center gap-1.5">
          <svg className="h-3.5 w-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
          </svg>
          <span>{link.qui}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <svg className="h-3.5 w-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm4 2v4h8V8H6z" />
          </svg>
          <span>{link.source}</span>
        </span>
      </div>

      {/* Bouton */}
      <a
        href={link.url}
        target="_blank"
        rel="noreferrer"
        className="btn-secondary mt-7 gap-2 self-start"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
        Ouvrir
      </a>
    </article>
  );
}
