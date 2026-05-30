"use client";

import { useState } from "react";
import { Modal } from "@/components/common/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useTopThree } from "@/hooks/useTopThree";
import { formatTop3ShareText } from "@/utils/formatShareText";
import type { Restaurant } from "@/types/restaurant";

interface Top3ModalProps {
  isOpen: boolean;
  onBack: () => void;
  onClose: () => void;
  restaurants: Restaurant[];
  homeState: string;
  city: string;
}

interface Entry {
  restaurant_id: string;
  rating: string;
  custom_dish: string;
}

const emptyEntry = (): Entry => ({
  restaurant_id: "",
  rating: "",
  custom_dish: "",
});

export function Top3Modal({
  isOpen,
  onBack,
  onClose,
  restaurants,
  homeState,
  city,
}: Top3ModalProps) {
  const [entries, setEntries] = useState<[Entry, Entry, Entry]>([
    emptyEntry(),
    emptyEntry(),
    emptyEntry(),
  ]);
  const [loading, setLoading] = useState(false);
  const { saveTopThree } = useTopThree();

  const updateEntry = (index: number, field: keyof Entry, value: string) => {
    setEntries((prev) => {
      const next = [...prev] as [Entry, Entry, Entry];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleShare = async () => {
    const filled = entries.filter((e) => e.restaurant_id);
    if (!filled.length) {
      alert("Please select at least one restaurant.");
      return;
    }

    setLoading(true);
    try {
      // Save to DB
      await saveTopThree(
        entries
          .filter((e) => e.restaurant_id)
          .map((e, i) => ({
            rank: (i + 1) as 1 | 2 | 3,
            restaurant_id: e.restaurant_id,
            custom_dish: e.custom_dish,
          }))
      );

      // Build share text
      const shareEntries = entries.map((e) => ({
        restaurantName:
          restaurants.find((r) => r.id === e.restaurant_id)?.name ?? "",
        rating: e.rating ? parseInt(e.rating) : undefined,
        mustTry: e.custom_dish,
      }));

      const text = formatTop3ShareText(homeState, city, shareEntries);

      if (navigator.share) {
        await navigator.share({ title: `My Top 3 on PALATR`, text });
      } else {
        await navigator.clipboard.writeText(text);
        alert("Copied to clipboard!\n\n" + text);
      }

      onClose();
    } catch {
      alert("Failed to save. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} maxWidth="800px">
      <div className="modal-title">Your Top 3</div>
      <p className="modal-sub">
        Rate your top 3{" "}
        <span style={{ color: "var(--primary)", fontWeight: 700 }}>
          {homeState}
        </span>{" "}
        restaurants in {city}!
      </p>

      <div className="mt-6 flex flex-col gap-4">
        {entries.map((entry, i) => (
          <div
            key={i}
            className="p-5 rounded-3xl"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            <div
              className="text-xs font-extrabold uppercase tracking-wider mb-3"
              style={{ color: "var(--primary2)", letterSpacing: "1px" }}
            >
              #{i + 1} Restaurant
            </div>
            <div
              className="grid gap-3"
              style={{ gridTemplateColumns: "2fr 1fr 2fr" }}
            >
              <Select
                value={entry.restaurant_id}
                onChange={(e) =>
                  updateEntry(i, "restaurant_id", e.target.value)
                }
                style={{ marginTop: 0 }}
              >
                <option value="">Select Restaurant</option>
                {restaurants.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </Select>
              <Input
                type="number"
                min={1}
                max={10}
                placeholder="Rate /10"
                value={entry.rating}
                onChange={(e) => updateEntry(i, "rating", e.target.value)}
                style={{ marginTop: 0 }}
              />
              <Input
                maxLength={30}
                placeholder="Must try dish"
                value={entry.custom_dish}
                onChange={(e) => updateEntry(i, "custom_dish", e.target.value)}
                style={{ marginTop: 0 }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-6">
        <Button variant="secondary" size="lg" style={{ marginTop: 0 }} onClick={onBack}>
          Back
        </Button>
        <Button
          variant="primary"
          size="lg"
          style={{ marginTop: 0 }}
          onClick={handleShare}
          disabled={loading}
        >
          {loading ? "Saving..." : "Share to Socials 🚀"}
        </Button>
      </div>
    </Modal>
  );
}
