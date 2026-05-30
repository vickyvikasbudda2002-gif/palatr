"use client";

import { useEffect, useState } from "react";

interface IntroScreenProps {
  onEnd: () => void;
}

export function IntroScreen({ onEnd }: IntroScreenProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => handleEnd(), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleEnd = () => {
    setVisible(false);
    setTimeout(onEnd, 1000);
  };

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden transition-opacity duration-1000"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        background: "linear-gradient(45deg, #000000, #1a050a, #000000)",
        backgroundSize: "400% 400%",
        animation: "gradientBG 10s ease infinite",
      }}
    >
      {/* Background video */}
      <video
        autoPlay
        muted
        playsInline
        loop
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.6 }}
      >
        <source src="/videos/intro.mp4" type="video/mp4" />
      </video>

      {/* Logo overlay */}
      <div className="relative z-10 text-center">
        <div
          className="text-8xl font-black text-white"
          style={{ letterSpacing: "-4px" }}
        >
          PALATR.
        </div>
        <p
          className="mt-4 text-lg font-medium tracking-widest uppercase"
          style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "6px" }}
        >
          Taste where you belong
        </p>
      </div>

      {/* Skip button */}
      <button
        onClick={handleEnd}
        className="absolute right-8 bottom-8 px-7 py-4 rounded-full font-bold text-white transition-all hover:bg-white/15 hover:-translate-y-0.5"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
        }}
      >
        Skip Intro
      </button>
    </div>
  );
}
