import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | PALATR",
  description: "Read the full Terms & Conditions governing your use of the PALATR platform.",
};

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: `By accessing, registering for, or using the PALATR platform ("Service", "Platform"), you ("User", "you") acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions ("Terms"), our Privacy Policy, and our Cookie Policy. These Terms constitute a legally binding agreement under the Indian Contract Act, 1872 between you and PALATR ("Company", "we", "us", "our").

These Terms are published in accordance with the provisions of Rule 3(1) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, which require publishing rules and regulations, privacy policy, and terms of use for access or usage of the Platform.

If you do not agree to these Terms in their entirety, you must immediately cease use of the Service. We reserve the right to modify these Terms at any time with reasonable notice. Continued use of the Service after any modification constitutes your acceptance of the revised Terms.

You must be at least 18 years of age to create an account and use the Service. By using the Service, you represent and warrant that you are 18 years of age or older and have the legal capacity to enter into a binding contract under Indian law.`,
  },
  {
    title: "2. Nature of the Platform",
    body: `PALATR is an intermediary as defined under Section 2(1)(w) of the Information Technology Act, 2000 ("IT Act"). PALATR operates as a community-driven food discovery platform that enables users to discover, submit, review, and share information about restaurants and food establishments across India.

PALATR does not own, operate, manage, or endorse any restaurant listed on the platform. All restaurant information is user-submitted and subject to admin review. PALATR acts solely as a technology intermediary facilitating the exchange of food-related information between users.

As an intermediary under the IT Act and the Intermediary Guidelines Rules, 2021, PALATR is not liable for third-party content hosted on the platform, provided we act in accordance with our obligations under applicable law.`,
  },
  {
    title: "3. Account Registration & Authentication",
    body: `PALATR uses a one-time password (OTP) authentication system delivered to a verified Google Gmail address (@gmail.com). By registering, you represent and warrant that:

• The Gmail address you provide is legitimately owned by you and you have the right to use it.
• All personal information provided during signup — including your name, home state, current city, and food preferences — is accurate, current, and truthful.
• You will not impersonate any person or entity or misrepresent your identity or affiliation.
• You are solely responsible for maintaining the confidentiality of your OTP codes. OTPs expire after 10 minutes and must not be shared with any third party.
• You will notify us immediately at support@palatr.in if you suspect any unauthorized access to your account.
• One person may not maintain more than one active account. Duplicate accounts may be suspended without notice.
• You will not use the Service if you have been previously banned or suspended by PALATR.
• PALATR reserves the right to refuse registration or cancel accounts at its sole discretion, including for violation of these Terms or applicable Indian law.`,
  },
  {
    title: "4. User-Generated Content",
    body: `The Service allows users to submit restaurant listings, reviews, ratings, photographs, descriptions, and other content ("User Content"). By submitting User Content, you:

• Grant PALATR a worldwide, non-exclusive, royalty-free, sublicensable, and transferable license to use, reproduce, distribute, prepare derivative works of, display, and perform the User Content in connection with the Service and PALATR's business operations.
• Represent and warrant that you own or have the necessary rights, licenses, consents, and permissions to submit the User Content and to grant the above license, and that doing so does not violate any third-party rights or applicable Indian law.
• Confirm that the User Content does not infringe any intellectual property rights under the Copyright Act, 1957, the Trade Marks Act, 1999, or any other applicable Indian legislation.
• Confirm that the User Content is not defamatory, obscene, pornographic, invasive of privacy, or otherwise unlawful under the IT Act, 2000, the Indian Penal Code, 1860, or any other applicable law.
• Acknowledge that PALATR does not endorse any User Content and expressly disclaims any liability in connection with User Content.
• Understand that PALATR may, but is not obligated to, monitor, edit, or remove User Content at its sole discretion.
• Acknowledge that you are solely responsible for the accuracy of restaurant information you submit, including location data, operating hours, menu items, and pricing.`,
  },
  {
    title: "5. Prohibited Conduct",
    body: `You agree not to engage in any of the following prohibited activities, which may constitute violations of these Terms and/or applicable Indian law including the IT Act, 2000, the IT (Amendment) Act, 2008, and the Indian Penal Code, 1860:

• Submitting false, misleading, defamatory, or fraudulent restaurant listings or reviews.
• Publishing content that is obscene, pornographic, paedophilic, invasive of another's privacy, or threatening — as prohibited under Section 67, 67A, and 67B of the IT Act, 2000.
• Publishing content that is hateful, racially or ethnically objectionable, or promotes enmity between groups on grounds of religion, race, caste, sex, or place of birth — as prohibited under Section 153A and 295A of the Indian Penal Code, 1860.
• Using the Service for any commercial solicitation, spam, or unsolicited advertising.
• Attempting to gain unauthorized access to any portion of the Service, other user accounts, or PALATR's backend systems — which may constitute an offence under Section 43 and Section 66 of the IT Act, 2000.
• Reverse engineering, decompiling, or disassembling the Service.
• Scraping or using automated tools to extract data from the Service without prior written consent.
• Uploading or transmitting viruses, malware, or any other malicious code — which may constitute an offence under Section 43(c) and Section 66 of the IT Act, 2000.
• Harassing, threatening, or intimidating other users or PALATR staff — which may constitute an offence under Section 66A (as applicable), Section 354D, or Section 507 of the Indian Penal Code, 1860.
• Violating any applicable local, state, or central Indian law or regulation.
• Engaging in any activity that disrupts or interferes with the Service or servers connected to the Service.`,
  },
  {
    title: "6. Content Moderation & Grievance Redressal",
    body: `In accordance with Rule 3(2) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, PALATR has appointed a Grievance Officer to address complaints and grievances from users.

GRIEVANCE OFFICER
Name: PALATR Grievance Team
Email: grievance@palatr.in
Response Time: Within 24 hours of receipt of complaint; resolution within 15 days

Users may file a complaint regarding any content on the platform that they believe violates these Terms, applicable law, or their rights. PALATR will acknowledge the complaint within 24 hours and resolve it within 15 days as required under the Intermediary Guidelines Rules, 2021.

All restaurant submissions and hidden gem entries are subject to review by PALATR administrators before appearing on the platform. PALATR reserves the right to approve, reject, edit, or remove any content at its sole discretion. Moderation decisions may be appealed by contacting grievance@palatr.in with supporting evidence.`,
  },
  {
    title: "7. Intellectual Property",
    body: `The PALATR name, logo, brand identity, platform design, software, algorithms, and all associated intellectual property are the exclusive property of PALATR and are protected under the Copyright Act, 1957, the Trade Marks Act, 1999, and other applicable Indian intellectual property laws.

You are granted a limited, non-exclusive, non-transferable, revocable license to access and use the Service for personal, non-commercial purposes only. You may not copy, modify, distribute, sell, or lease any part of the Service or its content without our written permission.

Any unauthorized use of PALATR's intellectual property may constitute an infringement under the Copyright Act, 1957 or the Trade Marks Act, 1999, and PALATR reserves the right to initiate appropriate legal proceedings.`,
  },
  {
    title: "8. Location Data",
    body: `The Service may request access to your device's geolocation data to provide distance-based restaurant sorting and map features. By enabling location access:

• You provide free, specific, informed, and unambiguous consent to the collection and processing of your real-time geographic coordinates, as required under the Digital Personal Data Protection Act, 2023 ("DPDP Act").
• Location data is processed locally on your device and is not persistently stored on PALATR's servers.
• Location data is used solely to compute distances between you and listed restaurants using the Haversine formula.
• You may withdraw consent and revoke location access at any time through your browser or device settings. Withdrawal of consent will disable distance-based features but will not affect other functionality.
• PALATR does not share your location data with any third party.`,
  },
  {
    title: "9. Third-Party Services & Links",
    body: `The Service integrates with or links to third-party services including:

• Supabase (database and authentication infrastructure — hosted on AWS)
• Google Maps (external navigation links — subject to Google's Terms of Service)
• Resend (transactional email delivery for OTP)
• OpenStreetMap / CARTO (map tile rendering)
• Vercel (hosting and edge network infrastructure)

PALATR is not responsible for the privacy practices, terms of service, or content of any third-party services. Your use of third-party services is governed by their respective terms and privacy policies. Links to external websites do not constitute endorsement by PALATR.`,
  },
  {
    title: "10. Account Deletion & Data Retention",
    body: `You may request permanent deletion of your account at any time through the Profile Settings modal within the Service. In accordance with the Digital Personal Data Protection Act, 2023, upon receiving a valid deletion request:

• Your personal profile data (name, email, preferences) will be permanently deleted within 48 hours.
• Your submitted restaurant listings and reviews may be retained in anonymized form for platform integrity purposes.
• Authentication tokens and session data will be immediately invalidated.
• Backup copies of data may persist for up to 30 days in encrypted backup systems before permanent deletion.

PALATR may retain certain data as required by applicable Indian law, including the IT Act, 2000, the IT (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and any other applicable regulation.`,
  },
  {
    title: "11. Disclaimer of Warranties",
    body: `THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE INDIAN LAW, PALATR MAKES NO WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.

PALATR does not warrant that: (a) the Service will be uninterrupted, error-free, or secure; (b) any defects will be corrected; (c) the Service is free of viruses or harmful components; or (d) the results of using the Service will meet your requirements.

Restaurant information on the platform is user-submitted and may not be accurate, complete, or current. PALATR makes no representations regarding the quality, safety, hygiene, or suitability of any restaurant listed on the platform. Users are advised to exercise their own judgment before visiting any establishment.`,
  },
  {
    title: "12. Limitation of Liability",
    body: `TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE INDIAN LAW, PALATR, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICE.

PALATR's total aggregate liability to you for any claims arising from these Terms or your use of the Service shall not exceed INR 1,000 (Indian Rupees One Thousand).

Nothing in these Terms shall exclude or limit PALATR's liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be excluded or limited under applicable Indian law, including the Consumer Protection Act, 2019.`,
  },
  {
    title: "13. Consumer Rights",
    body: `PALATR acknowledges the rights of consumers under the Consumer Protection Act, 2019 and the Consumer Protection (E-Commerce) Rules, 2020. As a platform facilitating food discovery:

• PALATR does not charge users for access to the platform and does not facilitate direct commercial transactions between users and restaurants.
• Users who believe they have been misled by inaccurate platform content may file a complaint with the National Consumer Disputes Redressal Commission (NCDRC) or the appropriate State Consumer Disputes Redressal Commission.
• Users may also raise grievances directly with PALATR's Grievance Officer at grievance@palatr.in.`,
  },
  {
    title: "14. Indemnification",
    body: `You agree to defend, indemnify, and hold harmless PALATR and its officers, directors, employees, contractors, agents, licensors, and suppliers from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable legal fees) arising out of or relating to:

• Your violation of these Terms or any applicable Indian law.
• Your User Content or any content you submit to the platform.
• Your use of the Service in a manner not authorized by these Terms.
• Any misrepresentation made by you in connection with your use of the Service.`,
  },
  {
    title: "15. Governing Law & Dispute Resolution",
    body: `These Terms shall be governed by and construed in accordance with the laws of India, including but not limited to the Indian Contract Act, 1872, the Information Technology Act, 2000, and the Digital Personal Data Protection Act, 2023, without regard to conflict of law principles.

DISPUTE RESOLUTION
Any disputes arising under or in connection with these Terms shall first be attempted to be resolved through good-faith negotiation. Either party may initiate dispute resolution by sending written notice to the other party.

If the dispute is not resolved within 30 days of such notice, it shall be referred to and finally resolved by arbitration in accordance with the Arbitration and Conciliation Act, 1996. The seat of arbitration shall be Bangalore, Karnataka, India. The language of arbitration shall be English.

JURISDICTION
Subject to the arbitration clause above, the courts of Bangalore, Karnataka, India shall have exclusive jurisdiction over any disputes arising from these Terms.`,
  },
  {
    title: "16. Termination",
    body: `PALATR reserves the right to suspend or terminate your access to the Service at any time, with or without cause, and with or without notice, including but not limited to violations of these Terms or applicable Indian law. Upon termination, your right to use the Service will immediately cease.

You may terminate your account at any time by using the account deletion feature in the app or by contacting support@palatr.in.

All provisions of these Terms which by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.`,
  },
  {
    title: "17. Severability & Entire Agreement",
    body: `If any provision of these Terms is held to be invalid or unenforceable by a court of competent jurisdiction in India, the remaining provisions will continue in full force and effect. These Terms, together with the Privacy Policy and Cookie Policy, constitute the entire agreement between you and PALATR regarding the Service and supersede all prior agreements and understandings.

Failure by PALATR to enforce any right or provision of these Terms will not be considered a waiver of those rights.`,
  },
  {
    title: "18. Contact & Grievance Officer",
    body: `For questions, concerns, or legal notices regarding these Terms, please contact:

PALATR Grievance Officer (as required under IT Intermediary Guidelines Rules, 2021)
Email: grievance@palatr.in

General Support: support@palatr.in
Legal Notices: legal@palatr.in
Website: https://www.palatr.in

We aim to acknowledge all complaints within 24 hours and resolve them within 15 days as mandated under applicable Indian law.`,
  },
];

export default function TermsPage() {
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
            Terms &amp; Conditions
          </h1>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Last updated: May 2026 &nbsp;·&nbsp; Governed by the laws of India
          </p>
          <p className="mt-4 text-sm leading-relaxed max-w-2xl" style={{ color: "var(--muted)" }}>
            These Terms are governed by the Indian Contract Act, 1872, the Information Technology Act, 2000,
            the IT (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, and the Digital
            Personal Data Protection Act, 2023. Please read carefully before using PALATR.
          </p>
        </div>

        {/* Applicable laws callout */}
        <div
          className="mb-12 p-6 rounded-2xl"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <p className="text-sm font-bold mb-4 text-white">Applicable Indian Laws</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "8px" }}>
            {[
              "Indian Contract Act, 1872",
              "Information Technology Act, 2000",
              "IT (Amendment) Act, 2008",
              "IT (Intermediary Guidelines) Rules, 2021",
              "IT (Reasonable Security Practices) Rules, 2011",
              "Digital Personal Data Protection Act, 2023",
              "Copyright Act, 1957",
              "Trade Marks Act, 1999",
              "Consumer Protection Act, 2019",
              "Consumer Protection (E-Commerce) Rules, 2020",
              "Indian Penal Code, 1860",
              "Arbitration and Conciliation Act, 1996",
            ].map((law) => (
              <div
                key={law}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "12px",
                  color: "var(--muted)",
                }}
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "6px",
            }}
          >
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

        {/* Footer note */}
        <div
          className="mt-8 p-6 rounded-2xl text-sm"
          style={{
            background: "rgba(255,45,94,0.05)",
            border: "1px solid rgba(255,45,94,0.15)",
            color: "var(--muted)",
          }}
        >
          By using PALATR, you confirm that you have read, understood, and agree to these Terms &amp; Conditions,
          which are governed by the laws of India. For any questions, contact us at{" "}
          <a href="mailto:legal@palatr.in" style={{ color: "#ff4d77" }}>
            legal@palatr.in
          </a>{" "}
          or our Grievance Officer at{" "}
          <a href="mailto:grievance@palatr.in" style={{ color: "#ff4d77" }}>
            grievance@palatr.in
          </a>
          .
        </div>
      </div>
    </div>
  );
}
