import type { Restaurant } from "@/types/restaurant";

export type SortOption = "likes" | "spicy" | "distance" | "az";

export function sortRestaurants(
  restaurants: Restaurant[],
  sortBy: SortOption
): Restaurant[] {
  const copy = [...restaurants];
  switch (sortBy) {
    case "likes":
      return copy.sort((a, b) => (b.likes_count ?? 0) - (a.likes_count ?? 0));
    case "distance":
      return copy.sort(
        (a, b) => (a.distance_km ?? Infinity) - (b.distance_km ?? Infinity)
      );
    case "az":
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case "spicy": {
      // Spiciness sort: nonveg > both > eggetarian > veg
      const spiceOrder: Record<string, number> = {
        nonveg: 3,
        both: 2,
        eggetarian: 1,
        veg: 0,
      };
      return copy.sort(
        (a, b) => (spiceOrder[b.type] ?? 0) - (spiceOrder[a.type] ?? 0)
      );
    }
    default:
      return copy;
  }
}
