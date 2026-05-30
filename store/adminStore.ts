import { create } from "zustand";
import type { Restaurant } from "@/types/restaurant";
import type { HiddenGem } from "@/types/hiddenGem";
import type { AdminStats } from "@/types/admin";

interface AdminState {
  stats: AdminStats | null;
  pendingRestaurants: Restaurant[];
  pendingGems: HiddenGem[];
  isLoading: boolean;
  setStats: (stats: AdminStats) => void;
  setPendingRestaurants: (restaurants: Restaurant[]) => void;
  setPendingGems: (gems: HiddenGem[]) => void;
  setLoading: (loading: boolean) => void;
  removeRestaurant: (id: string) => void;
  removeGem: (id: string) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  stats: null,
  pendingRestaurants: [],
  pendingGems: [],
  isLoading: false,
  setStats: (stats) => set({ stats }),
  setPendingRestaurants: (pendingRestaurants) => set({ pendingRestaurants }),
  setPendingGems: (pendingGems) => set({ pendingGems }),
  setLoading: (isLoading) => set({ isLoading }),
  removeRestaurant: (id) =>
    set((state) => ({
      pendingRestaurants: state.pendingRestaurants.filter((r) => r.id !== id),
    })),
  removeGem: (id) =>
    set((state) => ({
      pendingGems: state.pendingGems.filter((g) => g.id !== id),
    })),
}));
