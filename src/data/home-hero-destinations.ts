import type { HomeHeroDestination } from "@/types/home-hero";

export const homeHeroDestinations: HomeHeroDestination[] = [
  {
    id: "onboarding",
    href: "/bobbee#mission",
    linkType: "internal",
    imageSrc: "/images/Image onboarding.png",
    imageAlt: "Illustration onboarding BOBBEE",
    label: "Onboarding",
    sizes: "(min-width: 1400px) 300px, (min-width: 920px) 260px, 90vw",
    priority: true
  },
  {
    id: "installation",
    href: "/liens-utiles",
    linkType: "internal",
    imageSrc: "/images/Image installation poste.png",
    imageAlt: "Illustration installation du poste",
    label: "Installation du poste",
    sizes: "(min-width: 1400px) 300px, (min-width: 920px) 260px, 90vw"
  },
  {
    id: "history",
    href: "/bobbee#histoire",
    linkType: "internal",
    imageSrc: "/images/Image histoire de BOBBEE.png",
    imageAlt: "Illustration histoire de BOBBEE",
    label: "Histoire de BOBBEE",
    sizes: "(min-width: 1400px) 300px, (min-width: 920px) 260px, 90vw"
  },
  {
    id: "organigram",
    href: "/liens-utiles",
    linkType: "internal",
    imageSrc: "/images/Image organigramme.png",
    imageAlt: "Illustration organigramme BOBBEE",
    label: "Organigramme",
    sizes: "(min-width: 1400px) 300px, (min-width: 920px) 260px, 90vw"
  }
];
