import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="mt-32 px-[7%] py-20 grid gap-12"
      style={{
        borderTop: "1px solid var(--border)",
        background: "#050505",
        gridTemplateColumns: "2fr 1fr 1fr 1fr",
      }}
    >
      <div>
        <div
          className="text-3xl font-black mb-4"
          style={{ letterSpacing: "-1.5px" }}
        >
          PALATR.
        </div>
        <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--muted)" }}>
          Discover restaurants loved by your people, culture and taste identity.
        </p>
        <div className="flex items-center gap-3 mt-6">
          <input
            type="checkbox"
            defaultChecked
            className="accent-[#ff2d5e] scale-110"
            id="cookie-consent"
          />
          <label
            htmlFor="cookie-consent"
            className="text-sm cursor-pointer"
            style={{ color: "var(--muted)" }}
          >
            Accept Cookies
          </label>
        </div>
      </div>

      <div>
        <div className="font-bold mb-5 text-white">Company</div>
        {["About", "Contact Us", "Careers"].map((link) => (
          <Link
            key={link}
            href="#"
            className="block mb-3 text-sm transition-all hover:text-[#ff2d5e] hover:pl-1"
            style={{ color: "var(--muted)" }}
          >
            {link}
          </Link>
        ))}
      </div>

      <div>
        <div className="font-bold mb-5 text-white">Legal</div>
        {[
          { label: "Terms & Conditions", href: "/terms" },
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Cookies", href: "/cookies" },
        ].map((link) => (
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

      <div>
        <div className="font-bold mb-5 text-white">Socials</div>
        {["Instagram", "Twitter/X", "LinkedIn"].map((link) => (
          <Link
            key={link}
            href="#"
            className="block mb-3 text-sm transition-all hover:text-[#ff2d5e] hover:pl-1"
            style={{ color: "var(--muted)" }}
          >
            {link}
          </Link>
        ))}
      </div>
    </footer>
  );
}
