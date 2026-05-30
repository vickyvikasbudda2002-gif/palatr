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

  const formData = await request.formData();
  const files = formData.getAll("files") as File[];
  const folder = (formData.get("folder") as string) ?? "restaurants";

  if (!files.length) {
    return NextResponse.json({ error: "No files provided" }, { status: 400 });
  }

  const admin = createAdminClient();
  const urls: string[] = [];

  for (const file of files.slice(0, 5)) {
    const ext = file.name.split(".").pop() ?? "jpg";
    const fileName = `${folder}/${user.id}-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { data, error } = await admin.storage
      .from("palatr-images")
      .upload(fileName, file, { contentType: file.type, upsert: false });

    if (!error && data) {
      const { data: urlData } = admin.storage
        .from("palatr-images")
        .getPublicUrl(data.path);
      urls.push(urlData.publicUrl);
    }
  }

  return NextResponse.json({ urls });
}
