"use client";

import { useUser } from "@/hooks/useUser";
import { useModal } from "@/hooks/useModal";
import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  const { user } = useUser();
  const { openModal } = useModal();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-[7%] py-5"
      style={{
        background:
          "linear-gradient(to bottom, rgba(7,7,7,0.95), transparent)",
        backdropFilter: "blur(8px)",
      }}
    >
      <Link href="/feed" className="flex items-center gap-2">
        <span
          className="text-2xl font-black tracking-tighter text-white"
          style={{ letterSpacing: "-1.5px" }}
        >
          PALATR.
        </span>
      </Link>

      <div className="flex items-center gap-3">
        {user && (
          <button
            onClick={() => openModal("profile")}
            className="w-11 h-11 rounded-full flex items-center justify-center text-lg transition-all"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
            aria-label="Open profile"
          >
            👤
          </button>
        )}
      </div>
    </nav>
  );
}
