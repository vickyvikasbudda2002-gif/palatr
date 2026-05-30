"use client";

import { useEffect, useMemo } from "react";
import { useHiddenGemStore } from "@/store/hiddenGemStore";

export function useHiddenGems(userId?: string) {
  const { gems, isLoading, searchQuery, filter, setGems, setLoading, toggleLike } =
    useHiddenGemStore();

  useEffect(() => {
    if (!userId) return;

    async function fetchGems() {
      setLoading(true);
      try {
        const res = await fetch("/api/hidden-gems");
        if (!res.ok) { setGems([]); return; }
        const json = await res.json();
        setGems(json.data ?? []);
      } catch {
        setGems([]);
      } finally {
        setLoading(false);
      }
    }
    fetchGems();
  }, [userId]);

  const filteredGems = useMemo(() => {
    let result = [...gems];
    if (filter !== "all") {
      result = result.filter((g) =>
        g.gem_type.toLowerCase().includes(filter.toLowerCase())
      );
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (g) =>
          g.name.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q) ||
          g.gem_type.toLowerCase().includes(q)
      );
    }
    return result;
  }, [gems, filter, searchQuery]);

  const handleLike = async (gemId: string, currentlyLiked: boolean) => {
    toggleLike(gemId);
    const res = await fetch("/api/hidden-gems/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gem_id: gemId, unlike: currentlyLiked }),
    });
    if (!res.ok) toggleLike(gemId);
  };

  return { gems: filteredGems, isLoading, handleLike };
}
