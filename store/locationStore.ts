import { create } from "zustand";

interface LocationState {
  lat: number | null;
  lon: number | null;
  error: string | null;
  isLoading: boolean;
  setLocation: (lat: number, lon: number) => void;
  setError: (error: string) => void;
  setLoading: (loading: boolean) => void;
  requestLocation: () => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  lat: null,
  lon: null,
  error: null,
  isLoading: false,
  setLocation: (lat, lon) => set({ lat, lon, error: null, isLoading: false }),
  setError: (error) => set({ error, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
  requestLocation: () => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      set({ error: "Geolocation not supported" });
      return;
    }
    set({ isLoading: true });
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        set({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          isLoading: false,
          error: null,
        });
      },
      (err) => {
        set({ error: err.message, isLoading: false });
      }
    );
  },
}));
