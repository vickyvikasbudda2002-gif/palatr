"use client";

import { useState } from "react";
import type { TopThreeEntry } from "@/types/topThree";

export function useTopThree() {
  const [entries, setEntries] = useState<TopThreeEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTopThree = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/top-three");
      const json = await res.json();
      setEntries(json.data ?? []);
    } finally {
      setIsLoading(false);
    }
  };

  const saveTopThree = async (
    data: { rank: 1 | 2 | 3; restaurant_id: string; custom_dish: string }[]
  ) => {
    const res = await fetch("/api/top-three", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entries: data }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error ?? "Failed to save");
    return json;
  };

  return { entries, isLoading, fetchTopThree, saveTopThree };
}
