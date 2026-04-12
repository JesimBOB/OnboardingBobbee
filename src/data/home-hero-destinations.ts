import type { HomeHeroDestination } from "@/types/home-hero";

export const homeHeroDestinations: HomeHeroDestination[] = [
  {
    id: "onboarding",
    href: "https://isagri.atlassian.net/wiki/spaces/BO/folder/5690720258?atlOrigin=eyJpIjoiNDYyZWIwODc1YWEzNDY1YzlhMTVkMDA1N2U4Y2FmNGYiLCJwIjoiYyJ9",
    linkType: "external",
    imageSrc: "/images/Image onboarding.png",
    imageAlt: "Illustration onboarding BOBBEE",
    label: "Onboarding",
    caption: "Onboarding",
    sizes: "(min-width: 1600px) 350px, (min-width: 1200px) 320px, 92vw",
    priority: true
  },
  {
    id: "installation",
    href: "https://isagri.atlassian.net/wiki/spaces/BO/pages/5689999363/Guide+d+Onboarding+D+veloppeur?atlOrigin=eyJpIjoiODU4ODZlMGFjNjFjNDQ3ODhlZGRjZGY0NDU3ODA5NTEiLCJwIjoiYyJ9",
    linkType: "external",
    imageSrc: "/images/Image installation poste.png",
    imageAlt: "Illustration installation du poste",
    label: "Installation du poste",
    caption: "Installation du poste",
    sizes: "(min-width: 1600px) 350px, (min-width: 1200px) 320px, 92vw"
  },
  {
    id: "history",
    href: "/bobbee#histoire",
    linkType: "internal",
    imageSrc: "/images/Image histoire de BOBBEE.png",
    imageAlt: "Illustration histoire de BOBBEE",
    label: "Histoire de BOBBEE",
    caption: "Histoire de BOBBEE",
    sizes: "(min-width: 1600px) 480px, (min-width: 1200px) 430px, 92vw"
  },
  {
    id: "organigram",
    href: "https://app.klaxoon.com/participate/board/WF2N6AF",
    linkType: "external",
    imageSrc: "/images/Image organigramme.png",
    imageAlt: "Illustration organigramme BOBBEE",
    label: "Organigramme",
    caption: "Organigramme",
    sizes: "(min-width: 1600px) 480px, (min-width: 1200px) 430px, 92vw"
  }
];
