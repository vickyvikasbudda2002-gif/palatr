"use client";

import { useEffect, useState } from "react";

interface IntroScreenProps {
  onEnd: () => void;
}

export function IntroScreen({ onEnd }: IntroScreenProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => handleEnd(), 10000);
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
        background: "#000",
      }}
    >
      {/* Background video — fills the entire screen */}
      <video
        autoPlay
        muted
        playsInline
        loop
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/intro.mp4" type="video/mp4" />
      </video>

      {/* Skip button */}
      <button
        onClick={handleEnd}
        className="absolute right-8 bottom-8 px-7 py-4 rounded-full font-bold text-white transition-all hover:bg-white/15 hover:-translate-y-0.5"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          zIndex: 10,
        }}
      >
        Skip Intro
      </button>
    </div>
  );
}
