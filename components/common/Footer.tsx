import Link from "next/link";

// ── Social icon SVGs (inline, no extra deps) ──────────────────────────────────
function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
function TwitterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
function YoutubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#111" />
    </svg>
  );
}

const SOCIALS = [
  { label: "Instagram", href: "#", icon: <InstagramIcon />, color: "#e1306c" },
  { label: "Twitter / X", href: "#", icon: <TwitterIcon />, color: "#fff" },
  { label: "LinkedIn", href: "#", icon: <LinkedInIcon />, color: "#0a66c2" },
  { label: "YouTube", href: "#", icon: <YoutubeIcon />, color: "#ff0000" },
];

const COMPANY_LINKS = [
  { label: "About PALATR", href: "/about" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Contact Us", href: "mailto:palatrservice@gmail.com" },
];

const PRODUCT_LINKS = [
  { label: "Feed", href: "/feed" },
  { label: "Hidden Gems", href: "/hidden-gems" },
  { label: "Add a Restaurant", href: "/feed" },
  { label: "Top 3 Picks", href: "/feed" },
  { label: "Waitlist", href: "/" },
];

const LEGAL_LINKS = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Data Deletion", href: "/privacy#deletion" },
  { label: "Accessibility", href: "#" },
];

export function Footer() {
  return (
    <footer
      style={{
        marginTop: "80px",
        borderTop: "1px solid var(--border)",
        background: "#050505",
      }}
    >
      {/* Main grid */}
      <div
        className="px-[7%] py-16"
        style={{
          display: "grid",
          gridTemplateColumns: "2.2fr 1fr 1fr 1fr",
          gap: "48px",
        }}
      >
        {/* Brand column */}
        <div>
          <div
            className="font-black mb-4"
            style={{ fontSize: "28px", letterSpacing: "-1.5px", color: "#fff" }}
          >
            PALATR.
          </div>
          <p
            className="text-sm leading-relaxed mb-6"
            style={{ color: "var(--muted)", maxWidth: "280px" }}
          >
            A community-driven food discovery platform helping people find
            restaurants loved by their own culture, community, and spice
            identity.
          </p>

          {/* Social icons */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                title={s.label}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--muted)",
                  transition: "all 0.2s",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.color = s.color;
                  el.style.borderColor = s.color + "55";
                  el.style.background = s.color + "15";
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.color = "var(--muted)";
                  el.style.borderColor = "var(--border)";
                  el.style.background = "var(--surface)";
                  el.style.transform = "translateY(0)";
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Company */}
        <div>
          <div className="font-bold mb-5 text-white text-sm uppercase tracking-wider" style={{ letterSpacing: "1px" }}>
            Company
          </div>
          {COMPANY_LINKS.map((link) => (
            link.href.startsWith("mailto:") ? (
              <a
                key={link.label}
                href={link.href}
                className="block mb-3 text-sm transition-all hover:text-[#ff2d5e] hover:pl-1"
                style={{ color: "var(--muted)", textDecoration: "none" }}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="block mb-3 text-sm transition-all hover:text-[#ff2d5e] hover:pl-1"
                style={{ color: "var(--muted)" }}
              >
                {link.label}
              </Link>
            )
          ))}
        </div>

        {/* Product */}
        <div>
          <div className="font-bold mb-5 text-white text-sm uppercase tracking-wider" style={{ letterSpacing: "1px" }}>
            Product
          </div>
          {PRODUCT_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block mb-3 text-sm transition-all hover:text-[#ff2d5e] hover:pl-1"
              style={{ color: "var(--muted)" }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Legal */}
        <div>
          <div className="font-bold mb-5 text-white text-sm uppercase tracking-wider" style={{ letterSpacing: "1px" }}>
            Legal
          </div>
          {LEGAL_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block mb-3 text-sm transition-all hover:text-[#ff2d5e] hover:pl-1"
              style={{ color: "var(--muted)" }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="px-[7%] py-5"
        style={{
          borderTop: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <p className="text-xs" style={{ color: "var(--muted)" }}>
          © {new Date().getFullYear()} PALATR. All rights reserved. Made with ❤️ for food lovers across India.
        </p>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "11px",
              color: "var(--muted)",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#22c55e",
                display: "inline-block",
                boxShadow: "0 0 6px #22c55e",
              }}
            />
            All systems operational
          </span>
          <Link
            href="/terms"
            className="text-xs transition-all hover:text-[#ff2d5e]"
            style={{ color: "var(--muted)" }}
          >
            Terms
          </Link>
          <Link
            href="/privacy"
            className="text-xs transition-all hover:text-[#ff2d5e]"
            style={{ color: "var(--muted)" }}
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
