export type RestaurantStatus = "pending" | "approved" | "rejected";
export type RestaurantType = "veg" | "nonveg" | "both" | "eggetarian";

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisine_state: string;
  type: RestaurantType;
  status: RestaurantStatus;
  image_url: string;
  gallery_urls?: string[];
  latitude?: number;
  longitude?: number;
  maps_link?: string;
  must_try_dishes?: string;
  submitted_by: string;
  created_at: string;
  // Aggregated fields
  likes_count?: number;
  reviews_count?: number;
  user_has_liked?: boolean;
  distance_km?: number;
}

export interface RestaurantWithDistance extends Restaurant {
  distance_km: number;
}
