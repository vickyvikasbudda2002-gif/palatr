import { create } from "zustand";
import type { Restaurant } from "@/types/restaurant";
import type { FilterOption } from "@/utils/filterRestaurants";
import type { SortOption } from "@/utils/sortRestaurants";

interface FeedState {
  restaurants: Restaurant[];
  isLoading: boolean;
  searchQuery: string;
  filter: FilterOption;
  sort: SortOption;
  setRestaurants: (restaurants: Restaurant[]) => void;
  setLoading: (loading: boolean) => void;
  setSearchQuery: (query: string) => void;
  setFilter: (filter: FilterOption) => void;
  setSort: (sort: SortOption) => void;
  toggleLike: (restaurantId: string) => void;
}

export const useFeedStore = create<FeedState>((set) => ({
  restaurants: [],
  isLoading: false,
  searchQuery: "",
  filter: "all",
  sort: "likes",
  setRestaurants: (restaurants) => set({ restaurants }),
  setLoading: (isLoading) => set({ isLoading }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setFilter: (filter) => set({ filter }),
  setSort: (sort) => set({ sort }),
  toggleLike: (restaurantId) =>
    set((state) => ({
      restaurants: state.restaurants.map((r) =>
        r.id === restaurantId
          ? {
              ...r,
              user_has_liked: !r.user_has_liked,
              // Fix: likes_count can never go below 0
              likes_count: r.user_has_liked
                ? Math.max(0, (r.likes_count ?? 0) - 1)
                : (r.likes_count ?? 0) + 1,
            }
          : r
      ),
    })),
}));
