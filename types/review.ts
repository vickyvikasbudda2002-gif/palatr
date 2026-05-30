export type TargetType = "restaurant" | "gem";

export interface Review {
  id: string;
  user_id: string;
  target_id: string;
  target_type: TargetType;
  rating: number;
  review_text: string;
  must_try: string;
  tags: string[];
  food_type?: string;
  created_at: string;
  // Joined
  user?: {
    first_name: string;
    home_state: string;
  };
}
