"use client";

import React, { useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import "./EnvelopeCover.css";

export default function EnvelopeCover({ onComplete }) {
  const [stage, setStage] = useState("loading"); // loading -> settled -> exiting
  const [isDone, setIsDone] = useState(false);

  // runs once on mount: zoom-out reveal of the background
  React.useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setStage("settled"),
    });

    tl.set(".ec-bg", { opacity: 0, scale: 1.08 })
      .to(".ec-bg", { opacity: 1, duration: 0.8, ease: "power2.out" }, 0.2)
      .fromTo(
        ".ec-card-btn",
        { scale: 1.6 },
        {
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
        },
        0
      )
      .fromTo(
        ".ec-card-btn",
        { boxShadow: "0 0 0 rgba(0,0,0,0)" },
        {
          boxShadow: "0 25px 70px rgba(0,0,0,0.6)",
          duration: 1,
          ease: "power2.out",
        },
        0
      )
      .fromTo(
        ".ec-hint",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      );
  }, []);

  const handleEnter = () => {
    if (stage !== "settled") return;
    setStage("exiting");

    const tl = gsap.timeline({
      onComplete: () => {
        setIsDone(true);
        onComplete?.();
      },
    });

    tl.to(".ec-card-btn", {
      scale: 1.15,
      opacity: 0,
      duration: 0.55,
      ease: "power2.in",
    })
      .to(
        ".envelope-cover",
        { opacity: 0, duration: 0.55, ease: "power1.inOut" },
        "-=0.15"
      );
  };

  if (isDone) return null;

  return (
    <div className={`envelope-cover ec-stage-${stage}`}>
      {/* Decorative background */}
      <div className="ec-bg">
        <Image
          src="/background.jpg"
          alt="Decorative wedding background"
          fill
          priority
          className="ec-bg-img"
          sizes="100vw"
        />
      </div>

      {/* Envelope card, zooms out to reveal background */}
      <div className="ec-card-wrap">
        <button
          className="ec-card-btn"
          onClick={handleEnter}
          aria-label="Tap to open invitation"
        >
          <Image
            src="/closecoverr.jpg"
            alt="Wedding invitation envelope"
            fill
            priority
            className="ec-img"
            sizes="(max-width: 600px) 88vw, 480px"
          />
        </button>

        {stage === "settled" && (
          <span className="ec-hint">Tap to Open ✦</span>
        )}
      </div>
    </div>
  );
}