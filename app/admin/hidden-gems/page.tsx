"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import type { HiddenGem } from "@/types/hiddenGem";

export default function AdminHiddenGemsPage() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [gems, setGems] = useState<HiddenGem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"pending" | "approved" | "rejected">("pending");

  useEffect(() => {
    if (!isLoading && (!user || !user.is_admin)) router.replace("/feed");
  }, [user, isLoading]);

  useEffect(() => {
    fetchGems();
  }, [filter]);

  const fetchGems = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/hidden-gems?admin=true&status=${filter}`);
      const json = await res.json();
      setGems(json.data ?? []);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    await fetch("/api/admin/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, type: "gem" }),
    });
    setGems((prev) => prev.filter((g) => g.id !== id));
  };

  const handleReject = async (id: string) => {
    await fetch("/api/admin/reject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, type: "gem" }),
    });
    setGems((prev) => prev.filter((g) => g.id !== id));
  };

  return (
    <div className="min-h-screen px-[5%] py-10" style={{ background: "var(--bg)" }}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-black" style={{ letterSpacing: "-2px" }}>
          Hidden Gems
        </h1>
        <button
          onClick={() => router.push("/admin")}
          className="px-6 py-3 rounded-full font-bold text-white text-sm"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          ← Admin
        </button>
      </div>

      <div className="flex gap-3 mb-8">
        {(["pending", "approved", "rejected"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className="px-5 py-2 rounded-full font-semibold text-sm capitalize"
            style={{
              background: filter === s ? "#8b5cf6" : "var(--surface)",
              color: "white",
              border: "1px solid var(--border)",
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 rounded-full border-2 border-[rgba(255,255,255,0.1)] border-t-[#8b5cf6] animate-spin" />
        </div>
      ) : gems.length === 0 ? (
        <div className="py-16 text-center rounded-3xl" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--muted)" }}>
          No {filter} hidden gems.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {gems.map((g) => (
            <div key={g.id} className="p-6 rounded-3xl flex gap-5 items-start" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                <Image
                  src={g.image_url || "/images/placeholders/hidden-gem-placeholder.jpg"}
                  alt={g.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold text-xl">{g.name}</h3>
                  <span className="gem-badge text-xs">{g.gem_type}</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{g.description}</p>
                {g.maps_link && (
                  <a href={g.maps_link} target="_blank" rel="noopener noreferrer" className="text-xs mt-1 inline-block" style={{ color: "#4ade80" }}>
                    📍 Verify on Maps
                  </a>
                )}
              </div>
              {filter === "pending" && (
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <button onClick={() => handleApprove(g.id)} className="px-4 py-2 rounded-full font-bold text-sm text-white" style={{ background: "#16a34a" }}>✅ Approve</button>
                  <button onClick={() => handleReject(g.id)} className="px-4 py-2 rounded-full font-bold text-sm" style={{ background: "rgba(255,45,94,0.15)", color: "#ff8fa8" }}>❌ Reject</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
