/**
 * Maps a home state to a friendly cuisine label for display.
 */
export const CUISINE_MAP: Record<string, string> = {
  "Andhra Pradesh": "Andhra",
  "Arunachal Pradesh": "Arunachali",
  Assam: "Assamese",
  Bihar: "Bihari",
  Chhattisgarh: "Chhattisgarhi",
  Goa: "Goan",
  Gujarat: "Gujarati",
  Haryana: "Haryanvi",
  "Himachal Pradesh": "Himachali",
  Jharkhand: "Jharkhandi",
  Karnataka: "Kannadiga",
  Kerala: "Keralite",
  "Madhya Pradesh": "Madhya Pradeshi",
  Maharashtra: "Maharashtrian",
  Manipur: "Manipuri",
  Meghalaya: "Meghalayan",
  Mizoram: "Mizo",
  Nagaland: "Naga",
  Odisha: "Odia",
  Punjab: "Punjabi",
  Rajasthan: "Rajasthani",
  Sikkim: "Sikkimese",
  "Tamil Nadu": "Tamil",
  Telangana: "Telangana",
  Tripura: "Tripuri",
  "Uttar Pradesh": "UP",
  Uttarakhand: "Uttarakhandi",
  "West Bengal": "Bengali",
};

export function getCuisineLabel(state: string): string {
  return CUISINE_MAP[state] ?? state;
}
