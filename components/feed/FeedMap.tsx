"use client";

import { useEffect, useRef, useMemo } from "react";
import { useLocationStore } from "@/store/locationStore";
import type { Restaurant } from "@/types/restaurant";
import { haversineDistance } from "@/utils/haversine";
import { formatDistance } from "@/utils/formatDistance";
import { getTypeLabel, escapeHtml } from "@/utils/filterRestaurants";

interface FeedMapProps {
  restaurants: Restaurant[];
}

export function FeedMap({ restaurants }: FeedMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const userMarkerRef = useRef<any>(null);
  const { lat: userLat, lon: userLon, requestLocation } = useLocationStore();

  const mappableRestaurants = useMemo(
    () => restaurants.filter((r) => r.latitude && r.longitude),
    [restaurants]
  );

  // ── Initialize map once ────────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (mapInstanceRef.current) return;
    if (!mapRef.current) return;

    import("leaflet").then((L) => {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current!, {
        zoomControl: true,
        scrollWheelZoom: false,
        attributionControl: false,
      });

      // Stadia Alidade Smooth Dark — roads clearly visible, dark but not pitch black
      L.tileLayer(
        "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
        { maxZoom: 20 }
      ).addTo(map);

      L.control
        .attribution({ prefix: false, position: "bottomright" })
        .addAttribution('© <a href="https://stadiamaps.com/" style="color:#ff2d5e">Stadia Maps</a>')
        .addTo(map);

      mapInstanceRef.current = map;
      map.setView([12.9716, 77.5946], 12);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // ── Invalidate size after modal open/close (run only when restaurants change) ──
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const t = setTimeout(() => mapInstanceRef.current?.invalidateSize(), 350);
    return () => clearTimeout(t);
  }, [mappableRestaurants]);

  // ── Restaurant pins ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    import("leaflet").then((L) => {
      const map = mapInstanceRef.current;
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      if (mappableRestaurants.length === 0) return;

      const redIcon = L.divIcon({
        className: "",
        html: `<div style="
            width:36px;height:36px;
            background:linear-gradient(145deg,#ff2d5e,#ff4d77);
            border-radius:50% 50% 50% 0;
            transform:rotate(-45deg);
            border:3px solid #fff;
            box-shadow:0 4px 15px rgba(255,45,94,0.5);
            display:flex;align-items:center;justify-content:center;">
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
            ? `<span style="color:#ff4d77;font-size:11px;font-weight:600;display:block;margin-bottom:6px;">
                📍 ${formatDistance(haversineDistance(userLat, userLon, lat, lon))}
               </span>`
            : "";

        const typeLabel = getTypeLabel(r.type);

        const popup = `
          <div style="font-family:'Plus Jakarta Sans',sans-serif;min-width:180px;max-width:220px;padding:4px 2px;">
            <div style="font-weight:800;font-size:14px;color:#fff;margin-bottom:4px;line-height:1.3;">${escapeHtml(r.name)}</div>
            <div style="font-size:11px;color:#8d8d8d;margin-bottom:6px;">${escapeHtml(typeLabel)}</div>
            ${distText}
            <a href="https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}"
               target="_blank" rel="noopener noreferrer"
               style="display:inline-block;padding:5px 12px;border-radius:20px;
                      background:linear-gradient(145deg,#ff2d5e,#ff4d77);
                      color:#fff;font-size:11px;font-weight:700;text-decoration:none;">
              Get Directions
            </a>
          </div>`;

        const marker = L.marker([lat, lon], { icon: redIcon })
          .addTo(map)
          .bindPopup(popup, { maxWidth: 240, className: "palatr-popup" });

        markersRef.current.push(marker);
      });

      const allBounds = [...bounds];
      if (userLat && userLon) allBounds.push([userLat, userLon]);
      if (allBounds.length > 0) {
        map.fitBounds(allBounds as any, { padding: [40, 40], maxZoom: 14 });
      }
    });
  }, [mappableRestaurants, userLat, userLon]);

  // ── User location marker — pans to exact user position ────────────────────
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    import("leaflet").then((L) => {
      const map = mapInstanceRef.current;

      if (userMarkerRef.current) {
        userMarkerRef.current.remove();
        userMarkerRef.current = null;
      }

      if (!userLat || !userLon) return;

      const userIcon = L.divIcon({
        className: "",
        html: `<div style="position:relative;width:22px;height:22px;">
          <div style="position:absolute;inset:0;background:rgba(59,130,246,0.3);
                      border-radius:50%;animation:palatr-pulse 2s ease-out infinite;"></div>
          <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
                      width:14px;height:14px;background:#3b82f6;border-radius:50%;
                      border:2.5px solid #fff;box-shadow:0 2px 8px rgba(59,130,246,0.6);"></div>
        </div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11],
        popupAnchor: [0, -14],
      });

      const marker = L.marker([userLat, userLon], { icon: userIcon })
        .addTo(map)
        .bindPopup(
          `<div style="font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;font-size:13px;color:#fff;">
            📍 You are here
          </div>`,
          { className: "palatr-popup", maxWidth: 160 }
        );

      userMarkerRef.current = marker;

      // Pan smoothly to user's exact location, then fit all bounds
      const allBounds: [number, number][] = [[userLat, userLon]];
      mappableRestaurants.forEach((r) => {
        if (r.latitude && r.longitude) allBounds.push([r.latitude, r.longitude]);
      });

      if (allBounds.length > 1) {
        map.flyToBounds(allBounds as any, { padding: [50, 50], maxZoom: 14, duration: 1.2 });
      } else {
        // No restaurant pins — fly directly to user
        map.flyTo([userLat, userLon], 15, { duration: 1.2 });
      }
    });
  }, [userLat, userLon, mappableRestaurants]);

  const hasPins = mappableRestaurants.length > 0;

  // ── Handle "Show My Location" click — request then pan ────────────────────
  const handleLocate = () => {
    if (typeof window === "undefined" || !navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        // Update the store
        useLocationStore.getState().setLocation(latitude, longitude);
        // Immediately pan the map
        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([latitude, longitude], 15, { duration: 1.2 });
        }
      },
      () => {
        // fallback to store's requestLocation for error handling
        requestLocation();
      }
    );
  };

  return (
    <div
      style={{
        borderRadius: "24px",
        overflow: "hidden",
        border: "1px solid var(--border)",
        background: "var(--surface)",
        marginBottom: "40px",
        position: "relative",
      }}
    >
      {/* Header bar */}
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
          <span style={{ fontWeight: 700, fontSize: "14px", color: "#fff" }}>Restaurant Map</span>
          {hasPins && (
            <span style={{
              background: "rgba(255,45,94,0.15)",
              border: "1px solid rgba(255,45,94,0.3)",
              color: "#ff4d77",
              fontSize: "11px",
              fontWeight: 700,
              padding: "2px 10px",
              borderRadius: "20px",
            }}>
              {mappableRestaurants.length} spots
            </span>
          )}
        </div>

        {!userLat ? (
          <button
            onClick={handleLocate}
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
              transition: "filter 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.filter = "brightness(1.15)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.filter = "brightness(1)"; }}
          >
            📍 Show My Location
          </button>
        ) : (
          <span style={{
            background: "rgba(59,130,246,0.15)",
            border: "1px solid rgba(59,130,246,0.3)",
            color: "#60a5fa",
            fontSize: "11px",
            fontWeight: 700,
            padding: "4px 12px",
            borderRadius: "20px",
          }}>
            📍 Location active
          </span>
        )}
      </div>

      {/* Map canvas */}
      <div ref={mapRef} style={{ height: "420px", width: "100%" }} />

      {!hasPins && (
        <div style={{
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
          zIndex: 1001,
        }}>
          No location data for current restaurants
        </div>
      )}
    </div>
  );
}
