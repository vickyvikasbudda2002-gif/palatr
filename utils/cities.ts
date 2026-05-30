export const ACTIVE_CITIES = ["Bangalore"] as const;

export const ALL_CITIES = [
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Mumbai",
  "Pune",
  "Kolkata",
  "Visakhapatnam",
  "Delhi",
  "Ahmedabad",
  "Jaipur",
] as const;

export type City = (typeof ALL_CITIES)[number];

export function isCityActive(city: string): boolean {
  return ACTIVE_CITIES.includes(city as (typeof ACTIVE_CITIES)[number]);
}
