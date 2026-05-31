import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | PALATR",
  description: "Learn about the cookies PALATR uses and how to manage your cookie preferences under Indian law.",
};

const COOKIES = [
  {
    name: "sb-access-token",
    purpose: "Supabase JWT access token — authenticates your session with the API on every request",
    duration: "1 hour (auto-refreshed)",
    type: "Essential",
    party: "First-party",
  },
  {
    name: "sb-refresh-token",
    purpose: "Supabase refresh token — used to obtain a new access token without requiring re-login",
    duration: "30 days",
    type: "Essential",
    party: "First-party",
  },
  {
    name: "sb-auth-token",
    purpose: "Supabase authentication state cookie for server-side session validation via Next.js middleware",
    duration: "Session",
    type: "Essential",
    party: "First-party",
  },
];

export default function CookiesPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <div className="px-[7%] py-16 max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-10 text-sm font-semibold transition-all hover:text-[#ff2d5e]"
          style={{ color: "var(--muted)" }}
        >
          ← Back to PALATR
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div
            className="inline-flex px-4 py-2 rounded-full text-xs font-bold uppercase mb-6"
            style={{
              background: "rgba(255,45,94,0.1)",
              border: "1px solid rgba(255,45,94,0.25)",
              color: "#ff4d77",
              letterSpacing: "1px",
            }}
          >
            Legal Document · Indian Law
          </div>
          <h1
            className="font-black leading-none mb-4"
            style={{ fontSize: "clamp(36px, 6vw, 56px)", letterSpacing: "-2px" }}
          >
            Cookie Policy
          </h1>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Last updated: May 2026 &nbsp;·&nbsp; Governed by the laws of India
          </p>
          <p className="mt-4 text-sm leading-relaxed max-w-2xl" style={{ color: "var(--muted)" }}>
            This Cookie Policy is published in accordance with the Information Technology Act, 2000,
            the IT (Reasonable Security Practices) Rules, 2011, and the Digital Personal Data
            Protection Act, 2023. PALATR uses only essential authentication cookies — no tracking,
            no advertising, no profiling.
          </p>
        </div>

        {/* Section 1 */}
        <div className="mb-10 pb-10" style={{ borderBottom: "1px solid var(--border)" }}>
          <h2 className="text-xl font-bold mb-4 text-white">1. What Are Cookies?</h2>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            Cookies are small text files placed on your device (computer, smartphone, or tablet) when
            you visit a website. They are widely used to make websites function correctly and securely.
            Cookies can be "session cookies" (automatically deleted when you close your browser) or
            "persistent cookies" (remain on your device for a defined period or until you delete them).
          </p>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            Under the Digital Personal Data Protection Act, 2023 and the IT Act, 2000, cookies that
            collect or process personal data are subject to data protection obligations. PALATR uses
            cookies exclusively for authentication and security — the minimum necessary to provide
            you with a secure, logged-in experience.
          </p>
        </div>

        {/* Section 2 — Cookie table */}
        <div className="mb-10 pb-10" style={{ borderBottom: "1px solid var(--border)" }}>
          <h2 className="text-xl font-bold mb-6 text-white">2. Cookies We Use</h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
            The following table lists every cookie set by PALATR. All cookies are first-party,
            essential, and set by Supabase's authentication infrastructure. No third-party cookies
            are set on the PALATR platform.
          </p>
          <div className="overflow-x-auto rounded-2xl" style={{ border: "1px solid var(--border)" }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
                  {["Cookie Name", "Purpose", "Duration", "Type", "Party"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-4 font-semibold text-xs uppercase"
                      style={{ color: "var(--muted)", letterSpacing: "0.5px" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COOKIES.map((c, i) => (
                  <tr
                    key={c.name}
                    style={{
                      background: i % 2 === 0 ? "var(--bg)" : "var(--surface)",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <td className="px-5 py-4 font-mono text-xs" style={{ color: "#ff4d77" }}>
                      {c.name}
                    </td>
                    <td className="px-5 py-4 text-xs" style={{ color: "var(--muted)", maxWidth: "260px" }}>
                      {c.purpose}
                    </td>
                    <td className="px-5 py-4 text-xs whitespace-nowrap" style={{ color: "var(--muted)" }}>
                      {c.duration}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: "6px",
                          background: "rgba(34,197,94,0.1)",
                          color: "#22c55e",
                          border: "1px solid rgba(34,197,94,0.2)",
                        }}
                      >
                        {c.type}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs" style={{ color: "var(--muted)" }}>
                      {c.party}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3 — What we don't use */}
        <div className="mb-10 pb-10" style={{ borderBottom: "1px solid var(--border)" }}>
          <h2 className="text-xl font-bold mb-4 text-white">3. What We Do NOT Use</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
            PALATR explicitly does not use the following types of cookies or tracking technologies,
            in keeping with our commitment to minimal data collection under the DPDP Act, 2023:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "10px" }}>
            {[
              "Google Analytics or similar analytics platforms",
              "Facebook Pixel or social media tracking pixels",
              "Advertising network cookies (Google Ads, Meta Ads, etc.)",
              "Cross-site behavioral tracking cookies",
              "Device fingerprinting or browser fingerprinting",
              "Retargeting or remarketing cookies",
              "Third-party session recording tools (Hotjar, FullStory, etc.)",
              "A/B testing platforms with persistent user tracking",
              "Affiliate tracking cookies",
              "Any third-party profiling or data enrichment tools",
            ].map((item) => (
              <div
                key={item}
                style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "var(--muted)" }}
              >
                <span style={{ color: "#22c55e", marginTop: "1px", flexShrink: 0 }}>✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Section 4 — Consent */}
        <div className="mb-10 pb-10" style={{ borderBottom: "1px solid var(--border)" }}>
          <h2 className="text-xl font-bold mb-4 text-white">4. Cookie Consent Under Indian Law</h2>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            Under the Digital Personal Data Protection Act, 2023, cookies that process personal data
            require free, specific, informed, and unambiguous consent from the Data Principal (you).
          </p>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            Since PALATR uses only essential authentication cookies that are strictly necessary to
            provide the Service you have requested, these cookies are set upon account creation and
            login. By creating an account and logging in, you consent to the use of these essential
            cookies. Without these cookies, the Service cannot function — you would not be able to
            maintain a logged-in session.
          </p>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            We do not use any non-essential cookies that would require separate opt-in consent.
          </p>
        </div>

        {/* Section 5 — Managing cookies */}
        <div className="mb-10 pb-10" style={{ borderBottom: "1px solid var(--border)" }}>
          <h2 className="text-xl font-bold mb-4 text-white">5. Managing Your Cookie Preferences</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
            Since PALATR only uses essential authentication cookies, disabling cookies in your browser
            will prevent you from logging in and using the Service. You can manage cookies through
            your browser settings:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "10px" }}>
            {[
              { browser: "Chrome", path: "Settings → Privacy and Security → Cookies and other site data" },
              { browser: "Firefox", path: "Settings → Privacy & Security → Cookies and Site Data" },
              { browser: "Safari", path: "Preferences → Privacy → Manage Website Data" },
              { browser: "Edge", path: "Settings → Cookies and Site Permissions → Cookies" },
              { browser: "Opera", path: "Settings → Advanced → Privacy & Security → Cookies" },
              { browser: "Samsung Internet", path: "Settings → Privacy → Smart Anti-Tracking" },
            ].map((b) => (
              <div
                key={b.browser}
                className="p-4 rounded-xl"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              >
                <p className="text-sm font-bold text-white mb-1">{b.browser}</p>
                <p className="text-xs" style={{ color: "var(--muted)" }}>{b.path}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            You can also delete existing cookies from your browser at any time. Note that deleting
            PALATR's authentication cookies will log you out of the Service.
          </p>
        </div>

        {/* Section 6 — Local storage */}
        <div className="mb-10 pb-10" style={{ borderBottom: "1px solid var(--border)" }}>
          <h2 className="text-xl font-bold mb-4 text-white">6. Browser Memory & Application State</h2>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            In addition to cookies, PALATR uses browser memory (via Zustand, a JavaScript state
            management library) to temporarily store application state such as your current feed
            filters, sort preferences, and location coordinates. This data:
          </p>
          <ul className="mt-4 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            <li className="mb-2">• Is stored in JavaScript memory only — not in localStorage, sessionStorage, or IndexedDB</li>
            <li className="mb-2">• Is cleared automatically when you close or refresh the browser tab</li>
            <li className="mb-2">• Is never transmitted to PALATR's servers</li>
            <li className="mb-2">• Does not persist between sessions</li>
            <li className="mb-2">• Contains no personally identifiable information beyond what is already in your authenticated session</li>
          </ul>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            This in-memory state does not constitute a cookie or persistent tracking mechanism and
            is not subject to cookie consent requirements under applicable Indian law.
          </p>
        </div>

        {/* Section 7 — Updates */}
        <div className="mb-10 pb-10" style={{ borderBottom: "1px solid var(--border)" }}>
          <h2 className="text-xl font-bold mb-4 text-white">7. Updates to This Policy</h2>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            We may update this Cookie Policy from time to time to reflect changes in our practices
            or applicable Indian law, including any rules or guidelines issued under the Digital
            Personal Data Protection Act, 2023. Any changes will be reflected by updating the
            "Last updated" date at the top of this page. Continued use of the Service after changes
            constitutes acceptance of the updated policy.
          </p>
        </div>

        {/* Section 8 — Contact */}
        <div className="mb-10 pb-10" style={{ borderBottom: "1px solid var(--border)" }}>
          <h2 className="text-xl font-bold mb-4 text-white">8. Contact & Grievance Officer</h2>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            For questions about our use of cookies or this Cookie Policy, or to exercise your rights
            under the DPDP Act, 2023, please contact:
          </p>
          <div
            className="mt-4 p-5 rounded-xl text-sm"
            style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--muted)" }}
          >
            <p className="font-bold text-white mb-2">PALATR Grievance Officer</p>
            <p>Email: <a href="mailto:grievance@palatr.in" style={{ color: "#ff4d77" }}>grievance@palatr.in</a></p>
            <p className="mt-1">Privacy: <a href="mailto:privacy@palatr.in" style={{ color: "#ff4d77" }}>privacy@palatr.in</a></p>
            <p className="mt-1">Response time: Within 24 hours · Resolution: Within 15 days</p>
          </div>
        </div>

        {/* Footer note */}
        <div
          className="mt-8 p-6 rounded-2xl text-sm"
          style={{
            background: "rgba(255,45,94,0.05)",
            border: "1px solid rgba(255,45,94,0.15)",
            color: "var(--muted)",
          }}
        >
          PALATR is committed to minimal data collection. We use only what is strictly necessary to
          provide you with a secure, authenticated experience. No tracking. No ads. No data selling.
          Compliant with the Digital Personal Data Protection Act, 2023 and the IT Act, 2000.
        </div>
      </div>
    </div>
  );
}
