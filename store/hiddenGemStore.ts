import { create } from "zustand";
import type { HiddenGem } from "@/types/hiddenGem";

interface HiddenGemState {
  gems: HiddenGem[];
  isLoading: boolean;
  searchQuery: string;
  filter: string;
  setGems: (gems: HiddenGem[]) => void;
  setLoading: (loading: boolean) => void;
  setSearchQuery: (query: string) => void;
  setFilter: (filter: string) => void;
  toggleLike: (gemId: string) => void;
}

export const useHiddenGemStore = create<HiddenGemState>((set) => ({
  gems: [],
  isLoading: false,
  searchQuery: "",
  filter: "all",
  setGems: (gems) => set({ gems }),
  setLoading: (isLoading) => set({ isLoading }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setFilter: (filter) => set({ filter }),
  toggleLike: (gemId) =>
    set((state) => ({
      gems: state.gems.map((g) =>
        g.id === gemId
          ? {
              ...g,
              user_has_liked: !g.user_has_liked,
              likes_count: g.user_has_liked
                ? (g.likes_count ?? 1) - 1
                : (g.likes_count ?? 0) + 1,
            }
          : g
      ),
    })),
}));
