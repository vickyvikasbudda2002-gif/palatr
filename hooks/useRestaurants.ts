"use client";

import { useEffect, useMemo } from "react";
import { useFeedStore } from "@/store/feedStore";
import { useLocationStore } from "@/store/locationStore";
import { filterRestaurants, searchRestaurants } from "@/utils/filterRestaurants";
import { sortRestaurants } from "@/utils/sortRestaurants";
import { haversineDistance } from "@/utils/haversine";

export function useRestaurants(userId?: string) {
  const {
    restaurants,
    isLoading,
    searchQuery,
    filter,
    sort,
    setRestaurants,
    setLoading,
    toggleLike,
  } = useFeedStore();

  const { lat, lon } = useLocationStore();

  // Only fetch when we have a confirmed user session
  useEffect(() => {
    if (!userId) return;

    async function fetchRestaurants() {
      setLoading(true);
      try {
        const res = await fetch("/api/restaurants");
        if (!res.ok) {
          console.error("[useRestaurants] API error:", res.status);
          setRestaurants([]);
          return;
        }
        const json = await res.json();
        setRestaurants(json.data ?? []);
      } catch (err) {
        console.error("[useRestaurants] Fetch error:", err);
        setRestaurants([]);
      } finally {
        setLoading(false);
      }
    }

    fetchRestaurants();
  }, [userId]); // re-fetch if user changes

  const processedRestaurants = useMemo(() => {
    let result = [...restaurants];

    if (lat && lon && sort === "distance") {
      result = result.map((r) => ({
        ...r,
        distance_km:
          r.latitude && r.longitude
            ? haversineDistance(lat, lon, r.latitude, r.longitude)
            : undefined,
      }));
    }

    result = filterRestaurants(result, filter);
    result = searchRestaurants(result, searchQuery);
    result = sortRestaurants(result, sort);

    return result;
  }, [restaurants, filter, searchQuery, sort, lat, lon]);

  const handleLike = async (restaurantId: string, currentlyLiked: boolean) => {
    toggleLike(restaurantId);
    const endpoint = currentlyLiked
      ? "/api/restaurants/unlike"
      : "/api/restaurants/like";
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ restaurant_id: restaurantId }),
    });
    if (!res.ok) {
      toggleLike(restaurantId); // revert
    }
  };

  return { restaurants: processedRestaurants, isLoading, handleLike };
}
