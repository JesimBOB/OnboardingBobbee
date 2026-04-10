export type HomeCardItem = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  linkType: "internal" | "external";
  icon: "hive" | "team" | "setup" | "links";
};

export type UsefulLink = {
  id: string;
  categorie: string;
  type: string;
  qui: string;
  quoi: string;
  url: string;
  source: string;
  publicOrder?: number;
};

export type BobbeeStat = {
  label: string;
  value: string;
};

export type BobbeePillar = {
  title: string;
  description: string;
};

export type BobbeeSection = {
  id: string;
  title: string;
  description: string;
  bullets: string[];
};

export type BobbeeContent = {
  headline: string;
  introduction: string;
  stats: BobbeeStat[];
  pillars: BobbeePillar[];
  sections: BobbeeSection[];
};

export type SiteContentSection = {
  id: string;
  title: string;
  content: string;
};

export type SiteContent = {
  bobbee: {
    title: string;
    videoSrc: string;
    sections: SiteContentSection[];
  };
};
