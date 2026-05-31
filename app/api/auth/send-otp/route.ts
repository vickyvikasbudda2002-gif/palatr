import { NextRequest, NextResponse } from "next/server";
import { sendOtpSchema } from "@/lib/validations/auth";
import { createClient } from "@/lib/supabase/server";

// ── In-memory rate limiter: max 3 OTP requests per email per 10 minutes ──────
// (resets on server restart — good enough for serverless edge functions)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(email: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(email);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(email, { count: 1, resetAt: now + 10 * 60 * 1000 });
    return false;
  }

  if (entry.count >= 3) return true;

  entry.count++;
  return false;
}

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

    // Rate limit check
    if (isRateLimited(email)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait 10 minutes before trying again." },
        { status: 429 }
      );
    }

    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        // No emailRedirectTo — forces OTP code mode (not magic link)
      },
    });

    if (error) {
      // Log internally but return a generic message to the client
      console.error("[send-otp] Supabase error:", error.status, error.message);
      return NextResponse.json(
        { error: "Failed to send OTP. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "OTP sent to your email." });
  } catch (err) {
    console.error("[send-otp] Unexpected error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
