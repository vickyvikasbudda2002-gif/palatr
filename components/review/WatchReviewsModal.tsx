"use client";

import { useEffect } from "react";
import { Modal } from "@/components/common/Modal";
import { Button } from "@/components/ui/button";
import { useReviews } from "@/hooks/useReviews";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

interface WatchReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetId: string;
  targetType: "restaurant" | "gem";
  targetName: string;
}

export function WatchReviewsModal({
  isOpen,
  onClose,
  targetId,
  targetType,
  targetName,
}: WatchReviewsModalProps) {
  const { reviews, fetchReviews } = useReviews(targetId);

  useEffect(() => {
    if (isOpen && targetId) {
      fetchReviews(targetType);
    }
  }, [isOpen, targetId]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="640px">
      <div className="modal-title leading-tight">
        {targetName}<br />
        <span className="text-3xl" style={{ color: "var(--muted)" }}>
          Reviews
        </span>
      </div>
      <p className="modal-sub">Reviews shared by PALATR users.</p>

      <div className="mt-6 flex flex-col gap-4 max-h-[50vh] overflow-y-auto pr-1">
        {reviews.length === 0 ? (
          <div
            className="py-8 text-center rounded-2xl"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              color: "var(--muted)",
            }}
          >
            No reviews yet. Be the first to review!
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="p-5 rounded-2xl"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-lg">
                  ⭐ {review.rating}/10
                </span>
                {review.user && (
                  <span
                    className="text-xs px-3 py-1 rounded-full"
                    style={{
                      background: "rgba(255,45,94,0.1)",
                      color: "var(--primary2)",
                    }}
                  >
                    {review.user.first_name} · {review.user.home_state}
                  </span>
                )}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#d0d0d0" }}>
                {review.review_text}
              </p>
              {review.must_try && (
                <p className="mt-2 text-xs font-semibold" style={{ color: "var(--primary2)" }}>
                  Must try: {review.must_try}
                </p>
              )}
              {review.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {review.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full"
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        color: "var(--muted)",
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <Button variant="secondary" size="lg" className="mt-6" onClick={onClose}>
        Close
      </Button>
    </Modal>
  );
}
