export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#070707]">
      <div className="text-center">
        <div
          className="text-4xl font-black tracking-tighter mb-4"
          style={{ letterSpacing: "-2px" }}
        >
          PALATR.
        </div>
        <div className="flex gap-2 justify-center">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-[#ff2d5e] animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
