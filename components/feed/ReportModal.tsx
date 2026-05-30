"use client";

import { useState } from "react";
import { Modal } from "@/components/common/Modal";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { REPORT_REASONS } from "@/utils/constants";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurantId: string;
  restaurantName: string;
}

export function ReportModal({
  isOpen,
  onClose,
  restaurantId,
  restaurantName,
}: ReportModalProps) {
  const [reason, setReason] = useState<string>(REPORT_REASONS[0]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await fetch("/api/restaurants/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ restaurant_id: restaurantId, reason }),
      });
      setSubmitted(true);
      setTimeout(onClose, 1500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="520px">
      {submitted ? (
        <>
          <div className="modal-title">Report<br />Submitted.</div>
          <p className="modal-sub">
            Thanks for helping keep PALATR accurate.
          </p>
        </>
      ) : (
        <>
          <div className="modal-title">Report<br />Restaurant</div>
          <p className="modal-sub">
            Help us keep PALATR accurate.{" "}
            <span style={{ color: "var(--primary2)", fontWeight: 600 }}>
              {restaurantName}
            </span>
          </p>

          <Select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          >
            {REPORT_REASONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </Select>

          <Button
            variant="primary"
            size="lg"
            className="mt-6"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Report"}
          </Button>
          <Button variant="secondary" size="lg" onClick={onClose}>
            Cancel
          </Button>
        </>
      )}
    </Modal>
  );
}
