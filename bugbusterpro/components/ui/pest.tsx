"use client";

import type { PestType } from "@/lib/types";
import { PEST, cn } from "@/lib/utils";

/** Ikon monoline per jenis hama — pakai currentColor. */
export function PestIcon({
  type,
  size = 22,
  className,
}: {
  type: PestType;
  size?: number;
  className?: string;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };

  switch (type) {
    case "spiders":
      return (
        <svg {...common}>
          <circle cx="12" cy="13.5" r="3.1" fill="currentColor" fillOpacity="0.14" />
          <circle cx="12" cy="8.4" r="1.7" />
          <path d="M9.2 12 4.6 9.4M9 13.8H4M9.3 15.6 5 17.8M10 16.9 7 19.6" />
          <path d="M14.8 12l4.6-2.6M15 13.8h5M14.7 15.6 19 17.8M14 16.9l3 2.7" />
        </svg>
      );
    case "ants":
      return (
        <svg {...common}>
          <ellipse cx="16" cy="12" rx="3" ry="2.5" fill="currentColor" fillOpacity="0.14" />
          <circle cx="11" cy="12" r="1.7" />
          <circle cx="7" cy="12" r="2" fill="currentColor" fillOpacity="0.14" />
          <path d="M5.6 10.4 4 8.4M6.2 10.1 7 8" />
          <path d="M10.4 13.4 8.5 16M11 13.6l.4 2.6M11.4 10.7 9.8 8.5M11 10.5l.6-2.4" />
        </svg>
      );
    case "termites":
      return (
        <svg {...common}>
          <circle cx="6.2" cy="12" r="2" fill="currentColor" fillOpacity="0.14" />
          <rect x="8" y="9.6" width="11" height="4.8" rx="2.4" fill="currentColor" fillOpacity="0.1" />
          <path d="M12 9.8v4.4M15.5 9.8v4.4" />
          <path d="M4.8 10.6 3.2 8.8M4.8 13.4 3.2 15.2" />
          <path d="M10 14.4v1.8M16 14.4v1.8M10 9.6V7.8M16 9.6V7.8" />
        </svg>
      );
    case "bedbugs":
      return (
        <svg {...common}>
          <ellipse cx="12" cy="12.6" rx="5" ry="3.6" fill="currentColor" fillOpacity="0.12" />
          <path d="M12 9v7.2" />
          <circle cx="12" cy="6.7" r="1.4" />
          <path d="M7.2 10.6 4.6 9.2M7 12.6H4.2M7.2 14.6 4.8 16M16.8 10.6 19.4 9.2M17 12.6h2.8M16.8 14.6 19.2 16" />
        </svg>
      );
    case "rodents":
      return (
        <svg {...common}>
          <ellipse cx="10.5" cy="13.5" rx="5" ry="3.4" fill="currentColor" fillOpacity="0.12" />
          <circle cx="7.5" cy="8.6" r="2.5" fill="currentColor" fillOpacity="0.14" />
          <circle cx="6.6" cy="13" r="0.5" fill="currentColor" stroke="none" />
          <path d="M15.2 14.4c2.6.3 4.4-.6 4.4-2.6 0-1.4-1-2.2-2.2-2.2" />
        </svg>
      );
  }
}

/** Chip pilihan jenis hama (untuk form booking & filter). */
export function PestChip({
  type,
  active,
  onClick,
}: {
  type: PestType;
  active?: boolean;
  onClick?: () => void;
}) {
  const p = PEST[type];
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn("chip", active && "chip-active")}
      aria-pressed={active}
    >
      <span style={{ color: active ? "#fff" : p.tone }}>
        <PestIcon type={type} size={18} />
      </span>
      {p.label}
    </button>
  );
}
