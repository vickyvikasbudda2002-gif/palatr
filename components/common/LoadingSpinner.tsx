export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "w-4 h-4", md: "w-8 h-8", lg: "w-12 h-12" };
  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizes[size]} rounded-full border-2 border-[rgba(255,255,255,0.1)] border-t-[#ff2d5e] animate-spin`}
      />
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070707]">
      <div className="text-center">
        <div
          className="text-3xl font-black mb-6"
          style={{ letterSpacing: "-1.5px" }}
        >
          PALATR.
        </div>
        <LoadingSpinner size="lg" />
      </div>
    </div>
  );
}
