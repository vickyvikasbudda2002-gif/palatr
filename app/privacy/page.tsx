import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen px-[7%] py-16 max-w-4xl mx-auto" style={{ background: "var(--bg)" }}>
      <Link href="/" className="inline-block mb-8 text-sm font-semibold" style={{ color: "var(--muted)" }}>
        ← Back
      </Link>
      <h1 className="text-5xl font-black mb-2" style={{ letterSpacing: "-2px" }}>Privacy Policy</h1>
      <p className="mb-10 text-sm" style={{ color: "var(--muted)" }}>Last updated: May 2026</p>

      {[
        {
          title: "Data We Collect",
          body: "We collect your name, verified Gmail address, home state, current city, spice tolerance, and food preferences during signup. We also collect content you submit (reviews, photos, restaurant submissions) and usage data (likes, top 3 rankings).",
        },
        {
          title: "How We Use Your Data",
          body: "Your home state is used exclusively to curate your restaurant feed — showing you only restaurants tagged with your state's cuisine. We do not sell your data to third parties. Your email is used only for OTP authentication.",
        },
        {
          title: "Data Storage",
          body: "All data is stored securely in Supabase (PostgreSQL) with Row Level Security enabled. Images are stored in Supabase Storage. We use industry-standard encryption for data in transit and at rest.",
        },
        {
          title: "Your Rights",
          body: "You have the right to access, correct, or delete your personal data at any time. Use the 'Request Account Deletion' option in your profile settings to initiate a full data wipe.",
        },
        {
          title: "Cookies",
          body: "We use session cookies to maintain your authentication state. No third-party tracking cookies are used. You can manage cookie preferences in the footer.",
        },
      ].map((section) => (
        <div key={section.title} className="mb-8">
          <h2 className="text-xl font-bold mb-3">{section.title}</h2>
          <p className="leading-relaxed" style={{ color: "var(--muted)" }}>{section.body}</p>
        </div>
      ))}
    </div>
  );
}
