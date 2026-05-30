export function isGmailAddress(email: string): boolean {
  return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email.toLowerCase().trim());
}

export function enforceGmail(email: string): void {
  if (!isGmailAddress(email)) {
    throw new Error("Only @gmail.com addresses are accepted.");
  }
}
