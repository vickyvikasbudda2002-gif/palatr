export const SPICE_LEVELS = [
  { value: "", label: "Choose your spice level" },
  { value: "mild", label: "Mild 🌿" },
  { value: "medium", label: "Medium 🌶️" },
  { value: "spicy", label: "Spicy 🔥" },
] as const;

export type SpiceLevel = "mild" | "medium" | "spicy";
