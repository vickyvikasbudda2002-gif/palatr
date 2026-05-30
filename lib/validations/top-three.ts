import { z } from "zod";

export const topThreeSchema = z.object({
  entries: z
    .array(
      z.object({
        rank: z.union([z.literal(1), z.literal(2), z.literal(3)]),
        restaurant_id: z.string().uuid(),
        custom_dish: z.string().max(30).optional().default(""),
      })
    )
    .min(1)
    .max(3),
});
