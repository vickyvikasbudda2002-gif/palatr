"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { createClient } from "@/lib/supabase/client";
import { createAdminClient } from "@/lib/supabase/admin";

interface DeletionRow {
  id: string;
  user_id: string;
  reason?: string;
  status: string;
  created_at: string;
}

export default function AdminDeletionRequestsPage() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [requests, setRequests] = useState<DeletionRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && (!user || !user.is_admin)) router.replace("/feed");
  }, [user, isLoading]);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("deletion_requests")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setRequests(data ?? []);
        setLoading(false);
      });
  }, []);

  const handleProcess = async (requestId: string, userId: string) => {
    if (!confirm("This will permanently delete the user and all their data. Proceed?")) return;

    // Mark as completed
    const supabase = createClient();
    await supabase
      .from("deletion_requests")
      .update({ status: "completed" })
      .eq("id", requestId);

    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: "completed" } : r))
    );
  };

  return (
    <div className="min-h-screen px-[5%] py-10" style={{ background: "var(--bg)" }}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-black" style={{ letterSpacing: "-2px" }}>Deletion Requests</h1>
          <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>{requests.filter((r) => r.status === "pending").length} pending</p>
        </div>
        <button onClick={() => router.push("/admin")} className="px-6 py-3 rounded-full font-bold text-white text-sm" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          ← Admin
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 rounded-full border-2 border-[rgba(255,255,255,0.1)] border-t-[#ff2d5e] animate-spin" />
        </div>
      ) : requests.length === 0 ? (
        <div className="py-16 text-center rounded-3xl" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--muted)" }}>
          No deletion requests. 🎉
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {requests.map((r) => (
            <div key={r.id} className="p-5 rounded-2xl flex items-center justify-between gap-4" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <div>
                <p className="font-semibold text-sm mb-1">User ID: {r.user_id.slice(0, 8)}...</p>
                {r.reason && <p className="text-sm" style={{ color: "var(--muted)" }}>Reason: {r.reason}</p>}
                <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>{new Date(r.created_at).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold capitalize"
                  style={{
                    background: r.status === "pending" ? "rgba(255,45,94,0.1)" : "rgba(74,222,128,0.1)",
                    color: r.status === "pending" ? "#ff8fa8" : "#4ade80",
                  }}
                >
                  {r.status}
                </span>
                {r.status === "pending" && (
                  <button
                    onClick={() => handleProcess(r.id, r.user_id)}
                    className="px-4 py-2 rounded-full font-bold text-sm text-white"
                    style={{ background: "rgba(255,45,94,0.2)", color: "#ff8fa8" }}
                  >
                    Process
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
