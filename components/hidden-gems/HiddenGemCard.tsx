"use client";

import Image from "next/image";
import type { HiddenGem } from "@/types/hiddenGem";
import { generateMapsLink } from "@/utils/generateMapsLink";

interface HiddenGemCardProps {
  gem: HiddenGem;
  onLike: () => void;
}

export function HiddenGemCard({ gem, onLike }: HiddenGemCardProps) {
  const mapsUrl = generateMapsLink(gem.name, "Bangalore", gem.latitude, gem.longitude);

  return (
    <div
      className="relative overflow-hidden rounded-3xl cursor-pointer transition-all group"
      style={{
        height: "500px",
        background: "var(--surface)",
        border: "1px solid var(--border)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-8px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 20px 40px rgba(0,0,0,0.5)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "";
      }}
    >
      {/* Image */}
      <div className="absolute inset-0">
        <Image
          src={gem.image_url || "/images/placeholders/hidden-gem-placeholder.jpg"}
          alt={gem.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="absolute bottom-0 p-7 z-10 w-full">
        <span className="gem-badge">{gem.gem_type}</span>

        <h3
          className="text-4xl font-extrabold leading-tight mt-2"
          style={{ letterSpacing: "-1px" }}
        >
          {gem.name}
        </h3>

        <p className="mt-3 text-sm leading-relaxed" style={{ color: "#d0d0d0" }}>
          {gem.description}
        </p>

        {gem.must_try_dishes && (
          <p className="mt-2 text-xs font-semibold" style={{ color: "#d8b4fe" }}>
            Must try: {gem.must_try_dishes}
          </p>
        )}

        <div className="flex gap-3 mt-5">
          <button
            onClick={onLike}
            className="flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm text-white transition-all hover:brightness-110 active:scale-95"
            style={{
              background: gem.user_has_liked
                ? "linear-gradient(145deg, #8b5cf6, #c084fc)"
                : "rgba(255,255,255,0.12)",
              boxShadow: gem.user_has_liked
                ? "0 4px 15px rgba(139,92,246,0.3)"
                : "none",
            }}
          >
            🔥 {gem.likes_count ?? 0}
          </button>

          {gem.maps_link && (
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm text-white transition-all hover:bg-white/20"
              style={{ background: "rgba(255,255,255,0.1)" }}
            >
              📍 Maps
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
