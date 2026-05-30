import { NextRequest, NextResponse } from "next/server";
import { sendOtpSchema } from "@/lib/validations/auth";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = sendOtpSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const { email } = parsed.data;
    console.log("[send-otp] Sending OTP to:", email);

    const supabase = await createClient();

    // signInWithOtp sends a 6-digit code when:
    // 1. Supabase project has "Email OTP" enabled (not just magic link)
    // 2. No redirectTo is set
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        // Do NOT set emailRedirectTo — this forces OTP code mode
      },
    });

    if (error) {
      console.error("[send-otp] error code:", error.status);
      console.error("[send-otp] error message:", error.message);
      return NextResponse.json(
        { error: `${error.message}` },
        { status: 500 }
      );
    }

    console.log("[send-otp] Success for:", email);
    return NextResponse.json({ message: "OTP sent to your email." });
  } catch (err) {
    console.error("[send-otp] Unexpected error:", err);
    return NextResponse.json(
      { error: `Server error: ${err instanceof Error ? err.message : String(err)}` },
      { status: 500 }
    );
  }
}
