export interface AdminStats {
  total_users: number;
  total_restaurants: number;
  pending_restaurants: number;
  total_hidden_gems: number;
  pending_hidden_gems: number;
  total_reviews: number;
  total_reports: number;
  pending_deletion_requests: number;
  waitlist_count: number;
}

export interface Report {
  id: string;
  user_id: string;
  target_id: string;
  target_type: "restaurant" | "gem";
  reason: string;
  created_at: string;
  user?: { first_name: string; email: string };
  restaurant?: { name: string };
}

export interface DeletionRequest {
  id: string;
  user_id: string;
  reason?: string;
  status: "pending" | "completed";
  created_at: string;
  user?: { first_name: string; email: string; home_state: string };
}

export interface WaitlistEntry {
  id: string;
  email: string;
  target_city: string;
  created_at: string;
}
