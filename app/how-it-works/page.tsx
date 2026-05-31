import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works | PALATR",
  description: "Learn how PALATR helps you discover authentic regional food wherever you are in India.",
};

const STEPS = [
  {
    number: "01",
    title: "Sign up with your Gmail",
    desc: "Create your account in under a minute. We only need your Gmail for OTP verification — no passwords, no hassle. Tell us your home state and current city so we can personalize your experience.",
    icon: "✉️",
  },
  {
    number: "02",
    title: "Get your personalized feed",
    desc: "Your feed shows only restaurants that serve cuisine from your home state — curated by people from your own community. No generic 'South Indian' noise. Just the real thing.",
    icon: "🍽️",
  },
  {
    number: "03",
    title: "Discover on the map",
    desc: "See all restaurants plotted on an interactive map. Enable your location to see how far each spot is from you and sort by distance to find the closest authentic meal.",
    icon: "🗺️",
  },
  {
    number: "04",
    title: "Like, review & share",
    desc: "Found a gem? Like it to help others discover it. Write a review to share your experience. Pick your Top 3 and share them with your community on social media.",
    icon: "❤️",
  },
  {
    number: "05",
    title: "Add restaurants",
    desc: "Know a place that deserves to be on PALATR? Submit it. Our admin team reviews every submission to ensure authenticity before it goes live on the platform.",
    icon: "➕",
  },
  {
    number: "06",
    title: "Explore Hidden Gems",
    desc: "Beyond restaurants — discover street stalls, food trucks, and secret biryani corners submitted by the community. These are the places no food app will ever show you.",
    icon: "💎",
  },
];

export default function HowItWorksPage() {
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
        <div className="mb-16">
          <div
            className="inline-flex px-4 py-2 rounded-full text-xs font-bold uppercase mb-6"
            style={{
              background: "rgba(255,45,94,0.1)",
              border: "1px solid rgba(255,45,94,0.25)",
              color: "#ff4d77",
              letterSpacing: "1px",
            }}
          >
            The Platform
          </div>
          <h1
            className="font-black leading-none mb-6"
            style={{ fontSize: "clamp(40px, 7vw, 72px)", letterSpacing: "-3px" }}
          >
            How PALATR<br />
            <span style={{ color: "var(--primary)" }}>works.</span>
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: "var(--muted)" }}>
            From signup to your first authentic meal — here's exactly how PALATR connects you
            with food that feels like home.
          </p>
        </div>

        {/* Steps */}
        <div className="mb-16" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className="p-8 rounded-3xl"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                display: "flex",
                gap: "24px",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  fontSize: "28px",
                  width: "56px",
                  height: "56px",
                  borderRadius: "16px",
                  background: i === 0
                    ? "linear-gradient(145deg,#ff2d5e,#ff4d77)"
                    : "rgba(255,45,94,0.08)",
                  border: i === 0 ? "none" : "1px solid rgba(255,45,94,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {step.icon}
              </div>
              <div>
                <div
                  className="text-xs font-bold uppercase mb-2"
                  style={{ color: "var(--primary)", letterSpacing: "1px" }}
                >
                  Step {step.number}
                </div>
                <h3 className="text-lg font-black mb-2 text-white" style={{ letterSpacing: "-0.5px" }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-2xl font-black mb-8" style={{ letterSpacing: "-1px" }}>
            Common Questions
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              {
                q: "Is PALATR free to use?",
                a: "Yes, completely free. No subscriptions, no premium tiers, no ads.",
              },
              {
                q: "How are restaurants verified?",
                a: "Every submission goes through manual admin review before appearing on the platform. We check for authenticity, accuracy, and community relevance.",
              },
              {
                q: "Can I use PALATR if I'm not from South India?",
                a: "Absolutely. PALATR supports all Indian states. Your feed is curated based on your home state — whether that's Punjab, Bengal, Maharashtra, or anywhere else.",
              },
              {
                q: "What if a restaurant has closed or changed?",
                a: "Use the 'Report Restaurant' button on any card to flag inaccurate information. Our team reviews reports and updates or removes listings accordingly.",
              },
              {
                q: "How do Hidden Gems differ from restaurants?",
                a: "Hidden Gems are informal food spots — street stalls, food trucks, home kitchens, and secret corners that don't have a formal restaurant presence. They're global and not filtered by state.",
              },
            ].map((faq) => (
              <div
                key={faq.q}
                className="p-6 rounded-2xl"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              >
                <h4 className="font-bold text-white mb-2 text-sm">{faq.q}</h4>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex gap-4 flex-wrap">
          <Link
            href="/feed"
            className="px-8 py-4 rounded-full font-bold text-white text-sm transition-all hover:brightness-110"
            style={{ background: "linear-gradient(145deg, #ff2d5e, #ff4d77)" }}
          >
            Start Exploring →
          </Link>
          <a
            href="mailto:palatrservice@gmail.com"
            className="px-8 py-4 rounded-full font-bold text-sm transition-all"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              color: "var(--muted)",
              textDecoration: "none",
            }}
          >
            Still have questions?
          </a>
        </div>
      </div>
    </div>
  );
}
