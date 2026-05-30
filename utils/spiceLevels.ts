export const SPICE_LEVELS = [
  { value: "mild", label: "Mild 🌿" },
  { value: "medium", label: "Medium 🌶️" },
  { value: "spicy", label: "Spicy 🔥" },
  { value: "andhra", label: "Andhra Level ☠️" },
] as const;

export type SpiceLevel = (typeof SPICE_LEVELS)[number]["value"];
