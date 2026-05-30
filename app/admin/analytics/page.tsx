import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/session";
import Link from "next/link";

export default async function AdminAnalyticsPage() {
  try {
    await requireAdmin();
  } catch {
    redirect("/feed");
  }

  return (
    <div className="min-h-screen px-[5%] py-10" style={{ background: "var(--bg)" }}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-black" style={{ letterSpacing: "-2px" }}>Analytics</h1>
        <Link href="/admin" className="px-6 py-3 rounded-full font-bold text-white text-sm" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          ← Admin
        </Link>
      </div>
      <div className="py-16 text-center rounded-3xl" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--muted)" }}>
        <p className="text-xl font-semibold mb-2">Analytics Dashboard</p>
        <p className="text-sm">Detailed charts and metrics coming soon. Use the main admin dashboard for current stats.</p>
        <Link href="/admin" className="inline-block mt-6 px-6 py-3 rounded-full font-bold text-white text-sm" style={{ background: "linear-gradient(145deg, #ff2d5e, #ff4d77)" }}>
          View Stats →
        </Link>
      </div>
    </div>
  );
}
