"use client";

import { Modal } from "@/components/common/Modal";
import { ALL_CITIES, isCityActive } from "@/utils/cities";

interface CityModalProps {
  isOpen: boolean;
  onSelectCity: (city: string, isActive: boolean) => void;
}

export function CityModal({ isOpen, onSelectCity }: CityModalProps) {
  return (
    <Modal isOpen={isOpen} maxWidth="680px">
      <div className="modal-title">
        Where are<br />you now?
      </div>
      <p className="modal-sub">
        PALATR is currently live in{" "}
        <span style={{ color: "var(--primary2)", fontWeight: 700 }}>
          Bangalore
        </span>
        . Select your city to continue.
      </p>

      <div
        className="grid gap-4 mt-9"
        style={{ gridTemplateColumns: "1fr 1fr" }}
      >
        {ALL_CITIES.map((city) => {
          const active = isCityActive(city);
          return (
            <button
              key={city}
              onClick={() => onSelectCity(city, active)}
              className="relative py-5 px-5 rounded-2xl text-left font-semibold text-white transition-all hover:-translate-y-0.5"
              style={{
                background: "var(--surface)",
                border: "1px solid transparent",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  active ? "var(--primary)" : "rgba(255,255,255,0.15)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "transparent";
              }}
            >
              {city}
              {active && (
                <span
                  className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(255,45,94,0.15)",
                    color: "var(--primary2)",
                  }}
                >
                  LIVE
                </span>
              )}
            </button>
          );
        })}
      </div>
    </Modal>
  );
}
