import { cn } from "@/lib/utils";

export function Logo({
  variant = "dark",
  showText = true,
  className,
}: {
  /** "dark" = teks gelap (latar terang) · "light" = teks putih (latar gelap) */
  variant?: "dark" | "light";
  showText?: boolean;
  className?: string;
}) {
  const textColor = variant === "light" ? "#ffffff" : "var(--ink)";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className="grid place-items-center rounded-[11px] shadow-sm"
        style={{ width: 38, height: 38, background: "var(--teal)" }}
        aria-hidden
      >
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
          {/* shield */}
          <path
            d="M12 2.5 4.5 5.4v6.1c0 4.6 3.1 8 7.5 9.5 4.4-1.5 7.5-4.9 7.5-9.5V5.4L12 2.5Z"
            fill="#ffffff"
            fillOpacity="0.16"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* check */}
          <path
            d="m8.6 11.8 2.4 2.4 4.6-4.8"
            stroke="#ffffff"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {showText && (
        <span className="font-display leading-none" style={{ color: textColor }}>
          <span className="block text-[17px] font-extrabold tracking-tight">
            BugBuster
          </span>
          <span
            className="block text-[10px] font-bold tracking-[0.28em] uppercase"
            style={{ color: "var(--teal)" }}
          >
            Pro
          </span>
        </span>
      )}
    </span>
  );
}
