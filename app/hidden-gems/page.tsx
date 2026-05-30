"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useHiddenGems } from "@/hooks/useHiddenGems";
import { useHiddenGemStore } from "@/store/hiddenGemStore";
import { HiddenGemCard } from "@/components/hidden-gems/HiddenGemCard";
import { AddHiddenGemModal } from "@/components/hidden-gems/AddHiddenGemModal";
import { PageLoader } from "@/components/common/LoadingSpinner";
import { GEM_TYPES } from "@/utils/constants";
import { debounce } from "@/utils/debounce";

export default function HiddenGemsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const { gems, isLoading, handleLike } = useHiddenGems(user?.id);
  const { setSearchQuery, setFilter, filter } = useHiddenGemStore();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/");
    }
  }, [user, authLoading]);

  const handleSearch = debounce((val: string) => setSearchQuery(val), 300);

  if (authLoading) return <PageLoader />;
  if (!user) return null;

  return (
    <div
      className="min-h-screen pb-36 px-[7%] pt-10"
      style={{ background: "var(--bg)", animation: "fadeIn 0.5s ease" }}
    >
      {/* Header */}
      <div className="flex justify-between items-start gap-8 mb-12 flex-wrap">
        <div>
          <span className="gem-badge mb-5 inline-flex">
            GLOBAL COMMUNITY HIDDEN GEMS
          </span>
          <h1
            className="font-black leading-none text-gradient-gem"
            style={{
              fontSize: "clamp(48px, 7vw, 80px)",
              letterSpacing: "-3px",
              maxWidth: "850px",
            }}
          >
            The internet&apos;s<br />favorite hidden<br />food gems.
          </h1>
          <p
            className="mt-6 text-lg leading-relaxed max-w-2xl"
            style={{ color: "var(--muted)" }}
          >
            Street stalls. Tiny trucks. Secret biryani corners.
            Community-approved hidden gems from across India.
          </p>
        </div>

        <button
          onClick={() => router.push("/feed")}
          className="px-7 py-4 rounded-full font-bold text-white transition-all hover:bg-[var(--surface-hover)] hover:-translate-x-1"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            whiteSpace: "nowrap",
          }}
        >
          ← Back To Home
        </button>
      </div>

      {/* Controls */}
      <div className="flex gap-3 flex-wrap mb-10">
        <input
          type="text"
          placeholder="Search hidden gems..."
          onChange={(e) => handleSearch(e.target.value)}
          className="px-5 py-4 rounded-full text-sm text-white outline-none transition-all"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            minWidth: "220px",
            fontFamily: "inherit",
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = "#8b5cf6"; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-5 py-4 rounded-full text-sm text-white outline-none"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            fontFamily: "inherit",
            appearance: "none",
          }}
        >
          <option value="all">All Types</option>
          {GEM_TYPES.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>

      {/* Gem grid */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 rounded-full border-2 border-[rgba(255,255,255,0.1)] border-t-[#8b5cf6] animate-spin" />
        </div>
      ) : gems.length === 0 ? (
        <div
          className="py-16 text-center rounded-3xl"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            color: "var(--muted)",
          }}
        >
          <p className="text-xl font-semibold mb-2">No hidden gems yet.</p>
          <p className="text-sm">Be the first to add one using the 💎 button below!</p>
        </div>
      ) : (
        <div
          className="grid gap-8"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}
        >
          {gems.map((gem) => (
            <HiddenGemCard
              key={gem.id}
              gem={gem}
              onLike={() => handleLike(gem.id, !!gem.user_has_liked)}
            />
          ))}
        </div>
      )}

      {/* FAB */}
      <button
        className="fab"
        style={{
          bottom: "35px",
          background: "linear-gradient(145deg, #8b5cf6, #c084fc)",
          boxShadow: "0 10px 30px rgba(139,92,246,0.4)",
          fontSize: "28px",
        }}
        onClick={() => setAddModalOpen(true)}
        aria-label="Add hidden gem"
      >
        💎
      </button>

      <AddHiddenGemModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSuccess={() => {}}
      />
    </div>
  );
}
