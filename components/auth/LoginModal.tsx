"use client";

import { useState } from "react";
import { Modal } from "@/components/common/Modal";
import { Button } from "@/components/ui/button";
import { OtpInput } from "./OtpInput";

interface LoginModalProps {
  isOpen: boolean;
  onSuccess: () => void;
  onSwitchToSignup: () => void;
}

export function LoginModal({ isOpen, onSuccess, onSwitchToSignup }: LoginModalProps) {
  const [gmailUsername, setGmailUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!gmailUsername.trim()) { setError("Please enter your Gmail username."); return; }
    if (!otp || otp.length < 6) { setError("Please enter the OTP."); return; }

    setLoading(true);
    setError("");

    try {
      const email = `${gmailUsername}@gmail.com`;

      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const json = await res.json();
      if (!res.ok) { setError(json.error ?? "Login failed."); return; }
      if (!json.user) { setError("No account found. Please sign up first."); return; }

      // Session is set automatically via Supabase SSR cookies — no manual setSession needed
      onSuccess();
    } catch {
      setError("Something went wrong. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} maxWidth="680px">
      <div className="modal-title">Welcome<br />Back.</div>
      <p className="modal-sub">Login to your PALATR account.</p>

      <OtpInput
        gmailUsername={gmailUsername}
        onGmailChange={setGmailUsername}
        otp={otp}
        onOtpChange={setOtp}
        flow="login"
      />

      {error && <p className="text-sm mt-3" style={{ color: "var(--primary)" }}>{error}</p>}

      <Button variant="primary" size="lg" className="mt-6" onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>

      <p className="text-center mt-6 text-sm" style={{ color: "var(--muted)" }}>
        Don&apos;t have an account?{" "}
        <button onClick={onSwitchToSignup} className="text-[#ff2d5e] underline font-semibold">Sign up</button>
      </p>
    </Modal>
  );
}
