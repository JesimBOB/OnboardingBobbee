"use client";

import { KeyboardEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { HomeHeroDestinationCard } from "./HomeHeroDestinationCard";
import styles from "./HomeMediaShowcase.module.css";
import { homeHeroDestinations } from "@/data/home-hero-destinations";

type HomeMediaShowcaseProps = {
  videoSrc: string;
};

const VIDEO_SEEN_STORAGE_KEY = "bobbee-home-video-seen";

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

        <div className={styles.heroStage}>
          <div className={styles.videoStage}>
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

          {homeHeroDestinations.map((destination) => (
            <HomeHeroDestinationCard key={destination.id} destination={destination} />
          ))}
        </div>

        <div className={styles.linksStage}>
          <Link href="/liens-utiles" className={styles.linksCard} aria-label="Acceder a la page des liens utiles">
            <article className={styles.destinationSurface}>
              <div className={`${styles.destinationMedia} ${styles.linksMedia}`}>
                <Image
                  src="/images/Liens documents.png"
                  alt="Illustration vers la page des liens utiles"
                  fill
                  sizes="(min-width: 1600px) 350px, (min-width: 1200px) 320px, 92vw"
                  className={styles.destinationImage}
                />
              </div>
            </article>
          </Link>
        </div>
      </div>
    </section>
  );
}
