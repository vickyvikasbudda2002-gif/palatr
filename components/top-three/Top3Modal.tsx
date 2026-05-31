"use client";

import { useState, useRef } from "react";
import { Modal } from "@/components/common/Modal";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { useTopThree } from "@/hooks/useTopThree";
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

// ── Draw the shareable poster on a canvas and return a blob URL ──────────────
async function generatePosterBlob(
  homeState: string,
  city: string,
  entries: { name: string; rating: string; dish: string }[]
): Promise<string> {
  const W = 1080;
  const H = 1080;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  // Background gradient
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#0a0a0a");
  bg.addColorStop(0.5, "#120508");
  bg.addColorStop(1, "#0a0a0a");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Subtle red glow top-left
  const glow = ctx.createRadialGradient(200, 200, 0, 200, 200, 500);
  glow.addColorStop(0, "rgba(255,45,94,0.18)");
  glow.addColorStop(1, "rgba(255,45,94,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // Border
  ctx.strokeStyle = "rgba(255,45,94,0.35)";
  ctx.lineWidth = 3;
  ctx.strokeRect(24, 24, W - 48, H - 48);

  // Inner border
  ctx.strokeStyle = "rgba(255,255,255,0.04)";
  ctx.lineWidth = 1;
  ctx.strokeRect(36, 36, W - 72, H - 72);

  // PALATR wordmark
  ctx.font = "bold 52px 'Arial Black', Arial, sans-serif";
  ctx.fillStyle = "#ff2d5e";
  ctx.letterSpacing = "-2px";
  ctx.fillText("PALATR.", 72, 120);

  // Tagline
  ctx.font = "22px Arial, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.35)";
  ctx.fillText("Taste where you belong.", 72, 158);

  // Divider
  ctx.strokeStyle = "rgba(255,45,94,0.3)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(72, 180);
  ctx.lineTo(W - 72, 180);
  ctx.stroke();

  // Headline
  ctx.font = "bold 44px Arial, sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.fillText("My Top 3", 72, 248);

  ctx.font = "32px Arial, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.fillText(`${homeState} restaurants in ${city}`, 72, 296);

  // Cards
  const filled = entries.filter((e) => e.name);
  const cardH = 180;
  const cardGap = 24;
  const cardY0 = 340;

  filled.forEach((entry, i) => {
    const y = cardY0 + i * (cardH + cardGap);

    // Card background
    ctx.fillStyle = "rgba(255,255,255,0.04)";
    roundRect(ctx, 72, y, W - 144, cardH, 20);
    ctx.fill();

    // Card border
    ctx.strokeStyle = "rgba(255,45,94,0.2)";
    ctx.lineWidth = 1;
    roundRect(ctx, 72, y, W - 144, cardH, 20);
    ctx.stroke();

    // Rank badge
    const rankGrad = ctx.createLinearGradient(88, y + 20, 88, y + 80);
    rankGrad.addColorStop(0, "#ff2d5e");
    rankGrad.addColorStop(1, "#ff4d77");
    ctx.fillStyle = rankGrad;
    roundRect(ctx, 88, y + 20, 64, 64, 12);
    ctx.fill();

    ctx.font = "bold 36px Arial, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(`#${i + 1}`, 120, y + 62);
    ctx.textAlign = "left";

    // Restaurant name
    ctx.font = "bold 34px Arial, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(truncate(entry.name, 28), 172, y + 56);

    // Rating stars row
    if (entry.rating) {
      const r = parseInt(entry.rating);
      ctx.font = "bold 26px Arial, sans-serif";
      ctx.fillStyle = "#ff4d77";
      ctx.fillText(`★ ${r}/10`, 172, y + 96);
    }

    // Must try dish
    if (entry.dish) {
      ctx.font = "22px Arial, sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.45)";
      ctx.fillText(`Must try: ${truncate(entry.dish, 32)}`, 172, y + 134);
    }
  });

  // Bottom divider
  const bottomY = cardY0 + filled.length * (cardH + cardGap) + 20;
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(72, bottomY);
  ctx.lineTo(W - 72, bottomY);
  ctx.stroke();

  // Footer
  ctx.font = "bold 26px Arial, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.3)";
  ctx.fillText("palatr.in  ·  #PALATR  ·  #TasteWhereYouBelong", 72, bottomY + 50);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(URL.createObjectURL(blob!));
    }, "image/png");
  });
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function truncate(str: string, max: number) {
  return str.length > max ? str.slice(0, max - 1) + "…" : str;
}

// ── Component ─────────────────────────────────────────────────────────────────
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
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const { saveTopThree } = useTopThree();

  const updateEntry = (index: number, field: keyof Entry, value: string) => {
    setEntries((prev) => {
      const next = [...prev] as [Entry, Entry, Entry];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  // Clamp rating to 1–10 integers only
  const handleRatingChange = (index: number, raw: string) => {
    // Strip non-digits
    const digits = raw.replace(/\D/g, "");
    if (digits === "") { updateEntry(index, "rating", ""); return; }
    const num = Math.min(10, Math.max(1, parseInt(digits, 10)));
    updateEntry(index, "rating", String(num));
  };

  const handleGenerate = async () => {
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

      // Generate poster
      const posterEntries = entries.map((e) => ({
        name: restaurants.find((r) => r.id === e.restaurant_id)?.name ?? "",
        rating: e.rating,
        dish: e.custom_dish,
      }));

      const url = await generatePosterBlob(homeState, city, posterEntries);
      setPosterUrl(url);
    } catch {
      alert("Failed to save. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (!posterUrl) return;
    try {
      const res = await fetch(posterUrl);
      const blob = await res.blob();
      const file = new File([blob], "palatr-top3.png", { type: "image/png" });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "My Top 3 on PALATR",
          text: `My top 3 authentic ${homeState} restaurants in ${city}! 🍛 #PALATR`,
        });
      } else {
        // Fallback: download the image
        const a = document.createElement("a");
        a.href = posterUrl;
        a.download = "palatr-top3.png";
        a.click();
      }
    } catch {
      // User cancelled share — that's fine
    }
  };

  const handleClose = () => {
    if (posterUrl) URL.revokeObjectURL(posterUrl);
    setPosterUrl(null);
    onClose();
  };

  const handleBack = () => {
    if (posterUrl) { URL.revokeObjectURL(posterUrl); setPosterUrl(null); }
    onBack();
  };

  // ── Poster preview screen ──────────────────────────────────────────────────
  if (posterUrl) {
    return (
      <Modal isOpen={isOpen} maxWidth="560px">
        <div className="modal-title" style={{ fontSize: "clamp(28px,4vw,40px)" }}>
          Your poster is ready! 🎉
        </div>
        <p className="modal-sub">
          Share it to Instagram, WhatsApp, or download it.
        </p>

        <div
          className="mt-6 rounded-2xl overflow-hidden"
          style={{ border: "1px solid var(--border)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={posterUrl}
            alt="Your PALATR Top 3 poster"
            style={{ width: "100%", display: "block" }}
          />
        </div>

        <div className="flex gap-3 mt-6 flex-wrap">
          <button
            onClick={handleShare}
            className="flex-1 py-4 rounded-full font-bold text-sm text-white transition-all hover:brightness-110"
            style={{ background: "linear-gradient(145deg,#ff2d5e,#ff4d77)", border: "none", cursor: "pointer", fontFamily: "inherit" }}
          >
            Share 🚀
          </button>
          <a
            href={posterUrl}
            download="palatr-top3.png"
            className="flex-1 py-4 rounded-full font-bold text-sm text-white text-center transition-all"
            style={{ background: "var(--surface)", border: "1px solid var(--border)", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            Download ⬇️
          </a>
          <button
            onClick={handleClose}
            className="flex-1 py-4 rounded-full font-bold text-sm transition-all"
            style={{ background: "transparent", border: "1px solid var(--border)", color: "var(--muted)", cursor: "pointer", fontFamily: "inherit" }}
          >
            Done
          </button>
        </div>
      </Modal>
    );
  }

  // ── Entry form screen ──────────────────────────────────────────────────────
  return (
    <Modal isOpen={isOpen} maxWidth="800px">
      <div className="modal-title">Your Top 3</div>
      <p className="modal-sub">
        Rate your top 3{" "}
        <span style={{ color: "var(--primary)", fontWeight: 700 }}>{homeState}</span>{" "}
        restaurants in {city}!
      </p>

      <div className="mt-6 flex flex-col gap-4">
        {entries.map((entry, i) => (
          <div
            key={i}
            className="p-5 rounded-3xl"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <div
              className="text-xs font-extrabold uppercase tracking-wider mb-3"
              style={{ color: "var(--primary2)", letterSpacing: "1px" }}
            >
              #{i + 1} Restaurant
            </div>
            <div className="grid gap-3" style={{ gridTemplateColumns: "2fr 1fr 2fr" }}>
              <Select
                value={entry.restaurant_id}
                onChange={(e) => updateEntry(i, "restaurant_id", e.target.value)}
                style={{ marginTop: 0 }}
              >
                <option value="">Select Restaurant</option>
                {restaurants.map((r) => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </Select>

              {/* Rating — integers 1–10 only */}
              <div style={{ position: "relative" }}>
                <input
                  type="number"
                  min={1}
                  max={10}
                  step={1}
                  placeholder="1–10"
                  value={entry.rating}
                  onChange={(e) => handleRatingChange(i, e.target.value)}
                  onBlur={(e) => {
                    if (e.target.value) handleRatingChange(i, e.target.value);
                  }}
                  className="form-input"
                  style={{
                    marginTop: 0,
                    paddingRight: "48px",
                    fontFamily: "inherit",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "var(--muted)",
                    pointerEvents: "none",
                  }}
                >
                  /10
                </span>
              </div>

              <input
                type="text"
                maxLength={30}
                placeholder="Must try dish"
                value={entry.custom_dish}
                onChange={(e) => updateEntry(i, "custom_dish", e.target.value)}
                className="form-input"
                style={{ marginTop: 0, fontFamily: "inherit" }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-6">
        <Button variant="secondary" size="lg" style={{ marginTop: 0 }} onClick={handleBack}>
          Back
        </Button>
        <Button
          variant="primary"
          size="lg"
          style={{ marginTop: 0 }}
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? "Generating..." : "Create Poster 🎨"}
        </Button>
      </div>
    </Modal>
  );
}
