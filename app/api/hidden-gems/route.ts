import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("hidden_gems")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Attach like counts and user_has_liked
  const ids = (data ?? []).map((g) => g.id);
  const { data: likes } = await supabase
    .from("likes")
    .select("target_id, user_id")
    .in("target_id", ids);

  const normalized = (data ?? []).map((g) => ({
    ...g,
    likes_count: (likes ?? []).filter((l) => l.target_id === g.id).length,
    user_has_liked: (likes ?? []).some(
      (l) => l.target_id === g.id && l.user_id === user.id
    ),
  }));

  return NextResponse.json({ data: normalized });
}
