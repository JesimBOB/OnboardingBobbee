import type { UsefulLink } from "@/types";

type LinkCardProps = {
  link: UsefulLink;
};

export function LinkCard({ link }: LinkCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.55rem] border border-honey-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.99)_0%,rgba(255,252,246,0.98)_100%)] px-5 py-4 shadow-[0_12px_24px_rgba(140,92,22,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] transition-all duration-300 hover:-translate-y-1 hover:border-honey-300/85 hover:shadow-[0_18px_30px_rgba(140,92,22,0.12),inset_0_1px_0_rgba(255,255,255,0.92)] focus-within:-translate-y-1 focus-within:border-honey-300/85 focus-within:shadow-[0_18px_30px_rgba(140,92,22,0.12),inset_0_1px_0_rgba(255,255,255,0.92)] sm:px-6 sm:py-5">
      <div
        className="pointer-events-none absolute -right-4 -top-6 h-20 w-20 rounded-full bg-[radial-gradient(circle,rgba(255,224,138,0.28)_0%,rgba(255,224,138,0)_72%)]"
        aria-hidden="true"
      />

      <div className="relative flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-full border border-honey-300/70 bg-honey-50/95 px-3 py-[0.38rem] text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-honey-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]">
          {link.categorie === "Architecture & doc technique" ? "Doc technique" : link.categorie}
        </span>
        <span className="inline-flex items-center rounded-full border border-hive-line/70 bg-white/95 px-3 py-[0.38rem] text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-hive-ink/72">
          {link.type}
        </span>
      </div>

      <h3 className="relative mt-4 text-[1.42rem] font-bold leading-[1.22] tracking-[-0.015em] text-hive-ink transition-colors duration-250 group-hover:text-honey-700">
        {link.quoi}
      </h3>

      <div className="mt-auto flex justify-end pt-4">
        <a
          href={link.url}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-honey-300/75 bg-[linear-gradient(180deg,rgba(255,247,212,0.96)_0%,rgba(243,199,87,0.95)_100%)] px-4 py-2 text-[0.92rem] font-semibold text-hive-ink transition-all duration-250 hover:-translate-y-0.5 hover:shadow-[0_10px_18px_rgba(140,92,22,0.12)] focus:outline-none focus:ring-2 focus:ring-honey-300 focus:ring-offset-2 focus:ring-offset-white"
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
