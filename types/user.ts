export type SpiceTolerance = "mild" | "medium" | "spicy" | "andhra";
export type FoodPreference = "veg" | "nonveg" | "eggetarian" | "both";

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name?: string;
  home_state: string;
  current_city: string;
  spice_tolerance: SpiceTolerance;
  food_pref: FoodPreference;
  is_admin: boolean;
  created_at: string;
}

export interface UserSession {
  id: string;
  email: string;
  first_name: string;
  home_state: string;
  current_city: string;
  is_admin: boolean;
}
