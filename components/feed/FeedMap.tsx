"use client";

import { useEffect, useRef, useMemo } from "react";
import { useLocationStore } from "@/store/locationStore";
import type { Restaurant } from "@/types/restaurant";
import { haversineDistance } from "@/utils/haversine";
import { formatDistance } from "@/utils/formatDistance";

interface FeedMapProps {
  restaurants: Restaurant[];
}

// We load Leaflet dynamically to avoid SSR issues
export function FeedMap({ restaurants }: FeedMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const userMarkerRef = useRef<any>(null);
  const { lat: userLat, lon: userLon, requestLocation } = useLocationStore();

  // Only restaurants with valid coordinates
  const mappableRestaurants = useMemo(
    () => restaurants.filter((r) => r.latitude && r.longitude),
    [restaurants]
  );

  // Initialize map once
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (mapInstanceRef.current) return;
    if (!mapRef.current) return;

    import("leaflet").then((L) => {
      // Fix default icon paths broken by webpack
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current!, {
        zoomControl: true,
        scrollWheelZoom: false, // prevent accidental scroll-zoom
        attributionControl: false,
      });

      // CartoDB Dark Matter (No Labels) — roads visible via CSS filter below
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png",
        {
          maxZoom: 19,
          subdomains: "abcd",
        }
      ).addTo(map);

      // Road labels layer on top — slightly brightened so they're readable
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png",
        {
          maxZoom: 19,
          subdomains: "abcd",
          opacity: 0.85,
        }
      ).addTo(map);

      // Minimal attribution in bottom-right
      L.control
        .attribution({ prefix: false, position: "bottomright" })
        .addAttribution(
          '© <a href="https://carto.com/" style="color:#ff2d5e">CARTO</a>'
        )
        .addTo(map);

      mapInstanceRef.current = map;

      // Default center: Bangalore
      map.setView([12.9716, 77.5946], 12);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Whenever a modal opens/closes it shifts layout — tell Leaflet to recalculate
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const timer = setTimeout(() => {
      mapInstanceRef.current?.invalidateSize();
    }, 350); // wait for modal animation to finish
    return () => clearTimeout(timer);
  });

  // Update restaurant pins whenever mappable restaurants change
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    import("leaflet").then((L) => {
      const map = mapInstanceRef.current;

      // Clear old markers
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      if (mappableRestaurants.length === 0) return;

      // Custom red restaurant pin SVG
      const redIcon = L.divIcon({
        className: "",
        html: `
          <div style="
            width:36px;height:36px;
            background:linear-gradient(145deg,#ff2d5e,#ff4d77);
            border-radius:50% 50% 50% 0;
            transform:rotate(-45deg);
            border:3px solid #fff;
            box-shadow:0 4px 15px rgba(255,45,94,0.5);
            display:flex;align-items:center;justify-content:center;
          ">
            <span style="transform:rotate(45deg);font-size:14px;line-height:1;">🍽️</span>
          </div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -38],
      });

      const bounds: [number, number][] = [];

      mappableRestaurants.forEach((r) => {
        const lat = r.latitude!;
        const lon = r.longitude!;
        bounds.push([lat, lon]);

        const distText =
          userLat && userLon
            ? `<span style="color:#ff4d77;font-size:11px;font-weight:600;">
                📍 ${formatDistance(haversineDistance(userLat, userLon, lat, lon))}
               </span>`
            : "";

        const typeLabel =
          r.type === "nonveg"
            ? "Non Veg 🍗"
            : r.type === "veg"
            ? "Veg 🥦"
            : r.type === "eggetarian"
            ? "Eggetarian 🥚"
            : "Veg & Non Veg";

        const popupContent = `
          <div style="
            font-family:'Plus Jakarta Sans',sans-serif;
            min-width:180px;max-width:220px;
            padding:4px 2px;
          ">
            <div style="font-weight:800;font-size:14px;color:#fff;margin-bottom:4px;line-height:1.3;">
              ${r.name}
            </div>
            <div style="font-size:11px;color:#8d8d8d;margin-bottom:6px;">${typeLabel}</div>
            ${distText}
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}"
              target="_blank"
              rel="noopener noreferrer"
              style="
                display:inline-block;margin-top:8px;
                padding:5px 12px;border-radius:20px;
                background:linear-gradient(145deg,#ff2d5e,#ff4d77);
                color:#fff;font-size:11px;font-weight:700;
                text-decoration:none;
              "
            >
              Get Directions
            </a>
          </div>`;

        const marker = L.marker([lat, lon], { icon: redIcon })
          .addTo(map)
          .bindPopup(popupContent, {
            maxWidth: 240,
            className: "palatr-popup",
          });

        markersRef.current.push(marker);
      });

      // Fit map to all restaurant pins (+ user if available)
      if (userLat && userLon) bounds.push([userLat, userLon]);
      if (bounds.length > 0) {
        map.fitBounds(bounds as any, { padding: [40, 40], maxZoom: 14 });
      }
    });
  }, [mappableRestaurants, userLat, userLon]);

  // Update / add user location marker reactively
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    import("leaflet").then((L) => {
      const map = mapInstanceRef.current;

      // Remove old user marker
      if (userMarkerRef.current) {
        userMarkerRef.current.remove();
        userMarkerRef.current = null;
      }

      if (!userLat || !userLon) return;

      // Blue pulsing user pin
      const userIcon = L.divIcon({
        className: "",
        html: `
          <div style="position:relative;width:20px;height:20px;">
            <div style="
              position:absolute;inset:0;
              background:rgba(59,130,246,0.3);
              border-radius:50%;
              animation:palatr-pulse 2s ease-out infinite;
            "></div>
            <div style="
              position:absolute;top:50%;left:50%;
              transform:translate(-50%,-50%);
              width:14px;height:14px;
              background:#3b82f6;
              border-radius:50%;
              border:2.5px solid #fff;
              box-shadow:0 2px 8px rgba(59,130,246,0.6);
            "></div>
          </div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        popupAnchor: [0, -14],
      });

      const userMarker = L.marker([userLat, userLon], { icon: userIcon })
        .addTo(map)
        .bindPopup(
          `<div style="font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;font-size:13px;color:#fff;">
            📍 You are here
          </div>`,
          { className: "palatr-popup", maxWidth: 160 }
        );

      userMarkerRef.current = userMarker;

      // Pan to include user location
      const allBounds: [number, number][] = [[userLat, userLon]];
      mappableRestaurants.forEach((r) => {
        if (r.latitude && r.longitude) allBounds.push([r.latitude, r.longitude]);
      });
      if (allBounds.length > 1) {
        map.fitBounds(allBounds as any, { padding: [40, 40], maxZoom: 14 });
      } else {
        map.setView([userLat, userLon], 13);
      }
    });
  }, [userLat, userLon, mappableRestaurants]);

  const hasPins = mappableRestaurants.length > 0;

  return (
    <div
      className="feed-map-wrapper"
      style={{
        borderRadius: "24px",
        overflow: "hidden",
        border: "1px solid var(--border)",
        background: "var(--surface)",
        marginBottom: "40px",
        position: "relative",
      }}
    >
      {/* Map header bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 20px",
          borderBottom: "1px solid var(--border)",
          background: "rgba(18,18,18,0.95)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "16px" }}>🗺️</span>
          <span style={{ fontWeight: 700, fontSize: "14px", color: "#fff" }}>
            Restaurant Map
          </span>
          {hasPins && (
            <span
              style={{
                background: "rgba(255,45,94,0.15)",
                border: "1px solid rgba(255,45,94,0.3)",
                color: "#ff4d77",
                fontSize: "11px",
                fontWeight: 700,
                padding: "2px 10px",
                borderRadius: "20px",
              }}
            >
              {mappableRestaurants.length} spots
            </span>
          )}
        </div>

        {!userLat && (
          <button
            onClick={requestLocation}
            style={{
              background: "linear-gradient(145deg,#ff2d5e,#ff4d77)",
              border: "none",
              color: "#fff",
              fontSize: "12px",
              fontWeight: 700,
              padding: "6px 16px",
              borderRadius: "20px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.filter = "brightness(1.15)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.filter = "brightness(1)"; }}
          >
            📍 Show My Location
          </button>
        )}

        {userLat && (
          <span
            style={{
              background: "rgba(59,130,246,0.15)",
              border: "1px solid rgba(59,130,246,0.3)",
              color: "#60a5fa",
              fontSize: "11px",
              fontWeight: 700,
              padding: "4px 12px",
              borderRadius: "20px",
            }}
          >
            📍 Location active
          </span>
        )}
      </div>

      {/* The actual map */}
      <div
        ref={mapRef}
        style={{
          height: "420px",
          width: "100%",
          filter: "brightness(1.35) contrast(1.1) saturate(0.9)",
        }}
      />

      {/* No-pins notice */}
      {!hasPins && (
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(18,18,18,0.9)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "8px 18px",
            fontSize: "12px",
            color: "var(--muted)",
            backdropFilter: "blur(10px)",
            whiteSpace: "nowrap",
            zIndex: 1000,
          }}
        >
          No location data for current restaurants
        </div>
      )}
    </div>
  );
}
