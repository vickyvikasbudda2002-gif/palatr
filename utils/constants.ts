export const APP_NAME = "PALATR";
export const APP_TAGLINE = "Taste where you belong.";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://palatr.in";

export const FOOD_PREFERENCES = [
  { value: "", label: "Choose your preference" },
  { value: "veg", label: "Veg 🥦" },
  { value: "nonveg", label: "Non Veg 🍗" },
  { value: "eggetarian", label: "Eggetarian 🥚" },
  { value: "both", label: "Both" },
] as const;

export const RESTAURANT_TYPES = [
  { value: "veg", label: "Veg" },
  { value: "nonveg", label: "Non Veg" },
  { value: "eggetarian", label: "Eggetarian" },
  { value: "both", label: "Both" },
] as const;

export const GEM_TYPES = [
  { value: "street food", label: "Street Food" },
  { value: "food truck", label: "Food Truck" },
  { value: "stall", label: "Stall" },
  { value: "custom", label: "Custom" },
] as const;

export const REPORT_REASONS = [
  "Price Increased",
  "Closed Permanently",
  "Wrong Location",
  "Bad Data",
  "Not Authentic",
  "Spam",
] as const;

export const SORT_OPTIONS = [
  { value: "likes", label: "Sort by Likes" },
  { value: "spicy", label: "Spiciness" },
  { value: "distance", label: "Distance" },
  { value: "az", label: "A-Z" },
] as const;

export const FILTER_OPTIONS = [
  { value: "all", label: "All Filters" },
  { value: "veg", label: "Veg" },
  { value: "nonveg", label: "Non Veg" },
  { value: "spicy", label: "Spicy" },
  { value: "eggetarian", label: "Eggetarian" },
] as const;

export const OTP_EXPIRY_MINUTES = 10;
export const MAX_GALLERY_IMAGES = 5;
export const MAX_REVIEW_TAGS = 5;
export const MAX_MUST_TRY_LENGTH = 30;
export const MAX_HASHTAG_LENGTH = 30;
