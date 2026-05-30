import { create } from "zustand";
import type { Review } from "@/types/review";

interface ReviewState {
  reviews: Record<string, Review[]>; // keyed by target_id
  reviewedIds: Set<string>;
  setReviews: (targetId: string, reviews: Review[]) => void;
  addReview: (review: Review) => void;
  markReviewed: (targetId: string) => void;
  hasReviewed: (targetId: string) => boolean;
}

export const useReviewStore = create<ReviewState>((set, get) => ({
  reviews: {},
  reviewedIds: new Set(),
  setReviews: (targetId, reviews) =>
    set((state) => ({ reviews: { ...state.reviews, [targetId]: reviews } })),
  addReview: (review) =>
    set((state) => ({
      reviews: {
        ...state.reviews,
        [review.target_id]: [
          review,
          ...(state.reviews[review.target_id] ?? []),
        ],
      },
    })),
  markReviewed: (targetId) =>
    set((state) => ({
      reviewedIds: new Set(Array.from(state.reviewedIds).concat(targetId)),
    })),
  hasReviewed: (targetId) => get().reviewedIds.has(targetId),
}));
