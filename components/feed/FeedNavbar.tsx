"use client";

import { useState } from "react";
import Link from "next/link";

interface FeedNavbarProps {
  onProfileClick: () => void;
}

export function FeedNavbar({ onProfileClick }: FeedNavbarProps) {
  const [logoError, setLogoError] = useState(false);

  return (
    <nav className="feed-navbar">
      <Link href="/feed" className="feed-navbar-logo">
        {logoError ? (
          <span>PALATR.</span>
        ) : (
          <img
            src="/logo.png"
            alt="PALATR"
            onError={() => setLogoError(true)}
          />
        )}
      </Link>

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
