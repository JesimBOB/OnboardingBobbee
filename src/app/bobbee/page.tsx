import { existsSync, statSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import siteContent from "@/data/site-content.json";

type SiteContent = {
  bobbee: {
    presentationVideoSrc: string;
  };
};

const content = siteContent as SiteContent;
const bobbeeData = content.bobbee;

const historyParagraphs = [
  "Après des années de frustrations terrain, une experte-comptable et un chef d’entreprise ont décidé de créer l’outil qu’ils auraient aimé avoir au quotidien.",
  "BOBBEE est né pour simplifier la vie des cabinets et des entreprises, en répondant concrètement aux problèmes rencontrés sur le terrain.",
  "En 2024, BOBBEE rejoint le groupe ISAGRI pour accélérer cette ambition et construire une solution encore plus robuste."
];

const historyImageCandidates = [
  "/images/fondateurs-historiques.jpg",
  "/images/fondateurs-historiques.jpeg",
  "/images/fondateurs-historiques.png",
  "/images/fondateurs-historiques.webp"
];

function resolveHistoryImageSrc() {
  const publicDir = path.join(process.cwd(), "public");

  for (const candidate of historyImageCandidates) {
    const diskPath = path.join(publicDir, candidate.replace(/^\//, ""));

    if (existsSync(diskPath) && statSync(diskPath).size > 1024) {
      return candidate;
    }
  }

  return "/images/Image histoire de BOBBEE.png";
}

export default function BobbeePage() {
  const historyImageSrc = resolveHistoryImageSrc();

  return (
    <div className="container-page space-y-8 pb-12 pt-8">
      <div className="flex items-center justify-start">
        <Link href="/" className="btn-secondary gap-2">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {"Retour \u00e0 l'accueil"}
        </Link>
      </div>

      <section id="histoire" className="mx-auto max-w-5xl space-y-8">
        <h1 className="sr-only">Notre histoire</h1>

        <h2 className="text-center text-2xl font-semibold tracking-tight text-hive-ink sm:text-3xl">
          Pourquoi BOBBEE existe
        </h2>

        <div
          className="overflow-hidden rounded-3xl border border-hive-line/60 bg-white shadow-card"
          style={{ borderRadius: "1.5rem" }}
        >
          <img
            src={historyImageSrc}
            alt="Les fondateurs historiques de bobbee"
            className="h-auto w-full"
          />
        </div>

        <div
          className="panel space-y-5 p-6 sm:p-8"
          style={{ borderRadius: "1.5rem" }}
        >
          {historyParagraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-base leading-8 text-hive-ink/80 sm:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <p
          className="text-center text-base leading-7 text-hive-ink/80 sm:text-lg"
          style={{ marginTop: "1.5rem" }}
        >
          Et pour t’accompagner dans ton onboarding, fais connaissance avec Bobby 👇
        </p>

        <div
          className="overflow-hidden rounded-3xl border border-white/70 bg-white shadow-card"
          style={{ borderRadius: "1.5rem" }}
        >
          <p className="px-6 pt-5 text-center text-sm font-medium text-hive-ink/65 sm:px-8">
            Ton guide pour démarrer
          </p>
          <video
            className="aspect-video w-full object-cover"
            controls
            preload="metadata"
            aria-label="Video de presentation de bobbee"
          >
            <source src={bobbeeData.presentationVideoSrc} />
            {"Votre navigateur ne supporte pas la lecture vid\u00e9o."}
          </video>
        </div>
      </section>
    </div>
  );
}
