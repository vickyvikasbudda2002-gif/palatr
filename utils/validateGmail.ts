/**
 * Validates that the input is a valid Gmail username (no @domain part).
 * Returns the full email or null if invalid.
 */
export function validateGmailUsername(username: string): string | null {
  const trimmed = username.trim();
  if (!trimmed) return null;
  if (trimmed.includes("@")) return null; // user pasted full email
  // Gmail username: 6-30 chars, letters/numbers/dots, no leading/trailing dot
  const gmailRegex = /^[a-zA-Z0-9]([a-zA-Z0-9.]{4,28})[a-zA-Z0-9]$/;
  if (!gmailRegex.test(trimmed)) return null;
  return `${trimmed}@gmail.com`;
}

export function isGmailAddress(email: string): boolean {
  return email.toLowerCase().endsWith("@gmail.com");
}
