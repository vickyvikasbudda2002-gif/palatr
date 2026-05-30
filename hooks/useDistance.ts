"use client";

import { useMemo } from "react";
import { useLocationStore } from "@/store/locationStore";
import { haversineDistance } from "@/utils/haversine";
import { formatDistance } from "@/utils/formatDistance";

export function useDistance(lat?: number, lon?: number) {
  const { lat: userLat, lon: userLon } = useLocationStore();

  const distanceKm = useMemo(() => {
    if (!userLat || !userLon || !lat || !lon) return null;
    return haversineDistance(userLat, userLon, lat, lon);
  }, [userLat, userLon, lat, lon]);

  return {
    distanceKm,
    distanceLabel: distanceKm !== null ? formatDistance(distanceKm) : null,
  };
}
