import Image from "next/image";
import Link from "next/link";

import styles from "./HomeMediaShowcase.module.css";
import type { HomeHeroDestination, HomeHeroDestinationId } from "@/types/home-hero";

type HomeHeroDestinationCardProps = {
  destination: HomeHeroDestination;
};

const placementClassNames: Record<HomeHeroDestinationId, string> = {
  onboarding: styles.destinationOnboarding,
  installation: styles.destinationInstallation,
  history: styles.destinationHistory,
  organigram: styles.destinationOrganigram
};

function DestinationCardInner({ destination }: HomeHeroDestinationCardProps) {
  return (
    <article className={styles.destinationSurface}>
      <div className={styles.destinationMedia}>
        <Image
          src={destination.imageSrc}
          alt={destination.imageAlt}
          fill
          sizes={destination.sizes}
          priority={destination.priority}
          className={styles.destinationImage}
        />
      </div>

      {destination.caption ? (
        <span className={styles.destinationCaption}>{destination.caption}</span>
      ) : null}
    </article>
  );
}

export function HomeHeroDestinationCard({ destination }: HomeHeroDestinationCardProps) {
  const className = `${styles.destinationCard} ${placementClassNames[destination.id]}`;

  if (destination.linkType === "external") {
    return (
      <a href={destination.href} target="_blank" rel="noreferrer" className={className} aria-label={destination.label}>
        <DestinationCardInner destination={destination} />
      </a>
    );
  }

  return (
    <Link href={destination.href} className={className} aria-label={destination.label}>
      <DestinationCardInner destination={destination} />
    </Link>
  );
}
