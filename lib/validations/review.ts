import { z } from "zod";

export const reviewSchema = z.object({
  target_id: z.string().uuid(),
  target_type: z.enum(["restaurant", "gem"]),
  rating: z.number().int().min(1).max(10),
  review_text: z.string().min(5, "Review must be at least 5 characters"),
  must_try: z.string().max(30).optional().default(""),
  tags: z.array(z.string().max(20)).max(5).optional().default([]),
  food_type: z.string().optional(),
});
