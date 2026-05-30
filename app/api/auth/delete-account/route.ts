import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const reason = body.reason ?? "";

  const admin = createAdminClient();

  // Log deletion request
  await admin.from("deletion_requests").upsert({
    user_id: user.id,
    reason,
    status: "pending",
  });

  return NextResponse.json({
    message:
      "Deletion request submitted. Your account will be deleted within 48 hours.",
  });
}
