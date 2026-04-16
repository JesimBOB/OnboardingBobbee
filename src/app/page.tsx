"use client";

import { useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { homeHeroDestinations } from "@/data/home-hero-destinations";
import styles from "./page.module.css";

type HotspotDestination = {
  href: string;
  linkType: "internal" | "external";
};

const onboardingDestination = homeHeroDestinations.find((destination) => destination.id === "onboarding");
const installationDestination = homeHeroDestinations.find((destination) => destination.id === "installation");
const organigramDestination = homeHeroDestinations.find((destination) => destination.id === "organigram");
const bobbeeDestination: HotspotDestination = { href: "/bobbee", linkType: "internal" };
const usefulLinksDestination: HotspotDestination = { href: "/liens-utiles", linkType: "internal" };

function Hotspot({
  destination,
  className,
  ariaLabel
}: {
  destination: HotspotDestination | undefined;
  className: string;
  ariaLabel: string;
}) {
  if (!destination) {
    return null;
  }

  if (destination.linkType === "external") {
    return <a href={destination.href} target="_blank" rel="noreferrer" className={className} aria-label={ariaLabel} />;
  }

  return <Link href={destination.href} className={className} aria-label={ariaLabel} />;
}

export default function HomePage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const handlePlayVideo = () => {
    const videoElement = videoRef.current;

    if (!videoElement) {
      return;
    }

    videoElement.muted = false;

    if (videoElement.ended) {
      videoElement.currentTime = 0;
    }

    if (!videoElement.paused) {
      return;
    }

    setHasStarted(true);
    void videoElement.play();
  };

  return (
    <section className={styles.page}>
      <div className={`container-page ${styles.hero}`}>
        <div className={styles.mapPanel}>
          <div className={styles.mapCanvas}>
            <div className={styles.mapImageWrap}>
              <Image
                src="/images/carte-bobbee-land.png"
                alt="Carte BOBBEE land"
                width={1536}
                height={1024}
                priority
                className={styles.mapImage}
              />
              <Hotspot
                destination={onboardingDestination}
                className={`${styles.mapHotspot} ${styles.hotspotOnboarding}`}
                ariaLabel="Ouvrir la page onboarding"
              />
              <Hotspot
                destination={bobbeeDestination}
                className={`${styles.mapHotspot} ${styles.hotspotBobbee}`}
                ariaLabel="Ouvrir la page BOBBEE"
              />
              <Hotspot
                destination={organigramDestination}
                className={`${styles.mapHotspot} ${styles.hotspotOrganigram}`}
                ariaLabel="Ouvrir la page organigramme"
              />
              <Hotspot
                destination={usefulLinksDestination}
                className={`${styles.mapHotspot} ${styles.hotspotUsefulLinks}`}
                ariaLabel="Ouvrir la page liens utiles"
              />
              <Hotspot
                destination={installationDestination}
                className={`${styles.mapHotspot} ${styles.hotspotInstallation}`}
                ariaLabel="Ouvrir la page installation du poste"
              />
              <div className={styles.heroVideoWrap} data-started={hasStarted ? "true" : "false"}>
                <span className={styles.clickHint} aria-hidden="true">
                  clic here
                </span>
                <video
                  ref={videoRef}
                  className={styles.heroVideo}
                  muted
                  playsInline
                  preload="auto"
                  aria-label="Video d'introduction BOBBEE"
                  onClick={handlePlayVideo}
                  onPlay={() => setHasStarted(true)}
                >
                  <source src="/images/Vid%C3%A9o%20introduction%20site%20web.mp4" />
                  Votre navigateur ne supporte pas la lecture video.
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
