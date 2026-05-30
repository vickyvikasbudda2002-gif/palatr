import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen px-[7%] py-16 max-w-4xl mx-auto" style={{ background: "var(--bg)" }}>
      <Link href="/" className="inline-block mb-8 text-sm font-semibold" style={{ color: "var(--muted)" }}>
        ← Back
      </Link>
      <h1 className="text-5xl font-black mb-2" style={{ letterSpacing: "-2px" }}>Terms &amp; Conditions</h1>
      <p className="mb-10 text-sm" style={{ color: "var(--muted)" }}>Last updated: May 2026</p>

      {[
        {
          title: "1. Acceptance of Terms",
          body: "By creating an account on PALATR, you agree to these Terms & Conditions. PALATR is a community-driven food discovery platform. You must be 18 years or older to use this service.",
        },
        {
          title: "2. User-Generated Content",
          body: "You are solely responsible for any content you upload, including restaurant photos, reviews, and recommendations. By submitting content, you grant PALATR a non-exclusive, royalty-free license to display and distribute that content on the platform. You confirm that all content is accurate and does not infringe on any third-party rights.",
        },
        {
          title: "3. Authentication",
          body: "PALATR requires a verified @gmail.com address for account creation. You are responsible for maintaining the security of your account. OTPs are valid for 10 minutes and must not be shared.",
        },
        {
          title: "4. Content Moderation",
          body: "All restaurant and hidden gem submissions are subject to admin review before appearing on the platform. PALATR reserves the right to reject, edit, or remove any submission that does not meet our authenticity standards.",
        },
        {
          title: "5. Account Deletion",
          body: "You may request account deletion at any time through the Settings modal. Upon deletion, all your reviews, likes, and personal data will be permanently removed within 48 hours.",
        },
        {
          title: "6. Limitation of Liability",
          body: "PALATR provides restaurant information on an 'as-is' basis. We do not guarantee the accuracy of user-submitted data. PALATR is not liable for any dining experiences based on platform recommendations.",
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
