"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import type { Restaurant } from "@/types/restaurant";

export default function AdminRestaurantsPage() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"pending" | "approved" | "rejected">("pending");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Restaurant>>({});

  useEffect(() => {
    if (!isLoading && (!user || !user.is_admin)) {
      router.replace("/feed");
    }
  }, [user, isLoading]);

  useEffect(() => {
    fetchRestaurants();
  }, [filter]);

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      // Admin client fetches all restaurants regardless of state
      const res = await fetch(`/api/restaurants?admin=true&status=${filter}`);
      const json = await res.json();
      setRestaurants(json.data ?? []);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    await fetch("/api/admin/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, type: "restaurant" }),
    });
    setRestaurants((prev) => prev.filter((r) => r.id !== id));
  };

  const handleReject = async (id: string) => {
    await fetch("/api/admin/reject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, type: "restaurant" }),
    });
    setRestaurants((prev) => prev.filter((r) => r.id !== id));
  };

  const handleEdit = async (id: string) => {
    await fetch("/api/admin/edit", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, type: "restaurant", updates: editData }),
    });
    setEditingId(null);
    fetchRestaurants();
  };

  return (
    <div className="min-h-screen px-[5%] py-10" style={{ background: "var(--bg)" }}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-black" style={{ letterSpacing: "-2px" }}>
          Restaurants
        </h1>
        <button
          onClick={() => router.push("/admin")}
          className="px-6 py-3 rounded-full font-bold text-white text-sm"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          ← Admin
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-3 mb-8">
        {(["pending", "approved", "rejected"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className="px-5 py-2 rounded-full font-semibold text-sm capitalize transition-all"
            style={{
              background: filter === s ? "var(--primary)" : "var(--surface)",
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
          <div className="w-10 h-10 rounded-full border-2 border-[rgba(255,255,255,0.1)] border-t-[#ff2d5e] animate-spin" />
        </div>
      ) : restaurants.length === 0 ? (
        <div className="py-16 text-center rounded-3xl" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--muted)" }}>
          No {filter} restaurants.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {restaurants.map((r) => (
            <div
              key={r.id}
              className="p-6 rounded-3xl"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <div className="flex gap-5 items-start">
                {/* Thumbnail */}
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                  <Image
                    src={r.image_url || "/images/placeholders/restaurant-placeholder.jpg"}
                    alt={r.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  {editingId === r.id ? (
                    <div className="flex flex-col gap-2">
                      <input
                        className="form-input"
                        defaultValue={r.name}
                        onChange={(e) => setEditData((d) => ({ ...d, name: e.target.value }))}
                        placeholder="Name"
                      />
                      <input
                        className="form-input"
                        defaultValue={r.cuisine_state}
                        onChange={(e) => setEditData((d) => ({ ...d, cuisine_state: e.target.value }))}
                        placeholder="Cuisine State"
                      />
                      <textarea
                        className="form-input"
                        defaultValue={r.description}
                        onChange={(e) => setEditData((d) => ({ ...d, description: e.target.value }))}
                        placeholder="Description"
                      />
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-xl">{r.name}</h3>
                        <span
                          className="text-xs px-3 py-1 rounded-full font-semibold"
                          style={{
                            background: "rgba(255,45,94,0.1)",
                            color: "var(--primary2)",
                          }}
                        >
                          {r.cuisine_state}
                        </span>
                        <span
                          className="text-xs px-3 py-1 rounded-full font-semibold capitalize"
                          style={{
                            background: "rgba(255,255,255,0.08)",
                            color: "var(--muted)",
                          }}
                        >
                          {r.type}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                        {r.description}
                      </p>
                      {r.maps_link && (
                        <a
                          href={r.maps_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs mt-1 inline-block"
                          style={{ color: "#4ade80" }}
                        >
                          📍 Verify on Maps
                        </a>
                      )}
                    </>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 flex-shrink-0">
                  {filter === "pending" && (
                    <>
                      <button
                        onClick={() => handleApprove(r.id)}
                        className="px-4 py-2 rounded-full font-bold text-sm text-white"
                        style={{ background: "#16a34a" }}
                      >
                        ✅ Approve
                      </button>
                      <button
                        onClick={() => {
                          setEditingId(r.id);
                          setEditData({});
                        }}
                        className="px-4 py-2 rounded-full font-bold text-sm text-white"
                        style={{ background: "#2563eb" }}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleReject(r.id)}
                        className="px-4 py-2 rounded-full font-bold text-sm"
                        style={{ background: "rgba(255,45,94,0.15)", color: "#ff8fa8" }}
                      >
                        ❌ Reject
                      </button>
                    </>
                  )}
                  {editingId === r.id && (
                    <>
                      <button
                        onClick={() => handleEdit(r.id)}
                        className="px-4 py-2 rounded-full font-bold text-sm text-white"
                        style={{ background: "#16a34a" }}
                      >
                        Save & Approve
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-4 py-2 rounded-full font-bold text-sm"
                        style={{ background: "var(--surface-hover)", color: "white" }}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
