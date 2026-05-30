import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get user's home state
  const { data: profile } = await supabase
    .from("users")
    .select("home_state")
    .eq("id", user.id)
    .single();

  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  console.log("[restaurants] Fetching for state:", profile.home_state);

  // Fetch approved restaurants for user's state
  const { data: restaurants, error } = await supabase
    .from("restaurants")
    .select("*")
    .eq("cuisine_state", profile.home_state)
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[restaurants] Query error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!restaurants || restaurants.length === 0) {
    console.log("[restaurants] No restaurants found for state:", profile.home_state);
    return NextResponse.json({ data: [] });
  }

  // Get like counts separately
  const restaurantIds = restaurants.map((r) => r.id);

  const { data: likes } = await supabase
    .from("likes")
    .select("target_id, user_id")
    .in("target_id", restaurantIds)
    .eq("target_type", "restaurant");

  const { data: reviews } = await supabase
    .from("reviews")
    .select("target_id")
    .in("target_id", restaurantIds)
    .eq("target_type", "restaurant");

  // Attach counts to each restaurant
  const normalized = restaurants.map((r) => ({
    ...r,
    likes_count: (likes ?? []).filter((l) => l.target_id === r.id).length,
    reviews_count: (reviews ?? []).filter((rv) => rv.target_id === r.id).length,
    user_has_liked: (likes ?? []).some(
      (l) => l.target_id === r.id && l.user_id === user.id
    ),
  }));

  // Sort by likes descending by default
  normalized.sort((a, b) => b.likes_count - a.likes_count);

  console.log("[restaurants] Returning", normalized.length, "restaurants");
  return NextResponse.json({ data: normalized });
}
