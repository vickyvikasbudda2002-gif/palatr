import { z } from "zod";

export const addRestaurantSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  maps_link: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  must_try_dishes: z.string().max(100).optional(),
  type: z.enum(["veg", "nonveg", "eggetarian", "both"]),
  image_url: z.string().optional(),
  gallery_urls: z.array(z.string()).optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});
