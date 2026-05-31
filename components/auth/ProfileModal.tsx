"use client";

import { useState } from "react";
import { Modal } from "@/components/common/Modal";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [deletionLoading, setDeletionLoading] = useState(false);
  const [deletionRequested, setDeletionRequested] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    onClose();
    router.push("/");
  };

  const handleRequestDeletion = async () => {
    if (
      !confirm(
        "Are you sure you want to request account deletion? This will permanently wipe all your reviews, likes, and data."
      )
    )
      return;

    setDeletionLoading(true);
    try {
      const res = await fetch("/api/auth/delete-account", { method: "POST" });
      if (!res.ok) {
        alert("Failed to submit deletion request. Please try again.");
        return;
      }
      setDeletionRequested(true);
      setTimeout(async () => {
        await signOut();
        router.push("/");
      }, 2000);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setDeletionLoading(false);
    }
  };

  if (!user) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="560px">
      {deletionRequested ? (
        <>
          <div className="modal-title">Request<br />Submitted.</div>
          <p className="modal-sub">
            Your account will be deleted within 48 hours. Signing you out now.
          </p>
        </>
      ) : (
        <>
          <div className="modal-title">{user.first_name}</div>
          <p className="modal-sub">
            Home State:{" "}
            <span style={{ color: "var(--primary2)", fontWeight: 700 }}>
              {user.home_state}
            </span>
          </p>
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
            {user.email}
          </p>

          <Button variant="secondary" size="lg" className="mt-8" onClick={handleSignOut}>
            Sign Out
          </Button>

          <Button
            variant="danger"
            size="lg"
            onClick={handleRequestDeletion}
            disabled={deletionLoading}
          >
            {deletionLoading ? "Submitting..." : "Request Account Deletion"}
          </Button>

          <Button variant="secondary" size="lg" onClick={onClose}>
            Close
          </Button>
        </>
      )}
    </Modal>
  );
}
