import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { signupSchema } from "@/lib/validations/auth";

const verifySchema = z.object({
  email: z.string().email().refine((e) => e.endsWith("@gmail.com")),
  otp: z.string().min(6).max(8),
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

    // Verify OTP using server client — sets session cookie on response
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

    // Check if profile exists
    const admin = createAdminClient();
    const { data: existingProfile } = await admin
      .from("users")
      .select("id, email, first_name, home_state, current_city, is_admin")
      .eq("id", authUser.id)
      .single();

    if (existingProfile) {
      console.log("[verify-otp] Login:", existingProfile.first_name);
      return NextResponse.json({
        message: "Login successful.",
        action: "login",
        user: existingProfile,
        // Return tokens so client can set session explicitly
        access_token: session.access_token,
        refresh_token: session.refresh_token,
      });
    }

    // New user — save profile
    const profileParsed = signupSchema.safeParse(body);
    if (!profileParsed.success) {
      return NextResponse.json(
        { error: profileParsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const profile = profileParsed.data;

    // The Supabase trigger may have already created a row with empty fields.
    // Use upsert to overwrite with the real profile data.
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
        { onConflict: "id" } // always overwrite on conflict
      )
      .select("id, email, first_name, home_state, current_city, is_admin")
      .single();

    if (profileError) {
      console.error("[verify-otp] Profile error:", profileError.message);
      return NextResponse.json({ error: "Profile save failed." }, { status: 500 });
    }

    console.log("[verify-otp] Signup complete:", newProfile?.first_name);
    return NextResponse.json({
      message: "Account created.",
      action: "signup",
      user: newProfile,
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    });

  } catch (err) {
    console.error("[verify-otp] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
