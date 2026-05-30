"use client";

import { useState } from "react";
import { Modal } from "@/components/common/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetId: string;
  targetType: "restaurant" | "gem";
  targetName: string;
  onSubmit: (data: {
    rating: number;
    review_text: string;
    must_try: string;
    tags: string[];
    food_type: string;
  }) => Promise<void>;
}

export function ReviewModal({
  isOpen,
  onClose,
  targetName,
  onSubmit,
}: ReviewModalProps) {
  const [rating, setRating] = useState("");
  const [tags, setTags] = useState("");
  const [mustTry, setMustTry] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [foodType, setFoodType] = useState("Veg");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const ratingNum = parseInt(rating);
    if (!ratingNum || ratingNum < 1 || ratingNum > 10) {
      setError("Rating must be between 1 and 10.");
      return;
    }
    if (!reviewText.trim()) {
      setError("Please write a review.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await onSubmit({
        rating: ratingNum,
        review_text: reviewText,
        must_try: mustTry,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        food_type: foodType,
      });
      // Reset
      setRating("");
      setTags("");
      setMustTry("");
      setReviewText("");
      onClose();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="600px">
      <div className="modal-title">
        Review<br />Restaurant
      </div>
      <p className="modal-sub">{targetName}</p>

      <Input
        type="number"
        min={1}
        max={10}
        placeholder="Rate out of 10 *"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
      <Input
        maxLength={30}
        placeholder="#hashtags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <Input
        maxLength={30}
        placeholder="Must try dish"
        value={mustTry}
        onChange={(e) => setMustTry(e.target.value)}
      />
      <Textarea
        placeholder="Write your review..."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />

      {/* Food type toggle */}
      <div className="flex gap-3 mt-4">
        {["Veg", "Non Veg", "Both"].map((type) => (
          <button
            key={type}
            onClick={() => setFoodType(type)}
            className={`toggle-btn ${foodType === type ? "active" : ""}`}
          >
            {type}
          </button>
        ))}
      </div>

      {error && (
        <p className="text-sm mt-3" style={{ color: "var(--primary)" }}>
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
        {loading ? "Submitting..." : "Submit Review"}
      </Button>
    </Modal>
  );
}
