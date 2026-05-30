"use client";

import { useState } from "react";
import { Modal } from "@/components/common/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { OtpInput } from "./OtpInput";
import { INDIAN_STATES } from "@/utils/states";
import { SPICE_LEVELS } from "@/utils/spiceLevels";
import { FOOD_PREFERENCES } from "@/utils/constants";
import { createClient } from "@/lib/supabase/client";

interface SignupModalProps {
  isOpen: boolean;
  onSuccess: () => void;
  onSwitchToLogin: () => void;
}

export function SignupModal({ isOpen, onSuccess, onSwitchToLogin }: SignupModalProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gmailUsername, setGmailUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [homeState, setHomeState] = useState("");
  const [spiceTolerance, setSpiceTolerance] = useState("");
  const [foodPref, setFoodPref] = useState("");
  const [tncChecked, setTncChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    // All fields must be filled
    if (!firstName.trim()) { setError("First name is required."); return; }
    if (!gmailUsername.trim()) { setError("Please enter your Gmail username."); return; }
    if (!otpSent) { setError("Please send and verify the OTP first."); return; }
    if (!otp || otp.length < 6) { setError("Please enter the OTP sent to your email."); return; }
    if (!homeState) { setError("Please select where you are from."); return; }
    if (!spiceTolerance) { setError("Please choose your spice level."); return; }
    if (!foodPref) { setError("Please choose your food preference."); return; }
    if (!tncChecked) { setError("You must agree to the Terms & Conditions."); return; }

    setLoading(true);
    setError("");

    try {
      const email = `${gmailUsername}@gmail.com`;

      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email, otp,
          first_name: firstName,
          last_name: lastName,
          home_state: homeState,
          current_city: "Bangalore",
          spice_tolerance: spiceTolerance,
          food_pref: foodPref,
        }),
      });

      const json = await res.json();
      if (!res.ok) { setError(json.error ?? "Signup failed."); return; }

      if (json.access_token && json.refresh_token) {
        const supabase = createClient();
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: json.access_token,
          refresh_token: json.refresh_token,
        });
        if (sessionError) {
          console.error("[SignupModal] setSession error:", sessionError.message);
        }
      }

      onSuccess();
    } catch {
      setError("Network error. Is the dev server running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} maxWidth="680px">
      <div className="modal-title">Create your<br />taste profile.</div>
      <p className="modal-sub">Join PALATR and discover restaurants your people actually love.</p>

      {/* Name row */}
      <div className="grid gap-4 mt-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <Input placeholder="First Name *" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <Input placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>

      {/* OTP input — passes back whether OTP was successfully sent */}
      <OtpInput
        gmailUsername={gmailUsername}
        onGmailChange={setGmailUsername}
        otp={otp}
        onOtpChange={setOtp}
        onOtpSent={setOtpSent}
        flow="signup"
      />

      {/* State + City row */}
      <div className="grid gap-4 mt-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <Select value={homeState} onChange={(e) => setHomeState(e.target.value)}>
          <option value="">Where are you from? *</option>
          {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
        </Select>
        <Select value="Bangalore" disabled>
          <option value="Bangalore">Living In: Bangalore</option>
        </Select>
      </div>

      {/* Spice + Food pref row */}
      <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <Select value={spiceTolerance} onChange={(e) => setSpiceTolerance(e.target.value)}>
          {SPICE_LEVELS.map((s) => (
            <option key={s.value} value={s.value} disabled={s.value === ""}>
              {s.label}
            </option>
          ))}
        </Select>
        <Select value={foodPref} onChange={(e) => setFoodPref(e.target.value)}>
          {FOOD_PREFERENCES.map((f) => (
            <option key={f.value} value={f.value} disabled={f.value === ""}>
              {f.label}
            </option>
          ))}
        </Select>
      </div>

      {/* T&C */}
      <div className="flex items-start gap-3 mt-5">
        <input
          type="checkbox"
          id="tnc"
          checked={tncChecked}
          onChange={(e) => setTncChecked(e.target.checked)}
          className="mt-1 accent-[#ff2d5e] scale-110 cursor-pointer"
        />
        <label htmlFor="tnc" className="text-xs leading-relaxed cursor-pointer" style={{ color: "var(--muted)" }}>
          I agree to the{" "}
          <a href="/terms" className="text-[#ff2d5e] underline font-semibold">Terms & Conditions</a>,{" "}
          <a href="/privacy" className="text-[#ff2d5e] underline font-semibold">Privacy Policy</a>,
          and confirm that any content I upload is accurate and compliant with community guidelines.
        </label>
      </div>

      {error && <p className="text-sm mt-3" style={{ color: "var(--primary)" }}>{error}</p>}

      <Button variant="primary" size="lg" className="mt-6" onClick={handleSubmit} disabled={loading}>
        {loading ? "Creating account..." : "Complete Signup"}
      </Button>

      <p className="text-center mt-6 text-sm" style={{ color: "var(--muted)" }}>
        Already have an account?{" "}
        <button onClick={onSwitchToLogin} className="text-[#ff2d5e] underline font-semibold">Login here</button>
      </p>
    </Modal>
  );
}
