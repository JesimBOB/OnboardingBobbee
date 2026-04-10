"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type HomeMediaShowcaseProps = {
  videoSrc: string;
};

type Spotlight = {
  href: string;
  src: string;
  alt: string;
  label: string;
  sizes: string;
  priority?: boolean;
};

const VIDEO_SEEN_STORAGE_KEY = "bobbee-home-video-seen";

const leftSpotlight: Spotlight = {
  href: "/bobbee#mission",
  src: "/images/Image onboarding.png",
  alt: "Illustration onboarding BOBBEE",
  label: "Image onboarding",
  sizes: "(min-width: 1280px) 24vw, (min-width: 768px) 40vw, 92vw",
  priority: true
};

const rightSpotlights: Spotlight[] = [
  {
    href: "/bobbee#histoire",
    src: "/images/Image histoire de BOBBEE.png",
    alt: "Illustration histoire de BOBBEE",
    label: "Image histoire de BOBBEE",
    sizes: "(min-width: 1280px) 18vw, (min-width: 768px) 28vw, 92vw"
  },
  {
    href: "/liens-utiles",
    src: "/images/Image organigramme.png",
    alt: "Illustration organigramme BOBBEE",
    label: "Image organigramme",
    sizes: "(min-width: 1280px) 18vw, (min-width: 768px) 28vw, 92vw"
  },
  {
    href: "/liens-utiles",
    src: "/images/Image installation poste.png",
    alt: "Illustration installation du poste",
    label: "Image installation poste",
    sizes: "(min-width: 1280px) 18vw, (min-width: 768px) 28vw, 92vw"
  }
];

type SpotlightFigureProps = {
  spotlight: Spotlight;
  className?: string;
  imageClassName?: string;
  captionClassName?: string;
};

function SpotlightFigure({
  spotlight,
  className = "",
  imageClassName = "",
  captionClassName = ""
}: SpotlightFigureProps) {
  return (
    <Link
      href={spotlight.href}
      className={`group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey-300 focus-visible:ring-offset-4 focus-visible:ring-offset-hive-cream ${className}`}
      aria-label={spotlight.label}
    >
      <figure className="space-y-3">
        <div className={`panel overflow-hidden p-3 sm:p-4 ${imageClassName}`}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.85rem] bg-white">
            <Image
              src={spotlight.src}
              alt={spotlight.alt}
              fill
              priority={spotlight.priority}
              sizes={spotlight.sizes}
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          </div>
        </div>
        <figcaption
          className={`inline-flex rounded-xl border border-hive-line/75 bg-white/92 px-4 py-3 text-base font-medium text-hive-ink shadow-soft transition duration-250 group-hover:border-honey-300/70 group-hover:text-honey-700 ${captionClassName}`}
        >
          {spotlight.label}
        </figcaption>
      </figure>
    </Link>
  );
}

export function HomeMediaShowcase({ videoSrc }: HomeMediaShowcaseProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasMarkedViewRef = useRef(false);
  const [shouldAutoplay, setShouldAutoplay] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const hasSeenVideo = window.localStorage.getItem(VIDEO_SEEN_STORAGE_KEY) === "true";
    setShouldAutoplay(!hasSeenVideo);
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady || !shouldAutoplay || !videoRef.current) {
      return;
    }

    const videoElement = videoRef.current;
    videoElement.muted = true;

    videoElement.play().catch(() => {
      // Browsers can still block autoplay; controls remain available.
    });
  }, [isReady, shouldAutoplay]);

  const markVideoAsSeen = () => {
    if (hasMarkedViewRef.current) {
      return;
    }

    window.localStorage.setItem(VIDEO_SEEN_STORAGE_KEY, "true");
    hasMarkedViewRef.current = true;
  };

  return (
    <section className="relative pb-8 pt-2 sm:pb-12">
      <h1 className="sr-only">Accueil BOBBEE</h1>

      <div className="grid gap-8 xl:grid-cols-[0.88fr_1.02fr_0.88fr] xl:items-start">
        <div className="xl:pt-8">
          <SpotlightFigure
            spotlight={leftSpotlight}
            imageClassName="xl:rounded-[2.25rem]"
            captionClassName="text-[1.12rem]"
          />
        </div>

        <div className="relative xl:pt-24">
          <div className="pointer-events-none absolute left-1/2 top-[46%] hidden -translate-x-[170%] xl:flex">
            <div className="rounded-full border border-honey-300/65 bg-white/90 px-4 py-2 text-sm font-semibold text-honey-700 shadow-soft">
              <span className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                  <path
                    d="M19 12H5m6-6-6 6 6 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Parcours
              </span>
            </div>
          </div>

          <div className="pointer-events-none absolute left-1/2 top-[46%] hidden translate-x-[72%] xl:flex">
            <div className="rounded-full border border-honey-300/65 bg-white/90 px-4 py-2 text-sm font-semibold text-honey-700 shadow-soft">
              <span className="flex items-center gap-2">
                Reperes
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                  <path
                    d="M5 12h14m-6-6 6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className="panel overflow-hidden p-4 sm:p-5">
            <div className="overflow-hidden rounded-[2.3rem] border border-hive-line/70 bg-white shadow-card">
              <div className="flex items-center justify-between bg-hive-ink px-5 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/85">
                <span>Lecture d&apos;accueil</span>
                <span>Une seule lecture auto</span>
              </div>
              <div className="relative bg-[radial-gradient(circle_at_top,rgba(248,216,116,0.22),transparent_36%),linear-gradient(180deg,#fffaf1_0%,#fff4df_100%)]">
                <video
                  ref={videoRef}
                  className="aspect-[4/5] w-full object-contain"
                  controls
                  playsInline
                  preload="metadata"
                  poster="/images/BOBBEE.jpg"
                  aria-label="Video d'accueil BOBBEE"
                  autoPlay={shouldAutoplay}
                  muted={shouldAutoplay}
                  onPlay={markVideoAsSeen}
                >
                  <source src={videoSrc} />
                  Votre navigateur ne supporte pas la lecture video.
                </video>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5 xl:space-y-6">
          {rightSpotlights.map((spotlight) => (
            <SpotlightFigure key={spotlight.label} spotlight={spotlight} />
          ))}
        </div>
      </div>
    </section>
  );
}
