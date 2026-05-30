import { APP_URL } from "./constants";

interface Top3Entry {
  restaurantName: string;
  rating?: number;
  mustTry?: string;
}

export function formatTop3ShareText(
  homeState: string,
  city: string,
  entries: Top3Entry[]
): string {
  const lines = entries
    .filter((e) => e.restaurantName)
    .map((e, i) => {
      const rating = e.rating ? ` - ${e.rating}/10` : "";
      const dish = e.mustTry ? ` (Must try: ${e.mustTry})` : "";
      return `#${i + 1} ${e.restaurantName}${rating}${dish}`;
    });

  return [
    `Here are my top 3 authentic ${homeState} restaurants in ${city}! What are yours!? 🍛`,
    "",
    ...lines,
    "",
    `Find out at ${APP_URL}`,
    "#PALATR #AuthenticFood #TasteWhereYouBelong",
  ].join("\n");
}
