import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function PATCH(request: NextRequest) {
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

  const { id, type, updates } = await request.json();
  if (!id || !type || !updates) {
    return NextResponse.json(
      { error: "id, type, and updates required" },
      { status: 400 }
    );
  }

  const admin = createAdminClient();
  const table = type === "gem" ? "hidden_gems" : "restaurants";

  // Whitelist editable fields
  const allowed =
    type === "gem"
      ? ["name", "description", "gem_type", "maps_link", "must_try_dishes", "status"]
      : ["name", "description", "cuisine_state", "type", "maps_link", "must_try_dishes", "status"];

  const safeUpdates: Record<string, unknown> = {};
  for (const key of allowed) {
    if (updates[key] !== undefined) safeUpdates[key] = updates[key];
  }

  const { data, error } = await admin
    .from(table)
    .update(safeUpdates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data, message: "Updated." });
}
