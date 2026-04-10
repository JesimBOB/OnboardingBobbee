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

const featuredSpotlight: Spotlight = {
  href: "/bobbee#mission",
  src: "/images/Image onboarding.png",
  alt: "Illustration onboarding BOBBEE",
  label: "Onboarding",
  sizes: "(min-width: 1280px) 18vw, (min-width: 1024px) 22vw, (min-width: 768px) 34vw, 84vw",
  priority: true
};

const sideSpotlights: Spotlight[] = [
  {
    href: "/bobbee#histoire",
    src: "/images/Image histoire de BOBBEE.png",
    alt: "Illustration histoire de BOBBEE",
    label: "Histoire de BOBBEE",
    sizes: "(min-width: 1280px) 15vw, (min-width: 1024px) 18vw, (min-width: 768px) 28vw, 84vw"
  },
  {
    href: "/liens-utiles",
    src: "/images/Image organigramme.png",
    alt: "Illustration organigramme BOBBEE",
    label: "Organigramme",
    sizes: "(min-width: 1280px) 15vw, (min-width: 1024px) 18vw, (min-width: 768px) 28vw, 84vw"
  },
  {
    href: "/liens-utiles",
    src: "/images/Image installation poste.png",
    alt: "Illustration installation du poste",
    label: "Installation du poste",
    sizes: "(min-width: 1280px) 15vw, (min-width: 1024px) 18vw, (min-width: 768px) 28vw, 84vw"
  }
];

type SpotlightFigureProps = {
  spotlight: Spotlight;
  delayMs: number;
};

function SpotlightFigure({ spotlight, delayMs }: SpotlightFigureProps) {
  return (
    <Link
      href={spotlight.href}
      className="group block animate-fade-up-soft rounded-[1.9rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey-300 focus-visible:ring-offset-4 focus-visible:ring-offset-hive-cream"
      aria-label={spotlight.label}
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <figure className="flex flex-col items-center">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.9rem] border border-white/45 bg-[linear-gradient(155deg,rgba(255,250,241,0.72)_0%,rgba(248,232,194,0.28)_100%)] shadow-[0_12px_30px_rgba(104,67,16,0.08)] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_18px_36px_rgba(104,67,16,0.14)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.38),transparent_56%)]" />
          <Image
            src={spotlight.src}
            alt={spotlight.alt}
            fill
            priority={spotlight.priority}
            sizes={spotlight.sizes}
            className="object-cover transition duration-500 group-hover:scale-[1.045]"
          />
        </div>
        <figcaption className="mt-4 text-center text-[0.98rem] font-semibold leading-snug tracking-[0.01em] text-hive-ink/78 transition duration-300 group-hover:text-honey-700">
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const hasSeenVideo = window.localStorage.getItem(VIDEO_SEEN_STORAGE_KEY) === "true";
    setShouldAutoplay(!hasSeenVideo);
    setIsMuted(!hasSeenVideo);
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady || !shouldAutoplay || !videoRef.current) {
      return;
    }

    const videoElement = videoRef.current;
    videoElement.muted = true;
    setIsMuted(true);

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

  const syncMutedState = () => {
    setIsMuted(videoRef.current?.muted ?? false);
  };

  const toggleVideoPlayback = () => {
    const videoElement = videoRef.current;

    if (!videoElement) {
      return;
    }

    if (!videoElement.paused && videoElement.muted) {
      videoElement.muted = false;
      setIsMuted(false);
      return;
    }

    if (videoElement.paused || videoElement.ended) {
      if (videoElement.ended) {
        videoElement.currentTime = 0;
      }

      if (videoElement.muted) {
        videoElement.muted = false;
        setIsMuted(false);
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
    <section className="relative overflow-hidden rounded-[2.75rem] px-4 py-6 sm:px-6 sm:py-10 lg:px-10 lg:py-12">
      <h1 className="sr-only">Accueil BOBBEE</h1>

      <div className="pointer-events-none absolute inset-0 honeycomb-overlay opacity-[0.14]" />
      <div className="pointer-events-none absolute left-1/2 top-10 h-56 w-[82%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(248,216,116,0.34),rgba(248,216,116,0)_72%)] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 right-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(201,133,41,0.18),rgba(201,133,41,0)_72%)] blur-3xl" />

      <div className="relative">
        <div className="mx-auto max-w-3xl text-center animate-fade-up-soft">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-honey-700/85">
            Bienvenue dans la ruche
          </p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-hive-ink sm:text-5xl lg:text-[3.55rem]">
            L&apos;onboarding BOBBEE prend vie
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-hive-ink/72 sm:text-base">
            Decouvrez la video d&apos;accueil puis retrouvez les reperes essentiels juste en dessous, dans
            une interface plus douce, plus legere et plus lisible.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.75fr)_minmax(0,0.78fr)] lg:items-start xl:gap-10">
          <div className="order-2 lg:order-1 lg:pt-8">
            <SpotlightFigure spotlight={featuredSpotlight} delayMs={180} />
          </div>

          <div className="order-1 lg:order-2">
            <div
              className="relative mx-auto w-full max-w-[68rem] animate-fade-up-soft"
              style={{ animationDelay: "120ms" }}
            >
              <div className="pointer-events-none absolute inset-x-6 -inset-y-8 rounded-[3rem] bg-[radial-gradient(circle_at_center,rgba(248,216,116,0.4),rgba(248,216,116,0)_72%)] blur-3xl" />
              <div className="relative">
                <video
                  ref={videoRef}
                  className="block max-h-[84vh] min-h-[22rem] w-full cursor-pointer rounded-[2.8rem] border border-white/50 bg-transparent object-contain shadow-[0_28px_72px_rgba(104,67,16,0.2)] ring-1 ring-honey-200/70 transition duration-300 hover:shadow-[0_34px_82px_rgba(104,67,16,0.26)] focus-ring sm:min-h-[28rem] lg:min-h-[36rem]"
                  playsInline
                  preload="metadata"
                  poster="/images/BOBBEE.jpg"
                  aria-label="Video d'accueil BOBBEE. Appuyez sur Entree ou Espace pour lire ou mettre en pause."
                  autoPlay={shouldAutoplay}
                  muted={shouldAutoplay}
                  tabIndex={0}
                  onClick={toggleVideoPlayback}
                  onKeyDown={handleVideoKeyDown}
                  onPlay={() => {
                    setIsPlaying(true);
                    syncMutedState();
                    markVideoAsSeen();
                  }}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                  onVolumeChange={syncMutedState}
                >
                  <source src={videoSrc} />
                  Votre navigateur ne supporte pas la lecture video.
                </video>

                {!isPlaying ? (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/60 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.94),rgba(255,248,235,0.78))] text-honey-700 shadow-[0_18px_40px_rgba(104,67,16,0.14)] backdrop-blur-sm sm:h-24 sm:w-24 lg:h-28 lg:w-28">
                      <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8 fill-current sm:h-10 sm:w-10 lg:h-11 lg:w-11" aria-hidden="true">
                        <path d="M8 6.5v11l9-5.5-9-5.5z" />
                      </svg>
                    </div>
                  </div>
                ) : null}

                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center px-4 pb-5">
                  <div
                    className={`rounded-full border border-white/45 bg-[linear-gradient(135deg,rgba(74,52,23,0.78),rgba(74,52,23,0.58))] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/88 shadow-[0_10px_24px_rgba(53,39,25,0.18)] backdrop-blur-sm transition duration-300 ${isPlaying && isMuted ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
                  >
                    Activer le son
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-3 space-y-6 lg:pt-2">
            {sideSpotlights.map((spotlight, index) => (
              <SpotlightFigure key={spotlight.label} spotlight={spotlight} delayMs={260 + index * 70} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
