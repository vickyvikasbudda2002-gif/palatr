"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

interface UserRow {
  id: string;
  email: string;
  first_name: string;
  last_name?: string;
  home_state: string;
  current_city: string;
  is_admin: boolean;
  created_at: string;
}

export default function AdminUsersPage() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isLoading && (!user || !user.is_admin)) router.replace("/feed");
  }, [user, isLoading]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      const json = await res.json();
      setUsers(json.data ?? []);
      setCount(json.count ?? 0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-[5%] py-10" style={{ background: "var(--bg)" }}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-black" style={{ letterSpacing: "-2px" }}>Users</h1>
          <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>{count} total registered users</p>
        </div>
        <button onClick={() => router.push("/admin")} className="px-6 py-3 rounded-full font-bold text-white text-sm" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          ← Admin
        </button>
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
                {["Name", "Email", "Home State", "City", "Joined", "Admin"].map((h) => (
                  <th key={h} className="text-left px-5 py-4 font-semibold" style={{ color: "var(--muted)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr
                  key={u.id}
                  style={{
                    background: i % 2 === 0 ? "var(--bg)" : "var(--surface)",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <td className="px-5 py-4 font-medium">{u.first_name} {u.last_name}</td>
                  <td className="px-5 py-4" style={{ color: "var(--muted)" }}>{u.email}</td>
                  <td className="px-5 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "rgba(255,45,94,0.1)", color: "var(--primary2)" }}>
                      {u.home_state}
                    </span>
                  </td>
                  <td className="px-5 py-4" style={{ color: "var(--muted)" }}>{u.current_city}</td>
                  <td className="px-5 py-4" style={{ color: "var(--muted)" }}>
                    {new Date(u.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4">
                    {u.is_admin && <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: "rgba(139,92,246,0.15)", color: "#d8b4fe" }}>Admin</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
