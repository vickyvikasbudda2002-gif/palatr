/**
 * Generates a universal Google Maps directions URL.
 * Leaving origin blank causes Google to use the user's current GPS location.
 */
export function generateMapsLink(
  name: string,
  city: string,
  lat?: number,
  lon?: number
): string {
  if (lat && lon) {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`;
  }
  const destination = encodeURIComponent(`${name} ${city}`);
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
}
