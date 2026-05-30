"use client";

import { useEffect } from "react";
import { useAdminStore } from "@/store/adminStore";

export function useAdmin() {
  const {
    stats,
    pendingRestaurants,
    pendingGems,
    isLoading,
    setStats,
    setPendingRestaurants,
    setPendingGems,
    setLoading,
    removeRestaurant,
    removeGem,
  } = useAdminStore();

  const fetchStats = async () => {
    const res = await fetch("/api/admin/analytics");
    const json = await res.json();
    if (json.data) setStats(json.data);
  };

  const fetchPending = async () => {
    setLoading(true);
    try {
      const [rRes, gRes] = await Promise.all([
        fetch("/api/restaurants?status=pending"),
        fetch("/api/hidden-gems?status=pending"),
      ]);
      const [rJson, gJson] = await Promise.all([rRes.json(), gRes.json()]);
      setPendingRestaurants(rJson.data ?? []);
      setPendingGems(gJson.data ?? []);
    } finally {
      setLoading(false);
    }
  };

  const approve = async (id: string, type: "restaurant" | "gem") => {
    await fetch("/api/admin/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, type }),
    });
    type === "restaurant" ? removeRestaurant(id) : removeGem(id);
  };

  const reject = async (id: string, type: "restaurant" | "gem") => {
    await fetch("/api/admin/reject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, type }),
    });
    type === "restaurant" ? removeRestaurant(id) : removeGem(id);
  };

  return {
    stats,
    pendingRestaurants,
    pendingGems,
    isLoading,
    fetchStats,
    fetchPending,
    approve,
    reject,
  };
}
