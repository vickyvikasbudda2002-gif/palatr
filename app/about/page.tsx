import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | PALATR",
  description: "Learn about PALATR — the community-driven food discovery platform built for India.",
};

export default function AboutPage() {
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

        {/* Hero */}
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
            Our Story
          </div>
          <h1
            className="font-black leading-none mb-6"
            style={{ fontSize: "clamp(40px, 7vw, 72px)", letterSpacing: "-3px" }}
          >
            Taste where<br />
            <span style={{ color: "var(--primary)" }}>you belong.</span>
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: "var(--muted)" }}>
            PALATR was born from a simple frustration — moving to a new city and not being able to
            find food that actually tastes like home. Not just "Indian food." Your food. The kind
            your state makes, your community loves, your tongue recognizes.
          </p>
        </div>

        {/* The problem */}
        <div
          className="mb-12 p-8 rounded-3xl"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <h2 className="text-2xl font-black mb-4" style={{ letterSpacing: "-1px" }}>
            The Problem We Solve
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            India has 28 states and 8 union territories, each with a cuisine so distinct it might as
            well be a different country. A Tamilian in Bangalore craves Chettinad. A Keralite wants
            proper fish curry. An Andhra person needs that specific level of spice that no generic
            "South Indian" restaurant delivers.
          </p>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            Generic food apps show you what's popular. PALATR shows you what's <em>yours</em>.
          </p>
        </div>

        {/* Values grid */}
        <div
          className="mb-12"
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}
        >
          {[
            {
              icon: "🏠",
              title: "Community First",
              desc: "Every restaurant on PALATR is submitted and validated by real people from that community — not algorithms, not paid listings.",
            },
            {
              icon: "🌶️",
              title: "Authenticity Over Popularity",
              desc: "We don't rank by ratings or reviews from people who don't understand the cuisine. We rank by what your community actually loves.",
            },
            {
              icon: "🗺️",
              title: "Built for India",
              desc: "Designed from the ground up for the Indian diaspora experience — people who live far from home but never stop craving it.",
            },
            {
              icon: "🔒",
              title: "No Ads. No Noise.",
              desc: "PALATR is free, ad-free, and built purely to connect people with food that feels like home. No sponsored listings. Ever.",
            },
          ].map((v) => (
            <div
              key={v.title}
              className="p-6 rounded-2xl"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <div style={{ fontSize: "28px", marginBottom: "12px" }}>{v.icon}</div>
              <h3 className="font-bold text-white mb-2">{v.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div
          className="mb-12 p-8 rounded-3xl"
          style={{
            background: "linear-gradient(135deg, rgba(255,45,94,0.08), rgba(255,77,119,0.04))",
            border: "1px solid rgba(255,45,94,0.2)",
          }}
        >
          <h2 className="text-2xl font-black mb-4" style={{ letterSpacing: "-1px" }}>
            Our Mission
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "var(--muted)" }}>
            To make every Indian living away from their home state feel at home — one meal at a time.
            We believe food is identity. And everyone deserves to find their identity on a plate,
            wherever they are in India.
          </p>
        </div>

        {/* CTA */}
        <div className="flex gap-4 flex-wrap">
          <Link
            href="/feed"
            className="px-8 py-4 rounded-full font-bold text-white text-sm transition-all hover:brightness-110"
            style={{ background: "linear-gradient(145deg, #ff2d5e, #ff4d77)" }}
          >
            Explore the Feed →
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
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}
