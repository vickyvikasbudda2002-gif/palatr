"use client";

import Image from "next/image";
import type { Restaurant } from "@/types/restaurant";
import { generateMapsLink } from "@/utils/generateMapsLink";
import { formatDistance } from "@/utils/formatDistance";

interface RestaurantCardProps {
  restaurant: Restaurant;
  onLike: () => void;
  onReview: () => void;
  onWatchReviews: () => void;
  onReport: () => void;
}

export function RestaurantCard({
  restaurant,
  onLike,
  onReview,
  onWatchReviews,
  onReport,
}: RestaurantCardProps) {
  const mapsUrl = generateMapsLink(
    restaurant.name,
    "Bangalore",
    restaurant.latitude,
    restaurant.longitude
  );

  const typeLabel =
    restaurant.type === "nonveg"
      ? "Non Veg 🍗"
      : restaurant.type === "veg"
      ? "Veg 🥦"
      : restaurant.type === "eggetarian"
      ? "Eggetarian 🥚"
      : "Veg & Non Veg";

  return (
    <div className="palatr-card group">
      {/* Image */}
      <div className="absolute inset-0">
        <Image
          src={
            restaurant.image_url ||
            "/images/placeholders/restaurant-placeholder.jpg"
          }
          alt={restaurant.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="absolute bottom-0 p-7 z-10 w-full">
        <span className="card-tag">{typeLabel}</span>

        <h3
          className="text-4xl font-extrabold leading-tight"
          style={{ letterSpacing: "-1px" }}
        >
          {restaurant.name}
        </h3>

        <p className="mt-3 text-sm leading-relaxed" style={{ color: "#d0d0d0" }}>
          {restaurant.description}
        </p>

        {restaurant.must_try_dishes && (
          <p className="mt-2 text-xs font-semibold" style={{ color: "var(--primary2)" }}>
            Must try: {restaurant.must_try_dishes}
          </p>
        )}

        {restaurant.distance_km !== undefined && (
          <p className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
            📍 {formatDistance(restaurant.distance_km)}
          </p>
        )}

        {/* Action row */}
        <div className="flex gap-3 mt-5 flex-wrap">
          <button
            onClick={onLike}
            className="flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm text-white transition-all hover:brightness-110 active:scale-95"
            style={{
              background: restaurant.user_has_liked
                ? "linear-gradient(145deg, #ff2d5e, #ff4d77)"
                : "rgba(255,255,255,0.12)",
              boxShadow: restaurant.user_has_liked
                ? "0 4px 15px rgba(255,45,94,0.3)"
                : "none",
            }}
          >
            {restaurant.user_has_liked ? "❤️" : "🤍"}{" "}
            {restaurant.likes_count ?? 0}
          </button>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm text-white transition-all hover:bg-white/20"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            📍 Maps
          </a>
        </div>

        <button
          onClick={onReview}
          className="w-full mt-3 py-3 rounded-full font-bold text-sm text-white transition-all hover:bg-white/20"
          style={{ background: "rgba(255,255,255,0.1)" }}
        >
          Review this restaurant
        </button>

        <button
          onClick={onWatchReviews}
          className="w-full mt-2 py-3 rounded-full font-bold text-sm text-white transition-all hover:bg-[#333]"
          style={{ background: "#242424" }}
        >
          Watch Reviews ({restaurant.reviews_count ?? 0})
        </button>

        <button
          onClick={onReport}
          className="w-full mt-2 py-3 rounded-full font-bold text-sm transition-all"
          style={{
            background: "rgba(255,45,94,0.1)",
            color: "#ff8fa8",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(255,45,94,0.2)";
            (e.currentTarget as HTMLButtonElement).style.color = "#ffb3c1";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(255,45,94,0.1)";
            (e.currentTarget as HTMLButtonElement).style.color = "#ff8fa8";
          }}
        >
          Report Restaurant
        </button>
      </div>
    </div>
  );
}
