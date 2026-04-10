import Link from "next/link";

import type { HomeCardItem } from "@/types";

type HomeCardProps = {
  card: HomeCardItem;
};

const iconShellClasses = {
  hive: "bg-honey-50 text-honey-700",
  team: "bg-[#f7efe0] text-honey-700",
  setup: "bg-[#eef3e6] text-hive-moss",
  links: "bg-white text-hive-ink"
} as const;

const glowClasses = {
  hive: "bg-honey-100",
  team: "bg-[#f6e2b3]",
  setup: "bg-[#dbe7cb]",
  links: "bg-[#f2e8d8]"
} as const;

const linkMeta = {
  internal: {
    badge: "Page interne",
    cta: "Acceder a la page"
  },
  external: {
    badge: "Nouvel onglet",
    cta: "Ouvrir le lien"
  }
} as const;

function CardIcon({ icon }: Pick<HomeCardItem, "icon">) {
  switch (icon) {
    case "hive":
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
          <path
            d="M8 4.75 12 2.5l4 2.25v4.5L12 11.5 8 9.25zm-5 8L7 10.5l4 2.25v4.5L7 19.5l-4-2.25zm10 0 4-2.25 4 2.25v4.5L17 19.5l-4-2.25z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "team":
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
          <circle cx="8" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.7" />
          <circle cx="16.5" cy="8" r="2" stroke="currentColor" strokeWidth="1.7" />
          <path
            d="M4.75 18c.45-2.3 2.2-3.5 5.25-3.5s4.8 1.2 5.25 3.5M13.75 17.25c.3-1.55 1.45-2.4 3.5-2.4 1.4 0 2.45.4 3 1.2"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      );
    case "setup":
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
          <rect x="4" y="5" width="16" height="11" rx="2.25" stroke="currentColor" strokeWidth="1.7" />
          <path d="M8 19h8M6.5 16.75h11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path d="m9 10 1.75 1.75L15 7.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "links":
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
          <path
            d="M10 8.75 8.25 7a3 3 0 0 0-4.25 4.25L5.75 13M14 15.25 15.75 17A3 3 0 1 0 20 12.75L18.25 11M8.5 15.5l7-7"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

function CardContent({ card }: HomeCardProps) {
  const meta = linkMeta[card.linkType];

  return (
    <article className="panel relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden p-6 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-card group-focus-visible:-translate-y-1 group-focus-visible:shadow-card">
      <div className={`absolute right-0 top-0 h-28 w-28 rounded-full blur-2xl opacity-70 ${glowClasses[card.icon]}`} aria-hidden="true" />

      <div className="relative space-y-5">
        <div className="flex items-start justify-between gap-4">
          <span
            className={`grid h-14 w-14 place-items-center rounded-[1.35rem] border border-white/70 shadow-soft ${iconShellClasses[card.icon]}`}
          >
            <CardIcon icon={card.icon} />
          </span>
          <span className="rounded-full border border-hive-line bg-white/80 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-hive-ink/65">
            {meta.badge}
          </span>
        </div>

        <div className="space-y-3">
          <p className="eyebrow">{card.eyebrow}</p>
          <div>
            <h3 className="font-display text-[1.7rem] leading-tight text-hive-ink">{card.title}</h3>
            <p className="mt-3 text-sm leading-7 text-hive-ink/75">{card.description}</p>
          </div>
        </div>
      </div>

      <div className="relative mt-8 flex items-center justify-between gap-3 text-sm font-semibold text-hive-ink">
        <span>{meta.cta}</span>
        <span className="grid h-10 w-10 place-items-center rounded-full border border-hive-line bg-white/85 text-honey-700 transition duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
            <path
              d={card.linkType === "external" ? "M8 16 16 8M10 8h6v6" : "M5 12h14m-5-5 5 5-5 5"}
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </article>
  );
}

export function HomeCard({ card }: HomeCardProps) {
  const className =
    "group block h-full rounded-[2rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey-300 focus-visible:ring-offset-4 focus-visible:ring-offset-hive-cream";

  if (card.linkType === "external") {
    return (
      <a
        href={card.href}
        target="_blank"
        rel="noreferrer"
        aria-label={`${card.title}, ouvre un nouvel onglet`}
        className={className}
      >
        <CardContent card={card} />
      </a>
    );
  }

  return (
    <Link href={card.href} className={className}>
      <CardContent card={card} />
    </Link>
  );
}
