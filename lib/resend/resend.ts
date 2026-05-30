import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOtpEmail(
  email: string,
  otp: string
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey || apiKey.includes("your_resend")) {
    console.error("[Resend] RESEND_API_KEY is not configured in .env.local");
    return false;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: `${otp} is your PALATR verification code`,
      html: `
        <div style="font-family: 'Plus Jakarta Sans', sans-serif; background: #070707; color: #fff; padding: 40px; border-radius: 16px; max-width: 480px; margin: 0 auto;">
          <h1 style="font-size: 32px; font-weight: 900; letter-spacing: -1px; margin-bottom: 8px;">PALATR.</h1>
          <p style="color: #8d8d8d; margin-bottom: 32px;">Taste where you belong.</p>
          <div style="background: #121212; border-radius: 16px; padding: 32px; text-align: center; border: 1px solid rgba(255,255,255,0.08);">
            <p style="color: #8d8d8d; margin-bottom: 16px; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Your verification code</p>
            <div style="font-size: 48px; font-weight: 900; letter-spacing: 8px; color: #ff2d5e;">${otp}</div>
            <p style="color: #8d8d8d; margin-top: 16px; font-size: 13px;">Expires in 10 minutes. Do not share this code.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("[Resend] Failed to send email:", JSON.stringify(error));
      return false;
    }

    console.log("[Resend] Email sent successfully. ID:", data?.id);
    return true;
  } catch (err) {
    console.error("[Resend] Exception while sending email:", err);
    return false;
  }
}
