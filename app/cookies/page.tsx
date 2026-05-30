import Link from "next/link";

export default function CookiesPage() {
  return (
    <div className="min-h-screen px-[7%] py-16 max-w-4xl mx-auto" style={{ background: "var(--bg)" }}>
      <Link href="/" className="inline-block mb-8 text-sm font-semibold" style={{ color: "var(--muted)" }}>
        ← Back
      </Link>
      <h1 className="text-5xl font-black mb-2" style={{ letterSpacing: "-2px" }}>Cookie Policy</h1>
      <p className="mb-10 text-sm" style={{ color: "var(--muted)" }}>Last updated: May 2026</p>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3">What Are Cookies</h2>
        <p className="leading-relaxed" style={{ color: "var(--muted)" }}>
          Cookies are small text files stored on your device. PALATR uses minimal, essential cookies only.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3">Cookies We Use</h2>
        <div className="overflow-x-auto rounded-2xl" style={{ border: "1px solid var(--border)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
                {["Cookie", "Purpose", "Duration"].map((h) => (
                  <th key={h} className="text-left px-5 py-4 font-semibold" style={{ color: "var(--muted)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { name: "sb-auth-token", purpose: "Supabase authentication session", duration: "7 days" },
                { name: "sb-refresh-token", purpose: "Session refresh token", duration: "30 days" },
              ].map((c, i) => (
                <tr key={c.name} style={{ background: i % 2 === 0 ? "var(--bg)" : "var(--surface)" }}>
                  <td className="px-5 py-4 font-mono text-xs">{c.name}</td>
                  <td className="px-5 py-4" style={{ color: "var(--muted)" }}>{c.purpose}</td>
                  <td className="px-5 py-4" style={{ color: "var(--muted)" }}>{c.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3">No Tracking Cookies</h2>
        <p className="leading-relaxed" style={{ color: "var(--muted)" }}>
          PALATR does not use advertising, analytics, or third-party tracking cookies. We do not share cookie data with any external parties.
        </p>
      </div>
    </div>
  );
}
