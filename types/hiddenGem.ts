export type GemType = "street food" | "food truck" | "stall" | "custom";
export type GemStatus = "pending" | "approved" | "rejected";

export interface HiddenGem {
  id: string;
  name: string;
  description: string;
  gem_type: GemType | string;
  status: GemStatus;
  image_url: string;
  gallery_urls?: string[];
  latitude?: number;
  longitude?: number;
  maps_link?: string;
  must_try_dishes?: string;
  submitted_by: string;
  created_at: string;
  // Aggregated
  likes_count?: number;
  reviews_count?: number;
  user_has_liked?: boolean;
  distance_km?: number;
}
