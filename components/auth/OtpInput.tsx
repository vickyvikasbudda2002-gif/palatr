"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface OtpInputProps {
  gmailUsername: string;
  onGmailChange: (val: string) => void;
  onOtpChange: (val: string) => void;
  onOtpSent?: (sent: boolean) => void;
  otp: string;
  flow: "signup" | "login";
}

export function OtpInput({
  gmailUsername,
  onGmailChange,
  onOtpChange,
  onOtpSent,
  otp,
  flow,
}: OtpInputProps) {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Auto-dismiss toast after 3s
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
  };

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

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: `${gmailUsername}@gmail.com` }),
      });
      const json = await res.json();
      if (!res.ok) {
        const msg = json.error ?? "Failed to send OTP. Please try again.";
        setSendError(msg);
        showToast(msg, "error");
        setSent(false);
        onOtpSent?.(false);
      } else {
        setSent(true);
        onOtpSent?.(true);
        showToast("OTP sent — check your inbox.", "success");
      }
    } catch {
      const msg = "Network error. Make sure the dev server is running.";
      setSendError(msg);
      showToast(msg, "error");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="otp-input-root">
      {/* Toast notification */}
      {toast && (
        <div
          className="otp-toast"
          style={{
            background: toast.type === "success" ? "rgba(74,222,128,0.12)" : "rgba(255,45,94,0.12)",
            border: `1px solid ${toast.type === "success" ? "rgba(74,222,128,0.3)" : "rgba(255,45,94,0.3)"}`,
            color: toast.type === "success" ? "#4ade80" : "#ff8fa8",
          }}
        >
          <span>{toast.type === "success" ? "✓" : "✕"}</span>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Gmail input row */}
      <div className="otp-gmail-row">
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
          style={{ whiteSpace: "nowrap", flexShrink: 0 }}
        >
          {sending ? "Sending..." : sent ? "Resend OTP" : "Send OTP"}
        </Button>
      </div>

      {sendError && (
        <p className="text-sm mt-2" style={{ color: "var(--primary)" }}>
          {sendError}
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
