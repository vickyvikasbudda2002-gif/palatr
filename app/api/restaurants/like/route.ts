import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { restaurant_id } = await request.json();
  if (!restaurant_id) {
    return NextResponse.json({ error: "restaurant_id required" }, { status: 400 });
  }

  const { error } = await supabase.from("likes").insert({
    user_id: user.id,
    target_id: restaurant_id,
    target_type: "restaurant",
  });

  if (error?.code === "23505") {
    // Already liked — unique constraint violation
    return NextResponse.json({ message: "Already liked." });
  }

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Liked." });
}
