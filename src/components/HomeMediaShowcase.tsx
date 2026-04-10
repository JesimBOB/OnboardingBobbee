"use client";

import Image from "next/image";
import Link from "next/link";
import { KeyboardEvent, useEffect, useRef, useState } from "react";

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
  sizes: "(min-width: 1280px) 16vw, (min-width: 768px) 18vw, 92vw",
  priority: true
};

const rightSpotlights: Spotlight[] = [
  {
    href: "/bobbee#histoire",
    src: "/images/Image histoire de BOBBEE.png",
    alt: "Illustration histoire de BOBBEE",
    label: "Image histoire de BOBBEE",
    sizes: "(min-width: 1280px) 12vw, (min-width: 768px) 12vw, 92vw"
  },
  {
    href: "/liens-utiles",
    src: "/images/Image organigramme.png",
    alt: "Illustration organigramme BOBBEE",
    label: "Image organigramme",
    sizes: "(min-width: 1280px) 12vw, (min-width: 768px) 12vw, 92vw"
  },
  {
    href: "/liens-utiles",
    src: "/images/Image installation poste.png",
    alt: "Illustration installation du poste",
    label: "Image installation poste",
    sizes: "(min-width: 1280px) 12vw, (min-width: 768px) 12vw, 92vw"
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
      // Browsers can still block autoplay; manual playback stays available on click.
    });
  }, [isReady, shouldAutoplay]);

  const markVideoAsSeen = () => {
    if (hasMarkedViewRef.current) {
      return;
    }

    window.localStorage.setItem(VIDEO_SEEN_STORAGE_KEY, "true");
    hasMarkedViewRef.current = true;
  };

  const toggleVideoPlayback = () => {
    const videoElement = videoRef.current;

    if (!videoElement) {
      return;
    }

    if (!videoElement.paused && videoElement.muted) {
      videoElement.muted = false;
      return;
    }

    if (videoElement.paused || videoElement.ended) {
      if (videoElement.muted) {
        videoElement.muted = false;
      }

      void videoElement.play();
      markVideoAsSeen();
      return;
    }

    videoElement.pause();
  };

  const handleVideoKeyDown = (event: KeyboardEvent<HTMLVideoElement>) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    toggleVideoPlayback();
  };

  return (
    <section className="relative pb-8 pt-2 sm:pb-12">
      <h1 className="sr-only">Accueil BOBBEE</h1>

      <div className="grid gap-8 md:grid-cols-[0.88fr_1.02fr_0.88fr] md:items-start md:gap-5 xl:gap-8">
        <div className="md:w-2/3 md:justify-self-end md:pt-8">
          <SpotlightFigure
            spotlight={leftSpotlight}
            imageClassName="xl:rounded-[2.25rem]"
            captionClassName="text-[1.12rem]"
          />
        </div>

        <div className="relative md:w-[133.333%] md:justify-self-center md:pt-20">
          <div className="overflow-hidden rounded-[2.6rem]">
            <video
              ref={videoRef}
              className="block aspect-[4/5] w-full cursor-pointer rounded-[2.6rem] object-contain focus-ring"
              playsInline
              preload="metadata"
              poster="/images/BOBBEE.jpg"
              aria-label="Video d'accueil BOBBEE. Appuyez sur Entrée ou Espace pour lire ou mettre en pause."
              autoPlay={shouldAutoplay}
              muted={shouldAutoplay}
              tabIndex={0}
              onClick={toggleVideoPlayback}
              onKeyDown={handleVideoKeyDown}
              onPlay={markVideoAsSeen}
            >
              <source src={videoSrc} />
              Votre navigateur ne supporte pas la lecture video.
            </video>
          </div>
        </div>

        <div className="space-y-5 md:w-2/3 md:justify-self-start md:space-y-4 xl:space-y-6">
          {rightSpotlights.map((spotlight) => (
            <SpotlightFigure key={spotlight.label} spotlight={spotlight} />
          ))}
        </div>
      </div>
    </section>
  );
}
