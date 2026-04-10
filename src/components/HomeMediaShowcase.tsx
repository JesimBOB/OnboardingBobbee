"use client";

import Image from "next/image";
import Link from "next/link";
import { KeyboardEvent, useEffect, useRef, useState } from "react";

import styles from "./HomeMediaShowcase.module.css";

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

type SpotlightFigureProps = {
  spotlight: Spotlight;
  areaClassName: string;
  delayMs: number;
};

const VIDEO_SEEN_STORAGE_KEY = "bobbee-home-video-seen";

const onboardingSpotlight: Spotlight = {
  href: "/bobbee#mission",
  src: "/images/Image onboarding.png",
  alt: "Illustration onboarding BOBBEE",
  label: "Onboarding",
  sizes: "(min-width: 1360px) 220px, (min-width: 1180px) 220px, (min-width: 900px) 200px, 100vw",
  priority: true
};

const installationSpotlight: Spotlight = {
  href: "/liens-utiles",
  src: "/images/Image installation poste.png",
  alt: "Illustration installation du poste",
  label: "Installation du poste",
  sizes: "(min-width: 1360px) 220px, (min-width: 1180px) 220px, (min-width: 900px) 200px, 100vw"
};

const historySpotlight: Spotlight = {
  href: "/bobbee#histoire",
  src: "/images/Image histoire de BOBBEE.png",
  alt: "Illustration histoire de BOBBEE",
  label: "Histoire de BOBBEE",
  sizes: "(min-width: 1360px) 220px, (min-width: 1180px) 220px, (min-width: 900px) 200px, 100vw"
};

const orgChartSpotlight: Spotlight = {
  href: "/liens-utiles",
  src: "/images/Image organigramme.png",
  alt: "Illustration organigramme BOBBEE",
  label: "Organigramme",
  sizes: "(min-width: 1360px) 220px, (min-width: 1180px) 220px, (min-width: 900px) 200px, 100vw"
};

function SpotlightFigure({ spotlight, areaClassName, delayMs }: SpotlightFigureProps) {
  return (
    <Link
      href={spotlight.href}
      className={`${styles.sideCard} ${areaClassName}`}
      aria-label={spotlight.label}
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <figure className={styles.sideFigure}>
        <div className={styles.cardMedia}>
          <Image
            src={spotlight.src}
            alt={spotlight.alt}
            fill
            priority={spotlight.priority}
            sizes={spotlight.sizes}
            className={styles.cardImage}
          />
        </div>
        <figcaption className={styles.cardCaption}>{spotlight.label}</figcaption>
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
    <section className={styles.section}>
      <div className={styles.shell}>
        <h1 className="sr-only">Accueil BOBBEE</h1>

        <div className={styles.intro}>
          <p className={styles.eyebrow}>Bienvenue dans la ruche</p>
          <h2 className={styles.title}>L&apos;onboarding BOBBEE prend vie</h2>
          <p className={styles.description}>
            Decouvrez la video d&apos;accueil puis les reperes essentiels qui structurent votre parcours
            d&apos;arrivee chez BOBBEE.
          </p>
        </div>

        <div className={styles.mediaZone}>
          <SpotlightFigure
            spotlight={onboardingSpotlight}
            areaClassName={styles.cardOnboarding}
            delayMs={220}
          />

          <SpotlightFigure
            spotlight={installationSpotlight}
            areaClassName={styles.cardInstallation}
            delayMs={300}
          />

          <div className={styles.videoWrap} style={{ animationDelay: "160ms" }}>
            <div className={styles.videoCard}>
              <video
                ref={videoRef}
                className={styles.video}
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
                <div className={styles.playBadge} aria-hidden="true">
                  <svg viewBox="0 0 24 24" className={styles.playIcon}>
                    <path d="M8 6.5v11l9-5.5-9-5.5z" />
                  </svg>
                </div>
              ) : null}

              <div
                className={`${styles.soundHint} ${isPlaying && isMuted ? styles.soundHintVisible : ""}`}
                aria-hidden="true"
              >
                Activer le son
              </div>
            </div>
          </div>

          <SpotlightFigure
            spotlight={historySpotlight}
            areaClassName={styles.cardHistory}
            delayMs={380}
          />

          <SpotlightFigure
            spotlight={orgChartSpotlight}
            areaClassName={styles.cardOrganigram}
            delayMs={460}
          />
        </div>
      </div>
    </section>
  );
}
