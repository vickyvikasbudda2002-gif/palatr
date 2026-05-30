import { z } from "zod";

export const sendOtpSchema = z.object({
  email: z
    .string()
    .email()
    .refine((e) => e.endsWith("@gmail.com"), {
      message: "Only @gmail.com addresses are accepted.",
    }),
});

export const verifyOtpSchema = z.object({
  email: z
    .string()
    .email()
    .refine((e) => e.endsWith("@gmail.com")),
  otp: z.string().min(6).max(8),
});

export const signupSchema = z.object({
  email: z
    .string()
    .email()
    .refine((e) => e.endsWith("@gmail.com")),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().optional(),
  home_state: z.string().min(1, "Home state is required"),
  current_city: z.string().min(1, "Current city is required"),
  spice_tolerance: z.enum(["mild", "medium", "spicy"], {
    errorMap: () => ({ message: "Please choose your spice level." }),
  }),
  food_pref: z.enum(["veg", "nonveg", "eggetarian", "both"], {
    errorMap: () => ({ message: "Please choose your food preference." }),
  }),
});
