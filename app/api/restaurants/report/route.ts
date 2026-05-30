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

  const { restaurant_id, reason } = await request.json();

  if (!restaurant_id || !reason) {
    return NextResponse.json(
      { error: "restaurant_id and reason required" },
      { status: 400 }
    );
  }

  const { error } = await supabase.from("reports").insert({
    user_id: user.id,
    target_id: restaurant_id,
    target_type: "restaurant",
    reason,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Report submitted. Thank you." });
}
