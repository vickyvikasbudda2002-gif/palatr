import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { signupSchema } from "@/lib/validations/auth";

const verifySchema = z.object({
  email: z.string().email().refine((e) => e.endsWith("@gmail.com")),
  otp: z.string().length(6), // Supabase OTPs are exactly 6 digits
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parsed = verifySchema.safeParse({ email: body.email, otp: body.otp });
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const { email, otp } = parsed.data;
    console.log("[verify-otp] Verifying for:", email);

    // Verify OTP — sets session cookie on response
    const supabase = await createClient();
    const { data: verifyData, error: verifyError } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "email",
    });

    if (verifyError || !verifyData.user || !verifyData.session) {
      console.error("[verify-otp] Failed:", verifyError?.message);
      return NextResponse.json(
        { error: "Invalid or expired OTP. Please request a new one." },
        { status: 401 }
      );
    }

    const authUser = verifyData.user;
    const session = verifyData.session;
    console.log("[verify-otp] OTP verified for:", authUser.id);

    const admin = createAdminClient();

    // Check if a real profile exists (has first_name filled in)
    const { data: existingProfile } = await admin
      .from("users")
      .select("id, email, first_name, home_state, current_city, is_admin")
      .eq("id", authUser.id)
      .single();

    // Treat as LOGIN only if the profile has a real first_name saved
    // (not an empty trigger-created row)
    const isExistingUser =
      existingProfile &&
      existingProfile.first_name &&
      existingProfile.first_name.trim().length > 0;

    if (isExistingUser) {
      console.log("[verify-otp] Login:", existingProfile.first_name);
      return NextResponse.json({
        message: "Login successful.",
        action: "login",
        user: existingProfile,
        // Tokens intentionally omitted from body — Supabase SSR sets HttpOnly cookies
      });
    }

    // New user (or empty trigger row) — validate and save full profile
    const profileParsed = signupSchema.safeParse(body);
    if (!profileParsed.success) {
      console.error("[verify-otp] Profile validation failed:", profileParsed.error.errors);
      return NextResponse.json(
        { error: profileParsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const profile = profileParsed.data;

    // Upsert overwrites any empty trigger-created row with real data
    const { data: newProfile, error: profileError } = await admin
      .from("users")
      .upsert(
        {
          id: authUser.id,
          email,
          first_name: profile.first_name,
          last_name: profile.last_name ?? "",
          home_state: profile.home_state,
          current_city: profile.current_city,
          spice_tolerance: profile.spice_tolerance,
          food_pref: profile.food_pref,
          is_admin: false,
        },
        { onConflict: "id" }
      )
      .select("id, email, first_name, home_state, current_city, is_admin")
      .single();

    if (profileError) {
      console.error("[verify-otp] Profile upsert error:", profileError.message);
      return NextResponse.json({ error: "Profile save failed." }, { status: 500 });
    }

    console.log("[verify-otp] Signup complete:", newProfile?.first_name, "| state:", newProfile?.home_state);
    return NextResponse.json({
      message: "Account created.",
      action: "signup",
      user: newProfile,
      // Tokens intentionally omitted from body — Supabase SSR sets HttpOnly cookies
    });

  } catch (err) {
    console.error("[verify-otp] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
