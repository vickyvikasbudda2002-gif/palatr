import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("users")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const admin = createAdminClient();

  const [
    { count: total_users },
    { count: total_restaurants },
    { count: pending_restaurants },
    { count: total_hidden_gems },
    { count: pending_hidden_gems },
    { count: total_reviews },
    { count: total_reports },
    { count: pending_deletion_requests },
    { count: waitlist_count },
  ] = await Promise.all([
    admin.from("users").select("*", { count: "exact", head: true }),
    admin.from("restaurants").select("*", { count: "exact", head: true }),
    admin
      .from("restaurants")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending"),
    admin.from("hidden_gems").select("*", { count: "exact", head: true }),
    admin
      .from("hidden_gems")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending"),
    admin.from("reviews").select("*", { count: "exact", head: true }),
    admin.from("reports").select("*", { count: "exact", head: true }),
    admin
      .from("deletion_requests")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending"),
    admin.from("waitlist").select("*", { count: "exact", head: true }),
  ]);

  return NextResponse.json({
    data: {
      total_users: total_users ?? 0,
      total_restaurants: total_restaurants ?? 0,
      pending_restaurants: pending_restaurants ?? 0,
      total_hidden_gems: total_hidden_gems ?? 0,
      pending_hidden_gems: pending_hidden_gems ?? 0,
      total_reviews: total_reviews ?? 0,
      total_reports: total_reports ?? 0,
      pending_deletion_requests: pending_deletion_requests ?? 0,
      waitlist_count: waitlist_count ?? 0,
    },
  });
}
