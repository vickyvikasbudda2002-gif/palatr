import type { Restaurant } from "@/types/restaurant";

export type FilterOption = "all" | "veg" | "nonveg" | "spicy" | "eggetarian";

export function filterRestaurants(
  restaurants: Restaurant[],
  filter: FilterOption
): Restaurant[] {
  if (filter === "all") return restaurants;
  if (filter === "spicy") {
    return restaurants.filter((r) => r.type === "nonveg" || r.type === "both");
  }
  return restaurants.filter((r) => r.type === filter);
}

export function searchRestaurants(
  restaurants: Restaurant[],
  query: string
): Restaurant[] {
  if (!query.trim()) return restaurants;
  const q = query.toLowerCase();
  return restaurants.filter(
    (r) =>
      r.name.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.must_try_dishes?.toLowerCase().includes(q)
  );
}
