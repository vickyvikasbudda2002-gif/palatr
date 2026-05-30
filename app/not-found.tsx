import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070707] px-6">
      <div className="text-center">
        <div
          className="text-8xl font-black mb-4"
          style={{
            background: "linear-gradient(to right, #fff, #a3a3a3)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-4px",
          }}
        >
          404
        </div>
        <p className="text-[#8d8d8d] text-lg mb-8">
          This page doesn&apos;t exist. Maybe it&apos;s a hidden gem?
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-4 rounded-full font-bold text-white transition-all"
          style={{
            background: "linear-gradient(145deg, #ff2d5e, #ff4d77)",
            boxShadow: "0 8px 25px rgba(255,45,94,0.3)",
          }}
        >
          Back to PALATR
        </Link>
      </div>
    </div>
  );
}
