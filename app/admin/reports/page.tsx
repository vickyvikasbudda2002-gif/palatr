"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { createClient } from "@/lib/supabase/client";

interface ReportRow {
  id: string;
  user_id: string;
  target_id: string;
  target_type: string;
  reason: string;
  created_at: string;
}

export default function AdminReportsPage() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [reports, setReports] = useState<ReportRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && (!user || !user.is_admin)) router.replace("/feed");
  }, [user, isLoading]);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("reports")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setReports(data ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen px-[5%] py-10" style={{ background: "var(--bg)" }}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-black" style={{ letterSpacing: "-2px" }}>Reports</h1>
          <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>{reports.length} total reports</p>
        </div>
        <button onClick={() => router.push("/admin")} className="px-6 py-3 rounded-full font-bold text-white text-sm" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          ← Admin
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 rounded-full border-2 border-[rgba(255,255,255,0.1)] border-t-[#ff2d5e] animate-spin" />
        </div>
      ) : reports.length === 0 ? (
        <div className="py-16 text-center rounded-3xl" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--muted)" }}>
          No reports yet. 🎉
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {reports.map((r) => (
            <div key={r.id} className="p-5 rounded-2xl flex items-center justify-between gap-4" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mr-3" style={{ background: "rgba(255,45,94,0.1)", color: "var(--primary2)" }}>
                  {r.target_type}
                </span>
                <span className="font-semibold">{r.reason}</span>
              </div>
              <span className="text-xs" style={{ color: "var(--muted)" }}>
                {new Date(r.created_at).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
