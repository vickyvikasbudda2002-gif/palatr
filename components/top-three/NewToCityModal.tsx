"use client";

import { Modal } from "@/components/common/Modal";
import { Button } from "@/components/ui/button";

interface NewToCityModalProps {
  isOpen: boolean;
  city: string;
  onYes: () => void;
  onNo: () => void;
}

export function NewToCityModal({ isOpen, city, onYes, onNo }: NewToCityModalProps) {
  return (
    <Modal isOpen={isOpen} maxWidth="600px">
      <div className="modal-title">
        Are you new<br />to{" "}
        <span style={{ color: "var(--primary)" }}>{city}</span>?
      </div>
      <p className="modal-sub">
        Let us customize your experience based on how well you know the city.
      </p>

      <Button variant="primary" size="lg" className="mt-8" onClick={onYes}>
        Yes! Continue to home feed
      </Button>
      <Button variant="secondary" size="lg" onClick={onNo}>
        No! I know the city well
      </Button>
    </Modal>
  );
}
