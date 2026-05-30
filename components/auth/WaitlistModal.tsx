"use client";

import { useState } from "react";
import { Modal } from "@/components/common/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface WaitlistModalProps {
  isOpen: boolean;
  city: string;
  onBack: () => void;
}

export function WaitlistModal({ isOpen, city, onBack }: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, target_city: city }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Something went wrong.");
      } else {
        setSubmitted(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen}>
      {submitted ? (
        <>
          <div className="modal-title">
            You&apos;re<br />on the list.
          </div>
          <p className="modal-sub">
            We&apos;ll notify you the moment PALATR launches in{" "}
            <span style={{ color: "var(--primary2)", fontWeight: 700 }}>
              {city}
            </span>
            .
          </p>
          <Button variant="secondary" size="lg" className="mt-6" onClick={onBack}>
            ← Back to Cities
          </Button>
        </>
      ) : (
        <>
          <div className="modal-title">
            We&apos;re coming<br />to your city.
          </div>
          <p className="modal-sub">
            {city} is on our radar. Join the waitlist for early access.
          </p>
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
          {error && (
            <p className="text-sm mt-2" style={{ color: "var(--primary)" }}>
              {error}
            </p>
          )}
          <Button
            variant="primary"
            size="lg"
            className="mt-6"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Joining..." : "Join Waitlist"}
          </Button>
          <Button variant="secondary" size="lg" onClick={onBack}>
            ← Go Back
          </Button>
        </>
      )}
    </Modal>
  );
}
