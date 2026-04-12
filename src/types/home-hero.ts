export type HomeHeroDestinationId =
  | "onboarding"
  | "installation"
  | "history"
  | "organigram";

export type HomeHeroDestination = {
  id: HomeHeroDestinationId;
  href: string;
  linkType: "internal" | "external";
  imageSrc: string;
  imageAlt: string;
  label: string;
  sizes: string;
  priority?: boolean;
};
