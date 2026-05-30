"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface OtpInputProps {
  gmailUsername: string;
  onGmailChange: (val: string) => void;
  onOtpChange: (val: string) => void;
  otp: string;
  flow: "signup" | "login";
}

export function OtpInput({
  gmailUsername,
  onGmailChange,
  onOtpChange,
  otp,
  flow,
}: OtpInputProps) {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState("");

  const sendOtp = async () => {
    if (!gmailUsername.trim()) {
      setSendError("Enter your Gmail username first.");
      return;
    }
    if (gmailUsername.includes("@")) {
      setSendError("Just enter the username — we add @gmail.com automatically.");
      return;
    }

    setSending(true);
    setSendError("");
    setSent(false);

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: `${gmailUsername}@gmail.com` }),
      });
      const json = await res.json();
      if (!res.ok) {
        setSendError(json.error ?? "Failed to send OTP. Please try again.");
      } else {
        setSent(true);
      }
    } catch {
      setSendError("Network error. Make sure the dev server is running.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      {/* Gmail input + Send OTP button */}
      <div
        className="grid gap-4 mt-4"
        style={{ gridTemplateColumns: "1fr auto" }}
      >
        <div className="gmail-wrap">
          <input
            type="text"
            placeholder="yourname"
            value={gmailUsername}
            onChange={(e) => onGmailChange(e.target.value)}
            autoComplete="email"
          />
          <span className="gmail-fixed">@gmail.com</span>
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={sendOtp}
          disabled={sending}
          style={{ marginTop: 0, whiteSpace: "nowrap" }}
        >
          {sending ? "Sending..." : sent ? "Resend OTP" : "Send OTP"}
        </Button>
      </div>

      {sendError && (
        <p className="text-sm mt-2" style={{ color: "var(--primary)" }}>
          {sendError}
        </p>
      )}

      {sent && (
        <p className="text-sm mt-2" style={{ color: "#4ade80" }}>
          ✓ OTP sent to {gmailUsername}@gmail.com — check your inbox
        </p>
      )}

      {/* OTP input */}
      <Input
        type="text"
        inputMode="numeric"
        maxLength={8}
        placeholder="Enter OTP from email"
        value={otp}
        onChange={(e) => onOtpChange(e.target.value.replace(/\D/g, ""))}
      />
    </div>
  );
}
