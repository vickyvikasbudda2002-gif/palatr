"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { createClient } from "@/lib/supabase/client";

interface WaitlistRow {
  id: string;
  email: string;
  target_city: string;
  created_at: string;
}

export default function AdminWaitlistPage() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [entries, setEntries] = useState<WaitlistRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [cityFilter, setCityFilter] = useState("all");

  useEffect(() => {
    if (!isLoading && (!user || !user.is_admin)) router.replace("/feed");
  }, [user, isLoading]);

  useEffect(() => {
    fetchWaitlist();
  }, []);

  const fetchWaitlist = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from("waitlist")
      .select("*")
      .order("created_at", { ascending: false });
    setEntries(data ?? []);
    setLoading(false);
  };

  const cities = ["all", ...Array.from(new Set(entries.map((e) => e.target_city)))];
  const filtered = cityFilter === "all" ? entries : entries.filter((e) => e.target_city === cityFilter);

  // City demand summary
  const demandMap = entries.reduce<Record<string, number>>((acc, e) => {
    acc[e.target_city] = (acc[e.target_city] ?? 0) + 1;
    return acc;
  }, {});
  const sortedCities = Object.entries(demandMap).sort((a, b) => b[1] - a[1]);

  return (
    <div className="min-h-screen px-[5%] py-10" style={{ background: "var(--bg)" }}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-black" style={{ letterSpacing: "-2px" }}>Waitlist</h1>
          <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>{entries.length} total signups</p>
        </div>
        <button onClick={() => router.push("/admin")} className="px-6 py-3 rounded-full font-bold text-white text-sm" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          ← Admin
        </button>
      </div>

      {/* Demand heatmap */}
      <div className="grid gap-4 mb-8" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}>
        {sortedCities.map(([city, count]) => (
          <div key={city} className="p-5 rounded-2xl" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <div className="text-2xl font-black" style={{ color: "var(--primary)" }}>{count}</div>
            <div className="text-sm font-medium mt-1">{city}</div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {cities.map((c) => (
          <button key={c} onClick={() => setCityFilter(c)} className="px-4 py-2 rounded-full text-sm font-semibold capitalize" style={{ background: cityFilter === c ? "var(--primary)" : "var(--surface)", color: "white", border: "1px solid var(--border)" }}>
            {c}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 rounded-full border-2 border-[rgba(255,255,255,0.1)] border-t-[#ff2d5e] animate-spin" />
        </div>
      ) : (
        <div className="overflow-x-auto rounded-3xl" style={{ border: "1px solid var(--border)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
                {["Email", "City", "Joined"].map((h) => (
                  <th key={h} className="text-left px-5 py-4 font-semibold" style={{ color: "var(--muted)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((e, i) => (
                <tr key={e.id} style={{ background: i % 2 === 0 ? "var(--bg)" : "var(--surface)", borderBottom: "1px solid var(--border)" }}>
                  <td className="px-5 py-4">{e.email}</td>
                  <td className="px-5 py-4"><span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "rgba(255,45,94,0.1)", color: "var(--primary2)" }}>{e.target_city}</span></td>
                  <td className="px-5 py-4" style={{ color: "var(--muted)" }}>{new Date(e.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
