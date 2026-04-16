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
  "Après des années de frustrations terrain, une experte-comptable et un chef d’entreprise ont décidé de créer l’outil qu’ils aimeraient avoir au quotidien.",
  "BOBBEE est né pour simplifier la vie des cabinets et des entreprises, en répondant concrètement aux besoins terrain.",
  "En 2024, BOBBEE rejoint le groupe ISAGRI pour accélérer cette ambition."
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
      <section id="histoire" className="mx-auto max-w-5xl space-y-8">
        <h1>Pourquoi BOBBEE existe</h1>

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
              className="text-[1.05rem] leading-normal text-gray-800 sm:text-[1.125rem]"
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
            poster="/images/bobby-video-poster.jpg"
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
