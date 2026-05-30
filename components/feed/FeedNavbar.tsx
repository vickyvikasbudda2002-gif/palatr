"use client";

interface FeedNavbarProps {
  onProfileClick: () => void;
}

export function FeedNavbar({ onProfileClick }: FeedNavbarProps) {
  return (
    <nav className="feed-navbar">
      {/* Logo — swap /logo.png with your actual logo file */}
      <a href="/feed" className="feed-navbar-logo">
        {/* If you have a logo image, replace the text below with:
            <img src="/logo.png" alt="PALATR" />
        */}
        <img
          src="/logo.png"
          alt="PALATR"
          onError={(e) => {
            // Fallback to text if logo image not found yet
            const target = e.currentTarget;
            target.style.display = "none";
            const fallback = target.nextElementSibling as HTMLElement | null;
            if (fallback) fallback.style.display = "block";
          }}
        />
        <span style={{ display: "none" }}>PALATR.</span>
      </a>

      {/* Profile icon */}
      <button
        className="feed-navbar-profile"
        onClick={onProfileClick}
        aria-label="Open profile"
      >
        👤
      </button>
    </nav>
  );
}
