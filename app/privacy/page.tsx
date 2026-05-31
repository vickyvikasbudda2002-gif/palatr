import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | PALATR",
  description: "Understand how PALATR collects, uses, stores, and protects your personal data under Indian law.",
};

const SECTIONS = [
  {
    title: "1. Introduction & Data Fiduciary",
    body: `PALATR ("we", "us", "our") is committed to protecting your personal data and respecting your privacy in accordance with Indian law. This Privacy Policy is published in compliance with:

• Section 43A of the Information Technology Act, 2000 ("IT Act")
• The Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 ("SPDI Rules")
• The Digital Personal Data Protection Act, 2023 ("DPDP Act")
• The Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021

Under the DPDP Act, 2023, PALATR acts as the "Data Fiduciary" — the entity that determines the purpose and means of processing your personal data. You, as the user, are the "Data Principal."

This Privacy Policy explains what personal data we collect, why we collect it, how we process and protect it, and what rights you have as a Data Principal under Indian law.

By using the Service, you provide free, specific, informed, and unambiguous consent to the processing of your personal data as described in this Policy, as required under Section 6 of the DPDP Act, 2023.`,
  },
  {
    title: "2. Personal Data We Collect",
    body: `We collect the following categories of personal data:

ACCOUNT & IDENTITY DATA
• Full name (first name, last name)
• Verified Gmail address (@gmail.com) — used for OTP-based authentication
• Home state (used exclusively for cuisine-based feed curation)
• Current city of residence
• Food preferences (veg / non-veg / eggetarian / both)
• Spice tolerance level (mild / medium / spicy / andhra)

CONTENT DATA
• Restaurant submissions (name, description, location coordinates, images, cuisine type)
• Hidden gem submissions (name, description, type, images)
• Reviews and ratings submitted for restaurants and hidden gems
• Likes and engagement data
• Reports submitted for inaccurate or inappropriate content

TECHNICAL & USAGE DATA
• IP address (collected by Supabase infrastructure for security purposes)
• Browser type and version
• Device type and operating system
• Session tokens and authentication cookies
• Timestamps of login, content submission, and engagement actions
• Error logs and diagnostic data

SENSITIVE PERSONAL DATA OR INFORMATION (SPDI) UNDER SPDI RULES, 2011
Food preferences and dietary information may qualify as SPDI under Rule 3 of the SPDI Rules, 2011. We collect this data only with your explicit consent and use it solely for the purpose of personalizing your feed experience.

LOCATION DATA (OPTIONAL)
• Real-time geographic coordinates (latitude and longitude) — only when you explicitly grant browser location permission

We do not collect passwords (authentication is OTP-based), financial information, payment card data, government identification numbers (Aadhaar, PAN, etc.), biometric data, or health data.`,
  },
  {
    title: "3. Lawful Basis for Processing",
    body: `Under the Digital Personal Data Protection Act, 2023, we process your personal data on the following lawful bases:

CONSENT (Section 6, DPDP Act 2023)
• You provide explicit, informed consent during account registration for processing your name, email, home state, city, food preferences, and spice tolerance.
• You provide separate consent for location data when you choose to enable distance-based features.
• Consent is obtained through a clear, affirmative action (completing the signup form and submitting it).
• You have the right to withdraw consent at any time. Withdrawal does not affect the lawfulness of processing prior to withdrawal.

LEGITIMATE USE
• Processing technical logs and IP data for platform security, fraud prevention, and abuse detection.
• Processing anonymized, aggregated usage data for platform improvement.

LEGAL OBLIGATION
• Retaining certain data as required under the IT Act, 2000, SPDI Rules, 2011, and any other applicable Indian law or regulatory requirement.
• Disclosing data in response to lawful orders from Indian courts or government authorities.`,
  },
  {
    title: "4. Purpose of Processing",
    body: `We use your personal data strictly for the following purposes:

• FEED CURATION: Your home state is used exclusively to filter and display restaurants tagged with your state's cuisine. This is the core personalization feature of PALATR.

• AUTHENTICATION: Your Gmail address is used solely for OTP-based login and account verification. We do not use your email for marketing communications without your separate, explicit consent.

• CONTENT MODERATION: Submitted content is reviewed by administrators to ensure accuracy and compliance with our community standards and applicable Indian law.

• DISTANCE FEATURES: Your real-time location (when granted) is used to compute distances between you and listed restaurants using the Haversine formula. This computation occurs client-side in your browser and the coordinates are not transmitted to or stored on our servers.

• PLATFORM SECURITY: Technical logs and IP data are used to detect and prevent unauthorized access, abuse, and fraudulent activity as required under the IT Act, 2000.

• LEGAL COMPLIANCE: We may process your data to comply with legal obligations, respond to lawful requests from Indian courts or government authorities, or enforce our Terms & Conditions.

• GRIEVANCE REDRESSAL: Contact information may be used to respond to complaints filed with our Grievance Officer.

We do not use your data for targeted advertising, profiling for commercial purposes, sale to third parties, or any purpose not listed above.`,
  },
  {
    title: "5. Sensitive Personal Data or Information (SPDI)",
    body: `Under Rule 3 of the IT (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, the following data we collect may qualify as Sensitive Personal Data or Information (SPDI):

• Food preferences (dietary choices that may reflect religious or personal beliefs)

In accordance with Rule 5 of the SPDI Rules, 2011:
• We collect SPDI only with your prior written consent (provided during signup).
• SPDI is collected for a lawful purpose connected with the Service.
• The collection is necessary for that purpose.
• You are informed of the fact of collection, purpose, intended recipients, and the name and address of the agency collecting the information.
• You have the option to not provide SPDI, though this may limit certain features.
• SPDI is not retained longer than necessary for the purpose for which it was collected.
• SPDI is not transferred to any third party without your consent, except as required by law.`,
  },
  {
    title: "6. Data Storage & Security",
    body: `In accordance with Rule 8 of the SPDI Rules, 2011, PALATR implements reasonable security practices and procedures to protect your personal data.

INFRASTRUCTURE
All personal data is stored in Supabase (PostgreSQL), hosted on AWS infrastructure. Supabase is SOC 2 Type II certified.

DATABASE SECURITY
• Row Level Security (RLS) is enabled on all tables containing personal data, ensuring users can only access their own data.
• Database connections use TLS 1.2+ encryption in transit.
• Data at rest is encrypted using AES-256 encryption.
• Database access is restricted to authenticated API routes only.

AUTHENTICATION SECURITY
• OTP codes are single-use, expire after 10 minutes, and are delivered via Resend's transactional email infrastructure.
• Session tokens (JWT) are stored in HTTP-only cookies to mitigate XSS risks.
• Refresh tokens are rotated on each use.

OPERATIONAL SECURITY
• Access to production systems is restricted to authorized personnel only.
• We conduct periodic security reviews of our codebase and infrastructure.
• We do not store plaintext passwords — authentication is entirely OTP-based.

SECURITY INCIDENT NOTIFICATION
In the event of a data breach that is likely to cause harm to you, PALATR will notify affected users and the relevant Indian authorities as required under applicable law, including the CERT-In Directions, 2022.

Despite these measures, no method of electronic storage is 100% secure. We cannot guarantee absolute security of your data.`,
  },
  {
    title: "7. Data Sharing & Third Parties",
    body: `We do not sell, rent, or trade your personal data to third parties for commercial purposes. In accordance with Rule 6 of the SPDI Rules, 2011, we share data only in the following limited circumstances:

SERVICE PROVIDERS (Data Processors)
• Supabase Inc. — database, authentication, and file storage (AWS-hosted)
• Resend Inc. — transactional email delivery for OTP authentication
• CARTO / OpenStreetMap contributors — map tile rendering (no personal data shared)
• Vercel Inc. — hosting and edge network infrastructure

All service providers are contractually bound to process your data only as instructed by PALATR and in accordance with applicable Indian data protection law.

GOVERNMENT & LAW ENFORCEMENT
We may disclose your personal data if required to do so by:
• A court order or judicial process in India
• A lawful request from Indian government authorities, including law enforcement agencies
• The Cyber Crime Investigation Cell or CERT-In in connection with a security incident
• Any other legal obligation under Indian law

BUSINESS TRANSFERS
In the event of a merger, acquisition, or sale of PALATR's assets, your personal data may be transferred. We will notify you before your data is transferred and becomes subject to a different privacy policy.

AGGREGATED DATA
We may share aggregated, anonymized data that does not identify any individual user with partners or investors.`,
  },
  {
    title: "8. Location Data",
    body: `Location data is treated with heightened care in accordance with the DPDP Act, 2023:

• Location access is entirely optional and only requested when you choose to use distance-based sorting features.
• Your coordinates are processed in real-time in your browser using the Web Geolocation API (a browser-native feature).
• Distance calculations are performed client-side using the Haversine formula — your coordinates are never transmitted to or stored on PALATR's servers.
• Location data is held in browser memory (Zustand state) only for the duration of your session and is cleared on page refresh.
• You can revoke location permission at any time through your browser settings. Revoking access will disable distance-based sorting and the map location feature but will not affect any other functionality.
• PALATR does not share your location data with any third party.`,
  },
  {
    title: "9. Cookies & Tracking Technologies",
    body: `PALATR uses a minimal set of essential cookies required for authentication. We do not use advertising cookies, third-party tracking pixels, or behavioral analytics tools.

For full details on the cookies we use, their purpose, and duration, please refer to our Cookie Policy at palatr.in/cookies.

We do not use:
• Google Analytics or similar analytics platforms
• Facebook Pixel or other social media tracking
• Advertising network cookies
• Cross-site tracking technologies
• Device fingerprinting or identification techniques
• Any third-party behavioral profiling tools`,
  },
  {
    title: "10. Your Rights as a Data Principal",
    body: `Under the Digital Personal Data Protection Act, 2023, you have the following rights as a Data Principal:

RIGHT TO ACCESS INFORMATION (Section 11, DPDP Act 2023)
You have the right to obtain confirmation of whether your personal data is being processed, a summary of the personal data being processed, and information about the processing activities. Contact privacy@palatr.in to submit a data access request.

RIGHT TO CORRECTION AND ERASURE (Section 12, DPDP Act 2023)
You have the right to request correction of inaccurate or incomplete personal data, and the right to request erasure of personal data that is no longer necessary for the purpose for which it was collected. Use the "Request Account Deletion" option in your Profile Settings, or email privacy@palatr.in.

RIGHT TO GRIEVANCE REDRESSAL (Section 13, DPDP Act 2023)
You have the right to have your grievances redressed by PALATR. Contact our Grievance Officer at grievance@palatr.in. We will respond within 48 hours and resolve within 15 days.

RIGHT TO NOMINATE (Section 14, DPDP Act 2023)
You have the right to nominate another individual to exercise your rights in the event of your death or incapacity. Contact privacy@palatr.in to register a nominee.

RIGHT TO WITHDRAW CONSENT
You may withdraw consent for processing at any time. Withdrawal does not affect the lawfulness of processing prior to withdrawal. To withdraw consent, use the account deletion feature or contact privacy@palatr.in.

ADDITIONAL RIGHTS UNDER SPDI RULES, 2011
• Right to review the information you have provided and ensure it is accurate.
• Right to withdraw consent for use of SPDI at any time.

To exercise any of these rights, contact us at privacy@palatr.in. We will respond within 30 days. We may need to verify your identity before processing requests.`,
  },
  {
    title: "11. Data Retention",
    body: `We retain your personal data only for as long as necessary for the purpose for which it was collected, in accordance with the DPDP Act, 2023 and SPDI Rules, 2011:

• ACCOUNT DATA: Retained for the duration of your account. Deleted within 48 hours of a valid deletion request.
• AUTHENTICATION LOGS: Retained for 90 days for security purposes as required under CERT-In Directions, 2022.
• CONTENT DATA (restaurants, reviews): May be retained in anonymized form after account deletion for platform integrity.
• BACKUP DATA: Encrypted backups may retain data for up to 30 days after deletion from primary systems.
• LEGAL HOLD DATA: Data subject to legal proceedings, court orders, or regulatory requirements under Indian law may be retained for the duration required.

After the applicable retention period, data is securely deleted or anonymized using industry-standard methods.`,
  },
  {
    title: "12. Children's Privacy",
    body: `The PALATR Service is not directed to individuals under the age of 18. In accordance with the Digital Personal Data Protection Act, 2023, PALATR does not knowingly process personal data of children (persons under 18 years of age) without verifiable parental consent.

If we become aware that we have inadvertently collected personal data from a person under 18, we will take immediate steps to delete that information. If you are a parent or guardian and believe your child has provided us with personal data, please contact us at privacy@palatr.in immediately.`,
  },
  {
    title: "13. Cross-Border Data Transfers",
    body: `PALATR's infrastructure involves service providers whose servers may be located outside India (including the United States, where Supabase and Vercel infrastructure is hosted). Any transfer of personal data outside India is subject to the provisions of Section 16 of the Digital Personal Data Protection Act, 2023 and any rules or notifications issued thereunder by the Central Government.

We ensure that any cross-border transfer of personal data is subject to appropriate contractual safeguards with our service providers, consistent with applicable Indian data protection law.`,
  },
  {
    title: "14. Grievance Officer",
    body: `In accordance with Rule 5(9) of the SPDI Rules, 2011 and Rule 3(2) of the IT (Intermediary Guidelines) Rules, 2021, PALATR has designated a Grievance Officer to address complaints and grievances:

GRIEVANCE OFFICER
PALATR Grievance Team
Email: grievance@palatr.in
Response Time: Within 24 hours of receipt; resolution within 15 days

You may also approach the Data Protection Board of India (once constituted under the DPDP Act, 2023) for grievances that are not resolved to your satisfaction.`,
  },
  {
    title: "15. Changes to This Policy",
    body: `We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or applicable Indian law. When we make material changes, we will:

• Update the "Last updated" date at the top of this page.
• Notify registered users via email where required by law or where changes are significant.
• Display a prominent notice on the Service.

Your continued use of the Service after the effective date of any changes constitutes your acceptance of the revised Privacy Policy. If you do not agree to the revised Policy, you must stop using the Service and may request account deletion.`,
  },
  {
    title: "16. Contact Information",
    body: `For any privacy-related questions, requests, or concerns:

PALATR Privacy Team
Email: privacy@palatr.in

Grievance Officer: grievance@palatr.in
Legal Notices: legal@palatr.in
General Support: support@palatr.in
Website: https://www.palatr.in

We aim to respond to all privacy inquiries within 5 business days and to resolve Data Principal requests within 30 days as required under applicable Indian law.`,
  },
];

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Last updated: May 2026 &nbsp;·&nbsp; Governed by the laws of India
          </p>
          <p className="mt-4 text-sm leading-relaxed max-w-2xl" style={{ color: "var(--muted)" }}>
            This policy is compliant with the Digital Personal Data Protection Act, 2023, the IT Act, 2000,
            and the SPDI Rules, 2011. Your privacy is protected under Indian law.
          </p>
        </div>

        {/* Quick summary */}
        <div
          className="mb-12 p-6 rounded-2xl"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <p className="text-sm font-bold mb-4 text-white">Quick Summary</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px" }}>
            {[
              { icon: "🔒", text: "We never sell your data" },
              { icon: "📍", text: "Location stays on your device" },
              { icon: "🍽️", text: "State used only for feed curation" },
              { icon: "🗑️", text: "Delete your account anytime" },
              { icon: "🍪", text: "No tracking or ad cookies" },
              { icon: "⚖️", text: "DPDP Act 2023 compliant" },
              { icon: "🔐", text: "AES-256 encryption at rest" },
              { icon: "📋", text: "Grievance Officer appointed" },
            ].map((item) => (
              <div
                key={item.text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "13px",
                  color: "var(--muted)",
                }}
              >
                <span style={{ fontSize: "16px" }}>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>

        {/* Applicable laws */}
        <div
          className="mb-12 p-6 rounded-2xl"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <p className="text-sm font-bold mb-4 text-white">Applicable Indian Laws</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "8px" }}>
            {[
              "Digital Personal Data Protection Act, 2023",
              "Information Technology Act, 2000",
              "IT (Reasonable Security Practices) Rules, 2011",
              "IT (Intermediary Guidelines) Rules, 2021",
              "CERT-In Directions, 2022",
            ].map((law) => (
              <div
                key={law}
                style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--muted)" }}
              >
                <span style={{ color: "#ff4d77", flexShrink: 0 }}>⚖️</span>
                {law}
              </div>
            ))}
          </div>
        </div>

        {/* Table of contents */}
        <div
          className="mb-12 p-6 rounded-2xl"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <p className="text-sm font-bold mb-4 text-white">Table of Contents</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "6px" }}>
            {SECTIONS.map((s) => (
              <a
                key={s.title}
                href={`#${s.title.replace(/\s+/g, "-").toLowerCase()}`}
                className="text-xs transition-all hover:text-[#ff2d5e]"
                style={{ color: "var(--muted)" }}
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>

        {/* Sections */}
        {SECTIONS.map((section) => (
          <div
            key={section.title}
            id={section.title.replace(/\s+/g, "-").toLowerCase()}
            className="mb-10 pb-10"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <h2 className="text-xl font-bold mb-4 text-white">{section.title}</h2>
            <div
              className="text-sm leading-relaxed whitespace-pre-line"
              style={{ color: "var(--muted)" }}
            >
              {section.body}
            </div>
          </div>
        ))}

        {/* Deletion anchor */}
        <div id="deletion" />

        {/* Footer note */}
        <div
          className="mt-8 p-6 rounded-2xl text-sm"
          style={{
            background: "rgba(255,45,94,0.05)",
            border: "1px solid rgba(255,45,94,0.15)",
            color: "var(--muted)",
          }}
        >
          For privacy-related requests or concerns, contact our Grievance Officer at{" "}
          <a href="mailto:grievance@palatr.in" style={{ color: "#ff4d77" }}>
            grievance@palatr.in
          </a>{" "}
          or our Privacy Team at{" "}
          <a href="mailto:privacy@palatr.in" style={{ color: "#ff4d77" }}>
            privacy@palatr.in
          </a>
          . We are committed to responding within 24 hours and resolving within 15 days as required under Indian law.
        </div>
      </div>
    </div>
  );
}
