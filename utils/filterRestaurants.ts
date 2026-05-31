import type { Restaurant } from "@/types/restaurant";

export type FilterOption = "all" | "veg" | "nonveg" | "spicy" | "eggetarian";

// ── Shared type label — used by RestaurantCard and FeedMap ───────────────────
export function getTypeLabel(type: string): string {
  switch (type) {
    case "nonveg":     return "Non Veg 🍗";
    case "veg":        return "Veg 🥦";
    case "eggetarian": return "Eggetarian 🥚";
    case "both":       return "Veg & Non Veg";
    default:           return type;
  }
}

// ── HTML-escape user content before inserting into raw HTML strings ──────────
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

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
      (r.description ?? "").toLowerCase().includes(q) ||
      r.must_try_dishes?.toLowerCase().includes(q)
  );
}
