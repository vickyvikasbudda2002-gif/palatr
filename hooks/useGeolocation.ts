"use client";

import { useLocationStore } from "@/store/locationStore";

export function useGeolocation() {
  const { lat, lon, error, isLoading, requestLocation } = useLocationStore();

  return {
    lat,
    lon,
    error,
    isLoading,
    requestLocation,
    hasLocation: lat !== null && lon !== null,
  };
}
