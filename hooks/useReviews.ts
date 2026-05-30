"use client";

import { useReviewStore } from "@/store/reviewStore";

export function useReviews(targetId: string) {
  const { reviews, setReviews, addReview, markReviewed, hasReviewed } =
    useReviewStore();

  const fetchReviews = async (targetType: "restaurant" | "gem") => {
    const endpoint =
      targetType === "restaurant"
        ? `/api/restaurants/review?target_id=${targetId}`
        : `/api/hidden-gems/review?target_id=${targetId}`;

    const res = await fetch(endpoint);
    const json = await res.json();
    if (json.data) setReviews(targetId, json.data);
  };

  const submitReview = async (
    payload: {
      rating: number;
      review_text: string;
      must_try: string;
      tags: string[];
      food_type?: string;
    },
    targetType: "restaurant" | "gem"
  ) => {
    const endpoint =
      targetType === "restaurant"
        ? "/api/restaurants/review"
        : "/api/hidden-gems/review";

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, target_id: targetId, target_type: targetType }),
    });

    const json = await res.json();
    if (!res.ok) throw new Error(json.error ?? "Failed to submit review");

    addReview(json.data);
    markReviewed(targetId);
    return json.data;
  };

  return {
    reviews: reviews[targetId] ?? [],
    fetchReviews,
    submitReview,
    hasReviewed: hasReviewed(targetId),
  };
}
