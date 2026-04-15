import type { UsefulLink } from "@/types";

type LinkCardProps = {
  link: UsefulLink;
};

export function LinkCard({ link }: LinkCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.9rem] border border-hive-line/60 bg-[linear-gradient(160deg,rgba(255,255,255,0.97)_0%,rgba(255,250,236,0.94)_58%,rgba(250,233,184,0.38)_100%)] p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-honey-300/80 hover:shadow-card focus-within:-translate-y-1 focus-within:border-honey-300/80 focus-within:shadow-card sm:p-7">
      <div
        className="pointer-events-none absolute -right-5 -top-8 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(255,229,150,0.7)_0%,rgba(255,229,150,0)_72%)]"
        aria-hidden="true"
      />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-honey-300/50 bg-honey-50/75 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-honey-700">
            {link.categorie === "Architecture & doc technique" ? "Doc technique" : link.categorie}
          </span>
          <span className="inline-flex items-center rounded-full border border-hive-line/70 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-hive-ink/70">
            {link.type}
          </span>
        </div>

        <div
          className="hidden h-12 w-12 shrink-0 place-items-center rounded-[1rem] border border-honey-300/70 bg-[linear-gradient(180deg,rgba(255,248,214,0.95)_0%,rgba(247,212,110,0.9)_100%)] text-hive-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_8px_20px_rgba(140,92,22,0.12)] sm:grid"
          aria-hidden="true"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 5.5h9l4.5 6.5-4.5 6.5h-9L3 12l4.5-6.5Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 12h5" />
          </svg>
        </div>
      </div>

      <h3 className="relative mt-5 font-display text-[1.45rem] leading-tight text-hive-ink transition-colors duration-250 group-hover:text-honey-700">
        {link.quoi}
      </h3>

      <div className="mt-5 grid gap-3 text-sm text-hive-ink/75 sm:grid-cols-2">
        <div className="rounded-2xl border border-hive-line/55 bg-white/72 px-4 py-3 backdrop-blur-sm">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-hive-ink/45">Public</p>
          <p className="mt-1.5 font-semibold text-hive-ink">{link.qui}</p>
        </div>

        <div className="rounded-2xl border border-hive-line/55 bg-white/72 px-4 py-3 backdrop-blur-sm">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-hive-ink/45">Source</p>
          <p className="mt-1.5 font-semibold text-hive-ink">{link.source}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-start gap-4 border-t border-hive-line/55 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-hive-ink/65">
          Ouvrir la ressource dans un nouvel onglet.
        </p>

        <a
          href={link.url}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-honey-300/70 bg-[linear-gradient(180deg,rgba(255,247,212,0.96)_0%,rgba(243,199,87,0.95)_100%)] px-5 py-2.5 text-sm font-semibold text-hive-ink transition-all duration-250 hover:-translate-y-0.5 hover:shadow-soft-md focus:outline-none focus:ring-2 focus:ring-honey-300 focus:ring-offset-2 focus:ring-offset-white"
          aria-label={`Ouvrir ${link.quoi}`}
        >
          Ouvrir
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </article>
  );
}
