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
  "Apr\u00e8s des ann\u00e9es de frustrations, une expert-comptable et un chef d'entreprise ont vu l'opportunit\u00e9 de d\u00e9velopper l'outil qui allait changer le quotidien de leurs pairs.",
  "Le monde comptable et financier est vou\u00e9 \u00e0 \u00e9voluer et les solutions qui l'accompagnent \u00e9galement. bobbee est n\u00e9 pour venir en r\u00e9ponse \u00e0 toutes les probl\u00e9matiques rencontr\u00e9es par les cabinets comptables et les entreprises.",
  "En \u00e9t\u00e9 2024, bobbee int\u00e8gre le Groupe ISAGRI, un acteur majeur des logiciels de gestion pour les experts comptables et les entreprises. Il s'agit d'une alliance industrielle et digitale essentielle pour r\u00e9pondre aux enjeux de gestion des entreprises et des experts-comptables."
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

        <div className="overflow-hidden rounded-3xl border border-hive-line/60 bg-white shadow-card">
          <img
            src={historyImageSrc}
            alt="Les fondateurs historiques de bobbee"
            className="h-auto w-full"
          />
        </div>

        <div className="panel space-y-5 p-6 sm:p-8">
          {historyParagraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-base leading-8 text-hive-ink/80 sm:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/70 bg-white shadow-card">
          <video
            className="aspect-video w-full object-cover"
            controls
            preload="metadata"
            poster="/images/BOBBEE.jpg"
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
