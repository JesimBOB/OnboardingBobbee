import { HeroVideo } from "@/components/HeroVideo";
import { HomeCard } from "@/components/HomeCard";
import { OnboardingIllustration } from "@/components/OnboardingIllustration";
import homeCardsData from "@/data/home-cards.json";
import type { HomeCardItem } from "@/types";

const homeCards = homeCardsData as HomeCardItem[];

const reassurancePanels = [
  {
    title: "Lecture immediate",
    description: "Une hierarchie visuelle simple, avec l'illustration a gauche, la video au centre et les actions a portee de clic."
  },
  {
    title: "Actions sans ambiguite",
    description: "Les cartes distinguent clairement les pages internes des ressources externes ouvertes dans un nouvel onglet."
  },
  {
    title: "Base propre a faire evoluer",
    description: "Les contenus passent par des composants reutilisables et des donnees TypeScript/JSON faciles a enrichir."
  }
];

export default function HomePage() {
  return (
    <div className="space-y-8 pb-12">
      <section className="grid gap-6 xl:grid-cols-[0.92fr_1.18fr_0.94fr] xl:items-start">
        <OnboardingIllustration />

        <HeroVideo
          title="La video d'accueil donne le ton des premiers jours"
          description="Au centre de la page, elle pose la mission, le rythme et les reperes utiles pour bien commencer, avec une zone deja prete a accueillir une vraie source video."
        />

        <aside className="space-y-4" aria-labelledby="home-actions-title">
          <div className="space-y-3 px-1">
            <p className="eyebrow">Acces rapides</p>
            <h2 id="home-actions-title" className="font-display text-3xl leading-tight text-hive-ink sm:text-[2.15rem]">
              Quatre portes d&apos;entree pour demarrer sereinement.
            </h2>
            <p className="text-sm leading-7 text-hive-ink/75 sm:text-base">
              Les cartes restent courtes, lisibles et accessibles, avec ouverture en nouvel onglet pour les ressources externes.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            {homeCards.map((card) => (
              <HomeCard key={card.id} card={card} />
            ))}
          </div>
        </aside>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {reassurancePanels.map((panel) => (
          <article key={panel.title} className="panel p-6">
            <p className="eyebrow">Experience</p>
            <h2 className="mt-4 font-display text-2xl leading-tight text-hive-ink">{panel.title}</h2>
            <p className="mt-3 text-sm leading-7 text-hive-ink/75">{panel.description}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
