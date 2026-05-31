"use client";

import { useEffect, useId } from "react";
import { cn } from "@/lib/utils";

// Ref-counted scroll lock — safe with multiple modals open simultaneously
let openModalCount = 0;

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  maxWidth?: string;
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  children,
  maxWidth = "680px",
  className,
}: ModalProps) {
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;

    openModalCount++;
    document.body.style.overflow = "hidden";

    return () => {
      openModalCount--;
      if (openModalCount <= 0) {
        openModalCount = 0;
        document.body.style.overflow = "";
        // Fire resize so Leaflet recalculates map size after modal closes
        setTimeout(() => window.dispatchEvent(new Event("resize")), 300);
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        className={cn("modal-box", className)}
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
