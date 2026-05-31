export function formatDistance(km: number): string {
  if (!isFinite(km) || km < 0) return "Distance unknown";
  if (km < 1) return `${Math.round(km * 1000)}m away`;
  return `${km.toFixed(1)}km away`;
}
