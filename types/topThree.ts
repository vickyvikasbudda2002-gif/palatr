export interface TopThreeEntry {
  id: string;
  user_id: string;
  rank: 1 | 2 | 3;
  restaurant_id: string;
  custom_dish: string;
  created_at: string;
  // Joined
  restaurant?: {
    name: string;
    cuisine_state: string;
  };
}

export interface TopThreeSubmission {
  entries: {
    rank: 1 | 2 | 3;
    restaurant_id: string;
    custom_dish: string;
  }[];
}
