import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/session";
import { createAdminClient } from "@/lib/supabase/admin";
import Link from "next/link";

async function getStats() {
  const admin = createAdminClient();
  const [
    { count: total_users },
    { count: total_restaurants },
    { count: pending_restaurants },
    { count: total_hidden_gems },
    { count: pending_hidden_gems },
    { count: total_reviews },
    { count: total_reports },
    { count: pending_deletion_requests },
    { count: waitlist_count },
  ] = await Promise.all([
    admin.from("users").select("*", { count: "exact", head: true }),
    admin.from("restaurants").select("*", { count: "exact", head: true }),
    admin.from("restaurants").select("*", { count: "exact", head: true }).eq("status", "pending"),
    admin.from("hidden_gems").select("*", { count: "exact", head: true }),
    admin.from("hidden_gems").select("*", { count: "exact", head: true }).eq("status", "pending"),
    admin.from("reviews").select("*", { count: "exact", head: true }),
    admin.from("reports").select("*", { count: "exact", head: true }),
    admin.from("deletion_requests").select("*", { count: "exact", head: true }).eq("status", "pending"),
    admin.from("waitlist").select("*", { count: "exact", head: true }),
  ]);

  return {
    total_users: total_users ?? 0,
    total_restaurants: total_restaurants ?? 0,
    pending_restaurants: pending_restaurants ?? 0,
    total_hidden_gems: total_hidden_gems ?? 0,
    pending_hidden_gems: pending_hidden_gems ?? 0,
    total_reviews: total_reviews ?? 0,
    total_reports: total_reports ?? 0,
    pending_deletion_requests: pending_deletion_requests ?? 0,
    waitlist_count: waitlist_count ?? 0,
  };
}

const statCards = [
  { label: "Total Users", key: "total_users", icon: "👥", href: "/admin/users" },
  { label: "Restaurants", key: "total_restaurants", icon: "🍽️", href: "/admin/restaurants" },
  { label: "Pending Approval", key: "pending_restaurants", icon: "⏳", href: "/admin/restaurants", urgent: true },
  { label: "Hidden Gems", key: "total_hidden_gems", icon: "💎", href: "/admin/hidden-gems" },
  { label: "Pending Gems", key: "pending_hidden_gems", icon: "⏳", href: "/admin/hidden-gems", urgent: true },
  { label: "Total Reviews", key: "total_reviews", icon: "⭐", href: "#" },
  { label: "Reports", key: "total_reports", icon: "🚩", href: "/admin/reports", urgent: true },
  { label: "Deletion Requests", key: "pending_deletion_requests", icon: "🗑️", href: "/admin/deletion-requests", urgent: true },
  { label: "Waitlist", key: "waitlist_count", icon: "📋", href: "/admin/waitlist" },
];

export default async function AdminDashboard() {
  try {
    await requireAdmin();
  } catch {
    redirect("/feed");
  }

  const stats = await getStats();

  return (
    <div className="min-h-screen px-[5%] py-10" style={{ background: "var(--bg)" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-5xl font-black" style={{ letterSpacing: "-2px" }}>
            Admin
          </h1>
          <p style={{ color: "var(--muted)" }} className="mt-1">
            PALATR Mission Control
          </p>
        </div>
        <Link
          href="/feed"
          className="px-6 py-3 rounded-full font-bold text-white text-sm transition-all hover:bg-[var(--surface-hover)]"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          ← Back to Feed
        </Link>
      </div>

      {/* Stats grid */}
      <div className="grid gap-5 mb-10" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}>
        {statCards.map((card) => {
          const value = stats[card.key as keyof typeof stats];
          const isUrgent = card.urgent && value > 0;
          return (
            <Link
              key={card.key}
              href={card.href}
              className="p-6 rounded-3xl transition-all hover:-translate-y-1"
              style={{
                background: isUrgent ? "rgba(255,45,94,0.08)" : "var(--surface)",
                border: `1px solid ${isUrgent ? "rgba(255,45,94,0.3)" : "var(--border)"}`,
              }}
            >
              <div className="text-3xl mb-3">{card.icon}</div>
              <div
                className="text-4xl font-black mb-1"
                style={{
                  letterSpacing: "-1px",
                  color: isUrgent ? "var(--primary)" : "white",
                }}
              >
                {value}
              </div>
              <div className="text-sm font-medium" style={{ color: "var(--muted)" }}>
                {card.label}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick nav */}
      <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" }}>
        {[
          { label: "Approve Restaurants", href: "/admin/restaurants", desc: "Review pending submissions", icon: "🍽️" },
          { label: "Approve Hidden Gems", href: "/admin/hidden-gems", desc: "Review gem submissions", icon: "💎" },
          { label: "Manage Users", href: "/admin/users", desc: "View all registered users", icon: "👥" },
          { label: "View Reports", href: "/admin/reports", desc: "Handle user reports", icon: "🚩" },
          { label: "Deletion Requests", href: "/admin/deletion-requests", desc: "Process account deletions", icon: "🗑️" },
          { label: "Waitlist", href: "/admin/waitlist", desc: "See cities with demand", icon: "📋" },
          { label: "Analytics", href: "/admin/analytics", desc: "Platform metrics", icon: "📊" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="p-6 rounded-3xl transition-all hover:-translate-y-1 hover:border-[rgba(255,255,255,0.15)]"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <div className="text-2xl mb-3">{item.icon}</div>
            <div className="font-bold text-white mb-1">{item.label}</div>
            <div className="text-sm" style={{ color: "var(--muted)" }}>{item.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
