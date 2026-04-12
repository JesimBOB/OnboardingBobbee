import Link from "next/link";
import { HeroVideo } from "@/components/HeroVideo";
import siteContent from "@/data/site-content.json";

type SiteContent = {
  bobbee: {
    title: string;
    videoSrc: string;
    sections: Array<{
      id: string;
      title: string;
      content: string;
    }>;
  };
};

const content = siteContent as SiteContent;
const bobbeeData = content.bobbee;

export default function BobbeePage() {
  return (
    <div className="container-page space-y-10 pb-12">
      {/* Bouton retour */}
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
          Retour à l&apos;accueil
        </Link>
      </div>

      {/* Titre principal */}
      <section className="space-y-4">
        <p className="eyebrow">Découvrez BOBBEE</p>
        <h1 className="font-display text-4xl leading-tight text-hive-ink sm:text-5xl">
          {bobbeeData.title}
        </h1>
      </section>

      {/* Vidéo de présentation */}
      <HeroVideo
        title="La vidéo de présentation de BOBBEE"
        description="Découvrez notre univers, notre mission et nos valeurs en un coup d'œil."
        videoSrc={bobbeeData.videoSrc}
      />

      {/* 3 blocs texte : histoire, mission, contexte */}
      <section className="space-y-5">
        <div className="grid gap-5 lg:grid-cols-3">
          {bobbeeData.sections.map((section) => (
            <article
              key={section.id}
              id={section.id}
              className="panel flex flex-col p-8 transition hover:shadow-lg"
            >
              <p className="eyebrow">{section.title}</p>
              <h2 className="mt-5 font-display text-2xl leading-tight text-hive-ink">
                {section.title === "Notre histoire"
                  ? "Une conviction"
                  : section.title === "Notre mission"
                    ? "Notre engagement"
                    : "Pensé dès le départ"}
              </h2>
              <p className="mt-5 flex-1 text-base leading-7 text-hive-ink/75">
                {section.content}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Appel à l'action vers les ressources */}
      <section className="panel p-8 text-center sm:p-12">
        <p className="eyebrow">Prêt à commencer ?</p>
        <h2 className="mt-5 font-display text-3xl leading-tight text-hive-ink sm:text-4xl">
          Explorez les ressources utiles
        </h2>
        <p className="mt-4 mx-auto max-w-2xl text-base leading-7 text-hive-ink/75">
          Retrouvez tous les liens, documents et outils pour progresser rapidement et vous sentir à l&apos;aise dès vos premiers jours.
        </p>
        <div className="mt-8 flex flex-col gap-3 justify-center sm:flex-row">
          <Link href="/liens-utiles" className="btn-primary">
            Voir les ressources
          </Link>
        </div>
      </section>
    </div>
  );
}
